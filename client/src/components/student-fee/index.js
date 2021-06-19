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
import { FEE_FETCH_ATTEMPTED } from "../../store/constants/fee";

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
  },
  paid: {
    backgroundColor: "#4BB543",
    color: "#fff",
    boxShadow: "none",
    padding: ".1rem 0",
  },
  unpaid: {
    backgroundColor: "#f00",
    color: "#fff",
    boxShadow: "none",
    padding: ".1rem .3rem",
  },
});

function LeaveApplicationList() {
  const classes = useStyles();

  const fee = useSelector((state) => state.fee);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FEE_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (fee.loading) return <Spinner />;
  if (fee.error) return <NoData />;

  return (
    fee.data &&
    fee.data.length && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>S#</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Fee Month</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Fee Year</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Total Amount</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Fee Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fee.data.map((item, index) => (
              <TableRow key={item.month + index}>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{index + 1}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.month}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.year}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.total}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Button
                    className={
                      item.status === "paid" ? classes.paid : classes.unpaid
                    }
                    variant="contained"
                    size="small"
                  >
                    {item.status.toUpperCase()}
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

export default LeaveApplicationList;
