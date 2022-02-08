import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TeacherRouter = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser.roles &&
    (currentUser.roles.toUpperCase() === process.env.REACT_APP_ROLES_ADMIN ||
      currentUser.roles === process.env.REACT_APP_ROLES_TEACHER) ? (
    children
  ) : (
    <Navigate to="/student" />
  );
};

export default TeacherRouter;
