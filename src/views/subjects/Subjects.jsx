import React, { useState, useEffect } from "react";
import fetchData from "../../customize/fetchData";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import FormCreateSubject from "../../components/FormCreateSubject";
import { optionFilterSubject } from "../../components/OptionFilterData";
import { headCellsSubject } from "../headerTableData/headerTableData";
import { callApiSubject } from "../../features/subject/subject";

function createData(id, name, nameMajor, typeSubject, idMajor) {
  return {
    id,
    name,
    nameMajor,
    typeSubject,
    idMajor,
  };
}

// const rows = [
//   createData("1", "Nhap mon lap trinh 1", "TH", "I", "01"),
//   createData("2", "Nhap mon lap trinh 2", "TH", "II", "01"),
//   createData("3", "Nhap mon lap trinh 3", "TH", "III", "01"),
//   createData("4", "Nhap mon lap trinh 4", "TH", "IV", "01"),
//   createData("5", "Nhap mon lap trinh 5", "TH", "V", "01"),
//   createData("6", "Nhap mon lap trinh 6", "CK", "IV", "02"),
//   createData("7", "Nhap mon lap trinh 7", "CK", "I", "02"),
//   createData("8", "Nhap mon lap trinh 8", "KT", "II", "03"),
//   createData("9", "Nhap mon lap trinh 9", "KT", "III", "03"),
//   createData("10", "Nhap mon lap trinh 10", "KT", "IV", "03"),
//   createData("11", "Nhap mon lap trinh 11", "KT", "V", "03"),
//   createData("12", "Nhap mon lap trinh 12", "KT", "VI", "03"),
//   createData("13", "Nhap mon lap trinh 13", "KT", "III", "03"),
//   createData("14", "Nhap mon lap trinh 14", "KT", "II", "03"),
//   createData("15", "Nhap mon lap trinh 15", "KT", "I", "03"),
// ];

const Subjects = () => {
  const subjects = fetchData({ funcAction: callApiSubject });

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      subjects
        ? subjects.map((item) =>
            createData(
              item.subjectCode,
              item.nameSubject,
              item.majorCode,
              item.typeSubject,
              item.majorCode
            )
          )
        : []
    );
  }, [subjects]);

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
          optionFilterData={optionFilterSubject}
          headCells={headCellsSubject}
          rows={data}
          FormCreate={FormCreateSubject}
          nameButton="Create Subject"
          nameTable="List Subjects"
          optionSearch="id"
        />
      </Box>
    </motion.div>
  );
};

export default Subjects;
