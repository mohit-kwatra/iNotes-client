import { createContext, useReducer } from "react";
import { INITIAL_STATE, authReducer } from "./AuthReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useReducer(authReducer, INITIAL_STATE)}>
      {children}
    </AuthContext.Provider>
  );
};
