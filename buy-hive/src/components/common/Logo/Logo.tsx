import { Box } from "@mui/material";

export function Logo() {
  return (
    <Box
      component="a"
      href="https://thebuyhive.com"
      className="header-logo"
      aria-label="BuyHive home"
    >
      <Box component="img" src="/buyhive-logo.png" alt="buyhive — sourcing made easy" />
    </Box>
  );
}
