import React from "react";
import PropTypes from "prop-types";

import TableCell from "@mui/material/TableCell";

const RenderItemTableSubjects = (props) => {
  const { item } = props;
  return (
    <>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.nameMajor}</TableCell>
      <TableCell>{item.semester}</TableCell>
    </>
  );
};

RenderItemTableSubjects.propTypes = {
  item: PropTypes.object.isRequired,
};

RenderItemTableSubjects.defaultProps = {
  item: {},
};

export default RenderItemTableSubjects;
