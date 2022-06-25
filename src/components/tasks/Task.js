import React, { useContext, useRef } from "react";
import {
  completeTask,
  deleteTask,
  prioritizeTask,
} from "../../context/actions/TasksActions";
import { Store } from "../../context/Context";
import styles from "./tasks-space.module.scss";
const Task = ({ task }) => {
  const { tasksDispatch } = useContext(Store);
  const taskRef = useRef(null);
  return (
    <div className={styles.tasksSpace__task} ref={taskRef}>
      <div
        className={styles.tasksSpace__doneCheck}
        onClick={() => {
          taskRef.current.classList.add("complete-task");
          setTimeout(() => {
            tasksDispatch(completeTask(task.id));
            taskRef.current.classList.remove("complete-task");
          }, 500);
        }}
      >
        <i className="fa-solid fa-check"></i>
      </div>
      <p className={styles.tasksSpace__taskName}>{task.name}</p>
      <div className={styles.tasksSpace__options}>
        <div
          style={{ color: task.priority ? "#5f81ff" : "" }}
          className={styles.tasksSpace__iconWrap}
          onClick={() => {
            tasksDispatch(prioritizeTask(task));
          }}
        >
          <i className="fa-solid fa-flag"></i>
        </div>
        <div
          className={styles.tasksSpace__delete}
          onClick={() => {
            taskRef.current.classList.add("delete-task");
            setTimeout(() => {
              tasksDispatch(deleteTask(task.id));
              taskRef.current.classList.remove("delete-task");
            }, 500);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div
        style={{ background: task.theme }}
        className={styles.tasksSpace__taskTheme}
      ></div>
    </div>
  );
};

export default Task;
