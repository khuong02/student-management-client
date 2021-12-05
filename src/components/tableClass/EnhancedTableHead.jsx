import React from "react";
import PropTypes from "prop-types";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID CLASSES",
  },
  {
    id: "className",
    numeric: true,
    disablePadding: false,
    label: "CLASS NAME",
  },
  {
    id: "quantityStudent",
    numeric: false,
    disablePadding: false,
    label: "QUANTITY STUDENT",
  },
  {
    id: "nameMajor",
    numeric: true,
    disablePadding: false,
    label: "NAME MAJOR",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: false,
    label: "YEAR",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
