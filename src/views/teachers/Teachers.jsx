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
import { headCellsTeacher } from "../headerTableData/headerTableData";
import { getDataTeacher } from "../../features/assignment/teacher";

function createData(id, name, birthday, nameMajor, year, idMajor) {
  return {
    id,
    name,
    birthday: formatDate(birthday),
    nameMajor,
    year,
    idMajor,
  };
}

const Teacher = () => {
  const teachersList = fetchData({ funcAction: getDataTeacher });

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      teachersList
        ? teachersList.map((item) =>
            createData(
              item.teacherCode,
              item.name,
              item.birthday,
              item.majorCode,
              item.year,
              item.majorCode
            )
          )
        : []
    );
  }, [teachersList]);

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
          headCells={headCellsTeacher}
          rows={data}
          FormCreate={FormCreateClass}
          nameButton="Create Student"
          nameTable="List TEACHERS"
          optionSearch="id"
        />
      </Box>
    </motion.div>
  );
};

export default Teacher;
