import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import { Button, makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CHANGE_PASSWORD_ATTEMPTED } from "../../store/constants/auth";

const useStyles = makeStyles({
  formInput: {
    marginTop: "1rem",
  },
  message: {
    marginBottom: "1rem",
  },
});

function ChangePassword() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [old, setOld] = useState("");
  const [newPass, setnewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [failedConfirm, setFailedConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPass !== conPass) setFailedConfirm(true);

    dispatch({
      type: CHANGE_PASSWORD_ATTEMPTED,
      payload: {
        oldPassword: old,
        newPassword: newPass,
      },
    });

    setSubmitted(true);
    setOld("");
  };

  return (
    <Card>
      {auth.error && (
        <Alert open={false} className={classes.message} severity="error">
          {failedConfirm
            ? '"Password" and "Confirm Password" don\'t match'
            : auth.errorMessage || "Failed To Change Password!"}
        </Alert>
      )}
      {!auth.loading && !auth.error && submitted && (
        <Alert open={false} className={classes.message} severity="success">
          Password Successfully Updated!
        </Alert>
      )}
      <CardContent style={{ paddingTop: "1rem" }}>
        <form onSubmit={handleChangePasswordSubmit}>
          <TextField
            value={old}
            onChange={(e) => setOld(e.target.value)}
            label="Old Password"
            variant="outlined"
            fullWidth
          />
          <TextField
            className={classes.formInput}
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            value={newPass}
            onChange={(e) => setnewPass(e.target.value)}
          />
          <TextField
            className={classes.formInput}
            label="Confirm New Password"
            variant="outlined"
            type="password"
            fullWidth
            value={conPass}
            onChange={(e) => setConPass(e.target.value)}
          />
          <Button
            className={classes.formInput}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            {auth.loading ? (
              <Fragment>
                <CircularProgress
                  style={{
                    width: "1rem",
                    height: "1rem",
                    margin: ".5rem",
                  }}
                />
                Updating...
              </Fragment>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangePassword;
