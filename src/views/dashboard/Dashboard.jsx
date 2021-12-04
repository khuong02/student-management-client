import React from "react";

import { useStyle } from "../../styles/useStyle";
import { Animation } from "../../components/Animation";

import { Box } from "@mui/material";

import ChildBoxDashboard from "../../components/MenuDashboard";
import BodyDashboard from "../../components/bodyDashboard/BodyDashboard";

import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";

const menuDashboard = [
  {
    title: "User",
    path: "/user/profile",
    icon: <PersonIcon style={{ fontSize: "50px" }} />,
    style: {
      background: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
      color: "#fff",
    },
  },
  {
    title: "Classes",
    path: "/classes",
    icon: <ClassIcon style={{ fontSize: "50px" }} />,
    style: {
      background: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
      color: "#fff",
    },
  },
  //   {
  //     title: "Subjects",
  //     path: "/subjects",
  //     icon: <SubjectIcon style={{ fontSize: "50px" }} />,
  //     style: {
  //       background: "linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)",
  //       color: "#fff",
  //     },
  //   },
  {
    title: "Students",
    path: "/students",
    icon: <AccessibilityIcon style={{ fontSize: "50px" }} />,
    style: {
      background:
        "linear-gradient(120deg, rgb(237 119 164) 0%, rgb(168, 237, 234) 100%)",
      color: "#fff",
    },
  },
  {
    title: "Chart",
    path: "/chart",
    icon: <StackedBarChartIcon style={{ fontSize: "50px" }} />,
    style: {
      background: "linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)",
      color: "#fff",
    },
  },
  //   {
  //     title: "Settings",
  //     path: "/settings",
  //     icon: <SettingsIcon style={{ fontSize: "50px" }} />,
  //     style: {
  //       background: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)",
  //       color: "#fff",
  //     },
  //   },
];

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
      {/* <DoughnutDashboard
        data={dataChart}
        classes={classes}
        options={options}
        animation={Animation}
      /> */}
    </Box>
  );
};

export default Dashboard;
