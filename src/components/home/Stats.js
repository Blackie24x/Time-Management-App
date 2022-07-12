import React, { useContext } from "react";
import { Store } from "../../context/Context";
import styles from "./stats.module.scss";
const Stats = () => {
  const { doneTasks, totalFocus } = useContext(Store);
  const focusTime = `${totalFocus / 60}h ${totalFocus % 60}m`;
  return (
    <section className={styles.stats}>
      <div className={styles.stats__wrapper}>
        <div className={styles.stats__pointArea}>
          <div className={styles.stats__point}>
            {" "}
            <p className={styles.stats__total}>{doneTasks}</p>
            <p className={styles.stats__label}>Done Tasks</p>
          </div>
        </div>
        <div className={styles.stats__pointArea}>
          <div className={styles.stats__point}>
            {" "}
            <p className={styles.stats__total}>{focusTime}</p>
            <p className={styles.stats__label}>Total Focus</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
