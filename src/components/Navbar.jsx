import React from "react";

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

import { Link, useLocation } from "react-router-dom";

import { useStyle, defaultList } from "../styles/useStyle";

const Navbar = () => {
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
      name: "Logout",
      icon: <LogoutIcon className={classes.icon} />,
      path: "/logout",
    },
  ];

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
    </Drawer>
  );
};

export default Navbar;
