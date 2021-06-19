import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import LoginPage from "../../pages/login";
import StudentHomePage from "../../pages/student-home";
import { Provider } from "react-redux";
import { Route, StudentRoute } from "../routes";
import { RESTORE_USER } from "../../store/constants/auth";
import { PersistGate } from "redux-persist/integration/react";
import theme from "../../utils/theme";
import { persistor, store } from "../../store";

store.dispatch({ type: RESTORE_USER });

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/portal/login" component={LoginPage} />
              <StudentRoute
                path="/portal/student"
                component={StudentHomePage}
              />
              <Redirect to="/portal/login" />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
