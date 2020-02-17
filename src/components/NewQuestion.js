import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { handleAddQuestion } from "../actions/questions";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    width: "100%"
  },
  btn: {
    backgroundColor: "#F6AE2D",
    width: 130,
    height: 50,
    margin: "50px auto",
    "&:hover": {
      backgroundColor: "#F6AE2D"
    }
  },
  upperCase: {
    textTransform: "uppercase"
  }
}));

function NewQuestion(props) {
  const classes = useStyles();
  const [textOne, setTextOne] = useState("");
  const [textTwo, setTextTwo] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(handleAddQuestion(textOne, textTwo));
  };

  return (
    <div>
      <Typography
        variant="subtitle2"
        align="center"
        color="secondary"
        gutterBottom={true}
      >
        Complete the question
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        className={classes.upperCase}
        gutterBottom={true}
      >
        Would you rather...
      </Typography>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className={classes.form}
      >
        <TextField
          className={classes.input}
          id="option-one"
          label="Option A"
          variant="filled"
          value={textOne}
          color="secondary"
          onChange={e => {
            setTextOne(e.target.value);
          }}
        />
        <Typography
          gutterBottom
          variant="h6"
          align="center"
          className={classes.upperCase}
        >
          OR
        </Typography>
        <TextField
          className={classes.input}
          id="option-two"
          label="Option B"
          variant="filled"
          value={textTwo}
          color="secondary"
          onChange={e => {
            setTextTwo(e.target.value);
          }}
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          className={classes.btn}
          disabled={textOne.length === 0 || textTwo.length === 0}
          startIcon={<AddIcon />}
        >
          ADD
        </Button>
      </form>
    </div>
  );
}
export default connect()(NewQuestion);
