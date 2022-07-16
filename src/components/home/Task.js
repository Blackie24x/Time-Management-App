import React, { useContext, useRef } from "react";
import styles from "./task.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { completeTask } from "../../context/actions/TasksActions";
import { Store } from "../../context/Context";
import axios from "axios";
const Task = ({ task }) => {
  const { name, theme, space, complete, priority, id } = task;
  const { tasksDispatch, totalFocus, setDoneTasks, doneTasks } =
    useContext(Store);
  const taskRef = useRef();
  const completeBtnRef = useRef();
  const statsOnComplete = () => {
    const curTotalFocus = totalFocus;
    const curDoneTasks = doneTasks;
    axios.patch(process.env.REACT_APP_BACKEND_URL + "/users/stats", {
      doneTasks: curDoneTasks + 1,
      totalFocus: curTotalFocus,
    });
    setDoneTasks(doneTasks + 1);
  };
  const onCompleteTask = () => {
    axios.patch(process.env.REACT_APP_BACKEND_URL + "/tasks", {
      space,
      name,
      theme,
      complete: !complete,
      priority,
      id,
    });
    completeBtnRef.current.style.background = `var(--secondary-color)`;
    setTimeout(() => {
      taskRef.current.classList.add("complete-task");
    }, 200);
    setTimeout(() => {
      tasksDispatch(completeTask(task.id));
      taskRef.current.classList.remove("complete-task");
      statsOnComplete();
    }, 700);
  };
  return (
    <div className={styles.task} ref={taskRef}>
      <div className={styles.task__theme} style={{ background: theme }}></div>
      <div
        className={styles.task__doneCheck}
        ref={completeBtnRef}
        onClick={onCompleteTask}
      >
        <FontAwesomeIcon icon="fa-solid fa-check" />
      </div>
      <p className={styles.task__taskName}>{name}</p>
    </div>
  );
};

export default Task;
