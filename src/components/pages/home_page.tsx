import { Footer } from "../organisms/footer";
import { Header } from "../organisms/header";
import { Themes, themeState } from "../../state/atoms/theme_state";
import { TimerTasksBlock } from "../organisms/timer_tasks_block";
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./home_page.scss";

export const HomePage = () => {
  const [theme] = useRecoilState(themeState);
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
    <div className={pageContainerCn}>
      <Header />
      <TimerTasksBlock />
      <Footer />
    </div>
  );
};
