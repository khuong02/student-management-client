import React, { useState } from "react";

import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";

import { motion } from "framer-motion";

const carAnimation = {
  open: { x: [0, 50], opacity: [0, 1] },
  closed: { x: [50, 0], opacity: [1, 0] },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const FormCreateClass = ({ toggle }) => {
  const [option, setOption] = useState("");

  const major = [
    { name: "TH", value: "01" },
    { name: "CK", value: "02" },
    { name: "KT", value: "03" },
  ];

  const handleChange = (event) => {
    const { target } = event;
    setOption(target.value);
  };

  return (
    <motion.div variants={variants}>
      <motion.div className="formCreateClass" variants={carAnimation}>
        <ClearIcon
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            fontSize: "40px",
            cursor: "pointer",
          }}
          onClick={toggle}
        />
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Enter Major
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={option}
            label="Enter Major"
            //   name={name}
            onChange={handleChange}
          >
            {/* <MenuItem value="all">
            <em>All</em>
          </MenuItem> */}
            {major.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ m: 1, minWidth: 140, minHeight: 50 }}>
          Create
        </Button>
        {/* </Paper> */}
      </motion.div>
    </motion.div>
  );
};

export default FormCreateClass;
