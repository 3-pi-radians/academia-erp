export const COLORS = {
  PRIMARY: "#999AC6", // header/app primary
  SECONDARY: "#23CE6B",
  TEXT_PRIMARY: "#272D2D",
  ACCENT_LIGHT: "#F6F8FF",
  ACCENT_SUCCESS_LIGHT: "#23CE6B",
  NEUTRAL_DARK: "#50514F",
} as const;

export type ColorKeys = keyof typeof COLORS;
