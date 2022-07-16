import React, { useContext } from "react";
import styles from "./auth.module.scss";
import image from "../../images/authTheme1.jpg";
import { Store } from "../../context/Context";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
const Auth = () => {
  const { authMode } = useContext(Store);
  const createForm = () => {
    if (authMode === "log in") {
      return <LogInForm />;
    } else if (authMode === "sign up") {
      return <SignUpForm />;
    }
  };
  return (
    <>
      <section className={styles.auth}>
        <div className={styles.auth__container}>
          <div className={styles.auth__imageSide}>
            <div className={styles.auth__wrapper}>
              <div className={styles.auth__imageWrap}>
                <img src={image} alt="" />
              </div>
              <div className={styles.auth__appDesc}>
                <h3>Time Management App</h3>
                <p className={styles.auth__desc}>
                  To Do List <span>&</span> Pomodoro Timer <span>&</span> Notes
                </p>
              </div>
            </div>
          </div>
          <div className={styles.auth__authSide}>{createForm()}</div>
        </div>
      </section>
    </>
  );
};

export default Auth;
