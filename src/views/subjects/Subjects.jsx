import React from "react";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import RenderItemTableSubjects from "../../components/RenderItemTableSubjects";
import FormCreateClass from "../../components/FormCreateClass";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID SUBJECT",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "NAME SUBJECT",
  },
  {
    id: "nameMajor",
    numeric: false,
    disablePadding: false,
    label: "NAME MAJOR",
  },
  {
    id: "semester",
    numeric: false,
    disablePadding: false,
    label: "SEMESTER",
  },
  {
    id: "views",
    numeric: true,
    disablePadding: false,
    label: "VIEWS",
  },
];

function createData(id, name, nameMajor, semester, idMajor) {
  return {
    id,
    name,
    nameMajor,
    semester,
    idMajor,
  };
}

const rows = [
  createData("1", "Nhap mon lap trinh 1", "TH", "I", "01"),
  createData("2", "Nhap mon lap trinh 2", "TH", "II", "01"),
  createData("3", "Nhap mon lap trinh 3", "TH", "III", "01"),
  createData("4", "Nhap mon lap trinh 4", "TH", "IV", "01"),
  createData("5", "Nhap mon lap trinh 5", "TH", "V", "01"),
  createData("6", "Nhap mon lap trinh 6", "CK", "IV", "02"),
  createData("7", "Nhap mon lap trinh 7", "CK", "I", "02"),
  createData("8", "Nhap mon lap trinh 8", "KT", "II", "03"),
  createData("9", "Nhap mon lap trinh 9", "KT", "III", "03"),
  createData("10", "Nhap mon lap trinh 10", "KT", "IV", "03"),
  createData("11", "Nhap mon lap trinh 11", "KT", "V", "03"),
  createData("12", "Nhap mon lap trinh 12", "KT", "VI", "03"),
  createData("13", "Nhap mon lap trinh 13", "KT", "III", "03"),
  createData("14", "Nhap mon lap trinh 14", "KT", "II", "03"),
  createData("15", "Nhap mon lap trinh 15", "KT", "I", "03"),
];

const optionFilterData = [
  {
    name: "Semester",
    option: [
      { name: "HK I", value: "I" },
      { name: "HK II", value: "II" },
      { name: "HK III", value: "III" },
      { name: "HK IV", value: "IV" },
      { name: "HK V", value: "V" },
      { name: "HK VI", value: "VI" },
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

const Subjects = () => {
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
          RenderItem={RenderItemTableSubjects}
          FormCreate={FormCreateClass}
          nameButton="Create Subject"
          nameTable="List Subjects"
          optionSearch="id"
        />
      </Box>
    </motion.div>
  );
};

export default Subjects;
