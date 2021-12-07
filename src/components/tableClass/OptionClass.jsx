import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { motion, useCycle } from "framer-motion";

import { TextField, Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SelectLabels from "./SelectLabels";
import { useDimensions } from "./useDimensions";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }) => (
  <button onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      //   type: "spring",
      stiffness: 40,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      //   delay: 0.5,
      //   type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const OptionClass = (props) => {
  const { handleFilterChange, handleSearch } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [checkSelectMajor, setCheckSelectMajor] = useState(false);
  const typingTimeoutRef = useRef(null);
  //   const [isOpen, toggleOpen] = useCycle(false, true);
  //   const containerRef = useRef(null);
  //   const { height, width } = useDimensions(containerRef);

  //   console.log(height);

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
    <Stack direction="row" style={{ marginRight: "150px" }}>
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
      {/* <motion.div
        // variant="contained"
        // sx={{ m: 1, minWidth: 140, minHeight: 50 }}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={(height, width)}
        ref={containerRef}
      >
        <motion.div
          className={!isOpen ? "background" : "openBackground"}
          variants={sidebar}
          onClick={() => toggleOpen()}
        >
        </motion.div>
      </motion.div> */}
    </Stack>
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
