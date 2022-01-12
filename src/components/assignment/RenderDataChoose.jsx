import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Stack,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const RenderDataChoose = (props) => {
  const {
    data,
    semester,
    semesterData,
    handleChangeSemester,
    handleSubmitAssignment,
  } = props;

  return (
    <Box style={{ width: "50%", height: "100%" }}>
      <Stack spacing={3} style={{ height: "100%", padding: "2%" }}>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Choose semester
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={semester}
            label="Choose semester"
            onChange={handleChangeSemester}
          >
            {semesterData.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {data.map((obj, index) => {
          const keys = Object.keys(obj.value).filter(
            (key) => key !== "idMajor" && key !== "uuid"
          );
          return (
            <TableContainer component={Paper} key={index}>
              <Table>
                <TableHead>
                  <TableRow>
                    {keys.map((key, index) => {
                      return <TableCell key={index}>{key}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {keys.map((key, index) => {
                      return (
                        <TableCell key={index}>{obj.value[key]}</TableCell>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          );
        })}
        {/* <Paper>123</Paper>
        <Paper>465</Paper>
        <Paper>789</Paper> */}
        <Button
          variant="contained"
          className="button-assignment-submit"
          onClick={handleSubmitAssignment}
        >
          Assignment
        </Button>
      </Stack>
    </Box>
  );
};

RenderDataChoose.propTypes = {
  data: PropTypes.array,
};

RenderDataChoose.defaultProps = {
  data: [],
};

export default RenderDataChoose;
