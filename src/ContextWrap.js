import React from "react";
import Context from "./context/Context";
import App from "./App";
const ContextWrap = () => {
  return (
    <Context>
      <App />
    </Context>
  );
};

export default ContextWrap;
