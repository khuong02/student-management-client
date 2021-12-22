import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import RenderItemTableStudents from "../../components/RenderItemTableStudents";
import FormCreateClass from "../../components/FormCreateClass";
import { optionFilterDefault } from "../../components/OptionFilterData";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID STUDENT",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "FULL NAME",
  },
  {
    id: "birthday",
    numeric: false,
    disablePadding: false,
    label: "BIRTHDAY",
  },
  {
    id: "className",
    numeric: false,
    disablePadding: false,
    label: "CLASS NAME",
  },
  {
    id: "nameMajor",
    numeric: false,
    disablePadding: false,
    label: "NAME MAJOR",
  },
  {
    id: "year",
    numeric: false,
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

function createData(id, name, className, birthday, nameMajor, year, idMajor) {
  return {
    id,
    name,
    className: className === "" ? "Not Class" : className,
    birthday,
    nameMajor,
    year,
    idMajor,
  };
}

const Student = () => {
  const { studentsList } = useSelector((state) => state.student);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      studentsList.map((item) =>
        createData(
          item.studentCode,
          item.name,
          item.classCode,
          item.birthday,
          item.majorCode,
          item.schoolYear,
          item.majorCode
        )
      )
    );
  }, [studentsList]);

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
        <SortTable
          optionFilterData={optionFilterDefault}
          headCells={headCells}
          rows={data}
          RenderItem={RenderItemTableStudents}
          FormCreate={FormCreateClass}
          nameButton="Create Student"
          nameTable="List Students"
          optionSearch="id"
        />
      </Box>
    </motion.div>
  );
};

export default Student;
