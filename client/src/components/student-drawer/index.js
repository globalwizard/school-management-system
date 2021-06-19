import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExploreIcon from "@material-ui/icons/Explore";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import GridOnIcon from "@material-ui/icons/GridOn";
import TimerIcon from "@material-ui/icons/Timer";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import EventNoteIcon from "@material-ui/icons/EventNote";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import LinkIcon from "@material-ui/icons/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DnsIcon from "@material-ui/icons/Dns";
import CreateIcon from "@material-ui/icons/Create";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    padding: 0,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerContainerRight: {
    marginLeft: "1rem",
  },
  subInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "4rem",
    height: "4rem",
    padding: ".2rem",
    borderRadius: "5rem",
    border: "1px solid #ddd",
    margin: "1rem 0 1rem 1rem",
  },
  textBold: {
    fontWeight: "bold",
  },
  main: {
    overflow: "hidden",
  },
  dot: {
    display: "inline-block",
    width: ".5rem",
    height: ".5rem",
    borderRadius: "5rem",
    background: "#4BB543",
    marginRight: ".5rem",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Drawer({ open, onClose, onOpen }) {
  const classes = useStyles();
  const [openApplication, setOpenApplication] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const list = [
    {
      name: "Dashboard",
      link: "/portal/student",
    },
    {
      name: "Cources",
      link: "/portal/student/cources",
    },
    {
      name: "Online Class",
      link: "/portal/student/classes",
    },
    {
      name: "Attendence",
      link: "/portal/student/attendence",
    },
    {
      name: "Results",
      link: "/portal/student/results",
    },
    {
      name: "Fee Status",
      link: "/portal/student/fee-status",
    },
    {
      name: "Events",
      link: "/portal/student/events",
    },
    {
      name: "Date Sheet",
      link: "/portal/student/date-sheet",
    },
    {
      name: "Time Table",
      link: "/portal/student/time-table",
    },
    {
      name: "School Timing",
      link: "/portal/student/school-timing",
    },
    {
      name: "Leave Application",
      open: openApplication,
      toggle: () => setOpenApplication((prev) => !prev),
      nested: [
        {
          name: "New Application",
          link: "/portal/student/leave-application",
        },
        {
          name: "My Applications",
          link: "/portal/student/leave-application-list",
        },
      ],
    },
  ];

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <div className={classes.headerContainer}>
        <img className={classes.avatar} src={user.avatar} alt="account" />
        <div className={classes.headerContainerRight}>
          <Typography
            className={classes.textBold}
          >{`${user.firstName} ${user.lastName}`}</Typography>
          <div className={classes.subInfoContainer}>
            <span className={classes.dot}></span>
            <Typography style={{ fontSize: "0.9rem" }}>{user.role}</Typography>
          </div>
        </div>
      </div>
      <Divider />
      {list.map((item) =>
        item.nested ? (
          <Fragment key={item.name}>
            <ListItem button onClick={item.toggle}>
              <ListItemIcon>
                {item.name === "Leave Application" && (
                  <LocalLibraryIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {item.open ? (
                <ExpandLess color="primary" />
              ) : (
                <ExpandMore color="primary" />
              )}
            </ListItem>
            <Divider />
            <Collapse in={item.open} timeout="auto" unmountOnExit>
              <List component="span" disablePadding>
                {item.nested.map((subItem) => (
                  <Link
                    to={subItem.link}
                    key={subItem.name}
                    className={classes.link}
                  >
                    <ListItem
                      button
                      key={subItem.name}
                      onClick={onClose}
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        {subItem.name[0] === "N" &&
                        subItem.name[1] === "e" &&
                        subItem.name[2] === "w" ? (
                          <CreateIcon color="primary" />
                        ) : (
                          <DnsIcon color="primary" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={subItem.name} />
                    </ListItem>
                    <Divider />
                  </Link>
                ))}
              </List>
            </Collapse>
          </Fragment>
        ) : (
          <List onClick={onClose} key={item.name} className={classes.list}>
            <Link to={item.link} className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  {item.name === "Dashboard" && (
                    <DashboardIcon color="primary" />
                  )}
                  {item.name === "Cources" && <MenuBookIcon color="primary" />}
                  {item.name === "Attendence" && (
                    <FingerprintIcon color="primary" />
                  )}
                  {item.name === "Results" && <ExploreIcon color="primary" />}
                  {item.name === "Events" && <EventNoteIcon color="primary" />}
                  {item.name === "Date Sheet" && (
                    <TimelapseIcon color="primary" />
                  )}
                  {item.name === "Online Class" && <LinkIcon color="primary" />}
                  {item.name === "Time Table" && <GridOnIcon color="primary" />}
                  {item.name === "Fee Status" && <MoneyIcon color="primary" />}
                  {item.name === "School Timing" && (
                    <TimerIcon color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
            <Divider />
          </List>
        )
      )}
    </SwipeableDrawer>
  );
}

export default Drawer;
