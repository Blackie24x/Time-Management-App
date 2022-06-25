import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./scss/style.scss";
import ReactDOM from "react-dom/client";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
