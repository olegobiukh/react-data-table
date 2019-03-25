import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Route component={App} />
  </BrowserRouter>,
  rootElement
);
