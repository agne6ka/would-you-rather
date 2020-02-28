import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NewQuestion from "./NewQuestion";
import QuestionsList from "./QuestionsList";
import Nav from "./Nav";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";
import LeaderBoard from "./LeaderBoard";
import { handleUsersData, handleQuestionsData } from "../actions/shared";
import ViewPoll from "./ViewPoll";
import { setAuthedUser } from "../actions/authedUser";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#86BBD8"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});

const useStyles = makeStyles({
  margin: {
    marginTop: 100
  },
  background: {
    backgroundColor: "#EFEFEF",
    minHeight: "100vh"
  }
});

function App(props) {
  const classes = useStyles();
  const { dispatch, authedUser, users } = props;
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authedUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
  const logout = () => dispatch(setAuthedUser(""));
  useEffect(() => {
    dispatch(handleUsersData());
    dispatch(handleQuestionsData());
  }, []);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.background}>
          <Nav
            userData={authedUser ? users[authedUser] : null}
            logout={logout}
          />
          <Grid container justify="center">
            <Grid item xs={6} className={classes.margin}>
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/" component={QuestionsList} />
                <PrivateRoute path="/new" component={NewQuestion} />
                <PrivateRoute path="/leaderboard" component={LeaderBoard} />
                <PrivateRoute path="/question/:id" component={ViewPoll} />
                <Route component={NotFoundPage} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </Router>
  );
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser
  };
}

export default connect(mapStateToProps)(App);
