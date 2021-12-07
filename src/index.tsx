import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import "../src/service-workers/base";
import "../src/service-workers/service-worker";
import "../manifest.json";

ReactDOM.render(<App />, document.getElementById("root"));
