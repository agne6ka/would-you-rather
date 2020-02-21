import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
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

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 100
  },
  background: {
    backgroundColor: "#EFEFEF"
  }
}));

function App(props) {
  const classes = useStyles();
  const { dispatch, authedUser, users } = props;
  const logout = () => dispatch(setAuthedUser(""));
  useEffect(() => {
    dispatch(handleUsersData());
    dispatch(handleQuestionsData());
  }, []);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav userData={authedUser ? users[authedUser] : null} logout={logout} />
        <Grid container justify="center" className={classes.background}>
          <Grid item xs={6} className={classes.margin}>
            {!authedUser ? (
              <Login />
            ) : (
              <Switch>
                <Route exact path="/" component={QuestionsList} />
                <Route path="/new" component={NewQuestion} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/question/:id" component={ViewPoll} />
                <Route component={NotFoundPage} />
              </Switch>
            )}
          </Grid>
        </Grid>
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
