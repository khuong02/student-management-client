import React from "react";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID CLASSES",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "CLASS NAME",
  },
  {
    id: "quantityStudent",
    numeric: true,
    disablePadding: false,
    label: "QUANTITY STUDENT",
  },
  {
    id: "nameMajor",
    numeric: true,
    disablePadding: false,
    label: "NAME MAJOR",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: false,
    label: "YEAR",
  },
  {
    id: "views",
    numeric: true,
    disablePadding: false,
    label: "VIEWS",
  },
];

const Classes = () => {
  return (
    <motion.div
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      style={{ height: "100%" }}
    >
      <Box style={{ padding: "0 15px", position: "relative", height: "100%" }}>
        <SortTable headCells={headCells} />
      </Box>
    </motion.div>
  );
};

export default Classes;
