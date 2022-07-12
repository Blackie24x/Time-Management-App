import React, { useContext, useRef } from "react";
import styles from "./task.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { completeTask } from "../../context/actions/TasksActions";
import { Store } from "../../context/Context";
import axios from "axios";
const Task = ({ task }) => {
  const { name, theme, space, complete, priority, id } = task;
  const { tasksDispatch } = useContext(Store);
  const taskRef = useRef();
  const onCompleteTask = () => {
    console.log(complete);
    taskRef.current.classList.add("complete-task");
    const res = axios.patch("http://localhost:5000/api/tasks", {
      space,
      name,
      theme,
      complete: !complete,
      priority,
      id,
    });
    setTimeout(() => {
      tasksDispatch(completeTask(task.id));
      taskRef.current.classList.remove("complete-task");
    }, 500);
  };
  return (
    <div className={styles.task} ref={taskRef}>
      <div className={styles.task__theme} style={{ background: theme }}></div>
      <div className={styles.task__doneCheck} onClick={onCompleteTask}>
        <FontAwesomeIcon icon="fa-solid fa-check" />
      </div>
      <p className={styles.task__taskName}>{name}</p>
    </div>
  );
};

export default Task;
