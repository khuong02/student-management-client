import React from "react";

import { Box } from "@mui/material";

import Notice from "../components/Notice";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

const drawerWidth = 340;

const DefaultLayout = () => {
  return (
    <Box style={{ height: "100vh" }}>
      <Notice drawerWidth={drawerWidth} />
      <Box style={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <Navbar />
        <Body />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
