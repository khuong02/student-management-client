import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../components/Animation";
import methodApi from "../api/methodApi";
import { loginPending, loginFailed, loginSuccess } from "../features/auth";
import { getInfo } from "../features/user";
import { usersValidation } from "./validation";

const initialState = {
  account: "",
  password: "",
};

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const [login, setLogin] = useState(initialState);
  const [checkAccount, setCheckAccount] = useState(true);

  const dispatch = useDispatch();

  const { account, password } = login;

  useEffect(() => {
    if (account !== "") {
      const check = setTimeout(() => {
        setCheckAccount(usersValidation(account) ? true : false);
      }, 300);
      return () => clearTimeout(check);
    }
    setCheckAccount(true);
  }, [account, auth.error]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginPending());
      const res = await methodApi.post(`/api/user/login`, {
        account,
        password,
      });

      if (res.status === 400) {
        dispatch(loginFailed(true));
        enqueueSnackbar(res.data.msg, { variant: "error" });
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
      console.log(err);
      if (err) {
        dispatch(loginFailed(true));
        enqueueSnackbar(err.data.msg, { variant: "error" });
        setLogin({ ...login, account: "", password: "" });
      }
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
                className={!checkAccount ? "account-error input" : "input"}
                required
              />

              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                className="input"
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
