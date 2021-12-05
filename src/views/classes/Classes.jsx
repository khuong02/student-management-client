import React from "react";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box, Stack } from "@mui/material";

import TableClasses from "../../components/tableClass/TableClasses";

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
          {/* <OptionClass /> */}
          <TableClasses />
        </Stack>
      </Box>
    </motion.div>
  );
};

export default Classes;
