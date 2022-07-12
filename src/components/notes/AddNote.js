import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./notes.module.scss";
import { Store } from "../../context/Context";
const AddNote = () => {
  const { setNoteIsCreated, activeNoteMode, setActiveNoteMode } =
    useContext(Store);
  return (
    <div className={styles.notes__noteWrap}>
      <div
        className={styles.notes__noteArea}
        onClick={() => {
          setNoteIsCreated(true);
          setActiveNoteMode("creating");
        }}
      >
        <div className={styles.notes__iconWrap}>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </div>
        <p className={styles.notes__label}>Add Note</p>
      </div>
    </div>
  );
};

export default AddNote;
