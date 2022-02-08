import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentRouter = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser.roles === process.env.REACT_APP_ROLES_STUDENT ? (
    children
  ) : (
    <Navigate to="/teacher" />
  );
};

export default StudentRouter;
