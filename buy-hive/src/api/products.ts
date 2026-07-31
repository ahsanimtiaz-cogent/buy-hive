import type { Facets, FilterState, ProductsResponse } from "../types/catalog";

const baseUrl = import.meta.env.API_BASE_URL;

export interface ProductQuery {
  search: string;
  /** Empty string means "all categories". */
  category: string;
  sort: string;
  page: number;
  filters: FilterState;
  /** Full range from the facets, used to tell "untouched" from "narrowed". */
  priceRange: [number, number];
}

function buildParams({
  search,
  category,
  sort,
  page,
  filters,
  priceRange,
}: ProductQuery) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);
  params.set("page", String(page));

  // Only send bounds the user actually moved, so an untouched slider doesn't
  // exclude products whose price failed to parse.
  if (filters.price[0] > priceRange[0]) {
    params.set("minPrice", String(filters.price[0]));
  }
  if (filters.price[1] < priceRange[1]) {
    params.set("maxPrice", String(filters.price[1]));
  }

  if (filters.moq.trim()) params.set("moq", filters.moq.trim());
  if (filters.stock) params.set("availableInUs", "true");

  for (const certificate of filters.productCertificates) {
    params.append("productCertificate", certificate);
  }
  for (const location of filters.locations) {
    params.append("country", location);
  }

  return params;
}

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

export function fetchProducts(query: ProductQuery, signal?: AbortSignal) {
  return getJson<ProductsResponse>(`/products?${buildParams(query)}`, signal);
}

export function fetchFacets(signal?: AbortSignal) {
  return getJson<Facets>("/products/facets", signal);
}
