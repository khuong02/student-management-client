import React from "react";
import PropTypes from "prop-types";

import TableContainer from "@mui/material/TableContainer";

import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const NoticeDashboard = (props) => {
  const { classes, data } = props;
  return (
    <TableContainer component={Paper} style={{ minHeight: "100%" }}>
      <h5
        style={{
          textAlign: "center",
          padding: "15px 0",
          background: "#ddd",
        }}
      >
        Students Activity
      </h5>
      <List style={{ paddingLeft: "35px" }}>
        {data.length === 0 && <h3>No announcement yet</h3>}
        {data.map((item, index) => {
          return (
            <ListItem className={classes.studentActivityList} key={index}>
              <ListItemText primary={item.title} secondary={item.date} />
            </ListItem>
          );
        })}
      </List>
    </TableContainer>
  );
};

NoticeDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

NoticeDashboard.defaultProps = {
  data: [],
};

export default NoticeDashboard;
