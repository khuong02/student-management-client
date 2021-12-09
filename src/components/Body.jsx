import React, { Suspense } from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Loading from "../layout/Loading";

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Classes = React.lazy(() => import("../views/classes/Classes"));
const Students = React.lazy(() => import("../views/students/Students"));
const Subjects = React.lazy(() => import("../views/subjects/Subjects"));
const Assignment = React.lazy(() => import("../views/assignment/Assignment"));

const Body = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<Loading />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/students" element={<Students />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/assignment" element={<Assignment />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default Body;
