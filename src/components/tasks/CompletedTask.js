import React, { useContext, useRef } from "react";
import { deleteTask, restoreTask } from "../../context/actions/TasksActions";
import { Store } from "../../context/Context";
import styles from "./tasks-space.module.scss";

const CompletedTask = ({ task }) => {
  const { tasksDispatch } = useContext(Store);
  const taskRef = useRef(null);
  return (
    <div className={styles.tasksSpace__completeTask} ref={taskRef}>
      <div className={styles.tasksSpace__doneIcon}>
        <i className="fa-solid fa-check"></i>
      </div>
      <div className={styles.tasksSpace__completeName}>{task.name}</div>
      <div className={styles.tasksSpace__options}>
        <div
          className={styles.tasksSpace__restore}
          onClick={() => {
            taskRef.current.classList.add("restore-task");
            setTimeout(() => {
              tasksDispatch(restoreTask(task.id));
              taskRef.current.classList.remove("restore-task");
            }, 500);
          }}
        >
          <i className="fa-solid fa-rotate-left"></i>
        </div>
        <div
          className={styles.tasksSpace__delete}
          onClick={() => {
            taskRef.current.classList.add("delete-task");
            setTimeout(() => {
              tasksDispatch(deleteTask(task.id));
              taskRef.current.classList.remove("deletee-task");
            }, 500);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
