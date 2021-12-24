import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRouter from "./privateRouter/PrivateRouter";
import AuthRouter from "./authRouter/AuthRouter";
import { getInfo } from "../features/user";
// import { getDataStudent } from "../features/assignment/student";
// import { getDataTeacher } from "../features/assignment/teacher";
// import { callApiClasses } from "../features/classes/classes";
import { logoutSuccess } from "../features/auth";

const DefaultLayout = React.lazy(() => import("../layout/DefaultLayout"));
const Auth = React.lazy(() => import("../auth/Auth"));

const RouterContainer = () => {
  const auth = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!auth) return;
        const actionResult = await dispatch(getInfo());
        unwrapResult(actionResult);
      } catch (err) {
        if (err) {
          dispatch(logoutSuccess());
          enqueueSnackbar(err.message, { variant: "error" });
        }
      }
    };
    getUser();
  }, [dispatch, auth, enqueueSnackbar]);

  useEffect(() => {}, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRouter auth={auth}>
              <DefaultLayout />
            </PrivateRouter>
          }
        />
        <Route
          path="/auth/*"
          element={
            <AuthRouter auth={auth}>
              <Auth />
            </AuthRouter>
          }
        />
      </Routes>
    </Router>
  );
};

export default RouterContainer;
