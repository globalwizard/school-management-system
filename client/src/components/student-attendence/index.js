import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
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
import { ATTENDENCE_FETCH_ATTEMPTED } from "../../store/constants/attendence";

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
  },
  present: {
    backgroundColor: "#4BB543",
    color: "#fff",
    boxShadow: "none",
    padding: ".1rem .3rem",
  },
  absent: {
    backgroundColor: "#f00",
    color: "#fff",
    boxShadow: "none",
    padding: ".1rem .3rem",
  },
});

function OnlineClass() {
  const classes = useStyles();

  const attendence = useSelector((state) => state.attendence);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ATTENDENCE_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (attendence.loading) return <Spinner />;
  if (attendence.error) return <NoData />;

  return (
    attendence.data &&
    attendence.data.length && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>S#</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Date</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Class Type</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendence.data.map((item, index) => (
              <TableRow key={item.date + index}>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{index + 1}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.date}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.type}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Button
                    variant="contained"
                    className={
                      item.status === "absent"
                        ? classes.absent
                        : classes.present
                    }
                  >
                    {item.status}
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
