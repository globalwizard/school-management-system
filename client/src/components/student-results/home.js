import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TrophyIcon from "../../assets/trophy.png";

const useStyles = makeStyles({
  card: {
    background: "linear-gradient(to right, #ff416c, #ff4b2b);",
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

function StudentResults() {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Link
          style={{ textDecoration: "none" }}
          to="/portal/student/results/first-term"
        >
          <Card className={classes.card}>
            <CardContent className={classes.container}>
              <img alt="award" src={TrophyIcon} />
              <Typography className={classes.text}>First Term</Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
      <Grid item xs={12} md={4}>
        <Link
          style={{ textDecoration: "none" }}
          to="/portal/student/results/second-term"
        >
          <Card className={classes.card}>
            <CardContent
              style={{
                background: "linear-gradient(to right, #00c6ff, #0072ff)",
              }}
              className={classes.container}
            >
              <img alt="award" src={TrophyIcon} />
              <Typography className={classes.text}>Mid Term</Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
      <Grid item xs={12} md={4}>
        <Link
          style={{ textDecoration: "none" }}
          to="/portal/student/results/third-term"
        >
          <Card
            className={classes.card}
            style={{
              background: "linear-gradient(to right, #ff00cc, #333399)",
            }}
          >
            <CardContent className={classes.container}>
              <img alt="award" src={TrophyIcon} />
              <Typography className={classes.text}>Final Term</Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
}

export default StudentResults;
