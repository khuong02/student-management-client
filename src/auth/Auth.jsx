import React, { Suspense } from "react";

import Slider from "react-slick";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Admission from "./Admission.jsx";
import Login from "./Login";
import Loading from "../layout/Loading";

const AuthPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div className="carousel-slide col-sm-7 h-100 p-0">
      <Slider {...settings} className="h-100 p-0">
        <div className="bg-primary slide">
          <img
            className="w-100"
            src="https://cdn.pixabay.com/photo/2021/07/28/03/37/blackboard-6498216_960_720.jpg"
            alt=""
          />
        </div>
        <div className="bg-primary slide">
          <img
            className="w-100"
            src="https://cdn.pixabay.com/photo/2015/05/24/07/56/guy-781483_960_720.jpg"
            alt=""
          />
        </div>
        <div className="bg-primary slide">
          <img
            className="w-100"
            src="https://cdn.pixabay.com/photo/2018/04/16/10/44/literature-3324244_960_720.jpg"
            alt=""
          />
        </div>
        <div className="bg-primary slide">
          <img
            className="w-100"
            src="https://cdn.pixabay.com/photo/2013/03/02/02/40/portrayal-89193_960_720.jpg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

const Auth = () => {
  const location = useLocation();

  return (
    <div className="auth-page">
      <div className="col-sm-5">
        <Suspense fallback={<Loading />}>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="login" element={<Login />} />
              <Route path="admission" element={<Admission />} />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      <AuthPage />
    </div>
  );
};

export default Auth;
