import { createTheme } from "@mui/material/styles";
import { COLORS } from "./colors";

export type PaletteMode = "light" | "dark";

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#7C3AED" : "#3B82F6",
        light: mode === "dark" ? "#A5B4FC" : "#E8F1FE",
        dark: mode === "dark" ? "#4F46E5" : "#2563EB",
        contrastText: "#ffffff",
      },
      secondary: {
        main: COLORS.SECONDARY,
        contrastText: "#ffffff",
      },
      text: {
        primary: mode === "light" ? "#1F2937" : "#F1F5F9",
        secondary: mode === "light" ? "#4B5563" : "#CBD5E1",
      },
      background: {
        default: mode === "light" ? "#F5F7FA" : "#0F172A",
        paper: mode === "light" ? "#FFFFFF" : "#1E293B",
      },
      divider: mode === "light" ? COLORS.ACCENT_LIGHT : "#334155",
      info: {
        main: COLORS.ACCENT_LIGHT,
      },
      success: {
        light: COLORS.ACCENT_SUCCESS_LIGHT,
        main: "#10B981",
        contrastText: "#ffffff",
      },
      warning: {
        main: "#F59E0B",
      },
      error: {
        main: "#EF4444",
      },
      action: {
        hover: mode === "dark" ? "#2C3447" : undefined,
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    typography: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      h1: { fontWeight: 700, fontSize: "2rem", lineHeight: 1.2 },
      h2: { fontWeight: 700, fontSize: "1.75rem", lineHeight: 1.25 },
      h3: { fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.3 },
      h4: { fontWeight: 600, fontSize: "1.25rem" },
      h5: { fontWeight: 600, fontSize: "1.125rem" },
      h6: { fontWeight: 600, fontSize: "1rem" },
      subtitle1: { fontWeight: 500 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: mode === "light" ? `1px solid ${COLORS.ACCENT_LIGHT}` : undefined,
          },
        },
      },
    },
  });
