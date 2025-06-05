import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import NotesPage from "./components/NotesPage";
import NewNotePage from "./components/NewNotePage";
import Navigation from "./components/Navigation";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Navigation />
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/new-note" element={<NewNotePage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
