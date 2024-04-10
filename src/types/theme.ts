export type ThemeType = {
  darkMode: boolean;
};

export type ThemeContextType = {
  themeMode: ThemeType;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeType>>;
};
