import { atom } from "recoil";

export enum Themes {
  light = "light",
  dark = "dark",
}

export const themeState = atom({
  key: "ui-theme",
  default: Themes.light,
});
