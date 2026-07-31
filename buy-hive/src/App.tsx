import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { SearchPage } from "./pages/SearchPage";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/buy/search" element={<SearchPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
