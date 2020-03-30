import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link, useParams, useLocation, Redirect } from "react-router-dom";
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
import { handleAddAnswerToQuestions } from "../actions/questions";
import { handleAddAnswerToUsers } from "../actions/users";

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
  },
  slider: {
    width: "70%"
  },
  procentContainer: {
    position: "relative",
    height: "20px",
    background: "rgba(246,174,75,0.5)",
    width: "85%",
    display: "inline-block"
  },
  procentInfo: {
    backgroundColor: "#f44336",
    height: "20px",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    fontSize: "15px",
    textAlign: "center",
    color: "#fff",
    fontWeight: 600
  },
  title: {
    marginBottom: "50px"
  },
  itemOption: {
    margin: "5px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionContainer: {
    width: "100%"
  },
  optionVotes: {
    width: "50px",
    marginLeft: "20px",
    display: "inline-block"
  },
  choosedImg: {
    width: "70px",
    paddingRight: "20px"
  }
}));

function valuetext(value) {
  return value;
}

function ViewPoll(props) {
  const classes = useStyles();
  let param = useParams();
  let location = useLocation();
  let tabState = location.state === undefined ? 0 : location.state.tab;
  const { author, optionOne, optionTwo } = Object.keys(
    props.questions
  ).includes(param.id)
    ? props.questions[param.id]
    : "";
  const { avatarURL, name, answers } = author ? props.users[author] : "";
  const answer = props.users[props.authedUser].answers[param.id];
  const [toHome, setToHome] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = event => setValue(event.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(handleAddAnswerToQuestions(param.id, value));
    props.dispatch(handleAddAnswerToUsers(param.id, value));
    setToHome(true);
  };
  const procentFirstAnswered = author
    ? Math.floor(
        (optionOne.votes.length /
          (optionOne.votes.length + optionTwo.votes.length)) *
          100
      )
    : "";
  const procentSecondAnswered = author
    ? Math.floor(
        (optionTwo.votes.length /
          (optionOne.votes.length + optionTwo.votes.length)) *
          100
      )
    : "";

  if (author === undefined) return <Redirect to="/404" />;

  if (toHome === true) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { tab: 1 }
        }}
      />
    );
  }
  return (
    <div className="QuestionItem">
      <Link
        to={{
          pathname: "/",
          state: { tab: tabState }
        }}
        color="inherit"
      >
        Back
      </Link>
      <Card className={classes.root}>
        <CardContent>
          <Avatar
            variant="rounded"
            className={classes.media}
            src={avatarURL}
          ></Avatar>
          <Typography variant="subtitle2">{name}:</Typography>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            Would you rather?
          </Typography>
          {tabState === "1" ? (
            <Fragment>
              <div className={classes.itemOption}>
                <div className={classes.choosedImg}>
                  {answer === "optionOne" && (
                    <img alt="Choosed option one" src="/img/choosed.svg" />
                  )}
                </div>
                <div className={classes.optionContainer}>
                  <div className={classes.procentContainer}>
                    <span
                      className={classes.procentInfo}
                      style={{ width: `${procentFirstAnswered}%` }}
                    >
                      {procentFirstAnswered + "%"}
                    </span>
                  </div>
                  <Typography
                    className={classes.optionVotes}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {`${optionOne.votes.length}/${optionOne.votes.length +
                      optionTwo.votes.length} `}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    * {optionOne.text}
                  </Typography>
                </div>
              </div>
              <div className={classes.itemOption}>
                <div className={classes.choosedImg}>
                  {answer === "optionTwo" && (
                    <img alt="Choosed option two" src="/img/choosed.svg" />
                  )}
                </div>
                <div className={classes.optionContainer}>
                  <div className={classes.procentContainer}>
                    <span
                      className={classes.procentInfo}
                      style={{ width: `${procentSecondAnswered}%` }}
                    >
                      {procentSecondAnswered + "%"}
                    </span>
                  </div>
                  <Typography
                    className={classes.optionVotes}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {`${optionTwo.votes.length}/${optionOne.votes.length +
                      optionTwo.votes.length} `}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    * {optionTwo.text}
                  </Typography>
                </div>
              </div>
            </Fragment>
          ) : (
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
          )}
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
