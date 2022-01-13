import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
} from "@mui/material";

import Option from "../table/Option";

const OptionAssignment = (props) => {
  const {
    optionFilter,
    handleFilterChange,
    handleSearch,
    option,
    handleChangeOption,
    optionAssignment,
    nameSearch,
  } = props;
  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <Stack direction="row">
        <Option
          optionFilterData={optionFilter}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          nameSearch={nameSearch}
          marginRight={0}
        />
        <Box>
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Assignment Teacher
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={option}
              label="Assignment Teacher"
              onChange={handleChangeOption}
            >
              {optionAssignment.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Box>
  );
};

OptionAssignment.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleChangeOption: PropTypes.func.isRequired,
  option: PropTypes.string,
  optionFilter: PropTypes.array,
  optionAssignment: PropTypes.array,
};

OptionAssignment.defaultProps = {
  handleFilterChange: null,
  handleSearch: null,
  handleChangeOption: null,
  option: "",
  optionFilter: [],
  optionAssignment: [],
};

export default OptionAssignment;
