import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../components/Animation";
// import { noticeSuccess, noticeFailed } from "../features/notice";
import methodApi from "../api/methodApi";
import BoxAdmissionStudent from "../components/admission/BoxAdmissionStudent";
import BoxAdmissionTeacher from "../components/admission/BoxAdmissionTeacher";

const initialAdmission = {
  name: "",
  email: "",
  point: "",
  birthday: "",
  gender: "01",
  aspirations_arr: [],
};

const Admission = () => {
  // const { notice } = useSelector((state) => state);
  // const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [check, setCheck] = useState(true);
  const [admission, setAdmission] = useState(initialAdmission);
  const [optionTeacher, setOptionTeacher] = useState("01");
  const [aspirationsStudent, setAspirationsStudent] = useState([
    { name: "Major 1", value: "01" },
  ]);
  const [optionSubmitStudent, setOptionSubmitStudent] = useState({});
  const [optionSubmitTeacher, setOptionSubmitTeacher] = useState({});

  const { name, email, point, birthday, gender, aspirations_arr } = admission;

  useEffect(() => {
    setOptionSubmitStudent({
      name: name.trim(),
      email,
      point: point.trim(),
      birthday,
      aspirations_arr: [...aspirationsStudent],
      gender: gender === "01" ? "Male" : "Female",
    });

    setOptionSubmitTeacher({
      name: name.trim(),
      email,
      birthday,
      major: optionTeacher,
      gender: gender === "01" ? "Male" : "Female",
    });
  }, [
    name,
    email,
    point,
    birthday,
    gender,
    aspirations_arr,
    optionTeacher,
    aspirationsStudent,
  ]);

  // useEffect(() => {
  //   setOptionSubmitTeacher({
  //     name: name.trim(),
  //     email,
  //     birthday,
  //     major: optionTeacher,
  //     gender: gender === "01" ? "Male" : "Female",
  //   });
  // }, [name, email, birthday, optionTeacher, gender]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAdmission({ ...admission, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { target } = event;

    const isInFilter = aspirationsStudent.some(
      (element) => element.name === target.name
    );

    if (!isInFilter) {
      setAspirationsStudent((currentState) => {
        return [...currentState, { name: target.name, value: target.value }];
      });
    } else {
      setAspirationsStudent((currentState) => {
        return [
          ...currentState.filter((x) => x.name !== target.name),
          { name: target.name, value: target.value },
        ];
      });
    }
  };

  const teacherSelect = (newMajor) => {
    setOptionTeacher(newMajor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (check) {
        if (name.trim() === "") {
          enqueueSnackbar("Please enter your name!", { variant: "error" });
          return;
        }

        if (point.trim() === "") {
          enqueueSnackbar("Please enter your point!", { variant: "error" });
          return;
        }
      }

      const res = await methodApi.post(
        `/api/admission/${check ? "student" : "teacher"}`,
        check ? optionSubmitStudent : optionSubmitTeacher
      );

      if (res.status === 400 || res.status === 500) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
      }

      setAdmission(initialAdmission);
      enqueueSnackbar(res.msg, { variant: "success" });
    } catch (err) {
      err.response &&
        enqueueSnackbar(err.response.data.msg, { variant: "error" });
    }
  };

  return (
    <motion.div
      className="admission-page"
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
    >
      <div className="container-form d-flex justify-content-center align-items-center">
        <div className="form-box">
          <h2>Admission</h2>
          <button onClick={() => setCheck(!check)}>
            {check ? "Are you teacher ?" : "Are you student ?"}
          </button>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChangeInput}
                required
                className="input"
              />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChangeInput}
                required
                className="input"
              />
              <label>Name</label>
            </div>
            {check ? (
              <BoxAdmissionStudent
                handleSelectChange={handleSelectChange}
                point={point}
                handleChangeInput={handleChangeInput}
              />
            ) : (
              <BoxAdmissionTeacher teacherSelect={teacherSelect} />
            )}
            <div className="select-box mt-3">
              <label style={{ color: "#fff", paddingRight: "15px" }}>
                Gender:
              </label>
              <select name="gender" value={gender} onChange={handleChangeInput}>
                <option value="01">Male</option>
                <option value="02">Female</option>
              </select>
            </div>
            <div className="user-box mt-4">
              <label style={{ top: "-20px" }}>Birthday</label>
              <input
                type="date"
                name="birthday"
                value={birthday}
                onChange={handleChangeInput}
                required
                className="input"
              />
            </div>
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit now
            </button>
          </form>
          <div className="mt-3 box-link">
            <Link className="text-decoration-none link-auth" to="/auth/login">
              Đăng nhập ngay !
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Admission;
