import React, { useRef } from "react";
import styles from "./form.module.scss";
import AuthButton from "./AuthButton";
const SignUpForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div className={styles.form}>
      <h4>Sign Up</h4>
      <form>
        <div className={styles.form__inputsWrap}>
          <div className={styles.form__inputArea}>
            <label>Name</label>
            <input type="text" ref={nameRef} />
          </div>
          <div className={styles.form__inputArea}>
            <label>Email</label>
            <input type="text" ref={emailRef} />
          </div>
          <div className={styles.form__inputArea}>
            <label>Password</label>
            <input type="password" ref={passwordRef} />
          </div>
        </div>
        <div className={styles.form__btnsWrap}>
          <AuthButton
            type="sign up"
            isSubmit={true}
            nameRef={nameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
          />
          <AuthButton type="log in" isSubmit={false} />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
