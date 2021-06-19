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
import Button from "@material-ui/core/Button";
import Spinner from "../spinner";
import NoData from "../no-data";
import {
  SET_REDIRECT_TO_DEFAULT,
  LEAVE_APPLICATION_FETCH_ATTEMPTED,
} from "../../store/constants/leave-application";

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
  },
  pending: {
    backgroundColor: " #F29339",
    color: "#fff",
    boxShadow: "none",
    padding: ".1rem .3rem",
  },
  approved: {
    backgroundColor: "#4BB543",
    color: "#fff",
    boxShadow: "none",
    padding: ".1rem .3rem",
  },
  rejected: {
    backgroundColor: "#f00",
    color: "#fff",
    boxShadow: "none",
    padding: ".1rem .3rem",
  },
});

function LeaveApplicationList() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const leaveApplications = useSelector((state) => state.leaveApplication);

  useEffect(() => {
    dispatch({ type: SET_REDIRECT_TO_DEFAULT });
    dispatch({ type: LEAVE_APPLICATION_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (leaveApplications.loading) return <Spinner />;
  if (leaveApplications.error) return <NoData />;

  return (
    leaveApplications.data &&
    leaveApplications.data.length && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>S#</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Start</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>End</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Type</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Details</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveApplications.data.map((item, index) => (
              <TableRow key={item.endDate + index}>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{index + 1}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.startDate}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.endDate}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.type}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.details}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>
                    <Button
                      className={
                        item.status === "pending"
                          ? classes.pending
                          : item.status === "rejected"
                          ? classes.rejected
                          : classes.approved
                      }
                      variant="contained"
                      size="small"
                    >
                      {item.status.toUpperCase()}
                    </Button>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

export default LeaveApplicationList;
