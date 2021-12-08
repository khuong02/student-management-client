import React, { useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectLabels(props) {
  const { handleFilterChange, optionFilter, setCheckSelectMajor } = props;
  const { name, data } = optionFilter;
  const [option, setOption] = useState("all");

  const handleChange = (event) => {
    const { target } = event;
    setOption(target.value);
    if (!setCheckSelectMajor) return;
    setCheckSelectMajor(target.value !== "all" ? true : false);
  };

  const funcChange = (e) => {
    handleChange(e);
    handleFilterChange(e);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={option}
          label={name}
          name={name}
          onChange={funcChange}
        >
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          {data.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

SelectLabels.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

SelectLabels.defaultProps = {
  handleFilterChange: null,
  setCheckSelectMajor: null,
};

export default SelectLabels;
