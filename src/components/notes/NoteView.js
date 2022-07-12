import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./notes.module.scss";
import { Store } from "../../context/Context";
const NoteView = ({ note }) => {
  const { setActiveNoteMode, setNoteIsCreated, setEditedNote } =
    useContext(Store);
  return (
    <div className={styles.notes__noteWrap}>
      <div
        className={styles.notes__noteArea}
        onClick={() => {
          setEditedNote(note);
          setActiveNoteMode("editing");
          setNoteIsCreated(true);
        }}
      >
        <h3 className={styles.notes__noteTitle}>{note.title}</h3>
        <div className={styles.notes__noteTheme}></div>
      </div>
    </div>
  );
};

export default NoteView;
