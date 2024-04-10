import { createContext } from "react";
import { ThemeContextType } from "../../types/theme";

export const ThemeModeContext = createContext<ThemeContextType | undefined>(
  undefined
);
