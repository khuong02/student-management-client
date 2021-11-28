import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import Auth from "../auth/Auth";

const RouterContainer = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/*" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default RouterContainer;
