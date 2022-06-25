import React, { createContext, useReducer, useState } from "react";
import { tasksReducer } from "./reducers/TasksReducer";
export const Store = createContext();

const Context = ({ children }) => {
  const [tasksStore, tasksDispatch] = useReducer(tasksReducer, []);
  const [spaces, setSpaces] = useState([]);
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);
  const [activeSpace, setActiveSpace] = useState(spaces ? spaces[0] : null);
  const [addSpaceIsActive, setAddSpaceIsActive] = useState(
    spaces.length ? false : true
  );
  const [spacesHeight, setSpacesHeight] = useState(0);

  const [pomoMode, setPomoMode] = useState("configure");
  const [pomoTime, setPomoTime] = useState(0.1 * 60);
  const [breakTime, setBreakTime] = useState(0.1 * 60);
  const [remainingTime, setRemainingTime] = useState(0.1 * 60);
  const [remainingBreak, setRemainingBreak] = useState(0.1 * 60);

  const [pomos, setPomos] = useState(4);
  const [donePomos, setDonePomos] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  return (
    <Store.Provider
      value={{
        tasksStore,
        tasksDispatch,
        spaces,
        setSpaces,
        activeSpaceIndex,
        setActiveSpaceIndex,
        activeSpace,
        setActiveSpace,
        addSpaceIsActive,
        setAddSpaceIsActive,
        spacesHeight,
        setSpacesHeight,
        pomoMode,
        setPomoMode,
        pomoTime,
        setPomoTime,
        breakTime,
        setBreakTime,
        remainingTime,
        setRemainingTime,
        remainingBreak,
        setRemainingBreak,
        isPaused,
        setIsPaused,
        pomos,
        setPomos,
        donePomos,
        setDonePomos,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Context;
