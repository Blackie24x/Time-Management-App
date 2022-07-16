import React, { useContext, useRef } from "react";
import {
  completeTask,
  deleteTask,
  prioritizeTask,
} from "../../context/actions/TasksActions";
import axios from "axios";
import { Store } from "../../context/Context";
import styles from "./tasks-space.module.scss";
const Task = ({ task }) => {
  const { space, name, theme, complete, priority, id } = task;
  const { tasksDispatch, userId, setDoneTasks, doneTasks, totalFocus } =
    useContext(Store);
  const taskRef = useRef(null);
  const completeBtnRef = useRef(null);
  const onTaskDelete = () => {
    taskRef.current.classList.add("delete-task");
    axios.delete(process.env.REACT_APP_BACKEND_URL + "/tasks", {
      data: { userId, taskId: task.id },
    });

    setTimeout(() => {
      taskRef.current.classList.remove("delete-task");
      tasksDispatch(deleteTask(task.id));
    }, 500);
  };
  const onPrioritizeTask = () => {
    const res = axios.patch(process.env.REACT_APP_BACKEND_URL + "/tasks", {
      space,
      name,
      theme,
      complete,
      priority: priority ? 0 : 1,
      id,
    });
    tasksDispatch(prioritizeTask(task));
  };
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
    completeBtnRef.current.style.background = `var(--secondary-color)`;

    axios.patch(process.env.REACT_APP_BACKEND_URL + "/tasks", {
      space,
      name,
      theme,
      complete: !complete,
      priority,
      id,
    });
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
    <div className={styles.tasksSpace__task} ref={taskRef}>
      <div
        className={styles.tasksSpace__doneCheck}
        ref={completeBtnRef}
        onClick={onCompleteTask}
      >
        <i className="fa-solid fa-check"></i>
      </div>
      <p className={styles.tasksSpace__taskName}>{task.name}</p>
      <div className={styles.tasksSpace__options}>
        <div
          style={{ color: task.priority ? "#5f81ff" : "" }}
          className={styles.tasksSpace__iconWrap}
          onClick={() => {
            onPrioritizeTask();
          }}
        >
          <i className="fa-solid fa-flag"></i>
        </div>
        <div className={styles.tasksSpace__delete} onClick={onTaskDelete}>
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
