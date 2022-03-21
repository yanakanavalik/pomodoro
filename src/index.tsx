import "../manifest.json";
import "../src/service-workers/base";
import "../src/service-workers/service-worker";
import { App } from "./app";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));
