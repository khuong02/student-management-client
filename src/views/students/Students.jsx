import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import Loading from "../../layout/Loading";

import SortTable from "../../components/table/SortTable";
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
  const { studentsList, loading } = useSelector((state) => state.student);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      studentsList
        ? studentsList.map((item) => {
            return createData(
              item.studentCode,
              item.name,
              item.classCode,
              item.birthday,
              item.nameMajor,
              item.schoolYear,
              item.majorCode,
              item.uuid
            );
          })
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
      <Box
        style={{
          padding: "0 15px",
          position: "relative",
          height: "100%",
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <SortTable
            optionFilterData={optionFilterDefault}
            headCells={headCellsStudent}
            rows={data}
            nameButton="Create Student"
            nameTable="List Students"
            optionSearch="id"
            link="students"
          />
        )}
      </Box>
    </motion.div>
  );
};

export default Student;
