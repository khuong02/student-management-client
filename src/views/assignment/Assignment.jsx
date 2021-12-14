import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";

import { Stack } from "@mui/material";

import { rows, teachers, subjects } from "../../components/CreateData";
import {
  optionFilterDefault,
  optionFilterSubject,
} from "../../components/OptionFilterData";
import OptionAssignment from "../../components/assignment/OptionAssignment";
import RenderDataChoose from "../../components/assignment/RenderDataChoose";

const TableAssignmentRender = React.lazy(() =>
  import("../../components/assignment/TableAssignmentRender")
);

const optionAssignment = [
  { name: "Homeroom teacher", value: "HT" },
  { name: "Subject teacher", value: "ST" },
];

const buttonData = [
  { name: "Class", value: "CLASS" },
  { name: "Teacher", value: "TEACHER" },
];

const Assignment = () => {
  const [optionFilter, setOptionFilter] = useState(optionFilterDefault);
  const [data, setData] = useState(rows);
  const [filteredData, setFilteredData] = useState(data);
  const [searchedData, setSearchedData] = useState(filteredData);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isOpen, setIsOpen] = useState("CLASS");
  const [option, setOption] = useState("HT");
  const [hideButton, setHideButton] = useState(false);
  //   const [dataAssignment, setDataAssignment] = useState([]);
  const [activeAssignment, setActiveAssignment] = useState([]);
  const [optionSearch, setOptionSearch] = useState({
    name: "Search Class Name",
    value: "className",
  });

  useEffect(() => {
    setHideButton(option === "HT" ? false : true);
    setActiveAssignment(
      option !== "HT"
        ? (currentState) => currentState
        : (currentState) =>
            currentState.filter((item) => item.name.toLowerCase() !== "subject")
    );
  }, [option]);

  useEffect(() => {
    if (isOpen === "CLASS") {
      setData([...rows]);
      setOptionFilter(optionFilterDefault);
      setOptionSearch({ name: "Search Class Name", value: "className" });
    } else {
      setData(isOpen === "TEACHER" ? teachers : subjects);
      setOptionSearch(
        isOpen === "TEACHER"
          ? { name: "Search ID Teacher", value: "id" }
          : { name: "Search ID Subject", value: "id" }
      );
      setOptionFilter(
        isOpen === "TEACHER" ? optionFilterDefault : optionFilterSubject
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredData([...data]);
      return;
    }

    let finalData = [...data];

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
  }, [activeFilters, data]);

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

  const handleChangeValueButton = (newValue) => {
    setIsOpen(newValue);
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
          buttonData={buttonData}
          optionFilter={optionFilter}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          option={option}
          handleChangeOption={handleChangeOption}
          handleChangeValueButton={handleChangeValueButton}
          hideButton={hideButton}
          optionAssignment={optionAssignment}
          nameSearch={optionSearch.name}
        />
        <Stack
          direction="row"
          style={{
            height: "100%",
          }}
        >
          <RenderDataChoose data={activeAssignment} />

          <TableAssignmentRender
            isOpen={isOpen}
            searchedData={searchedData}
            handleChangeAssignmentData={handleChangeAssignmentData}
          />
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default Assignment;
