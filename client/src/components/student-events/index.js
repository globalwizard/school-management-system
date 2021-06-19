import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
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
import { EVENTS_FETCH_ATTEMPTED } from "../../store/constants/events";

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
  },
});

function Events() {
  const classes = useStyles();

  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: EVENTS_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (events.loading) return <Spinner />;
  if (events.error) return <NoData />;

  return (
    events.data &&
    events.data.length && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>S#</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Start Date</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Duration</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Timing</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>
                  Financial Contribution
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Dress Code</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.data.map((item, index) => (
              <TableRow key={item.startDate + index}>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{index + 1}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.startDate}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.duration}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.timing}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.contribution}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.dressCode}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

export default Events;
