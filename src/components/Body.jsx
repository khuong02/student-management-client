import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";

import Loading from "../layout/Loading";

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Classes = React.lazy(() => import("../views/classes/Classes"));

const Body = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </Suspense>
  );
};

export default Body;
