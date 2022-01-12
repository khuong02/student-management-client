import React, { useState, useEffect } from "react";
// import fetchData from "../../customize/fetchData";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import FormCreateClass from "../../components/FormCreateClass";
import { optionFilterDefault } from "../../components/OptionFilterData";
import { headCellsClass } from "../headerTableData/headerTableData";

function createData(
  id,
  name,
  idTeacher,
  quantityStudent,
  nameMajor,
  year,
  idMajor,
  uuid
) {
  return {
    id,
    name,
    idTeacher,
    quantityStudent,
    nameMajor,
    year,
    idMajor,
    uuid,
  };
}

const Classes = () => {
  //   const classes = fetchData({ funcAction: callApiClasses });
  const { classes } = useSelector((state) => state.classes);
  const { major } = useSelector((state) => state.major);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      classes && major
        ? classes.map((item) => {
            const nameMajor = major.find(
              (obj) => obj.majorCode === item.majorCode
            ).nameMajor;
            return createData(
              item.classCode,
              item.className,
              item.idTeacher ? item.idTeacher : "Not teacher ♥",
              item.quantity ? item.quantity : 0,
              nameMajor,
              item.year ? item.year : new Date().getFullYear(),
              item.majorCode,
              item.classCode
            );
          })
        : []
    );
  }, [classes, major]);

  return (
    <motion.div
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      style={{ height: "100%" }}
    >
      <Box
        style={{
          padding: "0 15px",
          position: "relative",
          height: "100%",
        }}
      >
        <SortTable
          optionFilterData={optionFilterDefault}
          headCells={headCellsClass}
          rows={data}
          FormCreate={FormCreateClass}
          nameButton="Create Class"
          nameTable="List Classes"
          optionSearch="name"
          link="classes"
        />
      </Box>
    </motion.div>
  );
};

export default Classes;
