import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { pageVariants, pageTransition } from "../../components/Animation";

import { Stack, Box } from "@mui/material";

import TableVirtualized from "../../components/TableVirtualized";
import Option from "../../components/table/Option";

const sample = [
  ["1", "CDTH18A", "TH", 2019, "01"],
  ["2", "CDTH19B", "TH", 2019, "01"],
  ["3", "CDCK20C", "CK", 2020, "02"],
  ["4", "CDCK20D", "CK", 2020, "02"],
  ["5", "CDTH20E", "TH", 2020, "01"],
];

function createData(id, className, nameMajor, year, idMajor) {
  return {
    id,
    className,
    nameMajor,
    year,
    idMajor,
  };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(...randomSelection));
}

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

const Assignment = () => {
  const [searchedData, setSearchedData] = useState(rows);
  const [filteredData, setFilteredData] = useState(rows);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleSearch = (newFilter) => {
    const { searchTerm } = newFilter;

    setSearchedData(
      searchTerm.trim() === ""
        ? [...rows]
        : rows.filter((item) =>
            item.className.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
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

    setFilteredData(finalData);
  }, [activeFilters]);

  useEffect(() => {
    setSearchedData(filteredData);
  }, [filteredData]);

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
        direction="row"
        style={{
          height: "100%",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   margin: "auto",
        }}
      >
        <Box style={{ width: "50%" }}>
          <Option
            optionFilterData={optionFilterData}
            handleFilterChange={handleFilterChange}
            handleSearch={handleSearch}
            nameSearch="Search Class Name"
          />
        </Box>
        <Box style={{ width: "50%" }}>
          <TableVirtualized data={searchedData} />
        </Box>
      </Stack>
    </motion.div>
  );
};

export default Assignment;
