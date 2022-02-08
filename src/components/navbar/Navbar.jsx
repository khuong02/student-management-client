import React, { useEffect, useState } from "react";
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

import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation } from "react-router-dom";

import { useStyle, defaultList } from "../../styles/useStyle";
import { menuItems } from "./menuItems";
import methodApi from "../../api/methodApi";
import { logoutSuccess } from "../../features/auth";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyle();
  const { pathname } = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    const len = pathname.split("/").length;

    if (len < 2) setPath(pathname);
    else setPath(pathname.split("/").slice(0, len).join("/"));
  }, [pathname]);

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
        <Link to={`/user/${currentUser.uuid}`} className={classes.link}>
          {/* <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
          </StyledBadge> */}
          <Avatar className={classes.avatar}>K</Avatar>
          <List>
            <ListItem>
              <ListItemText
                style={{ textAlign: "center" }}
                primary={`${currentUser.name}`}
              />
            </ListItem>
          </List>
        </Link>
      </Box>
      {menuItems(classes).map((item, index) => {
        return (
          <List key={index} sx={defaultList} style={{ paddingTop: 0 }}>
            <Link to={item.path} className={classes.link}>
              <ListItem
                button
                className={item.path === path ? classes.listItemStyle : ""}
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
        style={{ color: "#03e9f4", paddingTop: 0 }}
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
