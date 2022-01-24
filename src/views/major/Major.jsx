import React, { useState, useEffect } from "react";
// import fetchData from "../../customize/fetchData";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import Loading from "../../layout/Loading";

import SortTable from "../../components/table/SortTable";
import FormCreateMajor from "../../components/FormCreateMajor";
import { optionFilterDefault } from "../../components/OptionFilterData";
import { headCellsMajor } from "../headerTableData/headerTableData";
import AnimationChangePage from "../../layout/AnimationChangePage";

function createData(id, name, benchmark, quantity, idMajor) {
  return {
    id,
    name,
    benchmark,
    quantity,
    idMajor,
    uuid: idMajor,
  };
}

const Major = () => {
  // const major = fetchData({ funcAction: callApiMajor });
  const { majors, loading } = useSelector((state) => state.majors);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      majors?.map((item) =>
        createData(
          item.majorCode,
          item.nameMajor,
          item.benchmark,
          item.quantity,
          item.uuid
        )
      )
    );
  }, [majors]);

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
            headCells={headCellsMajor}
            rows={data}
            FormCreate={FormCreateMajor}
            nameButton="Create Major"
            nameTable="List Major"
            optionSearch="name"
            link="majors"
          />
        )}
      </Box>
    </AnimationChangePage>
  );
};

export default Major;
