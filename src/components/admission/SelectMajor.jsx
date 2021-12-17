import React, { useState } from "react";
import PropTypes from "prop-types";

const SelectMajor = (props) => {
  const { handleSelectChange, name } = props;
  const [optionStudent, setOptionStudent] = useState("01");

  const handleOption = (e) => {
    const { target } = e;
    setOptionStudent(target.value);
  };

  const funcChange = (e) => {
    handleOption(e);
    handleSelectChange(e);
  };

  return (
    <div className="select-box mt-3">
      <label style={{ color: "#fff", paddingRight: "15px" }}>{name}:</label>
      <select name={name} value={optionStudent} onChange={funcChange}>
        <option value="01">Công nghệ thông tin</option>
        <option value="02">Cơ khí</option>
        <option value="03">Kế toán</option>
      </select>
    </div>
  );
};

SelectMajor.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SelectMajor;
