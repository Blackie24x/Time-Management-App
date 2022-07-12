import React, { useContext } from "react";
import { Store } from "../../context/Context";
import styles from "./alert.module.scss";
const Alert = () => {
  const { alertText, isAlert } = useContext(Store);
  return (
    <div
      className={`${styles.alert} ${isAlert ? styles["alert--active"] : ""}`}
    >
      {alertText}
    </div>
  );
};

export default Alert;
