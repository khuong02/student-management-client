import React from "react";
import PropTypes from "prop-types";

import { motion } from "framer-motion";
import { Box, Grid } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
  const { data, classes, options, animation } = props;
  return (
    <Box className={classes.componentChildDashboard}>
      <motion.h3
        variants={animation.h3Animation}
        animate="show"
        exit="hide"
        style={{ textAlign: "center" }}
      >
        Summary
      </motion.h3>
      <motion.div
        variants={animation.grid2Animation}
        animate="show"
        exit="hide"
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 5, sm: 8, md: 12 }}
        >
          {data.map((item, index) => {
            return (
              <Grid
                item
                xs={2}
                sm={4}
                md={2.3}
                className={classes.gridChart}
                key={index}
              >
                <motion.div variants={animation.cardAnimation}>
                  <Doughnut data={item.data} options={options} />
                  <p style={{ textAlign: "center" }}>{item.name}</p>
                  {/* <div>
                    <p>Active</p>
                    <p>Offline</p>
                    <p>Busy</p>
                    <p>Left</p>
                  </div> */}
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
    </Box>
  );
};

DoughnutChart.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  animation: PropTypes.object.isRequired,
};

DoughnutChart.defaultProps = {
  data: [],
};

export default DoughnutChart;
