import { Fragment } from "react";
import { useLocation, Link, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppMenuBar from "../components/app-bar";
import Container from "../components/container";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SchoolTiming from "../components/school-timing";
import DateSheet from "../components/student-date-sheet";
import TimeTable from "../components/student-time-table";
import EventsList from "../components/student-events";
import Fee from "../components/student-fee";
import OnlineClass from "../components/student-online-class";
import Attendence from "../components/student-attendence";
import Dashboard from "../components/student-dashboard";
import {
  CourcesHome,
  LessonsList,
  Lesson,
} from "../components/student-cources";
import { ResultsHomePage, TermResult } from "../components/student-results";
import {
  NewLeaveApplication,
  LeaveApplicationList,
} from "../components/student-leave-application";
import { ChangePassword, Profile } from "../components/student-profile";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `1rem 0 1.5rem 0`,
  },
  link: {
    color: `${theme.typography.body1.color}`,
    cursor: "pointer",

    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function StudentDashboard() {
  const classes = useStyles();
  const location = useLocation();

  const links = getLinksFromLocation(location.pathname);
  return (
    <Fragment>
      <AppMenuBar />
      <Container>
        {links[0] && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={classes.root}
          >
            <Link to="/portal/sudent" style={{ textDecoration: "none" }}>
              <Typography className={classes.link} color="textPrimary">
                Student
              </Typography>
            </Link>
            {links.map((link, index) => (
              <Typography key={link + index} color="textPrimary">
                {link}
              </Typography>
            ))}
          </Breadcrumbs>
        )}
        <Route
          exact
          path="/portal/student/school-timing"
          component={SchoolTiming}
        />
        <Route exact path="/portal/student/date-sheet" component={DateSheet} />
        <Route exact path="/portal/student/time-table" component={TimeTable} />
        <Route
          exact
          path="/portal/student/leave-application"
          component={NewLeaveApplication}
        />
        <Route
          exact
          path="/portal/student/leave-application-list"
          component={LeaveApplicationList}
        />
        <Route exact path="/portal/student/events" component={EventsList} />
        <Route exact path="/portal/student/fee-status" component={Fee} />
        <Route exact path="/portal/student/classes" component={OnlineClass} />
        <Route
          exact
          path="/portal/student/results"
          component={ResultsHomePage}
        />
        <Route
          exact
          path="/portal/student/results/:Term"
          component={TermResult}
        />
        <Route exact path="/portal/student/attendence" component={Attendence} />
        <Route exact path="/portal/student/cources" component={CourcesHome} />
        <Route
          exact
          path="/portal/student/cources/:Subject"
          component={LessonsList}
        />
        <Route
          exact
          path="/portal/student/cources/:Subject/:LessonName"
          component={Lesson}
        />
        <Route
          exact
          path="/portal/student/profile/change-password"
          component={ChangePassword}
        />
        <Route exact path="/portal/student/profile" component={Profile} />
        <Route exact path="/portal/student" component={Dashboard} />
      </Container>
    </Fragment>
  );
}

function getLinksFromLocation(pathname) {
  let location = pathname.replace("/portal/student", "");
  if (location[0] === "/") location = location.slice(1);
  let required = [];

  if (location.length) {
    const paths = location.split("/");
    const modified = paths.map((el) => {
      return el.replace("-", " ");
    });
    required = [...modified];
  }

  return required;
}

export default StudentDashboard;
