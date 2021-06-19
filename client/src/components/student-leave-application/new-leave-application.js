import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Alert from "@material-ui/lab/Alert";
import { LEAVE_APPLICATION_SUBMIT_ATTEMPTED } from "../../store/constants/leave-application";

const useStyles = makeStyles({
  label: {
    fontWeight: "bold",
  },
  formInput: {
    marginTop: "1rem",
  },
  message: {
    marginBottom: "1rem",
  },
});

function LeaveApplication() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("Sick Leave");
  const [details, setDetails] = useState("");

  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const leaveApplication = useSelector((state) => state.leaveApplication);
  const dispatch = useDispatch();

  useEffect(() => {
    if (leaveApplication.redirect) {
      history.replace("/portal/student/leave-application-list");
    }
  }, [leaveApplication.redirect, history]);

  const handleApplicationSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: LEAVE_APPLICATION_SUBMIT_ATTEMPTED,
      payload: {
        startDate,
        endDate,
        type,
        details,
        grade: user.grade,
        section: user.section,
        status: "pending",
        studentNumber: user.studentNumber,
      },
    });
  };

  return (
    <Card>
      <CardContent>
        {leaveApplication.error && (
          <Alert open={false} className={classes.message} severity="error">
            {leaveApplication.errorMessage || "Failed To Submit Leave Request"}
          </Alert>
        )}
        <form onSubmit={handleApplicationSubmit}>
          <div>
            <FormLabel
              className={classes.label}
              htmlFor="start"
              component="label"
            >
              Start Date
            </FormLabel>
            <TextField
              margin="dense"
              id="start"
              type="date"
              variant="outlined"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={classes.formInput}>
            <FormLabel
              className={classes.label}
              htmlFor="end"
              component="label"
            >
              End Date
            </FormLabel>
            <TextField
              margin="dense"
              id="end"
              type="date"
              variant="outlined"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className={classes.formInput}>
            <FormLabel
              className={classes.label}
              htmlFor="type"
              component="label"
            >
              Type of Leave
            </FormLabel>
            <FormControl
              fullWidth
              margin="dense"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                <MenuItem value="Urgent Work">Urgent Work</MenuItem>
                <MenuItem value="Outside Town Visit">
                  Outside Town Visit
                </MenuItem>
                <MenuItem value="Marriage in Family">
                  Marriage in Family
                </MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.formInput}>
              <FormLabel
                className={classes.label}
                htmlFor="textarea"
                component="label"
              >
                Details
              </FormLabel>
              <TextField
                id="textarea"
                label="Detail Message"
                placeholder="Detail Message"
                multiline
                fullWidth
                margin="dense"
                rows={10}
                variant="outlined"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          </div>
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            disabled={leaveApplication.loading}
          >
            {leaveApplication.loading ? (
              <Fragment>
                <CircularProgress
                  style={{ width: "1rem", height: "1rem", margin: ".5rem" }}
                />
                Submitting...
              </Fragment>
            ) : (
              "Send Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LeaveApplication;
