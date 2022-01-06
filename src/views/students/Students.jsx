import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import FormCreateClass from "../../components/FormCreateClass";
import { optionFilterDefault } from "../../components/OptionFilterData";
import { formatDate } from "../../moment/moment";
import { headCellsStudent } from "../headerTableData/headerTableData";

function createData(
  id,
  name,
  className,
  birthday,
  nameMajor,
  year,
  idMajor,
  uuid
) {
  return {
    id,
    name,
    birthday: formatDate(birthday),
    className: className === "" ? "Not Class ♥" : className,
    nameMajor,
    year,
    idMajor,
    uuid,
  };
}

const Student = () => {
  const { studentsList } = useSelector((state) => state.student);
  const { major } = useSelector((state) => state.major);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      studentsList && major
        ? studentsList.map((item) => {
            const nameMajor = major.find(
              (obj) => obj.majorCode === item.majorCode
            ).nameMajor;
            return createData(
              item.studentCode,
              item.name,
              item.classCode,
              item.birthday,
              nameMajor,
              item.schoolYear,
              item.majorCode,
              item.uuid
            );
          })
        : []
    );
  }, [studentsList, major]);

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
          headCells={headCellsStudent}
          rows={data}
          FormCreate={FormCreateClass}
          nameButton="Create Student"
          nameTable="List Students"
          optionSearch="id"
          link="students"
        />
      </Box>
    </motion.div>
  );
};

export default Student;
