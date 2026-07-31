import { ExpandMore, GridView, Search } from "@mui/icons-material";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

interface SearchBarProps {
  query: string;
  category: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (event: SelectChangeEvent) => void;
  onSearch: () => void;
  onCategories: () => void;
}

export function SearchBar({
  query,
  category,
  onQueryChange,
  onCategoryChange,
  onSearch,
  onCategories,
}: SearchBarProps) {
  return (
    <Box className="search-shell">
      <Button className="categories-button" startIcon={<GridView />} onClick={onCategories}>
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
            <MenuItem value="All Categories">All Categories</MenuItem>
            <MenuItem value="ppe">PPE</MenuItem>
            <MenuItem value="health_&_medical">Health &amp; Medical</MenuItem>
            <MenuItem value="garden_&_outdoor">Garden &amp; Outdoor</MenuItem>
            <MenuItem value="sports_&_fitness">Sports &amp; Fitness</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="baby">Baby</MenuItem>
            <MenuItem value="beauty_&_personal_care">Beauty &amp; Personal Care</MenuItem>
            <MenuItem value="home_kitchen_&_office">Home, Kitchen &amp; Office</MenuItem>
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
