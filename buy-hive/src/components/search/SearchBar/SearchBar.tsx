import { Apps, ExpandMore, Search } from '@mui/icons-material'
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'

interface SearchBarProps { query: string; category: string; onQueryChange: (value: string) => void; onCategoryChange: (event: SelectChangeEvent) => void; onSearch: () => void; onCategories: () => void }

export function SearchBar({ query, category, onQueryChange, onCategoryChange, onSearch, onCategories }: SearchBarProps) {
  return <Box className="search-shell"><Button className="categories-button" startIcon={<Apps />} onClick={onCategories}>Categories</Button><TextField value={query} onChange={(event) => onQueryChange(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && onSearch()} placeholder="What are you looking for?" className="search-input" variant="standard" slotProps={{ input: { disableUnderline: true } }} /><Select value={category} onChange={onCategoryChange} className="category-select" IconComponent={ExpandMore} variant="standard" disableUnderline><MenuItem value="All Categories">All Categories</MenuItem><MenuItem value="Patio Furniture Sets">Patio Furniture Sets</MenuItem><MenuItem value="Health & Wellness">Health &amp; Wellness</MenuItem></Select><Button className="search-button" onClick={onSearch} startIcon={<Search className="mobile-search-icon" />}>Search</Button></Box>
}
