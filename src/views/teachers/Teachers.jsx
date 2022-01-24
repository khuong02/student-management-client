import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import fetchData from "../../customize/fetchData";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import Loading from "../../layout/Loading";

import SortTable from "../../components/table/SortTable";
import { optionFilterDefault } from "../../components/OptionFilterData";
import { formatDate } from "../../moment/moment";
import { formatYear } from "../../moment/formatYear";
import { headCellsTeacher } from "../headerTableData/headerTableData";
import AnimationChangePage from "../../layout/AnimationChangePage";

function createData(id, name, birthday, nameMajor, year, idMajor, uuid) {
  return {
    id,
    name,
    birthday: formatDate(birthday),
    nameMajor,
    year,
    idMajor,
    uuid,
  };
}

const Teacher = () => {
  const { teachersList, loading } = useSelector((state) => state.teachers);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      teachersList
        ? teachersList.map((item) => {
            return createData(
              item.teacherCode,
              item.name,
              item.birthday,
              item.nameMajor,
              formatYear(item.year),
              item.majorCode,
              item.uuid
            );
          })
        : []
    );
  }, [teachersList]);

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
            headCells={headCellsTeacher}
            rows={data}
            nameButton="Create Student"
            nameTable="List TEACHERS"
            optionSearch="id"
            link="teachers"
          />
        )}
      </Box>
    </AnimationChangePage>
  );
};

export default Teacher;
