import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Store } from "../../context/Context";
import styles from "./timer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PomoTimer = ({ circleSize }) => {
  const circlePI = circleSize * 2 * 3.14;
  const {
    pomoMode,
    setPomoMode,
    pomoTime,
    setPomoTime,
    breakTime,
    setBreakTime,
    isPaused,
    setIsPaused,
    remainingTime,
    setRemainingTime,
    remainingBreak,
    setRemainingBreak,
    pomos,
    setPomos,
    donePomos,
    setDonePomos,
  } = useContext(Store);
  const pomoModeRef = useRef(pomoMode);
  const pomoTimeRef = useRef(pomoTime);
  const insidePomoRef = useRef(null);
  let pomoMinutes = Math.floor(remainingTime / 60);
  let pomoSeconds = remainingTime % 60;
  let breakMinutes = Math.floor(remainingBreak / 60);
  let breakSeconds = remainingBreak % 60;
  let remainingTimeRef = remainingTime;
  let remainingBreakRef = remainingBreak;
  console.log(remainingBreakRef);
  const createPomos = useCallback(() => {
    const pomosElements = [];
    for (let i = 0; i < pomos; i++) {
      pomosElements.push(
        <FontAwesomeIcon
          style={{ color: donePomos > i ? "#ff7373" : "" }}
          icon="fa-solid fa-stopwatch"
        />
      );
    }
    return pomosElements;
  }, [pomos, donePomos]);
  const setTime = () => {
    console.log(pomoMode);
    return pomoMode === "break"
      ? `${breakMinutes} : ${
          breakSeconds < 10 ? `0${breakSeconds}` : breakSeconds
        }`
      : `${pomoMinutes} : ${
          pomoSeconds < 10 ? `0${pomoSeconds}` : pomoSeconds
        }`;
  };
  const tick = () => {
    console.log(pomoMode);
    if (pomoMode === "pomo") {
      console.log(remainingTimeRef);
      if (remainingTimeRef > 0) {
        remainingTimeRef--;
        setRemainingTime((remainingTime) => remainingTime - 1);
      } else {
        setRemainingTime(0);
        // setIsPaused(true);
        setPomoMode("break");
        setRemainingBreak(breakTime);
        setDonePomos((donePomos) => donePomos + 1);
      }
    } else if (pomoMode === "break") {
      console.log(remainingBreakRef);
      if (remainingBreakRef > 0) {
        remainingBreakRef--;
        setRemainingBreak((remainingBreak) => remainingBreak - 1);
      } else {
        console.log("gigachad");
        setRemainingBreak(0);
        // setIsPaused(true);
        setPomoMode("pomo");
        setRemainingTime(pomoTime);
      }
    }
  };
  const timeInterval = () => {
    if (!isPaused) tick();
  };

  useEffect(() => {
    let interval;
    if (donePomos < pomos) interval = setInterval(timeInterval, 1000);
    else {
      console.log(pomoMode !== "done");
      if (pomoMode !== "configure") setPomoMode("done");
      setRemainingTime(pomoTime);
      setRemainingBreak(breakTime);
      // insidePomoRef.current.classList.remove("active");
      // setTimeout(() => {
      //   insidePomoRef.current.classList.add("active");
      // }, 500);
    }

    return () => clearInterval(interval);
  }, [isPaused, pomoMode, donePomos]);
  return (
    <section className={styles.timer}>
      {/* <h2 className="header">Focus</h2> */}
      <div className={styles.timer__timerBox}>
        <div className={styles.timer__pomos}>{createPomos()}</div>
        <div className={styles.timer__percent}>
          <svg>
            <circle
              style={{
                strokeDashoffset: 0,
                strokeDasharray: circlePI,
              }}
              cx={`${circleSize}`}
              cy={`${circleSize}`}
              r={`${circleSize}`}
            ></circle>
            <circle
              style={{
                stroke: pomoMode === "break" ? "#2ecd6f" : "",
                strokeDashoffset:
                  circlePI -
                  (circlePI *
                    (100 *
                      (pomoMode === "break"
                        ? remainingBreak / breakTime
                        : remainingTime / pomoTime))) /
                    100,
                strokeDasharray: circlePI,
              }}
              cx={`${circleSize}`}
              cy={`${circleSize}`}
              r={`${circleSize}`}
            ></circle>
          </svg>
          <p ref={insidePomoRef} className={styles.timer__time}>
            {pomos === donePomos ? (
              <FontAwesomeIcon icon="fa-solid fa-check"></FontAwesomeIcon>
            ) : (
              setTime()
            )}
          </p>
        </div>
        <div className={styles.timer__handleTimerWrap}>
          <button
            className={styles.timer__handleBtn}
            onClick={() => {
              console.log("btn");
              if (pomoMode === "configure") setPomoMode("pomo");
              setIsPaused(!isPaused);
              console.log(isPaused);

              // tick();
            }}
          >
            <FontAwesomeIcon
              icon={isPaused ? "fa-solid fa-play" : "fa-solid fa-pause"}
            ></FontAwesomeIcon>
          </button>
          <button
            onClick={() => {
              setRemainingTime(pomoTime);
              setIsPaused(true);
              setPomoMode("pomo");
            }}
            className={styles.timer__handleBtn}
          >
            <FontAwesomeIcon icon="fa-solid fa-stop"></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PomoTimer;
