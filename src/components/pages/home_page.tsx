import React, { useEffect } from "react";
import styles from "./home_page.scss";
import { Header } from "../organisms/header";
import { Footer } from "../organisms/footer";
import { TimerTasksBlock } from "../organisms/timer_tasks_block";
import { Themes, useTheme } from "../../common/hooks/useTheme";
import { ThemeProvider } from "../organisms/theme_provider/theme_provider";
import classNames from "classnames/bind";

export const HomePage = () => {
  const [theme, changeTheme] = useTheme();
  const bodyCn = classNames({
    [styles["body"]]: true,
    [styles["body--theme-light"]]: theme === Themes.light,
    [styles["body--theme-dark"]]: theme === Themes.dark,
  });

  const pageContainerCn = classNames({
    [styles["page-container"]]: true,
    [styles["page-container--theme-light"]]: theme === Themes.light,
    [styles["page-container--theme-dark"]]: theme === Themes.dark,
  });

  useEffect(() => {
    document.getElementsByTagName("body")[0].className = bodyCn;
  }, [theme]);

  return (
    <ThemeProvider theme={theme as Themes}>
      <div className={pageContainerCn}>
        <Header changeTheme={changeTheme} />
        <TimerTasksBlock />
        <Footer />
      </div>
    </ThemeProvider>
  );
};
