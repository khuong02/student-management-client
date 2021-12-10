import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { TextField, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SelectLabels from "./SelectLabels";

const OptionClass = (props) => {
  const { handleFilterChange, handleSearch, optionFilterData, nameSearch } =
    props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

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

  const handleChangeSelect = (newSelect) => {
    if (newSelect && searchTerm.trim() !== "") return setSearchTerm("");
    return;
  };

  return (
    <Stack direction="row" style={{ marginRight: "200px" }}>
      <TextField
        id="outlined-basic"
        label={nameSearch}
        variant="outlined"
        value={searchTerm}
        onChange={handleChangeInput}
        InputProps={{ endAdornment: <SearchIcon /> }}
        sx={{ m: 1, minWidth: 220 }}
      />
      {optionFilterData.map((item, index) => {
        return (
          <SelectLabels
            key={index}
            handleFilterChange={handleFilterChange}
            optionFilter={{ name: item.name, data: item.option }}
            handleChangeSelect={handleChangeSelect}
          />
        );
      })}
    </Stack>
  );
};

OptionClass.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  optionFilterData: PropTypes.array.isRequired,
};

OptionClass.defaultProps = {
  handleFilterChange: null,
  handleSearch: null,
  optionFilterData: [],
  nameSearch: "Search",
};

export default OptionClass;
