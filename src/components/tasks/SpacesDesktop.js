import React, { useEffect, useState, useContext } from "react";
import { Store } from "../../context/Context";
import styles from "./spaces.module.scss";
import uuid from "react-uuid";
const SpacesDesktop = () => {
  const context = useContext(Store);
  const {
    activeSpace,
    setActiveSpace,
    spaces,
    setSpaces,
    addSpaceIsActive,
    setAddSpaceIsActive,
    activeSpaceIndex,
    setActiveSpaceIndex,
  } = context;
  const createSpaces = () => {
    const elements = [];
    for (let i = 0; i < 3; i++) {
      if (spaces[i])
        elements.push(
          <Space
            key={uuid()}
            space={spaces[i]}
            setActiveSpace={setActiveSpace}
            setAddSpaceIsActive={setAddSpaceIsActive}
          />
        );
      else {
        elements.push(
          <AddSpace
            key={uuid()}
            spaces={spaces}
            setSpaces={setSpaces}
            setActiveSpace={setActiveSpace}
            addSpaceIsActive={addSpaceIsActive}
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
const AddSpace = ({
  setAddSpaceIsActive,
  addSpaceIsActive,
  spaces,
  setActiveSpace,
}) => {
  return (
    <div
      className={`${styles["spaces__add-space"]}`}
      onClick={() => {
        setActiveSpace(null);
        setAddSpaceIsActive(!addSpaceIsActive);
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
