import React, { useContext } from "react";
import styles from "./pomo.module.scss";
import PomoTimer from "./PomoTimer";
import Media from "react-media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfigurePomo from "./ConfigurePomo";
import { Store } from "../../context/Context";
import { queries } from "@testing-library/react";
const Pomo = () => {
  const { pomoMode, setPomoMode, setRemainingTime, pomoTime, setDonePomos } =
    useContext(Store);
  const setHeading = () => {
    switch (pomoMode) {
      case "pomo":
        return "Focus";
      case "break":
        return "Break";
      case "done":
        return "Success";
      default:
        return "Pomo";
    }
  };
  const setColor = () => {
    switch (pomoMode) {
      case "pomo":
        return "#5f81ff";
      case "break":
        return "#2ecd6f";
      case "done":
        return "#2ecd6f";
      default:
        return "#444";
    }
  };
  return (
    <section className={styles.pomo}>
      <header className={styles.pomo__header}>
        <h1 style={{ color: setColor() }} className="header">
          {setHeading()}
        </h1>
      </header>
      <div className={styles.pomo__content}>
        <div className={styles.pomo__timerWrap}>
          <Media
            queries={{
              smallMobile: "(max-width: 767px)",
              bigMobile: "(min-width:768px) and (max-width:1199px)",
              desktop: "(min-width: 1200px) and (max-width:1919px)",
              bigDesktop: "(min-width: 1920px)",
            }}
          >
            {(matches) => {
              return (
                <>
                  {matches.smallMobile && <PomoTimer circleSize={125} />}
                  {matches.bigMobile && <PomoTimer circleSize={140} />}
                  {matches.desktop && <PomoTimer circleSize={170} />}
                  {matches.bigDesktop && <PomoTimer circleSize={200} />}
                </>
              );
            }}
          </Media>
        </div>
        <Media
          queries={{
            mobile: "(max-width:1199px)",
            desktop: "(min-width:1200px)",
          }}
        >
          {(matches) => {
            return (
              <>
                {matches.mobile && (
                  <>
                    {pomoMode === "configure" ? (
                      <ConfigurePomo />
                    ) : (
                      <div
                        onClick={() => {
                          setPomoMode("configure");
                          setRemainingTime(pomoTime);
                          setDonePomos(0);
                        }}
                        className={styles.pomo__openSettings}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-sliders" />
                      </div>
                    )}
                  </>
                )}
                {matches.desktop && (
                  <>
                    <div
                      onClick={() => {
                        setPomoMode("configure");
                        setRemainingTime(pomoTime);
                        setDonePomos(0);
                      }}
                      className={styles.pomo__openSettings}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-sliders" />
                    </div>
                    <ConfigurePomo />
                  </>
                )}
              </>
            );
          }}
        </Media>
      </div>
    </section>
  );
};

export default Pomo;
