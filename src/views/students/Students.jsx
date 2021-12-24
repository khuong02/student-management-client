import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

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
  const { studentsList } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getListData = async () => {
      try {
        if (
          !currentUser.roles ||
          currentUser.roles.toUpperCase() ===
            process.env.REACT_APP_ROLES_STUDENT
        )
          return;
        if (
          currentUser.roles.toUpperCase() === process.env.REACT_APP_ROLES_ADMIN
        ) {
          const studentListAction = await dispatch(getDataStudent());
          unwrapResult(studentListAction);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getListData();
  }, [currentUser, dispatch]);

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
