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
import { listItemClasses } from "@mui/material/ListItem";
import { makeStyles } from "@mui/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import SubjectIcon from "@mui/icons-material/Subject";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  drawerPaper: {
    width: "inherit",
    background: "#0e1723",
  },
  listItemStyle: {
    background: "#000",
  },
  link: {
    textDecoration: "none",
    color: "#03e9f4",
    "&:hover": {
      color: "#03e9f4",
    },
  },
  icon: {
    color: "#03e9f4",
  },
  navigationSpacer: {
    flex: 1,
  },
  boxAvatar: {
    height: "300px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100px",
    height: "100px",
    margin: "auto",
    fontSize: "50px",
  },
}));

const defaultList = {
  [`& .active, & .${listItemClasses.root}:hover`]: {
    color: "#03e9f4",
    fontWeight: "bold",
    background: "#000",
    "& svg": {
      fill: "#03e9f4",
    },
  },
};

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
      name: "Subject",
      icon: <SubjectIcon className={classes.icon} />,
      path: "/subject",
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
              <ListItemText primary="Dao Vinh Khuong" />
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
                className={item.path === pathname && classes.listItemStyle}
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
