import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
import camelize from "../../utils/camelize";
import { RESULTS_FETCH_ATTEMPTED } from "../../store/constants/results";

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

function TermResult() {
  const classes = useStyles();
  const location = useLocation();
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();

  const pathnames = location.pathname.split("/");
  const resultType = camelize(pathnames[pathnames.length - 1]);

  useEffect(() => {
    dispatch({ type: RESULTS_FETCH_ATTEMPTED });
  }, [dispatch]);

  if (results.loading) return <Spinner />;
  if (results.error) return <NoData />;

  return (
    results.data &&
    results.data[resultType] && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>S#</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Subject</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Obtained Marks</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Total Marks</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.bold}>Percentage</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.data[resultType].subjectWise.map((item, index) => (
              <TableRow key={item.subject + index}>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{index + 1}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.subject}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.obtained}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Typography>{item.total}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classes.button}
                  >
                    {Math.round((item.obtained / item.total) * 100)}%
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>Total Marks</Typography>
              </TableCell>
              <TableCell colSpan={100} component="th" scope="row">
                <Typography>{results.data[resultType].total}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>Obtained Marks</Typography>
              </TableCell>
              <TableCell colSpan={100} component="th" scope="row">
                <Typography>{results.data[resultType].obtained}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography className={classes.bold}>Percentage</Typography>
              </TableCell>
              <TableCell colSpan={100} component="th" scope="row">
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  {Math.round(
                    (results.data[resultType].obtained /
                      results.data[resultType].total) *
                      100
                  )}
                  %
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    )
  );
}

export default TermResult;
