import React, { useContext, useEffect, useState } from "react";
import styles from "./note-creator.module.scss";
import Palette from "./Palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Store } from "../../context/Context";
import {
  createNote,
  updateNote,
  deleteNote,
} from "../../context/actions/NotesActions";
import uuid from "react-uuid";
import Media from "react-media";
import axios from "axios";

const NoteCreator = () => {
  const {
    setNoteIsCreated,
    activeNoteMode,
    notesDispatch,
    editedNote,
    userId,
    setAlertText,
    setIsAlert,
  } = useContext(Store);

  const [title, setTitle] = useState(
    activeNoteMode === "editing" ? editedNote.title : ""
  );
  const [fontColor, setFontColor] = useState(
    activeNoteMode === "editing" ? editedNote.fontColor : "#444"
  );
  const [fontSize, setFontSize] = useState(
    activeNoteMode === "editing" ? editedNote.fontSize : 16
  );
  const [content, setContent] = useState(
    activeNoteMode === "editing" ? editedNote.content : ""
  );
  const [align, setAlign] = useState(
    activeNoteMode === "editing" ? editedNote.align : "left"
  );
  const [isBold, setIsBold] = useState(
    activeNoteMode === "editing" ? editedNote.isBold : false
  );
  const [isItalic, setIsItalic] = useState(
    activeNoteMode === "editing" ? editedNote.isItalic : false
  );
  const [palette, setPalette] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const showAlert = (text) => {
    setAlertText(text);
    setTimeout(() => {
      setIsAlert(true);
    }, 200);

    setTimeout(() => {
      setIsAlert(false);
    }, 3500);
  };

  const onCreateNote = () => {
    if (title && content) {
      const createdId = uuid();
      const note = {
        title: title,
        fontColor,
        fontSize,
        content: content,
        align,
        isBold,
        isItalic,
        id: createdId,
      };
      axios.post(process.env.REACT_APP_BACKEND_URL + "/notes", {
        title,
        fontColor,
        fontSize,
        content,
        align,
        isBold,
        isItalic,
        id: createdId,
        userId,
      });
      notesDispatch(createNote(note));
      setNoteIsCreated(false);
    } else {
      showAlert("You can`t create empty note");
    }
  };
  const onUpdateNote = () => {
    if (title && content) {
      const note = {
        title,
        fontColor,
        fontSize,
        content,
        align,
        isBold,
        isItalic,
        id: editedNote.id,
      };
      axios.patch(process.env.REACT_APP_BACKEND_URL + "/notes", {
        title,
        fontColor,
        fontSize,
        content,
        align,
        isBold,
        isItalic,
        id: editedNote.id,
      });
      notesDispatch(updateNote(note));
      setNoteIsCreated(false);
    } else showAlert("You can't create empty note");
  };
  const onDeleteNote = () => {
    axios.delete(process.env.REACT_APP_BACKEND_URL + "/notes", {
      data: { id: editedNote.id, userId },
    });
    notesDispatch(deleteNote(editedNote.id));
    setNoteIsCreated(false);
  };
  useEffect(() => {
    if (fontSize < 0) setFontSize(12);
    if (fontSize > 200) setFontSize(200);
  }, [fontSize]);
  return (
    <section className={styles.creator}>
      <div className={styles.creator__titleWrap}>
        <input
          type="text"
          className={styles.creator__title}
          placeholder="Note Title"
          spellcheck="false"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          className={styles.creator__exitIconWrap}
          onClick={() => setNoteIsCreated(false)}
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
      <div className={styles.creator__contentWrap}>
        <div className={styles.creator__options}>
          <div className={styles.creator__optionWrap}>
            <p>Font Size: </p>{" "}
            <input
              type="number"
              className={styles.creator__fontSize}
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>
          <div className={styles.creator__optionWrap}>
            <p>Color: </p>{" "}
            <div
              onClick={() => setPalette(!palette)}
              className={styles.creator__color}
              style={{ background: fontColor }}
            ></div>
          </div>
          <Media queries={{ desktop: "(min-width: 992px)" }}>
            {(matches) => {
              return (
                matches.desktop && (
                  <>
                    <div className={styles.creator__alignWrap}>
                      <div
                        className={`${styles.creator__align} ${
                          align === "left"
                            ? styles["creator__align--active"]
                            : ""
                        }`}
                        onClick={() => setAlign("left")}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-align-left" />
                      </div>
                      <div
                        className={`${styles.creator__align} ${
                          align === "center"
                            ? styles["creator__align--active"]
                            : ""
                        }`}
                        onClick={() => setAlign("center")}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-align-center" />
                      </div>{" "}
                      <div
                        className={`${styles.creator__align} ${
                          align === "right"
                            ? styles["creator__align--active"]
                            : ""
                        }`}
                        onClick={() => setAlign("right")}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-align-right" />
                      </div>
                    </div>
                    <div className={styles.creator__fontPropsWrap}>
                      <div
                        className={`${styles.creator__props}
                        ${isBold && `${styles["creator__props--active"]}`}`}
                        onClick={() => setIsBold(!isBold)}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-bold" />
                      </div>
                      <div
                        className={`${styles.creator__props}
                          ${isItalic && `${styles["creator__props--active"]}`}`}
                        onClick={() => setIsItalic(!isItalic)}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-italic" />
                      </div>
                    </div>
                  </>
                )
              );
            }}
          </Media>
          <Palette
            palette={palette}
            setPalette={setPalette}
            fontColor={fontColor}
            setFontColor={setFontColor}
          />
        </div>
        <textarea
          style={{
            width: "100%",
            height: "100%",
            fontSize: `${fontSize}px`,
            color: fontColor,
            textAlign: align,
            fontStyle: isItalic ? "italic" : "normal",
            fontWeight: isBold ? "500" : "400",
          }}
          onClick={() => setPalette(false)}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellcheck="false"
        ></textarea>
        <div className={styles.creator__actionBtns}>
          {deleteAlert ? (
            <div className={styles.creator__deleteAlert}>
              <p>Are you sure?</p>
              <button onClick={onDeleteNote}>Yes</button>
              <button onClick={() => setDeleteAlert(false)}>No</button>
            </div>
          ) : activeNoteMode === "creating" ? (
            <button
              className={styles.creator__actionBtn}
              onClick={onCreateNote}
            >
              Create Note
            </button>
          ) : (
            <>
              <button
                className={styles.creator__actionBtn}
                onClick={onUpdateNote}
              >
                Update Note
              </button>
              <button
                className={`${styles.creator__actionBtn} ${styles.creator__deleteBtn}`}
                onClick={() => setDeleteAlert(true)}
              >
                Delete Note
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoteCreator;
