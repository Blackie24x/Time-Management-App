import React, { useContext } from "react";
import { Store } from "../../context/Context";
import styles from "./space-delete.module.scss";
import axios from "axios";
const SpaceDelete = () => {
  const {
    setDeletedSpace,
    setSpaces,
    spaces,
    deletedSpace,
    activeSpace,
    userId,
    setActiveSpace,
  } = useContext(Store);
  const deleteSpace = () => {
    const newSpaces = spaces.filter(
      (space) => deletedSpace.name !== space.name
    );
    console.log(spaces, newSpaces);
    const delSpaceName = deletedSpace.name;
    setDeletedSpace(null);
    axios.delete("http://localhost:5000/api/spaces", {
      data: { name: delSpaceName, userId },
    });
    console.log(spaces[0]);
    setSpaces(newSpaces);
    console.log(spaces[0]);
    if (newSpaces.length) setActiveSpace(newSpaces[0]);
    else setActiveSpace(null);
  };
  return (
    <section className={styles.deleteAlert}>
      <p className={styles.deleteAlert__heading}>
        Are you sure to delete this space?
      </p>
      <div className={styles.deleteAlert__btnsWrap}>
        <button onClick={deleteSpace}>Yes</button>
        <button onClick={() => setDeletedSpace(null)}>No</button>
      </div>
    </section>
  );
};

export default SpaceDelete;
