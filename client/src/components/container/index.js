import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  wrapper: {
    maxWidth: "1250px",
    margin: "0 auto",
    padding: ".5rem",
    width: "100%",
  },
});

function Container({ children }) {
  const classes = useStyles();

  return <div className={classes.wrapper}>{children}</div>;
}

export default Container;
