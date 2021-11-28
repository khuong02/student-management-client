import React from "react";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <div className="container-form d-flex justify-content-center align-items-center">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input type="text" name="" required />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="password" name="" required />
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
            <Link className="text-decoration-none link-auth" to="/admission">
              Đăng ký ngành học !
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
