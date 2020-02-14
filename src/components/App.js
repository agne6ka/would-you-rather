import React from "react";
import Nav from "./Nav";
import QuestionsList from "./QuestionsList";
import Login from "./Login";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
    <ThemeProvider theme={theme}>
      <Nav />
      <Grid container justify="center" className={classes.background}>
        <Grid item xs={6} className={classes.margin}>
          <QuestionsList />
        </Grid>
        <Grid item xs={12}>
          <Login />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
