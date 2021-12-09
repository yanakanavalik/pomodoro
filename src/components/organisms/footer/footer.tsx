import React from "react";
import styles from "./footer.scss";
import GitHubIcon from "../../../../assets/icons/github.svg";
import FacebookIcon from "../../../../assets/icons/facebook.svg";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.footer__text}>Follow us:</span>
      <a
        className={styles.footer__socialLink}
        href="https://github.com/yanakanavalik/pomodoro"
      >
        <GitHubIcon className={styles.footer__socialLinkIcon} />
      </a>
      <a
        className={styles.footer__socialLink}
        href="https://www.facebook.com/yana.kanavalik/"
      >
        <FacebookIcon className={styles.footer__socialLinkIcon} />
      </a>
    </footer>
  );
};
