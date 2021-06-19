import { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Logo from "../../assets/logo.png";
import Background from "../../assets/background.jpg";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxSizing: "inherit",
    padding: "1rem",
  },
  image: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "9rem",
  },
  contentArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    maxWidth: "25rem",
    width: "100%",
    marginBottom: "1rem",
    zIndex: "100",
  },
  form: {
    width: "100%",
  },
  mainArea: {
    maxWidth: "25rem",
    height: "auto",
    zIndex: "1000",
  },
});

function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
  loading,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img className={classes.image} src={Background} alt="background" />
      {error && (
        <Alert className={classes.message} severity="error">
          Invalid Email/StudentNumber or Password!
        </Alert>
      )}
      <Card className={classes.mainArea}>
        <CardContent className={classes.contentArea}>
          <img className={classes.logo} src={Logo} alt="logo" />
          <form onSubmit={onSubmit} className={classes.form}>
            <TextField
              id="email"
              size="small"
              label="Email Address / Student Number"
              variant="outlined"
              fullWidth
              onChange={onEmailChange}
              value={email}
            />
            <TextField
              id="password"
              size="small"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              onChange={onPasswordChange}
              value={password}
              style={{ margin: "1rem 0" }}
            />

            <Button
              style={{ marginBottom: "1rem" }}
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <Fragment>
                  <CircularProgress
                    style={{ width: "1rem", height: "1rem", margin: ".5rem" }}
                  />
                  Logging in...
                </Fragment>
              ) : (
                "LOG IN"
              )}
            </Button>
          </form>
          <Typography>Forget Password?</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
