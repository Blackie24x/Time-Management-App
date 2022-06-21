import React, { useEffect, useState, useContext } from "react";
import styles from "./spaces.module.scss";
import { Store } from "../../context/Context";
const Spaces = () => {
  const context = useContext(Store);
  console.log(context);
  const {
    activeSpace,
    setActiveSpace,
    spaces,
    setSpaces,
    setAddSpaceIsActive,
    activeSpaceIndex,
    setActiveSpaceIndex,
  } = context;
  console.log(context);
  useEffect(() => {}, []);
  const createSpaces = () => {
    const elements = [];
    for (let i = 0; i < 3; i++) {
      if (spaces[i]) {
        const spaceIndex = spaces.indexOf(spaces[i]);
        const activeSpaceIndex = spaces.indexOf(activeSpace);
        const isActive = spaceIndex === activeSpaceIndex;
        elements.push(
          <Space
            isActive={isActive}
            space={spaces[i]}
            setActiveSpace={setActiveSpace}
            setAddSpaceIsActive={setAddSpaceIsActive}
          />
        );
      } else {
        elements.push(
          <AddSpace
            spaces={spaces}
            setSpaces={setSpaces}
            setActiveSpace={setActiveSpace}
            setAddSpaceIsActive={setAddSpaceIsActive}
            setActiveSpaceIndex={setActiveSpaceIndex}
          />
        );
        return elements;
      }
    }
    return elements;
  };
  useEffect(() => {
    if (activeSpace === null) {
      setActiveSpaceIndex(spaces.length);
    } else {
      const index = spaces.indexOf(activeSpace);
      setActiveSpaceIndex(index);
    }
  }, [activeSpace]);
  return (
    <div className={styles.spaces}>
      <div className={styles.spaces__container}>
        {createSpaces()}

        <div
          style={{
            backgroundColor: activeSpace ? `${activeSpace.theme}` : "#bebebe",
            left: activeSpace
              ? `${35 * activeSpaceIndex}%`
              : `${35 * spaces.length}%`,
          }}
          className={styles["spaces__spaces-border"]}
        ></div>
      </div>
    </div>
  );
};

const Space = ({ space, isActive, setActiveSpace, setAddSpaceIsActive }) => {
  return (
    <div
      className={styles.spaces__space}
      onClick={() => {
        setActiveSpace(space);
        setAddSpaceIsActive(false);
      }}
    >
      <p
        className={`${styles.spaces__spaceName}`}
        style={{ color: isActive ? space.theme : "" }}
      >
        {space.name}
      </p>
    </div>
  );
};
const AddSpace = ({ setAddSpaceIsActive, spaces, setActiveSpace }) => {
  return (
    <div
      className={`${styles["spaces__add-space"]}`}
      onClick={() => {
        setActiveSpace(null);
        setAddSpaceIsActive(true);
      }}
    >
      <p className={styles.spaces__addSpaceName}>
        <i className="fa-solid fa-plus"></i>Space
      </p>
    </div>
  );
};

export default Spaces;
