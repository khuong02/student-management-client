import React, { useState } from "react";
import methodApi from "../api/methodApi";

import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import { TextField } from "@mui/material";

import { motion } from "framer-motion";
import { useSnackbar } from "notistack";

const carAnimation = {
  open: { x: [0, 350], opacity: [0, 1] },
  closed: { x: [350, 0], opacity: [1, 0] },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const initialState = {
  majorCode: "",
  nameSubject: "",
  typeSubject: "LT",
};

const majorOption = [
  { name: "TH", value: "01" },
  { name: "CK", value: "02" },
  { name: "KT", value: "03" },
];

const typeSubjectsOption = [
  { name: "LT", value: "LT" },
  { name: "TH", value: "TH" },
];

const FormCreateSubject = ({ toggle }) => {
  const [option, setOption] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();

  const { majorCode, nameSubject, typeSubject } = option;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOption({ ...option, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nameSubject.trim() === "") {
        enqueueSnackbar("Please enter name subject!", { variant: "error" });
        return;
      }

      const res = await methodApi.post("/api/user/create_subject", option);
      console.log(res);

      if (res.status === 400) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
        return;
      }

      window.location.href = "/subjects";
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  const selectData = [
    {
      id: 1,
      label: "Enter Major",
      value: majorCode,
      name: "majorCode",
      optionSelect: majorOption,
    },
    {
      id: 2,
      label: "Enter Type Subject",
      value: typeSubject,
      name: "typeSubject",
      optionSelect: typeSubjectsOption,
    },
  ];

  return (
    <motion.div variants={variants}>
      <motion.div className="formCreateSubjects" variants={carAnimation}>
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
        {selectData.map((obj) => {
          return (
            <FormControl key={obj.label} sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="demo-simple-select-helper-label">
                {obj.label}
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={obj.value}
                label={obj.label}
                name={obj.name}
                onChange={handleChange}
              >
                {obj.optionSelect.map((item) => {
                  return (
                    <MenuItem key={item.name} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        })}
        <TextField
          id="outlined-basic"
          label="Enter name subject"
          variant="outlined"
          name="nameSubject"
          value={nameSubject}
          onChange={handleChange}
          sx={{ m: 1, minWidth: 220 }}
        />
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

export default FormCreateSubject;
