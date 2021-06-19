import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DescriptionIcon from "@material-ui/icons/Description";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Spinner from "../spinner";
import NoData from "../no-data";
import { LESSONS_FETCH_ATTEMPTED } from "../../store/constants/lessons";

function LessonsList() {
  const lessons = useSelector((state) => state.lessons);
  const location = useLocation();
  const dispatch = useDispatch();

  const locationArray = location.pathname.split("/");
  const subject = locationArray[locationArray.length - 1];

  useEffect(() => {
    dispatch({ type: LESSONS_FETCH_ATTEMPTED, payload: subject });
  }, [dispatch, subject]);

  if (lessons.loading) return <Spinner />;
  if (lessons.error) return <NoData />;

  return (
    lessons.data &&
    lessons.data.length && (
      <Card>
        <CardContent>
          {lessons.data.map((item, index) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/portal/student/cources/${subject}/${item._id}`}
              key={item._id}
            >
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <ListItemIcon>
                  <OpenInBrowserIcon color="primary" />
                </ListItemIcon>
              </ListItem>
              {index < lessons.length - 1 && <Divider />}
            </Link>
          ))}
        </CardContent>
      </Card>
    )
  );
}

export default LessonsList;
