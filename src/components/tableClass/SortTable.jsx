import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

import { getComparator, stableSort } from "./Sort";

function createData(id, className, quantityStudent, nameMajor, year, idMajor) {
  return {
    id,
    className,
    quantityStudent,
    nameMajor,
    year,
    idMajor,
  };
}

const rows = [
  createData(1, "CDTH18A", 100, "TH", 2018, "01"),
  createData(2, "CDTH19B", 102, "TH", 2019, "01"),
  createData(3, "CDTH20C", 90, "TH", 2020, "01"),
  createData(4, "CDTH20D", 98, "TH", 2020, "01"),
  createData(5, "CDTH20E", 80, "TH", 2020, "01"),
  createData(6, "CDCK20A", 120, "CK", 2020, "02"),
  createData(7, "CDCK20E", 90, "CK", 2020, "02"),
  createData(8, "CDKT20A", 98, "KT", 2020, "03"),
  createData(9, "CDKT20C", 90, "KT", 2020, "03"),
  createData(10, "CDKT20C", 90, "KT", 2020, "03"),
  createData(11, "CDKT20C", 90, "KT", 2020, "03"),
  createData(12, "CDKT20C", 90, "KT", 2020, "03"),
  createData(13, "CDKT20C", 90, "KT", 2020, "03"),
  createData(14, "CDKT20C", 90, "KT", 2020, "03"),
  createData(15, "CDKT20C", 90, "KT", 2020, "03"),
];

export default function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState(rows);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchedData, setSearchedData] = useState(filteredData);

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

  const handleSearch = (newFilter) => {
    const { searchTerm } = newFilter;
    setSearchedData(
      searchTerm.trim() === ""
        ? [...filteredData]
        : filteredData.filter((item) =>
            item.className.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(searchedData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell align="center">
                        {row.quantityStudent}
                      </TableCell>
                      <TableCell>{row.nameMajor}</TableCell>
                      <TableCell>{row.year}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={searchedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
