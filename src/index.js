import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "core-js/features/object/entries";
import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import "./index.css";
import "normalize.css";

ReactDOM.render(<App />, document.getElementById("root"));
