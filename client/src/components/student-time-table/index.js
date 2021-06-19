import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { TIME_TABLE_FETCH_ATTEMPTED } from "../../store/constants/time-table";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default function StudentTable() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const timeTable = useSelector((state) => state.timeTable);

  useEffect(() => {
    dispatch({ type: TIME_TABLE_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (timeTable.loading) return <Spinner />;
  if (timeTable.error) return <NoData />;

  return (
    timeTable.data && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>Days</Typography>
              </TableCell>
              {timeTable.data[0].periods.map((period, index) => (
                <TableCell key={period + index}>
                  <Typography className={classes.bold}>
                    period {index + 1}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeTable.data.map((item, index) => (
              <TableRow key={item.day + index}>
                <TableCell align="left">
                  <Typography className={classes.bold}>{item.day}</Typography>
                </TableCell>
                {item.periods.map((period, index) => (
                  <TableCell
                    key={period + index}
                    component="th"
                    scope="row"
                    align="left"
                  >
                    <Typography>{period ? period : "..."}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}
