import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Spinner from "../spinner";
import NoData from "../no-data";
import { ONLINE_CLASSES_FETCH_ATTEMPTED } from "../../store/constants/online-classes";

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
  },
  button: {
    color: "#fff",
    boxShadow: "none",
    padding: ".1rem .3rem",
  },
});

function OnlineClass() {
  const classes = useStyles();
  const onlineClasses = useSelector((state) => state.onlineClasses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ONLINE_CLASSES_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (onlineClasses.loading) return <Spinner />;
  if (onlineClasses.error) return <NoData />;

  return (
    onlineClasses.data &&
    onlineClasses.data.length && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>S#</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Class Type</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Date</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Start Time</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Duration</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Subject</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Details</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Class Link</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {onlineClasses.data.map((item, index) => (
              <TableRow key={item.subject + index}>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{index + 1}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.classType}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.date}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.startTime}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.duration}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.subject}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.details}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classes.button}
                    onClick={() => window.location.assign(item.link)}
                  >
                    JOIN
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

export default OnlineClass;
