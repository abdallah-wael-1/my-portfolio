import React, { useState, useMemo, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import App from "./App";
import { LanguageProvider, useLang } from "./context/LanguageContext.jsx";
import createAppTheme from "./utils/theme.js";

function ThemedApp() {
  const [mode, setMode] = useState("dark");
  const { isRtl } = useLang();

  const theme = useMemo(() => createAppTheme(mode, isRtl), [mode, isRtl]);

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = isRtl ? "ar" : "en";
  }, [isRtl]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--section-primary",
      theme.palette.primary.main
    );

    document.documentElement.style.setProperty(
      "--section-text",
      theme.palette.text.primary
    );

    document.documentElement.style.setProperty(
      "--section-bg",
      theme.palette.background.paper
    );
  }, [theme]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App currentMode={mode} toggleMode={toggleMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <ThemedApp />
  </LanguageProvider>
);