import { Typography } from "@material-ui/core";

function NoData({ message = "No data to display." }) {
  return (
    <div className="container">
      <Typography style={{ color: "#9a9a9a" }}>{message}</Typography>
    </div>
  );
}

export default NoData;
