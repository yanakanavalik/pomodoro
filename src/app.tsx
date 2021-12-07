import React from "react";
import Helmet from "react-helmet";
import { HomePage } from "./components/pages";

export const App = () => {
  return (
    <React.Fragment>
      <Helmet>
        <link
          rel="apple-touch-icon"
          href={require("../assets/apple-touch-icon.png")}
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={require("../assets/favicon.ico")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={require("../assets/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={require("../assets/favicon-16x16.png")}
        />
        <link type="image/png" href={require("../assets/mstile-150x150.png")} />
        <link
          type="image/png"
          href={require("../assets/android-chrome-512x512.png")}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="black-translucent" />
      </Helmet>
      <HomePage />
    </React.Fragment>
  );
};
