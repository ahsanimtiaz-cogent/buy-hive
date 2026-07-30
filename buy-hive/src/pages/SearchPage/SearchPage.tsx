import { Apps, Close } from '@mui/icons-material'
import { Box, Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useMemo, useState } from 'react'
import { products } from '../../data/catalog'
import type { FilterState } from '../../types/catalog'
import { Filters } from '../../components/filter/Filters'
import { ProductGrid } from '../../components/product/ProductGrid'
import { PromoBanner } from '../../components/search/PromoBanner'
import { SearchBar } from '../../components/search/SearchBar'
import { SearchToolbar } from '../../components/search/SearchToolbar'

const initialFilters: FilterState = { price: [0, 6900], productCertificates: [], supplierCertificates: [], locations: [], stock: false }

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const visibleProducts = useMemo(() => query ? products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())) : products, [query])
  const handleCategoryChange = (event: SelectChangeEvent) => setCategory(event.target.value)

  return <><SearchBar query={query} category={category} onQueryChange={setQuery} onCategoryChange={handleCategoryChange} onSearch={() => undefined} onCategories={() => setFiltersOpen(true)} /><Box className="mobile-category-button"><Button startIcon={<Apps />} onClick={() => setFiltersOpen(true)}>Categories</Button></Box><Box className="results-heading"><Typography>Products</Typography><Typography component="span">(524 Products)</Typography></Box><Button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}>Show Filters</Button><Box className="results-layout"><Box className="desktop-filters"><Filters values={filters} onChange={setFilters} /></Box><Box className="results-content"><Typography className="buy-label">Buy</Typography><PromoBanner /><SearchToolbar view={view} onViewChange={setView} /><ProductGrid products={visibleProducts} view={view} /></Box></Box><Drawer anchor="left" open={filtersOpen} onClose={() => setFiltersOpen(false)} className="mobile-drawer"><Box className="drawer-content"><Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}><Typography className="drawer-title">Filters</Typography><IconButton onClick={() => setFiltersOpen(false)}><Close /></IconButton></Stack><Divider /><Filters values={filters} onChange={setFilters} /></Box></Drawer></>
}
