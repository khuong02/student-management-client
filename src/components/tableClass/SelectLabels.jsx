import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectLabels(props) {
  //   console.log(props);
  const { setValue, optionName, optionFilter } = props;
  const [option, setOption] = React.useState("all");
  const updateValue = React.useCallback(() => {
    setValue(option);
  }, [option, setValue]);

  React.useEffect(() => {
    updateValue();
  }, [updateValue]);

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-helper-label">
          {optionName}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={option}
          label={optionName}
          onChange={handleChange}
        >
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          {optionFilter.map((item, index) => {
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
  setValue: PropTypes.func.isRequired,
  optionName: PropTypes.string.isRequired,
};

SelectLabels.defaultProps = {
  setValue: null,
  optionName: "",
};

export default SelectLabels;
