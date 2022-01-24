import React, { useState, useEffect } from "react";
// import fetchData from "../../customize/fetchData";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import FormCreateClass from "../../components/FormCreateClass";

import Loading from "../../layout/Loading";

import { optionFilterDefault } from "../../components/OptionFilterData";
import { headCellsClass } from "../headerTableData/headerTableData";
import { formatYear } from "../../moment/formatYear";
import AnimationChangePage from "../../layout/AnimationChangePage";

function createData(
  id,
  name,
  nameTeacher,
  quantityStudent,
  nameMajor,
  year,
  idMajor,
  uuid
) {
  return {
    id,
    name,
    nameTeacher,
    quantityStudent,
    nameMajor,
    year: formatYear(year),
    idMajor,
    uuid,
  };
}

const Classes = () => {
  //   const classes = fetchData({ funcAction: callApiClasses });
  const { classes, loading } = useSelector((state) => state.classes);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      classes
        ? classes.map((item) => {
            return createData(
              item.classCode,
              item.className,
              item.nameTeacher,
              item.quantity ? item.quantity : 0,
              item.nameMajor,
              item.year ? item.year : new Date().getFullYear(),
              item.majorCode,
              item.classCode
            );
          })
        : []
    );
  }, [classes]);

  return (
    <AnimationChangePage>
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
            headCells={headCellsClass}
            rows={data}
            FormCreate={FormCreateClass}
            nameButton="Create Class"
            nameTable="List Classes"
            optionSearch="name"
            link="classes"
          />
        )}
      </Box>
    </AnimationChangePage>
  );
};

export default Classes;
