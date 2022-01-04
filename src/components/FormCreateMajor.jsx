import React, { useState } from "react";
import methodApi from "../api/methodApi";

import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { TextField } from "@mui/material";

import { motion } from "framer-motion";
import { useSnackbar } from "notistack";

const carAnimation = {
  open: { x: [0, 250], opacity: [0, 1] },
  closed: { x: [250, 0], opacity: [1, 0] },
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
  nameMajor: "",
  benchmark: "",
  quantity: "",
};

const FormCreateMajor = ({ toggle }) => {
  const [option, setOption] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();

  const { majorCode, nameMajor, benchmark, quantity } = option;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOption({ ...option, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        nameMajor.trim() === "" ||
        majorCode.trim() === "" ||
        !benchmark ||
        !quantity
      ) {
        enqueueSnackbar("Please, Fill in all the information!", {
          variant: "error",
        });
        return;
      }

      setOption({ ...option, benchmark: +benchmark, quantity: +quantity });

      const res = await methodApi.post("/api/majors/add_major", option);
      console.log(res);

      if (res.status === 400) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
        return;
      }

      window.location.href = "/major";
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  const textFieldData = [
    {
      label: "Enter major code",
      name: "majorCode",
      value: majorCode,
    },
    {
      label: "Enter name major",
      name: "nameMajor",
      value: nameMajor,
    },
    {
      label: "Enter quantity",
      name: "quantity",
      value: quantity,
    },
    {
      label: "Enter benchmark",
      name: "benchmark",
      value: benchmark,
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
        {textFieldData.map((item, index) => {
          return (
            <TextField
              key={index}
              id="outlined-basic"
              label={item.label}
              variant="outlined"
              name={item.name}
              value={item.value}
              onChange={handleChange}
              sx={{ m: 1, minWidth: 220 }}
              required
            />
          );
        })}
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

export default FormCreateMajor;
