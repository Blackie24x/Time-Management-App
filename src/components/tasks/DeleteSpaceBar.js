import { useContext } from "react";
import { Store } from "../../context/Context";
import styles from "./tasks.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const DeleteSpaceBarMobile = () => {
  const { setOptions, options, activeSpace, setDeletedSpace, spaces } =
    useContext(Store);
  const onSpaceDelete = () => {
    setDeletedSpace(activeSpace);
  };
  return (
    <div
      style={{ color: options ? "white" : "gray" }}
      className={styles.tasks__tasksOptions}
      onClick={() => setOptions(!options)}
    >
      <FontAwesomeIcon icon="fa-solid fa-bars-staggered" />
      <div
        className={`${styles.tasks__deleteBar} ${
          options ? styles["tasks__deleteBar--active"] : ""
        }`}
      >
        <p onClick={() => onSpaceDelete()}> Delete Space</p>{" "}
        {/* <FontAwesomeIcon icon="fa-solid fa-chevron-right" /> */}
        <div onClick={() => {}}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </div>
  );
};

export const DeleteSpaceBarDesktop = () => {
  const { setOptions, options, setDeletedSpace, spaces } = useContext(Store);

  const renderDeleteBtns = () => {
    return spaces.map((space) => {
      return (
        <p
          style={{ color: space.theme }}
          onClick={() => {
            setDeletedSpace(space);
          }}
        >
          Delete {space.name}
        </p>
      );
    });
  };
  return (
    <div
      style={{ color: options ? "white" : "gray" }}
      className={styles.tasks__tasksOptions}
      onClick={() => setOptions(!options)}
    >
      <FontAwesomeIcon icon="fa-solid fa-bars-staggered" />
      <div
        className={`${styles.tasks__deleteBar} ${
          options ? styles["tasks__deleteBar--active"] : ""
        }`}
      >
        {renderDeleteBtns()}
        <div onClick={() => {}}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </div>
  );
};
