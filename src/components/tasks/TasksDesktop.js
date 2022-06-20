import React, { useState } from "react";
import styles from "./tasks-desktop.module.scss";
import TasksSpaceDesktop from "./TasksSpaceDesktop";
import AddSpace from "./AddSpace";
import AddSpaceDesktop from "./AddSpaceDesktop";
const TasksDesktop = ({
  addSpaceIsActive,
  setAddSpaceIsActive,
  setActiveSpaceIndex,
  activeSpaceIndex,
  activeSpace,
  spaces,
  setSpaces,
  setActiveSpace,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const renderSpaces = () => {
    const actualSpaces = spaces.map((space, i) => {
      return (
        <TasksSpaceDesktop
          spaceIndex={i}
          activeSpaceIndex={activeSpaceIndex}
          activeSpace={space}
        />
      );
    });
    if (spaces.length < 3) {
      actualSpaces.push(
        <AddSpaceDesktop
          spaceIndex={spaces.length}
          activeSpaceIndex={activeSpaceIndex}
          setAddSpaceIsActive={setAddSpaceIsActive}
          setActiveSpace={setActiveSpace}
          spaces={spaces}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
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
            setAddSpaceIsActive={setAddSpaceIsActive}
            setActiveSpace={setActiveSpace}
            spaces={spaces}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
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
