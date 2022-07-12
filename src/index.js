import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./scss/style.scss";
import ReactDOM from "react-dom/client";
import ContextWrap from "./ContextWrap";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ContextWrap />
  </Router>
);
