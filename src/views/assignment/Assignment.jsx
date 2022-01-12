import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import methodApi from "../../api/methodApi";

import { pageVariants, pageTransition } from "../../components/Animation";

import { Stack } from "@mui/material";

import useChangeDataTable from "../../customize/changeDataTable";
import {
  optionFilterDefault,
  optionFilterSubject,
} from "../../components/OptionFilterData";
import OptionAssignment from "../../components/assignment/OptionAssignment";
import RenderDataChoose from "../../components/assignment/RenderDataChoose";
import BasicTabs from "../../components/basicTab/BasicTabs";

const HOMEROOM_TEACHER = "HT";
const SUBJECT_TEACHER = "ST";

const optionAssignment = [
  { name: "Homeroom teacher", value: HOMEROOM_TEACHER },
  { name: "Subject teacher", value: SUBJECT_TEACHER },
];

const semesterData = [
  { name: "I", value: 1 },
  { name: "II", value: 2 },
  { name: "III", value: 3 },
  { name: "IV", value: 4 },
  { name: "V", value: 5 },
  { name: "VI", value: 6 },
];

const Assignment = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(0);
  const rows = useChangeDataTable({ isOpen });

  const [filteredData, setFilteredData] = useState(rows);
  const [searchedData, setSearchedData] = useState(filteredData);
  const [activeFilters, setActiveFilters] = useState([]);

  const [option, setOption] = useState(HOMEROOM_TEACHER);
  const [hideButton, setHideButton] = useState(true);
  const [activeAssignment, setActiveAssignment] = useState([]);
  const [optionSearch, setOptionSearch] = useState({
    name: "Search Class Name",
    value: "className",
  });
  const [optionFilter, setOptionFilter] = useState(optionFilterDefault);
  const [semester, setSemester] = useState(1);

  useEffect(() => {
    setHideButton(option === HOMEROOM_TEACHER ? true : false);
    setActiveAssignment(
      option !== HOMEROOM_TEACHER
        ? (currentState) => currentState
        : (currentState) =>
            currentState.filter((item) => item.name.toLowerCase() !== "subject")
    );
    if (option === HOMEROOM_TEACHER && isOpen === 2) {
      setIsOpen(0);
    }
  }, [option, isOpen]);

  useEffect(() => {
    if (isOpen === 0) {
      setOptionFilter(optionFilterDefault);
      setOptionSearch({ name: "Search Class Name", value: "className" });
    } else {
      setOptionSearch(
        isOpen === 1
          ? { name: "Search ID Teacher", value: "id" }
          : { name: "Search ID Subject", value: "id" }
      );
      setOptionFilter(isOpen === 1 ? optionFilterDefault : optionFilterSubject);
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredData([...rows]);
      return;
    }

    let finalData = [...rows];

    const yearData = activeFilters.find(
      (element) =>
        element.name.toLowerCase() === "year" &&
        `${element.value}`.toLowerCase() !== "all"
    );

    if (yearData) {
      // Do some filtering for first select/dropdown
      const { value } = yearData;
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((x) => x.year === value);
    }
    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const majorData = activeFilters.find(
      (element) =>
        element.name.toLowerCase() === "major" &&
        `${element.value}`.toLowerCase() !== "all"
    );
    if (majorData) {
      // Do some filtering for second select/dropdown
      const { value } = majorData;
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((x) => x.idMajor === value);
    }

    const semesterData = activeFilters.find(
      (element) =>
        element.name.toLowerCase() === "semester" &&
        `${element.value}`.toLowerCase() !== "all"
    );
    if (semesterData) {
      // Do some filtering for second select/dropdown
      const { value } = semesterData;
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((x) => x.semester === value);
    }

    setFilteredData(finalData);
  }, [activeFilters, rows]);

  useEffect(() => {
    setSearchedData(filteredData);
  }, [filteredData]);

  const handleChangeOption = (e) => {
    const { target } = e;
    setOption(target.value);
  };

  const handleSearch = (newFilter) => {
    const { searchTerm } = newFilter;

    setSearchedData(
      searchTerm.trim() === ""
        ? [...filteredData]
        : filteredData.filter((item) =>
            item[optionSearch.value]
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
    );
  };

  const handleChangeAssignmentData = (data) => {
    const isInFilter = activeAssignment.some(
      (element) => element.name === data.name
    );

    if (!isInFilter) {
      setActiveAssignment((currentState) => {
        return [...currentState, { name: data.name, value: data.value }];
      });
    } else {
      setActiveAssignment((currentState) => {
        return [
          ...currentState.filter((x) => x.name !== data.name),
          { name: data.name, value: data.value },
        ];
      });
    }
  };

  const handleFilterChange = (event) => {
    const { target } = event;

    const isInFilter = activeFilters.some(
      (element) => element.name === target.name
    );

    if (!isInFilter) {
      setActiveFilters((currentState) => {
        return [...currentState, { name: target.name, value: target.value }];
      });
    } else {
      setActiveFilters((currentState) => {
        return [
          ...currentState.filter((x) => x.name !== target.name),
          { name: target.name, value: target.value },
        ];
      });
    }
  };

  const handleChangeValueButton = (e, newValue) => {
    setIsOpen(newValue);
  };

  const handleChangeSemester = (e) => {
    setSemester(e.target.value);
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    try {
      let config;
      if (option === HOMEROOM_TEACHER) {
        config = {
          teacherCode: activeAssignment.find(
            (obj) => obj.name.toLowerCase() === "teacher"
          ).value.uuid,
          classCode: activeAssignment.find(
            (obj) => obj.name.toLowerCase() === "class"
          ).value.id,
          typeAssignment: 0,
        };
      } else {
        config = {
          teacherCode: activeAssignment.find(
            (obj) => obj.name.toLowerCase() === "teacher"
          ).value.uuid,
          classCode: activeAssignment.find(
            (obj) => obj.name.toLowerCase() === "class"
          ).value.id,
          subjectCode: activeAssignment.find(
            (obj) => obj.name.toLowerCase() === "subject"
          ).value.id,
          semester: +semester,
          typeAssignment: 1,
        };
      }

      const res = await methodApi.post("/api/assignment", config);

      if (res.status === 400) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
        return;
      }

      enqueueSnackbar(res.msg, { variant: "success" });
      setActiveAssignment([]);
    } catch (err) {
      err.response.data.msg &&
        enqueueSnackbar(err.response.data.msg, { variant: "error" });
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      style={{ height: "100%" }}
    >
      <Stack
        // direction="row"
        style={{
          height: "100%",
        }}
      >
        <OptionAssignment
          optionFilter={optionFilter}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          option={option}
          handleChangeOption={handleChangeOption}
          optionAssignment={optionAssignment}
          nameSearch={optionSearch.name}
        />
        <Stack
          direction="row"
          style={{
            height: "100%",
          }}
        >
          <RenderDataChoose
            data={activeAssignment}
            semesterData={semesterData}
            semester={semester}
            handleChangeSemester={handleChangeSemester}
            handleSubmitAssignment={handleSubmitAssignment}
          />
          <BasicTabs
            searchedData={searchedData}
            handleChangeAssignmentData={handleChangeAssignmentData}
            hideButton={hideButton}
            handleChangeValueButton={handleChangeValueButton}
            isOpen={isOpen}
          />
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default Assignment;
