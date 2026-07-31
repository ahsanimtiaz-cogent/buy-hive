import { Search } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

interface FilterSectionProps {
  title: string;
  items: string[];
  selected: string[];
  searchable?: boolean;
  showCount?: boolean;
  onChange: (items: string[]) => void;
}

export function FilterSection({
  title,
  items,
  selected,
  searchable = false,
  showCount = true,
  onChange,
}: FilterSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const matching = search
    ? items.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    : items;
  const shown = expanded ? matching : matching.slice(0, 6);
  const toggle = (item: string) =>
    onChange(
      selected.includes(item)
        ? selected.filter((value) => value !== item)
        : [...selected, item],
    );
  return (
    <Box className="filter-section">
      <Typography className="filter-title">{title}</Typography>
      {searchable && (
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`${title}...`}
          variant="standard"
          fullWidth
          className="filter-search"
          slotProps={{
            input: {
              disableUnderline: true,
              endAdornment: <Search sx={{ fontSize: 18, color: "#8b949c" }} />,
            },
          }}
        />
      )}
      <Stack spacing={0.1}>
        {shown.map((item) => (
          <FormControlLabel
            key={item}
            className="check-row"
            control={
              <Checkbox
                checked={selected.includes(item)}
                onChange={() => toggle(item)}
              />
            }
            label={item}
          />
        ))}
      </Stack>
      {matching.length > 6 && (
        <Button className="show-all" onClick={() => setExpanded(!expanded)}>
          {expanded
            ? "Show Less"
            : `Show All (${showCount ? matching.length : ""})`}
        </Button>
      )}
    </Box>
  );
}
