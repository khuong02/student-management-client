import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import SubjectIcon from "@mui/icons-material/Subject";
import LogoutIcon from "@mui/icons-material/Logout";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";

import { Link, useLocation } from "react-router-dom";

import { useStyle, defaultList } from "../styles/useStyle";
import methodApi from "../api/methodApi";
import { logoutSuccess } from "../features/auth";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyle();
  const { pathname } = useLocation();

  const menuItems = [
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

  const handleLogout = async () => {
    try {
      await methodApi.delete("api/user/logout", currentUser.uuid);
      dispatch(logoutSuccess());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Drawer
      variant="persistent"
      style={{ width: "340px" }}
      open={true}
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      <Box className={classes.boxAvatar}>
        <Link to="/user/profile" className={classes.link}>
          <Avatar className={classes.avatar}>K</Avatar>
          <List>
            <ListItem>
              <ListItemText
                style={{ textAlign: "center" }}
                primary="Dao Vinh Khuong"
              />
            </ListItem>
          </List>
        </Link>
      </Box>
      {menuItems.map((item, index) => {
        return (
          <List key={index} sx={defaultList}>
            <Link to={item.path} className={classes.link}>
              <ListItem
                button
                className={item.path === pathname ? classes.listItemStyle : ""}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          </List>
        );
      })}
      <List
        sx={defaultList}
        onClick={handleLogout}
        style={{ color: "#03e9f4" }}
      >
        <ListItem button>
          <ListItemIcon>
            <LogoutIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;
