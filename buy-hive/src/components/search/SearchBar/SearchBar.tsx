import { ExpandMore, GridView, Search } from "@mui/icons-material";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { ALL_CATEGORIES } from "../../../data/catalog";

interface SearchBarProps {
  query: string;
  category: string;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (event: SelectChangeEvent) => void;
  onSearch: () => void;
  onCategories: () => void;
}

export function SearchBar({
  query,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
  onSearch,
  onCategories,
}: SearchBarProps) {
  return (
    <Box className="search-shell">
      <Button
        className="categories-button"
        startIcon={<GridView />}
        onClick={onCategories}
      >
        Categories
      </Button>
      <Box className="search-field-wrap">
        <Box className="search-input-group">
          <TextField
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && onSearch()}
            placeholder="What are you looking for?"
            className="search-input"
            variant="standard"
            slotProps={{ input: { disableUnderline: true } }}
          />
          <Select
            value={category}
            onChange={onCategoryChange}
            className="category-select"
            IconComponent={ExpandMore}
            variant="standard"
            disableUnderline
          >
            <MenuItem value={ALL_CATEGORIES}>{ALL_CATEGORIES}</MenuItem>
            {categories.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Button
        className="search-button"
        onClick={onSearch}
        startIcon={<Search className="mobile-search-icon" />}
      >
        Search
      </Button>
    </Box>
  );
}
