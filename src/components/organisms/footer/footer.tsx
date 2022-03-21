import React from "react";
import classNames from "classnames/bind";
import styles from "./footer.scss";
import GitHubIcon from "../../../../assets/icons/github.svg";
import FacebookIcon from "../../../../assets/icons/facebook.svg";
import { useRecoilState } from "recoil";
import { Themes, themeState } from "../../../state/atoms/theme_state";

export const Footer = () => {
  const [theme] = useRecoilState(themeState);

  const cn = {
    footer: styles["footer"],
    footerText: classNames({
      [styles["footer__text"]]: true,
      [styles["footer__text--theme-light"]]: theme === Themes.light,
      [styles["footer__text--theme-dark"]]: theme === Themes.dark,
    }),
    footerSocialLink: classNames({
      [styles["footer__socialLink"]]: true,
      [styles["footer__socialLink--theme-light"]]: theme === Themes.light,
      [styles["footer__socialLink--theme-dark"]]: theme === Themes.dark,
    }),
    footerSocialLinkIcon: classNames({
      [styles["footer__socialLinkIcon"]]: true,
      [styles["footer__socialLinkIcon--theme-light"]]: theme === Themes.light,
      [styles["footer__socialLinkIcon--theme-dark"]]: theme === Themes.dark,
    }),
  };

  return (
    <footer className={cn.footer}>
      <span className={cn.footerText}>Follow us:</span>
      <a
        className={cn.footerSocialLink}
        href="https://github.com/yanakanavalik/pomodoro"
      >
        <GitHubIcon className={cn.footerSocialLinkIcon} />
      </a>
      <a
        className={cn.footerSocialLink}
        href="https://www.facebook.com/yana.kanavalik/"
      >
        <FacebookIcon className={cn.footerSocialLinkIcon} />
      </a>
    </footer>
  );
};
