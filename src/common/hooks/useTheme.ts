import { useEffect, useState } from "react";

export enum Themes {
  light = "light",
  dark = "dark",
}

export const useTheme = (): [Themes, () => void] => {
  const [theme, setTheme] = useState(Themes.light);

  const setMode = (mode: Themes) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = (): void => {
    theme === Themes.light ? setMode(Themes.dark) : setMode(Themes.light);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Themes;
    localTheme && setTheme(localTheme);
  }, []);

  return [theme, themeToggler];
};
