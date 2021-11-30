import React from "react";

import { Box } from "@mui/material";

import Notice from "../components/Notice";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

const drawerWidth = 340;

const DefaultLayout = () => {
  return (
    <Box>
      <Notice drawerWidth={drawerWidth} />
      <Box style={{ display: "flex" }}>
        <Navbar />
        <Body />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
