import { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import Badge from "@material-ui/core/Badge";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import LockIcon from "@material-ui/icons/Lock";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Menu from "@material-ui/core/Menu";
import PersonIcon from "@material-ui/icons/Person";
import Drawer from "../student-drawer";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { LOGOUT_USER } from "../../store/constants/auth";
import Logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  dropDownMenuIcon: {
    marginRight: ".5rem",
    color: "#666",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logo: {
    width: "3rem",
    height: "auto",
    marginRight: ".5rem",
  },
  avatar: {
    width: "3rem",
    height: "3rem",
    padding: ".1rem",
    borderRadius: "5rem",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
}));

export default function TopMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className={classes.headerContainer}>
              <img className={classes.logo} src={Logo} alt="logo" />
              <Typography className={classes.title} variant="h6" noWrap>
                School LMS
              </Typography>
            </div>
          </Link>
          <div className={classes.grow} />
          <Typography>{user.displayName || ""}</Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

          <IconButton
            color="inherit"
            aria-controls="drop-down-menu"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <img className={classes.avatar} src={user.avatar} alt="account" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="drop-down-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        style={{ margin: "2.8rem 0 0 .5rem" }}
      >
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/portal/student/profile"
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <PersonIcon className={classes.dropDownMenuIcon} />
            My Account
          </MenuItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/portal/student/profile/change-password"
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <LockIcon className={classes.dropDownMenuIcon} />
            Change Password
          </MenuItem>
        </Link>
        <MenuItem onClick={() => dispatch({ type: LOGOUT_USER })}>
          <ExitToAppIcon className={classes.dropDownMenuIcon} />
          Logout
        </MenuItem>
      </Menu>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      />
    </div>
  );
}
