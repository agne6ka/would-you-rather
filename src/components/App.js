import React from "react";
import Nav from "./Nav";
import QuestionsList from "./QuestionsList";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
      <QuestionsList />
    </ThemeProvider>
  );
}

export default App;
