import { Apps, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { fetchFacets, fetchProducts } from "../../api/products";
import type {
  Facets,
  FilterState,
  ProductsResponse,
} from "../../types/catalog";
import { ALL_CATEGORIES } from "../../data/catalog";
import { Filters } from "../../components/filter/Filters";
import { ProductGrid } from "../../components/product/ProductGrid";
import { PromoBanner } from "../../components/search/PromoBanner";
import { SearchBar } from "../../components/search/SearchBar";
import { SearchToolbar } from "../../components/search/SearchToolbar";

const SEARCH_DEBOUNCE_MS = 300;

const emptyFacets: Facets = {
  categories: [],
  countries: [],
  certificates: [],
  priceRange: [0, 0],
};

const initialFilters: FilterState = {
  price: [0, 0],
  moq: "",
  productCertificates: [],
  locations: [],
  stock: false,
};

const toMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

const isAbort = (error: unknown) =>
  error instanceof DOMException && error.name === "AbortError";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [facets, setFacets] = useState<Facets>(emptyFacets);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [result, setResult] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter options and the real price bounds come from the API.
  useEffect(() => {
    const controller = new AbortController();

    fetchFacets(controller.signal)
      .then((data) => {
        setFacets(data);
        setFilters((current) => ({ ...current, price: data.priceRange }));
      })
      .catch((err) => {
        if (!isAbort(err)) setError(toMessage(err, "Failed to load filters"));
      });

    return () => controller.abort();
  }, []);

  // Typing shouldn't fire a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(query);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetchProducts(
      {
        search,
        category: category === ALL_CATEGORIES ? "" : category,
        sort,
        page,
        filters,
        priceRange: facets.priceRange,
      },
      controller.signal,
    )
      .then((data) => {
        setResult(data);
        setError(null);
      })
      .catch((err) => {
        if (!isAbort(err)) setError(toMessage(err, "Failed to load products"));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [search, category, sort, page, filters, facets.priceRange]);

  // Any change to the result set invalidates the current page.
  const handleFiltersChange = (values: FilterState) => {
    setFilters(values);
    setPage(1);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const runSearch = () => {
    setSearch(query);
    setPage(1);
  };

  const products = result?.items ?? [];
  const total = result?.total ?? 0;

  const filterPanel = (
    <Filters
      values={filters}
      onChange={handleFiltersChange}
      certificates={facets.certificates}
      locations={facets.countries}
      priceRange={facets.priceRange}
    />
  );

  return (
    <>
      <SearchBar
        query={query}
        category={category}
        categories={facets.categories}
        onQueryChange={setQuery}
        onCategoryChange={handleCategoryChange}
        onSearch={runSearch}
        onCategories={() => setFiltersOpen(true)}
      />
      <Box className="mobile-category-button">
        <Button startIcon={<Apps />} onClick={() => setFiltersOpen(true)}>
          Categories
        </Button>
      </Box>
      <Box className="results-heading">
        <Typography>Products</Typography>
        <Typography component="span">({total} Products)</Typography>
      </Box>
      <Button
        className="mobile-filter-button"
        onClick={() => setFiltersOpen(true)}
      >
        Show Filters
      </Button>
      <Box className="results-layout">
        <Box className="desktop-filters">{filterPanel}</Box>
        <Box className="results-content">
          <Typography className="buy-label">Buy</Typography>
          <PromoBanner />
          <SearchToolbar
            view={view}
            onViewChange={setView}
            sort={sort}
            onSortChange={handleSortChange}
            page={result?.page ?? page}
            pages={result?.pages ?? 1}
            onPageChange={setPage}
          />
          {loading && <Typography>Loading products…</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && products.length === 0 && (
            <Typography>No products match your filters.</Typography>
          )}
          {!loading && !error && products.length > 0 && (
            <ProductGrid products={products} view={view} />
          )}
        </Box>
      </Box>
      <Drawer
        anchor="left"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        className="mobile-drawer"
      >
        <Box className="drawer-content">
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography className="drawer-title">Filters</Typography>
            <IconButton onClick={() => setFiltersOpen(false)}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />
          {filterPanel}
        </Box>
      </Drawer>
    </>
  );
}
