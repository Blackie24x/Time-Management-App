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
  const [taskIsAdding, setTaskIsAdding] = useState(false);

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
        taskIsAdding,
        setTaskIsAdding,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Context;
