import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../context/Context";
import Task from "./Task";
import styles from "./tasks-space.module.scss";
const TasksSpace = () => {
  const { tasksStore } = useContext(Store);
  const toDoTasks = tasksStore.filter((task) => task.complete === false);
  const renderTasks = () => {
    const sortedTasks = [...toDoTasks].sort((a, b) => {
      if (a.priority < b.priority) return 1;
      if (a.priority >= b.priority) return -1;
      return 1;
    });
    return sortedTasks.map((task, i) => {
      if (i > 4) return null;
      return <Task task={task} />;
    });
  };

  return (
    <>
      <section className={styles.tasks}>
        <h2 className={styles.tasks__heading}>Tasks</h2>
        {toDoTasks.length ? (
          <div className={styles.tasks__tasksSpace}>{renderTasks()}</div>
        ) : (
          <div className={styles.tasks__addPanel}>
            {" "}
            <p className={styles.tasks__alert}>Add Task!</p>
            <Link to="/tasks">
              <div>
                {" "}
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </div>
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default TasksSpace;
