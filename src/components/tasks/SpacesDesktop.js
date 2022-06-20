import React, { useEffect, useState } from "react";
import styles from "./spaces.module.scss";
const SpacesDesktop = ({
  activeSpace,
  setActiveSpace,
  spaces,
  setSpaces,
  setAddSpaceIsActive,
  activeSpaceIndex,
  setActiveSpaceIndex,
  screen,
}) => {
  const createSpaces = () => {
    const elements = [];
    for (let i = 0; i < 3; i++) {
      if (spaces[i])
        elements.push(
          <Space
            space={spaces[i]}
            setActiveSpace={setActiveSpace}
            setAddSpaceIsActive={setAddSpaceIsActive}
          />
        );
      else {
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

        {/* <div
          style={{
            backgroundColor: activeSpace ? `${activeSpace.theme}` : "#bebebe",
            left: activeSpace
              ? `${35 * activeSpaceIndex}%`
              : `${35 * spaces.length}%`,
          }}
          className={styles["spaces__spaces-border"]}
        ></div> */}
      </div>
    </div>
  );
};

const Space = ({ space, setActiveSpace, setAddSpaceIsActive }) => {
  return (
    <div
      className={styles.spaces__space}
      onClick={() => {
        setActiveSpace(space);
        setAddSpaceIsActive(false);
      }}
    >
      <p className={styles.spaces__spaceName} style={{ color: space.theme }}>
        {space.name}
      </p>
      <div
        style={{ background: space.theme }}
        className={styles.spaces__theme}
      ></div>
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
      <div className={styles.spaces__theme}></div>
    </div>
  );
};

export default SpacesDesktop;
