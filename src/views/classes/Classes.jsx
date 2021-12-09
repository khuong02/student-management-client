import React from "react";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import RenderItemTableClasses from "../../components/RenderItemTableClasses";
import FormCreateClass from "../../components/FormCreateClass";

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
    id: "idTeacher",
    numeric: false,
    disablePadding: false,
    label: "ID TEACHER",
  },
  {
    id: "quantityStudent",
    numeric: false,
    disablePadding: false,
    label: "QUANTITY STUDENT",
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

function createData(
  id,
  name,
  idTeacher,
  quantityStudent,
  nameMajor,
  year,
  idMajor
) {
  return {
    id,
    name,
    idTeacher,
    quantityStudent,
    nameMajor,
    year,
    idMajor,
  };
}

const rows = [
  createData("1", "CDTH18A", "", 100, "TH", 2018, "01"),
  createData("2", "CDTH19B", "0123", 102, "TH", 2019, "01"),
  createData("3", "CDTH20C", "01234", 90, "TH", 2020, "01"),
  createData("4", "CDTH20D", "012345", 98, "TH", 2020, "01"),
  createData("5", "CDTH20E", "021", 80, "TH", 2020, "01"),
  createData("6", "CDCK20A", "022", 120, "CK", 2020, "02"),
  createData("7", "CDCK20E", "023", 90, "CK", 2020, "02"),
  createData("8", "CDKT20A", "024", 98, "KT", 2020, "03"),
  createData("9", "CDKT20C", "025", 90, "KT", 2020, "03"),
  createData("10", "CDKT20C", "026", 90, "KT", 2020, "03"),
  createData("11", "CDKT20C", "027", 90, "KT", 2020, "03"),
  createData("12", "CDKT20C", "028", 90, "KT", 2020, "03"),
  createData("13", "CDKT20C", "029", 90, "KT", 2020, "03"),
  createData("14", "CDKT20C", "030", 90, "KT", 2020, "03"),
  createData("15", "CDKT20C", "031", 90, "KT", 2020, "03"),
];

const optionFilterData = [
  {
    name: "Year",
    option: [
      { name: "2018", value: 2018 },
      { name: "2019", value: 2019 },
      { name: "2020", value: 2020 },
      { name: "2021", value: 2021 },
    ],
  },
  {
    name: "Major",
    option: [
      { name: "TH", value: "01" },
      { name: "CK", value: "02" },
      { name: "KT", value: "03" },
    ],
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
        <SortTable
          optionFilterData={optionFilterData}
          headCells={headCells}
          rows={rows}
          RenderItem={RenderItemTableClasses}
          FormCreate={FormCreateClass}
          nameButton="Create Class"
          nameTable="List Classes"
          optionSearch="name"
        />
      </Box>
    </motion.div>
  );
};

export default Classes;
