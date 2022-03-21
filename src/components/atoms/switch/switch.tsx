import React from "react";
import styles from "./switch.scss";
import classNames from "classnames/bind";
import { Themes } from "../../../state/atoms/theme_state";

interface SwitchProps {
  switchTheme: () => void;
  theme: Themes;
}

export const Switch = ({ switchTheme, theme }: SwitchProps) => {
  const cn = {
    switchContainer: classNames({
      [styles["switch-container"]]: true,
      [styles["switch-container--theme-light"]]: theme === Themes.light,
      [styles["switch-container--theme-dark"]]: theme === Themes.dark,
    }),
    switchToggle: classNames({
      [styles["switch-container__toggle"]]: true,
      [styles["switch-container__toggle--theme-light"]]: theme === Themes.light,
      [styles["switch-container__toggle--theme-dark"]]: theme === Themes.dark,
      [styles["switch-container__toggle--checked"]]: theme === Themes.dark,
    }),
  };

  return (
    <div className={cn.switchContainer} onClick={switchTheme}>
      <div className={cn.switchToggle} />
    </div>
  );
};
