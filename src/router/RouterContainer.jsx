import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const DefaultLayout = React.lazy(() => import("../layout/DefaultLayout"));
const Auth = React.lazy(() => import("../auth/Auth"));

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
