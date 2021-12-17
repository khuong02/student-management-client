import React, { useState } from "react";
import PropTypes from "prop-types";

const BoxAdmissionTeacher = (props) => {
  const { teacherSelect } = props;
  const [option, setOption] = useState("01");

  const handleOption = (e) => {
    const { target } = e;
    setOption(target.value);
    teacherSelect(target.value);
  };

  return (
    <div className="select-box mt-3">
      <label style={{ color: "#fff", paddingRight: "15px" }}>Major:</label>
      <select name="major" value={option} onChange={handleOption}>
        <option value="01">Công nghệ thông tin</option>
        <option value="02">Cơ khí</option>
        <option value="03">Kế toán</option>
      </select>
    </div>
  );
};

BoxAdmissionTeacher.propTypes = {
  teacherSelect: PropTypes.func.isRequired,
};

export default BoxAdmissionTeacher;
