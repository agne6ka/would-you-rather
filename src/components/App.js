import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NewQuestion from "./NewQuestion";
import QuestionsList from "./QuestionsList";
import Nav from "./Nav";
import Login from "./Login";

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

function App() {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav />
        <Grid container justify="center" className={classes.background}>
          <Grid item xs={6} className={classes.margin}>
            <Login />
            <Route exact path="/" component={QuestionsList} />
            <Route path="/new" component={NewQuestion} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Router>
  );
}

export default App;
