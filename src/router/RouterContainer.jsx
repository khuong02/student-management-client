import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "../auth/Auth";
import DefaultLayout from "../layout/DefaultLayout";

const RouterContainer = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DefaultLayout />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default RouterContainer;
