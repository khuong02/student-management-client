import React from "react";
import PropTypes from "prop-types";
import SelectMajor from "./SelectMajor";

const BoxAdmissionStudent = (props) => {
  const { handleSelectChange, point, handleChangeInput } = props;

  return (
    <>
      <div className="user-box">
        <input
          type="text"
          name="point"
          value={point}
          onChange={handleChangeInput}
          required
        />
        <label>Point</label>
      </div>
      <SelectMajor handleSelectChange={handleSelectChange} name="Major 1" />
      <SelectMajor handleSelectChange={handleSelectChange} name="Major 2" />
      <SelectMajor handleSelectChange={handleSelectChange} name="Major 3" />
    </>
  );
};

BoxAdmissionStudent.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  point: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};

export default BoxAdmissionStudent;
