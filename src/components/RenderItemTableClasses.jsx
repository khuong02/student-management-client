import React from "react";
import PropTypes from "prop-types";

import TableCell from "@mui/material/TableCell";

const RenderItemTableClasses = (props) => {
  const { item } = props;
  return (
    <>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.idTeacher}</TableCell>
      <TableCell>{item.quantityStudent}</TableCell>
      <TableCell>{item.nameMajor}</TableCell>
      <TableCell>{item.year}</TableCell>
    </>
  );
};

RenderItemTableClasses.propTypes = {
  item: PropTypes.object.isRequired,
};

RenderItemTableClasses.defaultProps = {
  item: {},
};

export default RenderItemTableClasses;
