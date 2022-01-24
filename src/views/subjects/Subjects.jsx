import React, { useState, useEffect } from "react";
// import fetchData from "../../customize/fetchData";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import Loading from "../../layout/Loading";

import SortTable from "../../components/table/SortTable";
import FormCreateSubject from "../../components/FormCreateSubject";
import { optionFilterSubject } from "../../components/OptionFilterData";
import { headCellsSubject } from "../headerTableData/headerTableData";
import AnimationChangePage from "../../layout/AnimationChangePage";

function createData(id, name, nameMajor, typeSubject, idMajor) {
  return {
    id,
    name,
    nameMajor,
    typeSubject,
    idMajor,
    uuid: id,
  };
}

const Subjects = () => {
  //   const subjects = fetchData({ funcAction: callApiSubject });
  const { subjects, loading } = useSelector((state) => state.subjects);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      subjects
        ? subjects.map((item) => {
            return createData(
              item.subjectCode,
              item.nameSubject,
              item.nameMajor,
              item.typeSubject,
              item.majorCode
            );
          })
        : []
    );
  }, [subjects]);

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
            optionFilterData={optionFilterSubject}
            headCells={headCellsSubject}
            rows={data}
            FormCreate={FormCreateSubject}
            nameButton="Create Subject"
            nameTable="List Subjects"
            optionSearch="id"
            link="subjects"
          />
        )}
      </Box>
    </AnimationChangePage>
  );
};

export default Subjects;
