import React from "react";
import PropTypes from "prop-types";

import { motion } from "framer-motion";

import { Animation } from "../Animation";

import { Box, Grid } from "@mui/material";

import TableDashboard from "./TableDashboard";
import NoticeDashboard from "./NoticeDashboard";

function createData(id, name, marks, percentage, year) {
  return { id, name, marks, percentage, year };
}

const rows = [
  createData(1, "Frozen yoghurt", 10, "100%", 2021),
  createData(2, "Ice cream sandwich", 9.9, "99%", 2020),
  createData(3, "Eclair", 9.8, "98%", 2021),
  createData(4, "Cupcake", 9.8, "98%", 2020),
  createData(5, "Gingerbread", 9.7, "97%", 2020),
  createData(6, "Frozen yoghurt", 10, "100%", 2021),
  createData(7, "Ice cream sandwich", 9.9, "99%", 2020),
  createData(8, "Eclair", 9.8, "98%", 2021),
];

const notice = [
  { title: "Photos", date: "Jan 9, 2014" },
  { title: "Photos", date: "Jan 9, 2014" },
  { title: "Photos", date: "Jan 9, 2014" },
  { title: "Photos", date: "Jan 9, 2014" },
  { title: "Photos", date: "Jan 9, 2014" },
  { title: "Photos", date: "Jan 9, 2014" },
];

const BodyDashboard = (props) => {
  const { classes } = props;
  return (
    <Box className={classes.componentChildDashboard}>
      <motion.div variants={Animation.cardAnimation} animate="show" exit="hide">
        <Grid
          container
          spacing={{ xs: 2, md: 8 }}
          columns={{ xs: 4, sm: 4, md: 12 }}
          style={{ margin: "auto" }}
        >
          <Grid item xs={2} sm={4} md={5.5}>
            <TableDashboard data={rows} />
          </Grid>
          <Grid item xs={2} sm={4} md={5.5}>
            <NoticeDashboard classes={classes} data={notice} />
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

BodyDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default BodyDashboard;
