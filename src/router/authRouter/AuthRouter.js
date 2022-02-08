import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRouter = ({ children, auth, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  return !auth ? (
    children
  ) : (
    <Navigate
      to={
        currentUser.roles !== "" &&
        currentUser.roles === process.env.REACT_APP_ROLES_STUDENT
          ? "/student"
          : "/teacher"
      }
    />
  );
};

export default AuthRouter;
