import React, { useContext } from "react";
import styles from "./notes.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddNote from "./AddNote";
import NoteView from "./NoteView";
import NoteCreator from "./NoteCreator";
import { Store } from "../../context/Context";
const Notes = () => {
  const { noteIsCreated, setNoteIsCreated, notesStore } = useContext(Store);
  return (
    <section className={styles.notes}>
      <div className={styles.notes__header}>
        <h1 className="header">Notes</h1>
      </div>
      {noteIsCreated ? (
        <NoteCreator note={null} />
      ) : (
        <div className={styles.notes__notesWrap}>
          <div className={styles.notes__notesArea}>
            {/* <NoteView /> */}
            {notesStore.map((note) => (
              <NoteView note={note} />
            ))}
            <AddNote />
            {/* <AddNote />
            <AddNote />
            <AddNote />
            <AddNote /> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Notes;
