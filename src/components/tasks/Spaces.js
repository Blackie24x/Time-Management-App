import React, { useEffect, useContext } from "react";
import styles from "./spaces.module.scss";
import { Store } from "../../context/Context";
import uuid from "react-uuid";

const Spaces = () => {
  const context = useContext(Store);
  const {
    activeSpace,
    setActiveSpace,
    spaces,
    setSpaces,
    setAddSpaceIsActive,
    activeSpaceIndex,
    setActiveSpaceIndex,
    setDeletedSpace,
    deletedSpace,
  } = context;

  const createSpaces = () => {
    const elements = [];
    for (let i = 0; i < 3; i++) {
      if (spaces[i]) {
        const spaceIndex = spaces.indexOf(spaces[i]);
        const activeSpaceIndex = spaces.indexOf(activeSpace);
        const isActive = spaceIndex === activeSpaceIndex;
        elements.push(
          <Space
            key={uuid()}
            isActive={isActive}
            space={spaces[i]}
            setActiveSpace={setActiveSpace}
            setAddSpaceIsActive={setAddSpaceIsActive}
            setDeletedSpace={setDeletedSpace}
            deletedSpace={deletedSpace}
          />
        );
      } else {
        elements.push(
          <AddSpace
            key={uuid()}
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

const Space = ({
  space,
  isActive,
  setActiveSpace,
  setAddSpaceIsActive,
  setDeletedSpace,
  deletedSpace,
}) => {
  return (
    <div
      className={styles.spaces__space}
      onClick={() => {
        setActiveSpace(space);
        setAddSpaceIsActive(false);
        if (deletedSpace !== null) setDeletedSpace(null);
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
