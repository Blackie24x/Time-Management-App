import React, { useContext } from "react";
import { Store } from "../../context/Context";
import styles from "./auth.module.scss";
import axios from "axios";
import { getTasks } from "../../context/actions/TasksActions";
import { getNotes } from "../../context/actions/NotesActions";
const AuthButton = ({ type, isSubmit, nameRef, emailRef, passwordRef }) => {
  const {
    authMode,
    setAuthMode,
    userName,
    setUserName,
    setUserId,
    setSpaces,
    isLoggedIn,
    setIsLoggedIn,
    setAlertText,
    setIsAlert,
    setDoneTasks,
    setTotalFocus,
    tasksDispatch,
    notesDispatch,
  } = useContext(Store);
  const showAlert = (text) => {
    setAlertText(text);
    setTimeout(() => {
      setIsAlert(true);
    }, 200);

    setTimeout(() => {
      setIsAlert(false);
    }, 3500);
  };
  const createAccount = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (name && email && password) {
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        name,
        email,
        password,
      });
      showAlert("Signing Up succedd!");
      setAuthMode("log in");
    } else {
      showAlert("Form can't be empty!");
    }
  };
  const renderSpaces = async (userId) => {
    try {
      const res = await axios.get("http://localhost:5000/api/spaces", {
        params: { userId },
      });
      console.log(res.data);
      const spaces = res.data.spaces.map((space) => {
        return { theme: space.theme, name: space.name };
      });
      setSpaces(spaces);
      console.log("spaces rendered");
    } catch (err) {
      console.log(err);
    }
  };
  const renderTasks = async (userId) => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        params: { userId },
      });
      console.log(res.data);
      const tasks = res.data.tasks.map(
        ({ name, priority, space, theme, complete, id }) => {
          return { name, priority, space, theme, complete, id };
        }
      );
      console.log(tasks);
      tasksDispatch(getTasks(tasks));
      console.log("tasks rendered");
    } catch (err) {
      console.log(err);
    }
  };

  const renderNotes = async (userId) => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        params: { userId },
      });
      const notes = res.data.notes.map(
        ({
          title,
          content,
          fontSize,
          fontColor,
          align,
          isBold,
          isItalic,
          id,
        }) => {
          return {
            title,
            content,
            fontSize,
            fontColor,
            align,
            isBold,
            isItalic,
            id,
          };
        }
      );
      notesDispatch(getNotes(notes));
      console.log("notes rendered");
    } catch (err) {
      console.log(err);
    }
  };

  const renderUserData = async (userId) => {
    await renderSpaces(userId);
    await renderTasks(userId);
    await renderNotes(userId);
    setIsLoggedIn(true);
    console.log("rendered");
  };
  const logIn = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email);
    if (email && password) {
      try {
        const res = await axios.post("http://localhost:5000/api/users/login", {
          email: email,
          password: password,
        });
        console.log(res);
        setUserName(res.data.name);
        setUserId(res.data.userId);
        renderUserData(res.data.userId);
        setDoneTasks(res.data.doneTasks);
        setTotalFocus(res.data.totalFocus);
      } catch (err) {
        showAlert("You typed ncorrect credentials!");
        return new Error("Logging in failed");
      }
    } else showAlert(`Form can't be empty`);
  };
  const resetValues = () => {
    // console.log(nameRef);
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const createBtn = () => {
    if (type === "log in") {
      return (
        <button
          className={`${styles.auth__btn} ${
            isSubmit ? styles.auth__isSubmit : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (authMode === "log in") {
              logIn();
              resetValues();
            } else setAuthMode("log in");
          }}
        >
          Log In
        </button>
      );
    } else if (type === "sign up") {
      return (
        <button
          className={`${styles.auth__btn} ${
            isSubmit ? styles.auth__isSubmit : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (authMode === "sign up") {
              createAccount();
              resetValues();
            } else setAuthMode("sign up");
          }}
        >
          Sign Up
        </button>
      );
    }
  };

  return createBtn();
};

export default AuthButton;
