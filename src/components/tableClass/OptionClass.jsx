import React, { useState } from "react";
import PropTypes from "prop-types";

import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SelectLabels from "./SelectLabels";

const OptionClass = (props) => {
  const { handleFilterChange, handleSearch } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [checkSelectMajor, setCheckSelectMajor] = useState(false);
  const typingTimeoutRef = React.useRef(null);

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

  React.useEffect(() => {
    if (!checkSelectMajor) return;
    setSearchTerm("");
  }, [checkSelectMajor]);

  const handleChangeInput = (e) => {
    const { target } = e;
    setSearchTerm(target.value);

    if (!handleSearch) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef);

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: target.value,
      };

      handleSearch(formValues);
    }, 300);
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleChangeInput}
        InputProps={{ endAdornment: <SearchIcon /> }}
        sx={{ m: 1, minWidth: 220 }}
      />
      <SelectLabels
        handleFilterChange={handleFilterChange}
        optionFilter={{ name: "Year", data: yearFilter }}
      />
      <SelectLabels
        handleFilterChange={handleFilterChange}
        setCheckSelectMajor={setCheckSelectMajor}
        optionFilter={{ name: "Major", data: major }}
      />
      <Button variant="contained" sx={{ m: 1, minWidth: 140, minHeight: 50 }}>
        Create Class
      </Button>
    </>
  );
};

OptionClass.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

OptionClass.defaultProps = {
  handleFilterChange: null,
  handleSearch: null,
};

export default OptionClass;
