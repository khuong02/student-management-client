import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import Login from "../auth/Login";
import Admission from "../auth/Admission";

const RouterContainer = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admission" element={<Admission />} />
      </Routes>
    </Router>
  );
};

export default RouterContainer;
