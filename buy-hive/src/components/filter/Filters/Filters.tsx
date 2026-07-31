import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import type { FilterState } from "../../../types/catalog";
import { FilterSection } from "../FilterSection";

interface FiltersProps {
  values: FilterState;
  onChange: (values: FilterState) => void;
  certificates: string[];
  locations: string[];
  priceRange: [number, number];
}

export function Filters({
  values,
  onChange,
  certificates,
  locations,
  priceRange,
}: FiltersProps) {
  return (
    <Paper className="filters-panel" elevation={0}>
      <Typography className="filter-title">Price</Typography>
      <Box className="price-inputs">
        <TextField
          value={values.price[0]}
          onChange={(event) =>
            onChange({
              ...values,
              price: [Number(event.target.value), values.price[1]],
            })
          }
          variant="standard"
          slotProps={{
            input: { disableUnderline: true, endAdornment: <span>$</span> },
          }}
        />
        <span>—</span>
        <TextField
          value={values.price[1]}
          onChange={(event) =>
            onChange({
              ...values,
              price: [values.price[0], Number(event.target.value)],
            })
          }
          variant="standard"
          slotProps={{
            input: { disableUnderline: true, endAdornment: <span>$</span> },
          }}
        />
      </Box>
      <Slider
        value={values.price}
        min={priceRange[0]}
        max={priceRange[1]}
        onChange={(_, value) =>
          onChange({ ...values, price: value as [number, number] })
        }
        className="price-slider"
      />
      <Box className="filter-section moq-section">
        <Typography className="filter-title">MOQ</Typography>
        <TextField
          value={values.moq}
          onChange={(event) => onChange({ ...values, moq: event.target.value })}
          placeholder="Less than"
          type="number"
          variant="standard"
          fullWidth
          className="filter-search moq-input"
          slotProps={{ input: { disableUnderline: true } }}
        />
      </Box>
      <FilterSection
        title="Product Certification"
        items={certificates}
        selected={values.productCertificates}
        onChange={(productCertificates) =>
          onChange({ ...values, productCertificates })
        }
        searchable
      />
      <FilterSection
        title="Supplier Location"
        items={locations}
        selected={values.locations}
        onChange={(locations) => onChange({ ...values, locations })}
      />
      <Box className="filter-section stock-section">
        <Typography className="filter-title">Stock Availability</Typography>
        <FormControlLabel
          className="check-row"
          control={
            <Checkbox
              checked={values.stock}
              onChange={(event) =>
                onChange({ ...values, stock: event.target.checked })
              }
            />
          }
          label="Stock in USA"
        />
      </Box>
    </Paper>
  );
}
