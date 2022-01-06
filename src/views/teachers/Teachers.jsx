import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import fetchData from "../../customize/fetchData";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import FormCreateClass from "../../components/FormCreateClass";
import { optionFilterDefault } from "../../components/OptionFilterData";
import { formatDate } from "../../moment/moment";
import { headCellsTeacher } from "../headerTableData/headerTableData";
// import { getDataTeacher } from "../../features/assignment/teacher";

function createData(id, name, birthday, nameMajor, year, idMajor, uuid) {
  return {
    id,
    name,
    birthday: formatDate(birthday),
    nameMajor,
    year,
    idMajor,
    uuid,
  };
}

const Teacher = () => {
  //   const teachersList = fetchData({ funcAction: getDataTeacher });
  const { teachersList } = useSelector((state) => state.teacher);
  const { major } = useSelector((state) => state.major);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      teachersList && major
        ? teachersList.map((item) => {
            const nameMajor = major.find(
              (obj) => obj.majorCode === item.majorCode
            ).nameMajor;
            return createData(
              item.teacherCode,
              item.name,
              item.birthday,
              nameMajor,
              item.year,
              item.majorCode,
              item.uuid
            );
          })
        : []
    );
  }, [teachersList, major]);

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
          headCells={headCellsTeacher}
          rows={data}
          FormCreate={FormCreateClass}
          nameButton="Create Student"
          nameTable="List TEACHERS"
          optionSearch="id"
          link="teachers"
        />
      </Box>
    </motion.div>
  );
};

export default Teacher;
