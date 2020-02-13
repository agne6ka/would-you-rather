import React from "react";
import Nav from "./Nav";
import QuestionsList from "./QuestionsList";
import Login from "./Login";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Grid container>
        <Grid item xs={12}>
          <Login />
        </Grid>
        <Grid item xs={12}>
          <QuestionsList />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
