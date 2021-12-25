import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import fetchData from "../../customize/fetchData";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import FormCreateClass from "../../components/FormCreateClass";
import { optionFilterDefault } from "../../components/OptionFilterData";
import { formatDate } from "../../moment/moment";
import { headCellsStudent } from "../headerTableData/headerTableData";
import { getDataStudent } from "../../features/assignment/student";

function createData(id, name, className, birthday, nameMajor, year, idMajor) {
  return {
    id,
    name,
    className: className === "" ? "Not Class ♥" : className,
    birthday: formatDate(birthday),
    nameMajor,
    year,
    idMajor,
  };
}

const Student = () => {
  const studentsList = fetchData({ funcAction: getDataStudent });

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      studentsList
        ? studentsList.map((item) =>
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
        : []
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
          headCells={headCellsStudent}
          rows={data}
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
