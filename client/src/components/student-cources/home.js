import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import BookIcon from "@material-ui/icons/ChromeReaderMode";
import Spinner from "../spinner";
import NoData from "../no-data";
import { SUBJECTS_FETCH_ATTEMPTED } from "../../store/constants/subjects";

const useStyles = makeStyles({
  card: {
    color: "white",
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    textShadow: "0 2px 3px rgba(0,0,0, .45)",
  },
});

function StudentCources() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects);

  useEffect(() => {
    dispatch({ type: SUBJECTS_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (subjects.loading) return <Spinner />;
  if (subjects.error) return <NoData />;

  return (
    subjects.data &&
    subjects.data.length && (
      <Grid container spacing={3}>
        {subjects.data.map((item, index) => (
          <Grid item xs={12} md={4} key={item.name + index}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/portal/student/cources/${item.name}`}
            >
              <Card className={classes.card}>
                <CardContent
                  className={classes.container}
                  style={{ background: item.color }}
                >
                  <BookIcon style={{ fontSize: "145px", color: "yellow" }} />
                  <Typography className={classes.text}>{item.name}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default StudentCources;
