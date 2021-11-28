import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import Index from "../auth/Index";

const RouterContainer = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Index />} />
      </Routes>
    </Router>
  );
};

export default RouterContainer;
