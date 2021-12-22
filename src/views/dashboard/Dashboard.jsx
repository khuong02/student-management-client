import React from "react";

import { useStyle } from "../../styles/useStyle";
import { Animation } from "../../components/Animation";

import { Box } from "@mui/material";

import ChildBoxDashboard from "../../components/MenuDashboard";
import BodyDashboard from "../../components/bodyDashboard/BodyDashboard";
import { menuDashboard } from "./menuDashboardData";

// const dataChart = [
//   {
//     name: "User",
//     data: {
//       labels: ["darkorange", "ccc"],
//       datasets: [
//         {
//           data: [4, 100],
//           backgroundColor: ["darkorange", "#ccc"],
//         },
//       ],
//       borderWidth: 1,
//     },
//   },
//   {
//     name: "User",
//     data: {
//       labels: ["darkorange", "ccc"],
//       datasets: [
//         {
//           data: [4, 100],
//           backgroundColor: ["darkorange", "#ccc"],
//         },
//       ],
//       borderWidth: 1,
//     },
//   },
//   {
//     name: "User",
//     data: {
//       labels: ["darkorange", "ccc"],
//       datasets: [
//         {
//           data: [4, 100],
//           backgroundColor: ["darkorange", "#ccc"],
//         },
//       ],
//       borderWidth: 1,
//     },
//   },
//   {
//     name: "User",
//     data: {
//       labels: ["darkorange", "ccc"],
//       datasets: [
//         {
//           data: [4, 100],
//           backgroundColor: ["darkorange", "#ccc"],
//         },
//       ],
//       borderWidth: 1,
//     },
//   },
// ];

// const options = {
//   cutout: "80%",
//   animation: {
//     animateScale: true,
//   },
//   height: 205,
//   width: 205,
//   legend: {
//     labels: { fontSize: 2 },
//   },
// };

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
