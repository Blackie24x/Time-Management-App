import React, { createContext, useReducer } from "react";
import { tasksReducer } from "./reducers/TasksReducer";
export const Store = createContext();

const Context = ({ children }) => {
  const [tasksStore, tasksDispatch] = useReducer(tasksReducer, []);

  return (
    <Store.Provider value={{ tasksStore, tasksDispatch }}>
      {children}
    </Store.Provider>
  );
};

export default Context;
