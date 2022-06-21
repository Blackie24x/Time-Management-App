import React, { useState, useContext } from "react";
import { Store } from "../../context/Context";
import styles from "./tasks-desktop.module.scss";
import TasksSpaceDesktop from "./TasksSpaceDesktop";
import AddSpace from "./AddSpace";
import AddSpaceDesktop from "./AddSpaceDesktop";
const TasksDesktop = () => {
  const context = useContext(Store);
  console.log(context);
  const {
    activeSpace,
    setActiveSpace,
    spaces,
    setSpaces,
    addSpaceIsActive,
    setAddSpaceIsActive,
    activeSpaceIndex,
    taskIsAdding,
    setTaskIsAdding,
    setActiveSpaceIndex,
  } = context;
  const renderSpaces = () => {
    const actualSpaces = spaces.map((space, i) => {
      return (
        <TasksSpaceDesktop
          spaceIndex={i}
          activeSpaceIndex={activeSpaceIndex}
          taskIsAdding={taskIsAdding}
          activeSpace={space}
          setTaskIsAdding={setTaskIsAdding}
        />
      );
    });
    if (spaces.length < 3) {
      actualSpaces.push(
        <AddSpaceDesktop
          spaceIndex={spaces.length}
          activeSpaceIndex={activeSpaceIndex}
          addSpaceIsActive={addSpaceIsActive}
          setAddSpaceIsActive={setAddSpaceIsActive}
          setActiveSpace={setActiveSpace}
          spaces={spaces}
          setSpaces={setSpaces}
        />
      );
    }
    return actualSpaces;
  };

  return (
    <div className={styles.tasksDesktop}>
      <div className={styles.tasksDesktop__tasksSpacesWrap}>
        {spaces.length ? (
          renderSpaces()
        ) : (
          <AddSpaceDesktop
            spaceIndex={spaces.length}
            activeSpaceIndex={activeSpaceIndex}
            addSpaceIsActive={addSpaceIsActive}
            setAddSpaceIsActive={setAddSpaceIsActive}
            setActiveSpace={setActiveSpace}
            spaces={spaces}
            setSpaces={setSpaces}
          />
        )}

        {/* {addSpaceIsActive ? (
        <AddSpace
          setAddSpaceIsActive={setAddSpaceIsActive}
          setActiveSpace={setActiveSpace}
          spaces={spaces}
          setSpaces={setSpaces}
        />
      ) : (
        <TasksSpace activeSpace={activeSpace} />
      )} */}
      </div>
    </div>
  );
};

export default TasksDesktop;
