import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  formControl: {
    display: "flex",
    maxWidth: 320,
    margin: "20px auto"
  },
  header: {
    marginTop: 200,
    textTransform: "uppercase",
    fontWeight: 600,
    color: "#F26419"
  }
}));

const Login = props => {
  const classes = useStyles();
  const [toHome, setToHome] = useState(false);
  const handleChange = event => {
    props.dispatch(setAuthedUser(event.target.value));
    setToHome(true);
  };

  if (toHome === true) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Typography variant="subtitle1" className={classes.header} align="center">
        Login as a demo user
      </Typography>
      <FormControl
        variant="filled"
        className={classes.formControl}
        color="secondary"
      >
        <InputLabel id="user-select-filled-label">User</InputLabel>
        <Select
          labelId="user-select-filled-label"
          id="user-select-filled"
          value={props.authedUser ? props.authedUser : ""}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Object.values(props.users).map(user => {
            return (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    users,
    authedUser
  };
}

export default connect(mapStateToProps)(Login);
