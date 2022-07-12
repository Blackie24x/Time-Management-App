import { ActionTypes } from "../ActionTypes";
const { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, GET_NOTES } = ActionTypes;
export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_NOTES: {
      const notes = action.payload;
      return notes;
    }
    case CREATE_NOTE: {
      const note = action.payload;
      return [...state, note];
    }
    case UPDATE_NOTE: {
      const updatedNote = action.payload;

      let noteIndex = state.findIndex((note) => note.id === updatedNote.id);
      state[noteIndex] = updatedNote;
      return [...state];
    }
    case DELETE_NOTE: {
      const id = action.payload;
      const newState = state.filter((note) => note.id !== id);
      return newState;
    }
    default:
      return state;
  }
};
