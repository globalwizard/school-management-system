import { useState, useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import {
  UPDATE_USER,
  UPDATE_USER_AVATAR,
  UPDATE_PROFILE_DATA_ATTEMPTED,
} from "../../store/constants/auth";

const useStyles = makeStyles({
  formInput: {
    marginTop: "1rem",
  },
  bold: {
    fontWeight: "bold",
  },
  message: {
    marginBottom: "1rem",
    boxShadow: "0px 1px 1px rgba(0,0,0,.45)",
  },
  avatarImg: {
    width: "15rem",
    height: "15rem",
    borderRadius: "50rem",
    margin: "3rem 0 1rem 0",
    padding: ".3rem",
    border: "1px solid #ddd",
    boxShadow: "0px 2px 5px rgba(0,0,0,.45)",
  },
  updateImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

function StudentProfile() {
  const classes = useStyles();
  const imageButtonRef = useRef();

  const data = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFirstName(data.user.firstName || "");
    setLastName(data.user.lastName || "");
    setFatherName(data.user.fatherName || "");
    setGender(data.user.gender || "");
    setEmail(data.user.email || "");
    setDob(data.user.dob || "");
    setCnic(data.user.cnicNumber || "");
    setBloodGroup(data.user.bloodGroup || "");
  }, [
    data.user.bloodGroup,
    data.user.cnicNumber,
    data.user.dob,
    data.user.email,
    data.user.fatherName,
    data.user.firstName,
    data.user.gender,
    data.user.lastName,
  ]);

  const handleImageChange = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const reader = new FileReader();

    reader.onload = function (event) {
      dispatch({
        type: UPDATE_USER,
        payload: { ...data.user, avatar: event.target.result },
      });
    };
    const file = event.target.files[0];

    formData.append("avatar", file);
    reader.readAsDataURL(file);
    dispatch({
      type: UPDATE_USER_AVATAR,
      payload: formData,
    });
  };

  const handleUpdateData = (event) => {
    event.preventDefault();
    dispatch({
      type: UPDATE_PROFILE_DATA_ATTEMPTED,
      payload: {
        firstName,
        lastName,
        email,
        fatherName,
        cnicNumber: cnic,
        dob,
        gender,
        bloodGroup,
      },
    });
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      {data.error && (
        <Alert open={true} className={classes.message} severity="error">
          {data.errorMessage || "Failed To update user Profile data!"}
        </Alert>
      )}
      {!data.loading && !data.error && submitted && (
        <Alert open={false} className={classes.message} severity="success">
          User Successfully Updated!
        </Alert>
      )}
      <Card>
        <Grid container>
          <Grid className={classes.updateImageContainer} item xs={12} md={3}>
            <img
              className={classes.avatarImg}
              src={data.user.avatar}
              alt="avatar"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => imageButtonRef.current.click()}
            >
              Update Image
            </Button>
            <input
              onChange={handleImageChange}
              name="file"
              style={{ opacity: "0" }}
              type="file"
              ref={imageButtonRef}
            />
          </Grid>
          <Grid style={{ borderLeft: "1px solid #eee" }} item xs={12} md={9}>
            <CardContent>
              <div className={classes.formInput}>
                <Typography>
                  <span className={classes.bold}>Student Number: </span>
                  {data.user.studentNumber}
                </Typography>
                <Typography>
                  <span className={classes.bold}>Grade: </span>
                  {data.user.grade}
                </Typography>
                <Typography>
                  <span className={classes.bold}>Section: </span>
                  {data.user.section}
                </Typography>
              </div>
              <form onSubmit={handleUpdateData}>
                <TextField
                  variant="outlined"
                  label="First Name"
                  type="text"
                  size="small"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={classes.formInput}
                />
                <TextField
                  className={classes.formInput}
                  variant="outlined"
                  label="Last Name"
                  type="text"
                  size="small"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  className={classes.formInput}
                  label="Father's Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                />
                <TextField
                  className={classes.formInput}
                  label="CNIC Number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                />
                <TextField
                  className={classes.formInput}
                  variant="outlined"
                  label="Email"
                  type="text"
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  className={classes.formInput}
                  label="Date of Birth"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <TextField
                  className={classes.formInput}
                  label="Gender"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <TextField
                  className={classes.formInput}
                  label="Blood Group"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                />
                <Button
                  className={classes.formInput}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={data.loading}
                >
                  {data.loading ? (
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
                    "Update Data"
                  )}
                </Button>
              </form>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Fragment>
  );
}

export default StudentProfile;
