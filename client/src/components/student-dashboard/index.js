import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { makeStyles } from "@material-ui/core/styles";
import { AttendenceChart, ResultsChart } from "../charts";
import CardContent from "@material-ui/core/CardContent";
import Spinner from "../spinner";
import NoData from "../no-data";
import { DASHBOARD_DATA_FETCH_ATTEMPTED } from "../../store/constants/dashboard";

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "#ddd",
  },
  card: {
    padding: "0.4rem",
    color: "#fff",
  },
  span: {
    fontSize: "3rem",
    display: "inline-block",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  icon: {
    fontSize: "2.5rem",
    color: "#e5d549",
  },
  container: {
    marginTop: ".5rem",
  },
});

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch({ type: DASHBOARD_DATA_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (dashboard.loading) {
    return <Spinner />;
  }

  if (dashboard.error) {
    return <NoData />;
  }

  return (
    dashboard.data && (
      <Fragment>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} md={4}>
            <Link
              to="/portal/student/cources"
              style={{ textDecoration: "none" }}
            >
              <Card className={classes.card} style={{ background: "#f54748" }}>
                <Typography className={classes.bold}>COURCES</Typography>
                <div className={classes.cardContainer}>
                  <Typography className={classes.span} component="span">
                    {dashboard.data.coursesCount}
                  </Typography>
                  <AllInboxIcon
                    className={classes.icon}
                    style={{ color: "#810000" }}
                  />
                </div>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Link
              to="/portal/student/results"
              style={{ textDecoration: "none" }}
            >
              <Card className={classes.card} style={{ background: "#4aa96c" }}>
                <Typography className={classes.bold}>RESULTS</Typography>
                <div className={classes.cardContainer}>
                  <Typography className={classes.span} component="span">
                    {dashboard.data.resultsCount}
                  </Typography>
                  <AcUnitIcon
                    className={classes.icon}
                    style={{ color: "#564a4a" }}
                  />
                </div>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Link
              to="/portal/student/events"
              style={{ textDecoration: "none" }}
            >
              <Card className={classes.card} style={{ background: "#2541b2" }}>
                <Typography className={classes.bold}>EVENTS</Typography>
                <div className={classes.cardContainer}>
                  <Typography className={classes.span} component="span">
                    {dashboard.data.eventsCount}
                  </Typography>
                  <EventNoteIcon
                    className={classes.icon}
                    style={{ color: "#fb9300" }}
                  />
                </div>
              </Card>
            </Link>
          </Grid>
        </Grid>
        <Card style={{ margin: "2rem 0" }}>
          <CardContent>
            <Typography style={{ fontWeight: "bold" }} component="h6">
              Exam Results
            </Typography>
            <ResultsChart
              values={dashboard.data.resultChartValues}
              labels={dashboard.data.resultChartLabels}
            />
          </CardContent>
        </Card>
        <Card style={{ margin: "2rem 0" }}>
          <CardContent>
            <Typography style={{ fontWeight: "bold" }} component="h6">
              Attendence
            </Typography>
            <AttendenceChart values={dashboard.data.attendenceChartValues} />
          </CardContent>
        </Card>
      </Fragment>
    )
  );
}

export default Dashboard;
