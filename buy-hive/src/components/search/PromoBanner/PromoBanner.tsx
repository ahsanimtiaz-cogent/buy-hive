import { Box, Typography } from "@mui/material";

export function PromoBanner() {
  return (
    <Box className="promo-banner">
      <Typography>
        Placing bulk orders on BuyHive is safe &amp; easy.
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>
        Click to learn how it works!
      </Typography>
    </Box>
  );
}
