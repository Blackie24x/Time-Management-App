import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./tasks-space.module.scss";
import { Store } from "../../context/Context";
import { completeTask } from "../../context/actions/TasksActions";
import AddTask from "./AddTask";
const TasksSpace = ({ activeSpace, activeSpaceIndex, spaceIndex }) => {
  const [activeTasksFilter, setActiveTasksFilter] = useState("ToDo");
  const [isAdding, setIsAdding] = useState(false);
  const ToDoRef = useRef(null);
  const completeRef = useRef(null);
  const tasksAreaRef = useRef(null);
  const changeFilter = (action) => {
    setActiveTasksFilter(action);
  };
  const context = useContext(Store);
  const createTasks = () => {
    if (context.tasksStore) {
      const { tasksStore, tasksDispatch } = context;
      const spaceTasks = tasksStore.filter(
        (task) => task.space === activeSpace.name && !task.complete
      );
      return spaceTasks.map((task) => {
        return (
          <div className={styles.tasksSpace__task}>
            <div
              className={styles.tasksSpace__doneCheck}
              onClick={() => {
                tasksDispatch(completeTask(task.id));
              }}
            >
              <i className="fa-solid fa-check"></i>
            </div>
            <p className={styles.tasksSpace__taskName}>{task.name}</p>
            <div className={styles.tasksSpace__options}>
              <div
                style={{ color: task.priority ? "#5f81ff" : "" }}
                className={styles.tasksSpace__iconWrap}
              >
                <i className="fa-solid fa-flag"></i>
              </div>
              <div className={styles.tasksSpace__delete}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  const showCompleteTasks = () => {
    if (context.tasksStore) {
      const completeTasks = context.tasksStore.filter(
        (task) => task.complete && task.space === activeSpace.name
      );
      return completeTasks.length ? (
        completeTasks.map((task) => {
          return (
            <div className={styles.tasksSpace__completeTask}>
              <div className={styles.tasksSpace__doneIcon}>
                <i className="fa-solid fa-check"></i>
              </div>
              <div className={styles.tasksSpace__completeName}>{task.name}</div>
              <div className={styles.tasksSpace__options}>
                <div className={styles.tasksSpace__restore}>
                  <i className="fa-solid fa-rotate-left"></i>
                </div>
                <div className={styles.tasksSpace__delete}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className={styles.tasksSpace__anyComplete}>No complete tasks!</p>
      );
    }
  };
  useEffect(() => {
    tasksAreaRef.current.style.height = `${
      ToDoRef.current.clientHeight >= completeRef.current.clientHeight
        ? ToDoRef.current.clientHeight + 100
        : completeRef.current.clientHeight + 100
    }px`;
    console.log(tasksAreaRef.current.style.height);
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
  return (
    <div style={{ left: `${countLeftStyle()}%` }} className={styles.tasksSpace}>
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
          {isAdding ? (
            <AddTask space={activeSpace} setIsAdding={setIsAdding} />
          ) : (
            <div className={styles.tasksSpace__addTask}>
              <p className="extra-light" onClick={() => setIsAdding(true)}>
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
