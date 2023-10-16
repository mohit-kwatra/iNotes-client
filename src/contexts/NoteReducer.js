export const INITIAL_STATE = {
  notes: [],
};

export const reducerCases = {
  addNote: "ADD_NOTE",
  fetchNotes: "FETCH_NOTES",
  deleteNote: "DELETE_NOTE",
  editNote: "EDIT_NOTE",
};

export const noteReducer = (state, action) => {
  switch (action.type) {
    case reducerCases.fetchNotes:
      return {
        notes: [...action.payload],
      };
    case reducerCases.addNote:
      return {
        notes: [action.payload, ...state.notes],
      };
    case reducerCases.deleteNote:
      return {
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case reducerCases.editNote: {
      const noteIndex = state.notes.findIndex((note) => note._id === action.id);
      state.notes[noteIndex] = {
        ...state.notes[noteIndex],
        ...action.payload,
      };
      return {
        notes: [...state.notes],
      };
    }
    default:
      return state;
  }
};
