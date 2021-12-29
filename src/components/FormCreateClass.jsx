import React, { useState } from "react";
import methodApi from "../api/methodApi";

import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";

import { motion } from "framer-motion";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

  const major = [
    { name: "TH", value: "01" },
    { name: "CK", value: "02" },
    { name: "KT", value: "03" },
  ];

  const handleChange = (event) => {
    const { target } = event;
    setOption(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await methodApi.post("/api/user/create_class", {
        major: option,
      });
      if (res.status === 400) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
        return;
      }
      window.location.href = "/classes";
    } catch (err) {
      console.log(err);
    }
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
            {major.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ m: 1, minWidth: 140, minHeight: 50 }}
        >
          Create
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FormCreateClass;
