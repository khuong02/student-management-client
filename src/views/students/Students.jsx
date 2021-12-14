import React from "react";

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
    className,
    birthday,
    nameMajor,
    year,
    idMajor,
  };
}

const rows = [
  createData("1", "Nguyen Van A", "CDTH18A", "01/01/2002", "TH", 2018, "01"),
  createData("2", "Nguyen Van B", "CDTH19B", "12/01/2002", "TH", 2019, "01"),
  createData("3", "Nguyen Van C", "CDTH20C", "11/01/2002", "TH", 2020, "01"),
  createData("4", "Nguyen Van D", "CDTH20D", "10/01/2002", "TH", 2020, "01"),
  createData("5", "Nguyen Van E", "CDTH20E", "02/01/2002", "TH", 2020, "01"),
  createData("6", "Nguyen Van F", "CDCK20A", "03/01/2002", "CK", 2020, "02"),
  createData("7", "Nguyen Van G", "CDCK20E", "04/01/2002", "CK", 2020, "02"),
  createData("8", "Nguyen Van H", "CDKT20A", "05/01/2002", "KT", 2020, "03"),
  createData("9", "Nguyen Van K", "CDKT20C", "06/01/2002", "KT", 2020, "03"),
  createData("10", "Nguyen Van M", "CDKT20C", "07/01/2002", "KT", 2020, "03"),
  createData("11", "Nguyen Van N", "CDKT20C", "08/01/2002", "KT", 2020, "03"),
  createData("12", "Nguyen Van L", "CDKT20C", "09/01/2002", "KT", 2020, "03"),
  createData("13", "Nguyen Van O", "CDKT20C", "01/11/2002", "KT", 2020, "03"),
  createData("14", "Nguyen Van Y", "CDKT20C", "01/12/2002", "KT", 2020, "03"),
  createData("15", "Nguyen Van Z", "CDKT20C", "01/13/2002", "KT", 2020, "03"),
];

const Student = () => {
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
          rows={rows}
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
