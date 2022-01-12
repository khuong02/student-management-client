import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Visibility from "@mui/icons-material/Visibility";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

import { getComparator, stableSort } from "./Sort";
import ButtonCreateClasses from "../ButtonCreateClasses";

EnhancedTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  optionFilterData: PropTypes.array.isRequired,
  nameButton: PropTypes.string.isRequired,
  nameTable: PropTypes.string.isRequired,
  optionSearch: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

EnhancedTable.defaultProps = {
  headCells: [],
  rows: [],
  optionFilterData: [],
  FormCreate: null,
  nameButton: "",
  nameTable: "",
  optionSearch: "",
  link: "",
};

export default function EnhancedTable(props) {
  const {
    headCells,
    rows,
    FormCreate,
    nameButton,
    nameTable,
    optionSearch,
    optionFilterData,
    link,
  } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState(rows);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchedData, setSearchedData] = useState(filteredData);
  //   const [deleteData, setDeleteData] = useState([]);

  //   const handleDelete = (newItem) => {
  //     setDeleteData((currentItem) => [...currentItem, newItem]);
  //   };

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
            item[optionSearch].toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
      {selected.length === 0 && FormCreate !== null && (
        <ButtonCreateClasses FormCreate={FormCreate} nameButton={nameButton} />
      )}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          numSelected={selected.length}
          nameTable={nameTable}
          optionFilterData={optionFilterData}
          FormCreate={FormCreate}
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
              headCells={headCells}
              rows={rows}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell>Not allow classes</TableCell>
                </TableRow>
              )}
              {stableSort(searchedData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const keys = Object.keys(row);
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
                        id={row.id}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      {keys
                        .filter(
                          (key) =>
                            key !== "idMajor" && key !== "id" && key !== "uuid"
                        )
                        .map((key, index) => {
                          return (
                            <TableCell key={`${key.id}${index}`}>
                              {row[key]}
                            </TableCell>
                          );
                        })}
                      <TableCell align="right">
                        <Link
                          className="link-views-classes"
                          to={`/${link}/${row.uuid}`}
                        >
                          <Visibility />
                        </Link>
                      </TableCell>
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
