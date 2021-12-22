import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import SubjectIcon from "@mui/icons-material/Subject";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";

export const menuItems = (classes) => [
  {
    name: "Dashboard",
    icon: <DashboardIcon className={classes.icon} />,
    path: "/",
  },
  {
    name: "Classes",
    icon: <ClassIcon className={classes.icon} />,
    path: "/classes",
  },

  {
    name: "Subjects",
    icon: <SubjectIcon className={classes.icon} />,
    path: "/subjects",
  },
  {
    name: "Students",
    icon: <AccessibilityIcon className={classes.icon} />,
    path: "/students",
  },
  {
    name: "Assignment",
    icon: <AssignmentIndIcon className={classes.icon} />,
    path: "/assignment",
  },
  {
    name: "Chart",
    icon: <StackedBarChartIcon className={classes.icon} />,
    path: "/chart",
  },
];
