import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../context/Context";
import styles from "./notes.module.scss";

const Notes = () => {
  const { notesStore, setActiveNoteMode, setNoteIsCreated, setEditedNote } =
    useContext(Store);
  return (
    <div className={styles.notes}>
      <h2 className={styles.notes__heading}>Notes</h2>
      <div className={styles.notes__notesWrap}>
        {" "}
        {notesStore.map((note) => (
          <div className={styles.notes__noteWrap}>
            <div
              className={styles.notes__noteArea}
              onClick={() => {
                setEditedNote(note);
                setActiveNoteMode("editing");
                setNoteIsCreated(true);
              }}
            >
              <Link to="/notes">{note.title}</Link>{" "}
              <div className={styles.notes__noteTheme}></div>
            </div>
          </div>
        ))}
        <AddNote />
      </div>
    </div>
  );
};

export default Notes;

const AddNote = () => {
  const { setActiveNoteMode, setNoteIsCreated } = useContext(Store);
  return (
    <div className={styles.notes__noteWrap}>
      <div
        className={styles.notes__noteArea}
        onClick={() => {
          setActiveNoteMode("creating");
          setNoteIsCreated(true);
        }}
      >
        <Link to="/notes">
          <div className={styles.notes__iconWrap}>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </div>
          <p className={styles.notes__label}>Add Note</p>
        </Link>{" "}
      </div>
    </div>
  );
};
