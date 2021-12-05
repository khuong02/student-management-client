import React from "react";
import PropTypes from "prop-types";

import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SelectLabels from "./SelectLabels";

const OptionClass = (props) => {
  const { setValue } = props;
  const yearFilter = [
    { name: "2018", value: 2018 },
    { name: "2019", value: 2019 },
    { name: "2020", value: 2020 },
    { name: "2021", value: 2021 },
  ];

  const major = [
    { name: "TH", value: "01" },
    { name: "CK", value: "02" },
    { name: "KT", value: "03" },
  ];
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        InputProps={{ endAdornment: <SearchIcon /> }}
        // style={{ minWidth: "280px" }}
        sx={{ m: 1, minWidth: 220 }}
      />
      <SelectLabels
        setValue={setValue}
        optionName="Year"
        optionFilter={yearFilter}
      />
      <SelectLabels
        setValue={setValue}
        optionName="Major"
        optionFilter={major}
      />
      <Button variant="contained" sx={{ m: 1, minWidth: 140, minHeight: 50 }}>
        Create Class
      </Button>
    </>
  );
};

OptionClass.propTypes = {
  setValue: PropTypes.func.isRequired,
};

OptionClass.defaultProps = {
  setValue: null,
};

export default OptionClass;
