import { useContext } from "react";
import { ThemeModeContext } from "../contexts/context/ThemeModeContext";

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);

  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }

  const { themeMode, setThemeMode } = context;

  const toggleDarkTheme = () => {
    setThemeMode({ darkMode: false });
  };
  const toggleLightTheme = () => {
    setThemeMode({ darkMode: true });
  };

  const theme = () => {
    return themeMode.darkMode;
  };

  return {
    theme,
    toggleDarkTheme,
    toggleLightTheme,
  };
};
