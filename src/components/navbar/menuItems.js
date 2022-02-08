import ClassIcon from "@mui/icons-material/Class";
import SubjectIcon from "@mui/icons-material/Subject";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import GroupsIcon from "@mui/icons-material/Groups";

export const menuItems = (classes) => [
  {
    name: "Dashboard",
    icon: <DashboardIcon className={classes.icon} />,
    path: "/teacher",
  },
  {
    name: "Classes",
    icon: <ClassIcon className={classes.icon} />,
    path: "/teacher/classes",
  },
  {
    name: "Subjects",
    icon: <SubjectIcon className={classes.icon} />,
    path: "/teacher/subjects",
  },
  {
    name: "Students",
    icon: <GroupsIcon className={classes.icon} />,
    path: "/teacher/students",
  },
  {
    name: "Teachers",
    icon: <AccessibilityIcon className={classes.icon} />,
    path: "/teacher/teachers",
  },
  {
    name: "Majors",
    icon: <AssuredWorkloadIcon className={classes.icon} />,
    path: "/teacher/majors",
  },
  {
    name: "Assignment",
    icon: <AssignmentIndIcon className={classes.icon} />,
    path: "/teacher/assignment",
  },
  // {
  //   name: "Chart",
  //   icon: <StackedBarChartIcon className={classes.icon} />,
  //   path: "/chart",
  // },
];
