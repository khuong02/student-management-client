import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children, auth, ...rest }) => {
  return auth ? children : <Navigate to="/auth/login" />;
};

export default PrivateRouter;
