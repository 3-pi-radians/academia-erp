import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { createAppTheme, type PaletteMode } from "./index";

interface ThemeModeProviderProps {
  children: ReactNode;
  singleTheme?: boolean;
}

export interface ThemeModeCtx {
  mode: PaletteMode;
  toggle: () => void;
  setMode: (m: PaletteMode) => void;
  isSingleTheme: boolean;
}

const ThemeModeContext = createContext<ThemeModeCtx | null>(null);

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
}

const STORAGE_KEY = "app-theme-mode";

export default function ThemeModeProvider({ children, singleTheme = false }: ThemeModeProviderProps) {
  const [mode, setModeState] = useState<PaletteMode>("light");

  useEffect(() => {
    if (singleTheme) {
      // Clear any saved theme preference when in single theme mode
      localStorage.removeItem(STORAGE_KEY);
    } else {
      // Load saved theme preference if not in single theme mode
      const saved = localStorage.getItem(STORAGE_KEY) as PaletteMode | null;
      if (saved === "light" || saved === "dark") {
        setModeState(saved);
      }
    }
  }, [singleTheme]);

  const setMode = useCallback((m: PaletteMode) => {
    if (!singleTheme) {
      setModeState(m);
      localStorage.setItem(STORAGE_KEY, m);
    }
  }, [singleTheme]);

  const toggle = useCallback(() => {
    if (!singleTheme) {
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    }
  }, [singleTheme, setMode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const value = useMemo(() => ({
    mode,
    toggle,
    setMode,
    isSingleTheme: singleTheme
  }), [mode, toggle, setMode, singleTheme]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
