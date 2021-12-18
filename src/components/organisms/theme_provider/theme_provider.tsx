import React from "react";
import { Themes } from "../../../common/hooks/useTheme";

export let ThemeContext: React.Context<Themes>;

interface ThemeProviderProps {
  theme: Themes;
  children: React.ReactNode;
}

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  ThemeContext = React.createContext(theme);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
