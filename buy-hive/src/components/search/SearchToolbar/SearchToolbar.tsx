import {
  ArrowBackIosNew,
  ArrowForwardIos,
  ExpandMore,
  GridView,
  List,
} from "@mui/icons-material";
import {
  Chip,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { sortOptions } from "../../../data/catalog";

interface SearchToolbarProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  sort: string;
  onSortChange: (sort: string) => void;
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export function SearchToolbar({
  view,
  onViewChange,
  sort,
  onSortChange,
  page,
  pages,
  onPageChange,
}: SearchToolbarProps) {
  return (
    <Stack
      className="sort-controls"
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center" }}
        className="view-controls"
      >
        <IconButton
          className={view === "grid" ? "selected-view" : ""}
          onClick={() => onViewChange("grid")}
        >
          <GridView />
        </IconButton>
        <IconButton
          className={view === "list" ? "selected-view" : ""}
          onClick={() => onViewChange("list")}
        >
          <List />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Typography className="mobile-sort-label">Sort by:</Typography>
        <Select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="sort-select"
          variant="standard"
          disableUnderline
          IconComponent={ExpandMore}
        >
          {sortOptions.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <IconButton
          className="pagination-arrow"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ArrowBackIosNew />
        </IconButton>
        <Chip label={page} className="page-chip" />
        <Typography>of {pages}</Typography>
        <IconButton
          className="pagination-arrow"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
    </Stack>
  );
}
