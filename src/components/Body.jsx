import React, { Suspense } from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Loading from "../layout/Loading";

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Classes = React.lazy(() => import("../views/classes/Classes"));
const Students = React.lazy(() => import("../views/students/Students"));
const Teachers = React.lazy(() => import("../views/teachers/Teachers"));
const Subjects = React.lazy(() => import("../views/subjects/Subjects"));
const Assignment = React.lazy(() => import("../views/assignment/Assignment"));
const Major = React.lazy(() => import("../views/major/Major"));

const Body = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<Loading />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/students/*" element={<Students />} />
          <Route path="/teachers/*" element={<Teachers />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/major" element={<Major />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default Body;
