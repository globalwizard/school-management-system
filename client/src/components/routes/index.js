import { Redirect, Route as RouterRoute } from "react-router-dom";
import { useSelector } from "react-redux";

export function StudentRoute({ component: Component, ...other }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <RouterRoute
      {...other}
      render={(props) =>
        user?.role === "student" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/portal/login" />
        )
      }
    />
  );
}

export function AdminRoute({ component: Component, ...other }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <RouterRoute
      {...other}
      render={(props) =>
        user?.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/portal/login" />
        )
      }
    />
  );
}

export function Route({ component: Component, ...other }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <RouterRoute
      {...other}
      render={(props) =>
        !user?._id ? (
          <Component {...props} />
        ) : (
          <Redirect to="/portal/student" />
        )
      }
    />
  );
}
