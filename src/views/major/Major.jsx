import React, { useState, useEffect } from "react";
import fetchData from "../../customize/fetchData";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";
import { Box } from "@mui/material";

import SortTable from "../../components/table/SortTable";
import FormCreateClass from "../../components/FormCreateClass";
import { optionFilterDefault } from "../../components/OptionFilterData";
import { headCellsMajor } from "../headerTableData/headerTableData";
import { callApiMajor } from "../../features/major/major";

function createData(id, name, benchmark, quantity, idMajor) {
  return {
    id,
    name,
    benchmark,
    quantity,
    idMajor,
  };
}

// const rows = [
//   createData("1", "CDTH18A", "", 100, "TH", 2018, "01"),
//   createData("2", "CDTH19B", "0123", 102, "TH", 2019, "01"),
//   createData("3", "CDTH20C", "01234", 90, "TH", 2020, "01"),
//   createData("4", "CDTH20D", "012345", 98, "TH", 2020, "01"),
//   createData("5", "CDTH20E", "021", 80, "TH", 2020, "01"),
//   createData("6", "CDCK20A", "022", 120, "CK", 2020, "02"),
//   createData("7", "CDCK20E", "023", 90, "CK", 2020, "02"),
//   createData("8", "CDKT20A", "024", 98, "KT", 2020, "03"),
//   createData("9", "CDKT20C", "025", 90, "KT", 2020, "03"),
//   createData("10", "CDKT20C", "026", 90, "KT", 2020, "03"),
//   createData("11", "CDKT20C", "027", 90, "KT", 2020, "03"),
//   createData("12", "CDKT20C", "028", 90, "KT", 2020, "03"),
//   createData("13", "CDKT20C", "029", 90, "KT", 2020, "03"),
//   createData("14", "CDKT20C", "030", 90, "KT", 2020, "03"),
//   createData("15", "CDKT20C", "031", 90, "KT", 2020, "03"),
// ];

const Major = () => {
  const major = fetchData({ funcAction: callApiMajor });

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      major
        ? major.map((item) =>
            createData(
              item.majorCode,
              item.nameMajor,
              item.benchmark,
              item.quantity,
              item.uuid
            )
          )
        : []
    );
  }, [major]);

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
          headCells={headCellsMajor}
          rows={data}
          FormCreate={FormCreateClass}
          nameButton="Create Class"
          nameTable="List Classes"
          optionSearch="name"
        />
      </Box>
    </motion.div>
  );
};

export default Major;
