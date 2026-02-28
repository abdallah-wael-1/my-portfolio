import { createTheme } from "@mui/material/styles";

export default function createAppTheme(mode = "dark", isRtl = false) {
  return createTheme({
    direction: isRtl ? "rtl" : "ltr",
    palette: {
      mode,
      primary: { main: "#1976d2" },
      secondary: { main: "#00bcd4" },
      info: { main: "#82b1ff" },
      background: {
        default: mode === "dark" ? "#071025" : "#f6fbff",
        paper: mode === "dark" ? "rgba(10,18,30,0.6)" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#e6f3ff" : "#0b2540",
        secondary: mode === "dark" ? "rgba(230,243,255,0.7)" : "rgba(11,37,64,0.7)",
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: isRtl
        ? "Cairo, 'Plus Jakarta Sans', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial"
        : "'Plus Jakarta Sans', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "saturate(120%) blur(6px)",
            backgroundColor: mode === "dark" ? "rgba(8,16,28,0.6)" : "rgba(255,255,255,0.6)",
            boxShadow: "0 8px 30px rgba(2,6,23,0.6)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 12,
            boxShadow: "0 8px 30px rgba(2,6,23,0.45)",
          },
        },
      },
    },
  });
}
