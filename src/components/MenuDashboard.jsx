import React from "react";
import PropTypes from "prop-types";

import { Item } from "../styles/useStyle";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Grid } from "@mui/material";

const MenuDashboard = (props) => {
  const { data, classes, animation } = props;
  return (
    <Box
      className={classes.componentChildDashboard}
      style={{ marginBottom: "30px" }}
    >
      {/* <motion.h3
        variants={animation.h3Animation}
        animate="show"
        exit="hide"
        style={{ textAlign: "center" }}
      >
        Dashboard
      </motion.h3> */}
      <motion.div variants={animation.gridAnimation} animate="show" exit="hide">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 5, sm: 8, md: 12 }}
          style={{ paddingTop: "1%" }}
        >
          {data.map((item, index) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={2.4}
              key={index}
              //   className={classes.grid}
            >
              <motion.div variants={animation.cardAnimation}>
                <Link to={item.path} className={classes.link}>
                  <Item style={item.style} elevation={12}>
                    {item.icon}
                    {item.title}
                  </Item>
                </Link>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

MenuDashboard.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  animation: PropTypes.object.isRequired,
};

export default MenuDashboard;
