import { ActionTypes } from "../ActionTypes";
const {
  GET_TASKS,
  CREATE_TASK,
  COMPLETE_TASK,
  DELETE_TASK,
  RESTORE_TASK,
  PRIORITIZE_TASK,
} = ActionTypes;

export const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TASKS: {
      const tasks = action.payload;
      return tasks;
    }
    case CREATE_TASK: {
      const task = action.payload;
      if (task.priority) return [task, ...state];
      else return [...state, task];
    }
    case COMPLETE_TASK: {
      const id = action.payload;
      const completedIndex = state.findIndex((task) => task.id === id);
      state[completedIndex].complete = true;
      return [...state];
    }
    case DELETE_TASK: {
      const id = action.payload;
      return [...state.filter((task) => task.id !== id)];
    }
    case RESTORE_TASK: {
      const id = action.payload;
      const restoredIndex = state.findIndex((task) => task.id === id);
      state[restoredIndex].complete = false;
      return [...state];
    }
    case PRIORITIZE_TASK: {
      const task = action.payload;
      task.priority = !task.priority;
      const filteredState = state.filter((el) => el.id !== task.id);
      if (task.priority) return [task, ...filteredState];
      else return [...filteredState, task];
    }
    default:
      return state;
  }
};
