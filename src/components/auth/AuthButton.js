import React, { useContext, useState } from "react";
import { Store } from "../../context/Context";
import styles from "./auth.module.scss";
import axios from "axios";
import { getTasks } from "../../context/actions/TasksActions";
import { getNotes } from "../../context/actions/NotesActions";
import Spinner from "./Spinner";
const AuthButton = ({ type, isSubmit, nameRef, emailRef, passwordRef }) => {
  const {
    authMode,
    setAuthMode,
    setUserName,
    setUserId,
    setSpaces,
    setIsLoggedIn,
    setAlertText,
    setIsAlert,
    setDoneTasks,
    setTotalFocus,
    tasksDispatch,
    notesDispatch,
  } = useContext(Store);

  const [loading, setLoading] = useState(false);

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
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "users/signup",
          {
            name,
            email,
            password,
          }
        );
        showAlert("Signing Up succedd!");
        setLoading(false);
        setAuthMode("log in");
      } catch (err) {
        showAlert("Something went wrong!");
        setLoading(false);
      }
    } else {
      showAlert("Form can't be empty!");
      setLoading(false);
    }
  };
  const renderSpaces = async (userId) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/spaces",
        {
          params: { userId },
        }
      );
      const spaces = res.data.spaces.map((space) => {
        return { theme: space.theme, name: space.name };
      });
      setSpaces(spaces);
    } catch (err) {
      console.log(err);
    }
  };
  const renderTasks = async (userId) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/tasks",
        {
          params: { userId },
        }
      );
      const tasks = res.data.tasks.map(
        ({ name, priority, space, theme, complete, id }) => {
          return { name, priority, space, theme, complete, id };
        }
      );
      tasksDispatch(getTasks(tasks));
    } catch (err) {
      console.log(err);
    }
  };

  const renderNotes = async (userId) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/notes",
        {
          params: { userId },
        }
      );
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
    } catch (err) {
      console.log(err);
    }
  };

  const renderUserData = async (userId) => {
    await renderSpaces(userId);
    await renderTasks(userId);
    await renderNotes(userId);
    resetValues();
    setIsLoggedIn(true);
  };
  const logIn = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          {
            email: email,
            password: password,
          }
        );
        setUserName(res.data.name);
        setUserId(res.data.userId);
        renderUserData(res.data.userId);
        setDoneTasks(res.data.doneTasks);
        setTotalFocus(res.data.totalFocus);
        setLoading(false);
      } catch (err) {
        showAlert("You typed incorrect credentials!");
        setLoading(false);
        return new Error("Logging in failed");
      }
    } else {
      showAlert(`Form can't be empty`);
      setLoading(false);
    }
  };
  const resetValues = () => {
    if (authMode === "sign up") {
      nameRef.current.value = "";
    }
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
              setLoading(true);
              logIn();
            } else setAuthMode("log in");
          }}
        >
          {loading && authMode === "log in" ? <Spinner /> : "Log In"}
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
              setLoading(true);
              createAccount();
              resetValues();
            } else setAuthMode("sign up");
          }}
        >
          {loading && authMode === "sign up" ? <Spinner /> : "Sign Up"}
        </button>
      );
    }
  };

  return createBtn();
};

export default AuthButton;
