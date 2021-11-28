import React from "react";

import Slider from "react-slick";
import { Link } from "react-router-dom";

const Login = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <div className="login-page row p-0">
      <div className="carousel-slide col-sm-7 h-100 p-0">
        <Slider {...settings} className="h-100 p-0">
          <div className="bg-primary slide">
            <img
              className="w-100 h-100"
              src="https://cdn.pixabay.com/photo/2021/07/28/03/37/blackboard-6498216_960_720.jpg"
              alt=""
            />
          </div>
          <div className="bg-primary slide">
            <img
              className="w-100 h-100"
              src="https://cdn.pixabay.com/photo/2015/05/24/07/56/guy-781483_960_720.jpg"
              alt=""
            />
          </div>
          <div className="bg-primary slide">
            <img
              className="w-100 h-100"
              src="https://cdn.pixabay.com/photo/2018/04/16/10/44/literature-3324244_960_720.jpg"
              alt=""
            />
          </div>
          <div className="bg-primary slide">
            <img
              className="w-100 h-100"
              src="https://cdn.pixabay.com/photo/2013/03/02/02/40/portrayal-89193_960_720.jpg"
              alt=""
            />
          </div>
        </Slider>
      </div>
      <div className="container-form d-flex justify-content-center align-items-center col-sm-5">
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
