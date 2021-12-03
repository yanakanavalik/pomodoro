import React from "react";
import Helmet from "react-helmet";
import "../../assets/apple-touch-icon.png";
import "../../assets/favicon-32x32.png";
import "../../assets/favicon-16x16.png";

export const HomePage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <link
          rel="apple-touch-icon"
          href={require("../../assets/apple-touch-icon.png")}
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={require("../../assets/favicon.ico")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={require("../../assets/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={require("../../assets/favicon-16x16.png")}
        />
      </Helmet>
      <div>Home</div>
    </React.Fragment>
  );
};
