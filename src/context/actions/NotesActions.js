import { ActionTypes } from "../ActionTypes";
const { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, GET_NOTES } = ActionTypes;

export const getNotes = (notes) => {
  return {
    type: GET_NOTES,
    payload: notes,
  };
};

export const createNote = (note) => {
  return {
    type: CREATE_NOTE,
    payload: note,
  };
};

export const updateNote = (note) => {
  return {
    type: UPDATE_NOTE,
    payload: note,
  };
};

export const deleteNote = (note) => {
  return {
    type: DELETE_NOTE,
    payload: note,
  };
};
