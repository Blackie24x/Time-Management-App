import React, { useContext, useEffect, useRef } from "react";
import { Store } from "../../context/Context";
import styles from "./tasks-mobile.module.scss";
import uuid from "react-uuid";

import AddSpace from "./AddSpace";
import TasksSpace from "./TasksSpace";
import SpaceDelete from "./SpaceDelete";
const TasksMobile = () => {
  const context = useContext(Store);
  let spacesHeight = 0;
  let spacesHeightRef = useRef(spacesHeight);
  const switchRef = useRef(null);
  const {
    activeSpace,
    setActiveSpace,
    spaces,
    setSpaces,
    setAddSpaceIsActive,
    activeSpaceIndex,

    deletedSpace,
  } = context;
  useEffect(() => {
    switchRef.current.style.height = `${spacesHeightRef.current}px`;
  }, [spacesHeightRef.current]);
  const renderSpaces = () => {
    const actualSpaces = spaces.map((space, i) => {
      return deletedSpace !== null && deletedSpace === activeSpace ? (
        <SpaceDelete />
      ) : (
        <TasksSpace
          key={uuid()}
          spacesHeightRef={spacesHeightRef}
          spaceIndex={i}
          activeSpaceIndex={activeSpaceIndex}
          activeSpace={space}
        />
      );
      // return (
      //   <TasksSpace
      //     key={uuid()}
      //     spacesHeightRef={spacesHeightRef}
      //     spaceIndex={i}
      //     activeSpaceIndex={activeSpaceIndex}
      //     activeSpace={space}
      //   />
      // );
    });
    if (spaces.length < 3) {
      actualSpaces.push(<AddSpace key={uuid()} spaceIndex={spaces.length} />);
    }
    return actualSpaces;
  };

  return (
    <div className={styles.tasksMobile__switchWrap} ref={switchRef}>
      {spaces.length ? (
        renderSpaces()
      ) : (
        <AddSpace
          key={uuid()}
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
  );
};

export default TasksMobile;
