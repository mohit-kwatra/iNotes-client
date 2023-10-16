import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Home from "./Home";
import Login from "./Login";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext)[0];

  if (token) {
    return <Home />;
  }
  return <Login />;
};

export default ProtectedRoute;
