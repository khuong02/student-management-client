import React from "react";
import { Navigate } from "react-router-dom";

const AuthRouter = ({ children, auth, ...rest }) => {
  return !auth ? children : <Navigate to="/" />;
};

export default AuthRouter;
