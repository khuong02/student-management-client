import React from "react";

import { useStyle } from "../../styles/useStyle";
import { Animation } from "../../components/Animation";

import { Box } from "@mui/material";

import ChildBoxDashboard from "../../components/MenuDashboard";
import BodyDashboard from "../../components/bodyDashboard/BodyDashboard";
import { menuDashboard } from "./menuDashboardData";

const Dashboard = () => {
  const classes = useStyle();
  return (
    <Box className={classes.boxDashboard}>
      <ChildBoxDashboard
        data={menuDashboard}
        classes={classes}
        animation={Animation}
      />
      <BodyDashboard classes={classes} />
    </Box>
  );
};

export default Dashboard;
