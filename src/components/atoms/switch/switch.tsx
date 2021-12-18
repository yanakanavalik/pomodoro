import React from "react";
import { Themes } from "../../../common/hooks/useTheme";
import styles from "./switch.scss";
import classNames from "classnames/bind";

interface SwitchProps {
  switchTheme: () => void;
  theme: Themes;
}

export const Switch = ({ switchTheme, theme }: SwitchProps) => {
  console.log(theme);
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
