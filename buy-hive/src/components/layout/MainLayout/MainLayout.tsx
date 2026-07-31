import { Box, Container, Drawer, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState, type ReactNode } from "react";
import { Header } from "../Header";
import "../../../App.css";
import "../../../overrides.css";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Box className="app-page">
      <Container maxWidth={false} className="page-container">
        <Header onMenu={() => setMenuOpen(true)} />
        {children}
      </Container>
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box className="menu-drawer">
          <IconButton onClick={() => setMenuOpen(false)}>
            <Close />
          </IconButton>
          {["Expert Sourcing", "Contract Manufacturing", "Buy", "Financing", "About Us"].map(
            (item) => (
              <Typography key={item} className={item === "Buy" ? "active-nav" : ""}>
                {item}
              </Typography>
            ),
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
