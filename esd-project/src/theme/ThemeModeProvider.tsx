import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { createAppTheme, type PaletteMode } from "./index";

interface ThemeModeCtx {
  mode: PaletteMode;
  toggle: () => void;
  setMode: (m: PaletteMode) => void;
}

const ThemeModeContext = createContext<ThemeModeCtx | null>(null);

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
}

const STORAGE_KEY = "app-theme-mode";

export default function ThemeModeProvider({ children }: { children: ReactNode }) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setModeState] = useState<PaletteMode>(prefersDark ? "dark" : "light");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as PaletteMode | null);
    if (saved === "light" || saved === "dark") {
      setModeState(saved);
    } else {
      setModeState(prefersDark ? "dark" : "light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMode = useCallback((m: PaletteMode) => {
    setModeState(m);
    localStorage.setItem(STORAGE_KEY, m);
  }, []);

  const toggle = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, [setMode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const value = useMemo(() => ({ mode, toggle, setMode }), [mode, toggle, setMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
