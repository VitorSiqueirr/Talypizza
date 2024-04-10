import { ReactNode, useState } from "react";
import { ThemeModeContext } from "../context/ThemeModeContext";
import { ThemeType } from "../../types/theme";

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeType>({
    darkMode: false,
  });

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};
