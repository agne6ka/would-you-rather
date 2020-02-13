import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import "core-js/features/object/entries";
// import "react-app-polyfill/stable";
// import "react-app-polyfill/ie11";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import middleware from "./middleware";
import "./index.css";
// import "normalize.css";

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
