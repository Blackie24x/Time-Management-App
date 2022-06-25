import { v4 as uuid } from "uuid";
import React, { useContext, useState } from "react";
import styles from "./add-task.module.scss";
import { createTask } from "../../context/actions/TasksActions";
import { Store } from "../../context/Context";
const AddTask = ({ space, setTaskIsAdding }) => {
  const context = useContext(Store);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState(0);
  const { tasksDispatch } = context;

  const addTask = () => {
    if (context && taskName) {
      const task = {
        name: taskName,
        priority,
        space: space.name,
        theme: space.theme,
        complete: false,
        id: uuid(),
      };
      tasksDispatch(createTask(task));
      setTaskIsAdding(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };
  return (
    <div className={styles.addTask}>
      <input
        className={styles.addTask__writeName}
        placeholder="Task Name"
        type="text"
        onKeyPress={(e) => handleKeyPress(e)}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <div className={styles.addTask__options}>
        <div
          style={{ color: priority ? "#5f81ff" : "" }}
          onClick={() => setPriority(priority ? 0 : 1)}
          className={styles.addTask__iconWrap}
        >
          <i className="fa-solid fa-flag"></i>
        </div>
        {/* <div className={styles.addTask__iconWrap}></div>
        <div className={styles.addTask__iconWrap}></div> */}
        <div className={styles.addTask__add} onClick={addTask}>
          <i className="fa-solid fa-check"></i>
        </div>
        <div
          onClick={() => {
            setTaskIsAdding(false);
          }}
          className={styles.addTask__exit}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
