import { makeStyles } from "@mui/styles";

import { experimentalStyled as styled } from "@mui/material/styles";
import { listItemClasses } from "@mui/material/ListItem";
import { Paper, Badge } from "@mui/material";

export const useStyle = makeStyles((theme) => ({
  grid: {
    // transition: "0.2s ease-in-out",
    // transform: "scale(0.98)",
    // "&:hover": { transform: "scale(1)" },
  },
  input: {},
  gridChart: {
    margin: "auto",
    paddingLeft: "0!important",
    paddingRight: "0!important",
  },
  drawerPaper: {
    width: "inherit",
    background: "#0e1723",
  },
  listItemStyle: {
    background: "#000",
  },
  link: {
    textDecoration: "none",
    display: "inline-block",
    width: "100%",
    color: "#03e9f4",
    "&:hover": {
      color: "#03e9f4",
    },
  },
  icon: {
    color: "#03e9f4",
  },
  navigationSpacer: {
    flex: "1",
  },
  boxAvatar: {
    height: "250px",
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
  boxDashboard: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  componentChildDashboard: {
    // height: "50%",
    padding: "0 2%",
    // flexGrow: "1",
    "&:nth-child(1)": {},
  },
  studentActivityList: {
    borderLeft: "2px solid #e4e8eb",
    position: "relative",
    // paddingTop: 0,
    // paddingBottom: 0,
    "&:after": {
      content: "''",
      display: "block",
      position: "absolute",
      top: "0",
      left: "-7px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: "#18aefa",
    },
    // "& div": {
    //   margin: "13px",
    // },
    textField: {
      width: "auto",
      fontSize: 11,
    },
    resize: {
      fontSize: 11,
    },
  },
}));

export const defaultList = {
  [`& .active, & .${listItemClasses.root}:hover`]: {
    color: "#03e9f4",
    fontWeight: "bold",
    background: "#000",
    "& svg": {
      fill: "#03e9f4",
    },
  },
};

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  //   opacity: "",
  transition: ".15s ease-in-out",
  //   transform: "scale(0.98)",
  //   fontSize: "20px",
  "&:hover": {
    opacity: "0.8",
  },
}));

export const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      ...(theme.direction === "rtl" && {
        paddingLeft: "0 !important",
      }),
      ...(theme.direction !== "rtl" && {
        paddingRight: undefined,
      }),
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "pointer",
  },
});

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
