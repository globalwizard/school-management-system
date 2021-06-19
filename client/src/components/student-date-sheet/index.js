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
import { DATE_SHEET_FETCH_ATTEMPTED } from "../../store/constants/date-sheet";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default function StudentDateSheet() {
  const classes = useStyles();

  const dateSheet = useSelector((state) => state.dateSheet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: DATE_SHEET_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (dateSheet.loading) return <Spinner />;
  if (dateSheet.error) return <NoData />;

  return (
    dateSheet.data &&
    dateSheet.data.length && (
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
                <Typography className={classes.bold}>Time</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Subject</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dateSheet.data.map((item, index) => (
              <TableRow key={item.subject}>
                <TableCell align="left">
                  <Typography>{index + 1}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.date}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.time}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.subject}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}
