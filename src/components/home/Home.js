import React, { useContext } from "react";
import { Store } from "../../context/Context";
import styles from "./home.module.scss";
import TasksSpace from "./TasksSpace";
import Stats from "./Stats";
const Home = () => {
  const { userName } = useContext(Store);
  return (
    <section className={styles.home}>
      <div className={styles.home__header}>
        <h1 className="header">Hi {userName}!</h1>
      </div>
      <div className={styles.home__tasksAndStatsWrap}>
        <TasksSpace />
        <Stats />
      </div>
    </section>
  );
};

export default Home;
