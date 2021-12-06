import React from "react";
import PropTypes from "prop-types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableDashboard = (props) => {
  const { data } = props;
  return (
    <TableContainer component={Paper} style={{ minHeight: "100%" }}>
      <h5
        style={{
          textAlign: "center",
          padding: "15px 0",
          background: "#ddd",
        }}
      >
        Start Students
      </h5>
      <Table sx={{ minWidth: "50%" }} aria-label="simple table">
        <TableHead style={{ background: "#ddd" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">Marks</TableCell>
            <TableCell align="center">Percentage</TableCell>
            <TableCell align="center">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => b.marks - a.marks)
            .map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">{row.marks}</TableCell>
                <TableCell align="center">{row.percentage}</TableCell>
                <TableCell align="center">{row.year}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableDashboard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableDashboard;
