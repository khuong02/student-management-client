import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../components/Animation";
import methodApi from "../api/methodApi";
import { loginPending, loginFailed, loginSuccess } from "../features/auth";
import { getInfo } from "../features/user";
import { unwrapResult } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  account: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(initialState);
  const dispatch = useDispatch();

  const { account, password } = login;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginPending());
      const res = await methodApi.post("/api/user/login", {
        account,
        password,
      });

      if (res.msg) {
        dispatch(loginFailed(res));
        setLogin({ ...login, account: "", password: "" });
        return;
      }

      //set action
      const action = loginSuccess(res);
      //dispatch action
      dispatch(action);
      const actionResult = await dispatch(getInfo());
      unwrapResult(actionResult);
      //   const currentResult = ;
    } catch (err) {
      err && dispatch(loginFailed(err));
    }
  };

  return (
    <motion.div
      className="login-page"
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
    >
      <div className="container-form d-flex justify-content-center align-items-center">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="account"
                onChange={handleChangeInput}
                value={account}
                required
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                onChange={handleChangeInput}
                value={password}
                required
              />
              <label>Password</label>
            </div>
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Sign In
            </button>
          </form>
          <div className="mt-3 box-link">
            <Link
              className="text-decoration-none link-auth"
              to="/auth/admission"
            >
              Đăng ký ngành học !
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
