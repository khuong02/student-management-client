import React, { Suspense } from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Loading from "../layout/Loading";
import StudentRouter from "../router/privateRouter/studentRouter/StudentRouter";
import TeacherRouter from "../router/privateRouter/teacherRouter/TeacherRouter";
// import Chart from "../views/chart/Chart";

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Classes = React.lazy(() => import("../views/classes/Classes"));
const ClassesProfile = React.lazy(() =>
  import("../views/classes/ClassesProfile")
);
const Students = React.lazy(() => import("../views/students/Students"));
const StudentProfile = React.lazy(() =>
  import("../views/students/StudentProfile")
);
const Teachers = React.lazy(() => import("../views/teachers/Teachers"));
const TeacherProfile = React.lazy(() =>
  import("../views/teachers/TeacherProfile")
);
const Subjects = React.lazy(() => import("../views/subjects/Subjects"));
const SubjectProfile = React.lazy(() =>
  import("../views/subjects/SubjectProfile")
);
const Assignment = React.lazy(() => import("../views/assignment/Assignment"));
const Major = React.lazy(() => import("../views/major/Major"));
const MajorProfile = React.lazy(() => import("../views/major/MajorProfile"));
const UserProfile = React.lazy(() =>
  import("../views/userProfile/UserProfile")
);

const Body = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<Loading />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="student/*"
            element={
              <StudentRouter>
                <Routes location={location} key={location.pathname}>
                  <Route index element={<div>student</div>} />
                  <Route path="*" element={<div>Not Found</div>} />
                </Routes>
              </StudentRouter>
            }
          />
          <Route
            path="teacher/*"
            element={
              <TeacherRouter>
                <Routes location={location} key={location.pathname}>
                  {/* indexPage */}
                  <Route index element={<Dashboard />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/majors" element={<Major />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/subjects" element={<Subjects />} />
                  <Route path="/assignment" element={<Assignment />} />
                  {/* <Route path="/chart" element={<Chart />} /> */}

                  {/* childPage */}
                  <Route
                    path="/classes/:classesId"
                    element={<ClassesProfile />}
                  />
                  <Route
                    path="/students/:studentId"
                    element={<StudentProfile />}
                  />
                  <Route
                    path="/teachers/:teacherId"
                    element={<TeacherProfile />}
                  />
                  <Route
                    path="/subjects/:subjectId"
                    element={<SubjectProfile />}
                  />
                  <Route path="/majors/:majorsId" element={<MajorProfile />} />
                  {/* 404 Page */}
                  <Route path="*" element={<div>Not Found</div>} />
                </Routes>
              </TeacherRouter>
            }
          />

          <Route path="/user/:userId" element={<UserProfile />} />
          {/* 404 Page */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default Body;
