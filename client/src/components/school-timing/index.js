import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
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
import { TIMING_FETCH_ATTEMPTED } from "../../store/constants/timing";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default function SchoolTiming() {
  const timing = useSelector((state) => state.timing);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: TIMING_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (timing.loading) return <Spinner />;
  if (timing.error) return <NoData />;

  return (
    timing.data && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold} variant="h6">
                  Starting Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold} variant="h6">
                  Closing Time
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="left">
                <Typography>{timing.data.startAt}</Typography>
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                <Typography>{timing.data.endAt}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}
