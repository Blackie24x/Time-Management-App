import { ActionTypes } from "../ActionTypes";
const { CREATE_TASK, COMPLETE_TASK } = ActionTypes;

export const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_TASK: {
      const task = action.payload;
      return [...state, task];
    }
    case COMPLETE_TASK: {
      const id = action.payload;
      const completedIndex = state.findIndex((task) => task.id === id);
      state[completedIndex].complete = true;
      return [...state];
    }
    default:
      return state;
  }
};
