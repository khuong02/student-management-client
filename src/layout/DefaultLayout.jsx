import React from "react";

import { Box } from "@mui/material";

import Notice from "../components/Notice";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

const drawerWidth = 340;

const DefaultLayout = () => {
  return (
    <Box style={{ height: "100vh" }} sx={{ display: "flex" }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Notice drawerWidth={drawerWidth} />
        <Box
          style={{
            height: "calc(100% - 64px)",
            overflow: "hidden",
          }}
        >
          <Body />
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
