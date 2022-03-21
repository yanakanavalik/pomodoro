import React from "react";
import { useRecoilState } from "recoil";
import styles from "./header.scss";
import classNames from "classnames/bind";

import { Switch } from "../../atoms/switch/switch";
import { Themes, themeState } from "../../../state/atoms/theme_state";

export const Header = () => {
  const [theme, switchTheme] = useRecoilState(themeState);

  const changeTheme = () => {
    if (theme === Themes.dark) {
      switchTheme(Themes.light);
    } else {
      switchTheme(Themes.dark);
    }
  };

  const cn = {
    header: styles["header"],
    headerTitle: classNames({
      [styles["header__title"]]: true,
      [styles["header__title--theme-light"]]: theme === Themes.light,
      [styles["header__title--theme-dark"]]: theme === Themes.dark,
    }),
    headerLogo: classNames({
      [styles["header__logo"]]: true,
      [styles["header__logo--theme-light"]]: theme === Themes.light,
      [styles["header__logo--theme-dark"]]: theme === Themes.dark,
    }),
    logoBlock: styles["header__logoBlock"],
  };

  return (
    <header className={cn.header}>
      <div className={cn.logoBlock}>
        <img
          className={cn.headerLogo}
          src={require("./../../../../assets/icons/tomato-icon.png")}
          alt="Tomato icon"
        />
        <span className={cn.headerTitle}>Pomodoro</span>
      </div>
      <Switch switchTheme={changeTheme} theme={theme} />
    </header>
  );
};
