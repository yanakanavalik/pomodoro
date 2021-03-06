import { HomePage } from "./components/pages";
import { RecoilRoot } from "recoil";
import Helmet from "react-helmet";
import React from "react";

export const App = () => {
  return (
    <RecoilRoot>
      <React.Fragment>
        <Helmet>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={require("../assets/icons/apple-touch-icon.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={require("../assets/icons/favicon-32x32.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={require("../assets/icons/favicon-16x16.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={require("../assets/icons/android-chrome-192x192.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href={require("../assets/icons/android-chrome-512x512.png")}
          />{" "}
          <link
            rel="icon"
            type="image/png"
            sizes="150x150"
            href={require("../assets/icons/mstile-150x150.png")}
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href={require("../assets/icons/favicon.ico")}
          />
          <meta name="msapplication-TileColor" content="#9197AE" />
          <meta name="theme-color" content="#9197AE" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
        </Helmet>
        <HomePage />
      </React.Fragment>
    </RecoilRoot>
  );
};
