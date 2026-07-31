import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ExpandMore, Menu, ShoppingCartOutlined } from "@mui/icons-material";
import { Logo } from "../../common/Logo";

interface HeaderProps {
  onMenu: () => void;
}

export function Header({ onMenu }: HeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      component="header"
      className="app-header"
    >
      <Toolbar disableGutters className="header-toolbar">
        <Logo />
        <Stack
          className="desktop-nav"
          component="nav"
          direction="row"
          spacing={0}
          sx={{ alignItems: "center" }}
        >
          <Typography component="a" href="https://thebuyhive.com">
            Expert Sourcing
          </Typography>
          <Typography
            component="a"
            href="https://thebuyhive.com/contract-manufacturing"
          >
            Contract Manufacturing
          </Typography>
          <Typography component="a" href="/buy/" className="active-nav">
            Buy
          </Typography>
          <Typography component="a" href="https://thebuyhive.com/finance-page">
            Financing
          </Typography>
          <Typography component="a" href="#about-us">
            About Us{" "}
            <ExpandMore
              sx={{ fontSize: 20, verticalAlign: "middle", color: "#9b9b9b" }}
            />
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ ml: "auto", alignItems: "center" }}
        >
          <Button className="register-button">Register</Button>
          <Button
            className="signin-button"
            href="https://thebuyhive.com/buy/img/user.fe2d5af3.svg"
            startIcon={
              <img
                src="https://thebuyhive.com/buy/img/user.fe2d5af3.svg"
                alt="User"
                width={20}
                height={20}
              />
            }
          >
            Sign In
          </Button>
          <Typography className="mobile-signin">Sign In</Typography>
          <IconButton className="cart-button" href="/buy/cart">
            <ShoppingCartOutlined />
            <Box className="cart-badge">0</Box>
          </IconButton>
          <IconButton className="mobile-menu" onClick={onMenu}>
            <Menu />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
