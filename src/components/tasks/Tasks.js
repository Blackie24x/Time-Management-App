import TasksMobile from "./TasksMobile";
import TasksDesktop from "./TasksDesktop";

import Media from "react-media";
import Spaces from "./Spaces";
import SpacesDesktop from "./SpacesDesktop";

import styles from "./tasks.module.scss";
const Tasks = () => {
  // const [spaces, setSpaces] = useState([]);
  // const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);

  // const [activeSpace, setActiveSpace] = useState(spaces ? spaces[0] : null);
  // const [addSpaceIsActive, setAddSpaceIsActive] = useState(
  //   spaces.length ? false : true
  // );
  return (
    <section className={styles.tasks}>
      <div className={styles.tasks__header}>
        <h1 className="header">Tasks</h1>
      </div>
      <Media
        queries={{
          mobile: "(max-width: 1199px)",
          desktop: "(min-width: 1200px)",
        }}
      >
        {(matches) => {
          return (
            <>
              {matches.mobile && (
                <div className={styles.tasks__content}>
                  <Spaces
                  // spaces={spaces}
                  // setSpaces={setSpaces}
                  // activeSpace={activeSpace}
                  // setActiveSpace={setActiveSpace}
                  // setAddSpaceIsActive={setAddSpaceIsActive}
                  // activeSpaceIndex={activeSpaceIndex}
                  // setActiveSpaceIndex={setActiveSpaceIndex}
                  />
                  <TasksMobile
                  // setAddSpaceIsActive={setAddSpaceIsActive}
                  // addSpaceIsActive={addSpaceIsActive}
                  // setActiveSpace={setActiveSpace}
                  // activeSpace={activeSpace}
                  // spaces={spaces}
                  // setSpaces={setSpaces}
                  // activeSpaceIndex={activeSpaceIndex}
                  // setActiveSpaceIndex={setActiveSpaceIndex}
                  />
                </div>
              )}
              {matches.desktop && (
                <div className={styles.tasks__content}>
                  <SpacesDesktop
                    screen={"desktop"}
                    // spaces={spaces}
                    // setSpaces={setSpaces}
                    // activeSpace={activeSpace}
                    // setActiveSpace={setActiveSpace}
                    // setAddSpaceIsActive={setAddSpaceIsActive}
                    // activeSpaceIndex={activeSpaceIndex}
                    // setActiveSpaceIndex={setActiveSpaceIndex}
                  />
                  <TasksDesktop
                  // setAddSpaceIsActive={setAddSpaceIsActive}
                  // addSpaceIsActive={addSpaceIsActive}
                  // setActiveSpace={setActiveSpace}
                  // activeSpace={activeSpace}
                  // spaces={spaces}
                  // setSpaces={setSpaces}
                  // activeSpaceIndex={activeSpaceIndex}
                  // setActiveSpaceIndex={setActiveSpaceIndex}
                  />
                </div>
              )}
            </>
          );
        }}
      </Media>
    </section>
  );
};

export default Tasks;
