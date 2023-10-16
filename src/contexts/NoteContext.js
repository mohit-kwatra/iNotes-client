import { createContext, useReducer } from "react";
import { INITIAL_STATE, noteReducer } from "./NoteReducer";

export const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {
  return (
    <NoteContext.Provider value={useReducer(noteReducer, INITIAL_STATE)}>
      {children}
    </NoteContext.Provider>
  );
};
