import React from "react";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { TextField, Box, Button, Stack } from "@mui/material";

import TableClasses from "../../components/tableClass/TableClasses";

import SearchIcon from "@mui/icons-material/Search";

const OptionClass = () => {
  return (
    <Box style={{ padding: "3% 0" }}>
      <Stack direction="row" spacing={3}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          InputProps={{ endAdornment: <SearchIcon /> }}
          style={{ width: "280px" }}
        />
        <Button variant="contained" style={{ padding: "14.5px" }}>
          Create Class
        </Button>
      </Stack>
    </Box>
  );
};

const Classes = () => {
  return (
    <motion.div
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      //   style={{ height: "100%", background: "green" }}
    >
      <Box style={{ padding: "0 15px" }}>
        <Stack>
          <OptionClass />
          <TableClasses />
        </Stack>
      </Box>
    </motion.div>
  );
};

export default Classes;
