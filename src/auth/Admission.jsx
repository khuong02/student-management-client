import React, { useState } from "react";

import { Link } from "react-router-dom";

const BoxAdmissionStudent = () => {
  return (
    <>
      <div className="user-box">
        <input type="text" name="" required />
        <label>Point</label>
      </div>
      <div className="select-box mt-3">
        <label style={{ color: "#fff", paddingRight: "15px" }}>Major 1:</label>
        <select name="major">
          <option value="Công nghệ thông tin">Công nghệ thông tin</option>
          <option value="Cơ khí">Cơ khí</option>
          <option value="Kế toán">Kế toán</option>
        </select>
      </div>
      <div className="select-box mt-3">
        <label style={{ color: "#fff", paddingRight: "15px" }}>Major 2:</label>
        <select name="major">
          <option value="Công nghệ thông tin">Công nghệ thông tin</option>
          <option value="Cơ khí">Cơ khí</option>
          <option value="Kế toán">Kế toán</option>
        </select>
      </div>
      <div className="select-box mt-3">
        <label style={{ color: "#fff", paddingRight: "15px" }}>Major 3:</label>
        <select name="major">
          <option value="Công nghệ thông tin">Công nghệ thông tin</option>
          <option value="Cơ khí">Cơ khí</option>
          <option value="Kế toán">Kế toán</option>
        </select>
      </div>
    </>
  );
};

const BoxAdmissionTeacher = () => {
  return (
    <div className="select-box mt-3">
      <label style={{ color: "#fff", paddingRight: "15px" }}>Major:</label>
      <select name="major">
        <option value="Công nghệ thông tin">Công nghệ thông tin</option>
        <option value="Cơ khí">Cơ khí</option>
        <option value="Kế toán">Kế toán</option>
      </select>
    </div>
  );
};

const Admission = () => {
  const [check, setCheck] = useState(true);
  console.log(check);
  return (
    <div className="admission-page">
      <div className="container-form d-flex justify-content-center align-items-center">
        <div className="form-box">
          <h2>Admission</h2>
          <button onClick={() => setCheck(!check)}>
            {check ? "Bạn là giáo viên ?" : "Bạn là học sinh ?"}
          </button>
          <form>
            <div className="user-box">
              <input type="email" name="" required />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input type="text" name="" required />
              <label>Name</label>
            </div>
            {check ? <BoxAdmissionStudent /> : <BoxAdmissionTeacher />}
            <div className="user-box mt-4">
              <label style={{ top: "-20px" }}>Birthday</label>
              <input type="date" name="" required />
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
            <Link className="text-decoration-none link-auth" to="/user/login">
              Đăng nhập ngay !
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;
