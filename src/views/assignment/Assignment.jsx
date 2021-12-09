import React from "react";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";

import { Stack, Paper } from "@mui/material";

const Assignment = () => {
  return (
    <motion.div
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      style={{ height: "100%" }}
    >
      <Stack
        style={{
          height: "100%",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   margin: "auto",
        }}
      >
        <Paper
          sx={{ height: "80%", width: "80%", margin: "auto" }}
          elevation={12}
        >
          Assignment
        </Paper>
      </Stack>
    </motion.div>
  );
};

export default Assignment;
