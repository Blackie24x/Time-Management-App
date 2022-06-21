import { ActionTypes } from "../ActionTypes";
const { CREATE_TASK, COMPLETE_TASK, DELETE_TASK } = ActionTypes;
export const createTask = (task) => {
  return {
    type: CREATE_TASK,
    payload: task,
  };
};

export const completeTask = (id) => {
  return {
    type: COMPLETE_TASK,
    payload: id,
  };
};
export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    payload: id,
  };
};
