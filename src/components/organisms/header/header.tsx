import React from "react";
import styles from "./header.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <img
        className={styles.header__logo}
        src={require("./../../../../assets/icons/tomato-icon.png")}
        alt="Tomato icon"
      />
      <span className={styles.header__title}>Pomodoro</span>
    </header>
  );
};
