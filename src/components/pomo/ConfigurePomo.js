import React, { useContext } from "react";
import styles from "./configure-pomo.module.scss";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Store } from "../../context/Context";
const ConfigurePomo = () => {
  const {
    pomoTime,
    setPomoTime,
    breakTime,
    setBreakTime,
    setRemainingTime,
    setRemainingBreak,
    pomoMode,
    setPomoMode,
    setPomos,
    setDonePomos,
    pomos,
    setIsPaused,
  } = useContext(Store);
  return (
    <section
      className={`${styles.pomoConfig} ${
        pomoMode === "configure" && styles["pomoConfig--active"]
      }`}
    >
      <div className={styles.pomoConfig__panel}>
        <div className={styles.pomoConfig__header}>
          {" "}
          <h2 className={styles.pomoConfig__settingsHeader}>Pomo Settings</h2>
          <div
            className={styles.pomoConfig__hideSettings}
            onClick={() => setPomoMode("pomo")}
          >
            <FontAwesomeIcon icon="fa-solid fa-minus" />
          </div>
        </div>

        <div className={styles.pomoConfig__settings}>
          <div className={styles.pomoConfig__pomoTime}>
            <p>{`PomoTime : ${pomoTime / 60}`}</p>
            <ReactSlider
              className={styles.pomoConfig__slider}
              thumbClassName={styles.pomoConfig__thumb}
              trackClassName={styles.pomoConfig__track}
              onChange={(newValue) => {
                setPomoTime(newValue * 60);
                setRemainingTime(newValue * 60);
                setRemainingBreak(breakTime);
                setDonePomos(0);
                setIsPaused(true);
                setPomoMode("configure");
              }}
              min={1}
              max={120}
              value={pomoTime / 60}
            />
          </div>
          <div className={styles.pomoConfig__pomoBreak}>
            <p>{`PomoBreak : ${breakTime / 60}`}</p>

            <ReactSlider
              className={styles.pomoConfig__slider}
              thumbClassName={styles.pomoConfig__thumb}
              trackClassName={styles.pomoConfig__track}
              onChange={(newValue) => {
                setBreakTime(newValue * 60);
                setRemainingBreak(newValue * 60);
                setRemainingTime(pomoTime);
                setDonePomos(0);
                setIsPaused(true);
                setPomoMode("configure");
              }}
              value={breakTime / 60}
              min={1}
              max={60}
            />
          </div>
          <div className={styles.pomoConfig__pomosCount}>
            <p>{`Pomos : ${pomos}`}</p>

            <ReactSlider
              className={styles.pomoConfig__slider}
              thumbClassName={styles.pomoConfig__thumb}
              trackClassName={styles.pomoConfig__track}
              onChange={(newValue) => {
                setPomos(newValue);
                setRemainingBreak(breakTime);
                setRemainingTime(pomoTime);
                setDonePomos(0);
                setIsPaused(true);
                setPomoMode("configure");
              }}
              value={pomos}
              min={1}
              max={6}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfigurePomo;
