import React, { useContext, useRef } from "react";
import { deleteTask, restoreTask } from "../../context/actions/TasksActions";
import { Store } from "../../context/Context";
import styles from "./tasks-space.module.scss";
import axios from "axios";

const CompletedTask = ({ task, setActiveTasksFilter }) => {
  const { tasksDispatch, userId } = useContext(Store);
  const taskRef = useRef(null);
  const { space, name, theme, complete, priority, id } = task;
  const onTaskDelete = () => {
    console.log(taskRef.current.classList);
    taskRef.current.classList.add("delete-task");
    axios.delete("http://localhost:5000/api/tasks", {
      data: { userId, taskId: task.id },
    });
    tasksDispatch(deleteTask(task.id));

    setTimeout(() => {
      tasksDispatch(deleteTask(task.id));
      taskRef.current.classList.remove("delete-task");
    }, 500);
    console.log(task);
  };
  const onTaskRestore = () => {
    taskRef.current.classList.add("complete-task");
    const res = axios.patch("http://localhost:5000/api/tasks", {
      space,
      name,
      theme,
      complete: !complete,
      priority,
      id,
    });
    taskRef.current.classList.add("restore-task");
    setTimeout(() => {
      tasksDispatch(restoreTask(task.id));
      taskRef.current.classList.remove("restore-task");
    }, 500);
  };
  return (
    <div className={styles.tasksSpace__completeTask} ref={taskRef}>
      <div className={styles.tasksSpace__doneIcon}>
        <i className="fa-solid fa-check"></i>
      </div>
      <div className={styles.tasksSpace__completeName}>{task.name}</div>
      <div className={styles.tasksSpace__options}>
        <div className={styles.tasksSpace__restore} onClick={onTaskRestore}>
          <i className="fa-solid fa-rotate-left"></i>
        </div>
        <div className={styles.tasksSpace__delete} onClick={onTaskDelete}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
