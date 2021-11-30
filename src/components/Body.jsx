import React from "react";

import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/dashboard/Dashboard";
import Classes from "../views/classes/Classes";

const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/classes" element={<Classes />} />
    </Routes>
  );
};

export default Body;
