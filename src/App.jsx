import "./styles/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import About from "./routes/About";
import PageLayout from "./components/PageLayout";

const App = () => {
  const screen = useWindowSize();

  return (
    <Router>
      <Routes>
        <Route element={<PageLayout screen={screen} />}>
          <Route path="/" element={<ProtectedRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
