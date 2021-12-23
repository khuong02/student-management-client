// import PersonIcon from "@mui/icons-material/Person";
// import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ClassIcon from "@mui/icons-material/Class";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SubjectIcon from "@mui/icons-material/Subject";
import GroupsIcon from "@mui/icons-material/Groups";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

export const menuDashboard = [
  {
    title: "Classes",
    path: "/classes",
    icon: <ClassIcon style={{ fontSize: "50px" }} />,
    style: {
      background: " linear-gradient(120deg, #0fd850 0%, #f9f047 100%)",
      color: "#fff",
    },
  },
  {
    title: "Subjects",
    path: "/subjects",
    icon: <SubjectIcon style={{ fontSize: "50px" }} />,
    style: {
      background: "linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)",
      color: "#fff",
    },
  },
  {
    title: "Students",
    path: "/students",
    icon: <GroupsIcon style={{ fontSize: "50px" }} />,
    style: {
      background:
        "linear-gradient(120deg, rgb(237 119 164) 0%, rgb(168, 237, 234) 100%)",
      color: "#fff",
    },
  },
  {
    title: "Teachers",
    path: "/teachers",
    icon: <AccessibilityIcon style={{ fontSize: "50px" }} />,
    style: {
      background: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
      color: "#fff",
    },
  },
  {
    title: "Major",
    path: "/major",
    icon: <AssuredWorkloadIcon style={{ fontSize: "50px" }} />,
    style: {
      background: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)",
      color: "#fff",
    },
  },
];
