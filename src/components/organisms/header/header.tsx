import React from "react";
import styles from "./header.scss";
import TomatoIcon from "../../../../assets/tomato-icon.svg";

export const Header = () => {
  return (
    <header className={styles.header}>
      <TomatoIcon className={styles.header__logo} />
      <span className={styles.header__title}>Pomodoro</span>
    </header>
  );
};
