import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { handleAddAnswer } from "../actions/questions";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    margin: "20px auto"
  },
  media: {
    width: 80,
    height: 80,
    float: "right"
  },
  formControl: {
    width: "100%"
  },
  btn: {
    backgroundColor: "#F6AE2D",
    margin: "20px auto 0",
    "&:hover": {
      backgroundColor: "#F6AE2D"
    }
  }
}));

function ViewPoll(props) {
  const classes = useStyles();
  let param = useParams();
  const { author, optionOne, optionTwo } = props.questions[param.id];
  const { avatarURL, name } = props.users[author];
  const [value, setValue] = React.useState("");

  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(handleAddAnswer(param.id, value));
  };
  return (
    <div className="QuestionItem">
      <Card className={classes.root}>
        <CardContent>
          <Avatar
            variant="rounded"
            className={classes.media}
            src={avatarURL}
          ></Avatar>
          <Typography variant="subtitle2">{name}:</Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Would you rather?
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="optionOne"
                  control={<Radio />}
                  label={optionOne.text}
                />
                <FormControlLabel
                  value="optionTwo"
                  control={<Radio />}
                  label={optionTwo.text}
                />
              </RadioGroup>
              <Button
                type="submit"
                size="large"
                variant="contained"
                className={classes.btn}
                color="secondary"
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    users,
    questions,
    authedUser
  };
}

export default connect(mapStateToProps)(ViewPoll);
