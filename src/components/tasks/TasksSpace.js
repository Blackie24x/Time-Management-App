import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./tasks-space.module.scss";
import { Store } from "../../context/Context";
import Task from "./Task";
import CompletedTask from "./CompletedTask";

import AddTask from "./AddTask";

const TasksSpace = ({
  activeSpace,
  activeSpaceIndex,
  spaceIndex,
  spacesHeightRef,
}) => {
  const [activeTasksFilter, setActiveTasksFilter] = useState("ToDo");
  const ToDoRef = useRef(null);
  const completeRef = useRef(null);
  const tasksAreaRef = useRef(null);
  const tasksSpaceRef = useRef(null);
  const changeFilter = (action) => {
    setActiveTasksFilter(action);
  };
  const [taskIsAdding, setTaskIsAdding] = useState(false);

  const context = useContext(Store);
  const { tasksStore } = context;
  const createTasks = () => {
    if (context.tasksStore) {
      const spaceTasks = tasksStore.filter(
        (task) => task.space === activeSpace.name && !task.complete
      );
      return spaceTasks.map((task) => <Task task={task} />);
    }
  };
  const showCompleteTasks = () => {
    if (tasksStore) {
      const completeTasks = tasksStore.filter(
        (task) => task.complete && task.space === activeSpace.name
      );
      return completeTasks.length ? (
        completeTasks.map((task) => (
          <CompletedTask
            task={task}
            setActiveTasksFilter={setActiveTasksFilter}
          />
        ))
      ) : (
        <p className={styles.tasksSpace__anyComplete}>No complete tasks!</p>
      );
    }
  };
  useEffect(() => {
    tasksAreaRef.current.style.height = `${
      ToDoRef.current.clientHeight >= completeRef.current.clientHeight
        ? ToDoRef.current.clientHeight + 50
        : completeRef.current.clientHeight + 50
    }px`;
  }, [context]);
  const countLeftStyle = () => {
    switch (activeSpaceIndex) {
      case 0: {
        return 100 * spaceIndex;
      }
      case 1: {
        return 100 * spaceIndex - 100;
      }
      case 2: {
        return 100 * spaceIndex - 200;
      }
      default:
        return 0;
    }
  };
  useEffect(() => {
    spacesHeightRef.current = tasksSpaceRef.current.clientHeight;
  });
  return (
    <div
      ref={tasksSpaceRef}
      style={{ left: `${countLeftStyle()}%`, transition: "0.3s" }}
      className={styles.tasksSpace}
    >
      <div className={styles.tasksSpace__tasksFilterWrap}>
        <div className={styles.tasksSpace__tasksFilter}>
          <p
            style={{ color: activeTasksFilter === "ToDo" ? "#5f81ff" : "" }}
            className={styles.tasksSpace__pickToDo}
            onClick={() => changeFilter("ToDo")}
          >
            To Do
          </p>
          <p
            style={{ color: activeTasksFilter === "Complete" ? "#5f81ff" : "" }}
            className={styles.tasksSpace__pickDone}
            onClick={() => changeFilter("Complete")}
          >
            Complete
          </p>
          <div
            style={{ left: activeTasksFilter === "Complete" ? "50%" : "0" }}
            className={styles.tasksSpace__highlight}
          ></div>
        </div>
      </div>
      <div className={styles.tasksSpace__tasksArea} ref={tasksAreaRef}>
        <div
          style={{ left: activeTasksFilter === "ToDo" ? "0%" : "-100%" }}
          className={styles.tasksSpace__ToDo}
          ref={ToDoRef}
        >
          {createTasks()}
          {taskIsAdding ? (
            <AddTask space={activeSpace} setTaskIsAdding={setTaskIsAdding} />
          ) : (
            <div className={styles.tasksSpace__addTask}>
              <p className="extra-light" onClick={() => setTaskIsAdding(true)}>
                <i className="fa-solid fa-plus"></i> Add Task
              </p>
            </div>
          )}
        </div>
        <div
          style={{ left: activeTasksFilter === "Complete" ? "0%" : "100%" }}
          className={styles.tasksSpace__complete}
          ref={completeRef}
        >
          {showCompleteTasks()}
        </div>
      </div>
    </div>
  );
};

export default TasksSpace;
