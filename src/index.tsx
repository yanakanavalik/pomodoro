import React from "react";
import ReactDOM from "react-dom";
import { HomePage } from "./components/home_page";
import "../src/service-workers/base";
import "../src/service-workers/service-worker";
import "../manifest.json";

ReactDOM.render(<HomePage />, document.getElementById("root"));
//    <link rel="manifest" href="./manifest.json" />
