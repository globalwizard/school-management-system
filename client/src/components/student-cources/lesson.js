import React from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NoData from "../no-data";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  header: {
    color: "white",
    backgroundColor: "#3F51B5",
  },
  notes: {
    padding: "1rem",
    display: "inline-block",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const classes = useStyles();

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const location = useLocation();
  const pathsArray = location.pathname.split("/");
  const dynamicId = pathsArray[pathsArray.length - 1];

  const lessonSelector = createSelector(
    (state) => state.lessons.data,
    () => dynamicId,
    (lessons, id) => lessons && lessons.find((x) => x._id === id)
  );

  const lesson = useSelector(lessonSelector);

  if (!lesson) return <NoData />;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          className={classes.header}
          onChange={(e, newValue) => setValue(newValue)}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Video Lecture" {...a11yProps(0)} />
          <Tab label="Notes" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel
          onClick={() => setValue(0)}
          value={value}
          index={0}
          dir={theme.direction}
        >
          <Typography
            component="span"
            style={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: lesson.video }}
          ></Typography>
        </TabPanel>
        <TabPanel
          onClick={() => setValue(1)}
          value={value}
          index={1}
          dir={theme.direction}
        >
          <Typography
            component="span"
            className={classes.notes}
            dangerouslySetInnerHTML={{ __html: lesson.notes }}
          ></Typography>
        </TabPanel>
      </div>
    </div>
  );
}
