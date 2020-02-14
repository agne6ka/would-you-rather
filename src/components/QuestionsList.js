import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handleQuestionsData, handleUsersData } from "../actions/shared";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import QuestionItem from "./QuestionItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

class QuestionsList extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    this.props.dispatch(handleQuestionsData());
    this.props.dispatch(handleUsersData());
  }

  render() {
    const { users, authedUser, questions } = this.props;

    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

    return (
      <div className="QuestionsList">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="UNANSWERED" {...a11yProps(0)} />
            <Tab label="ANSWERED" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          {authedUser &&
            Object.values(questions).map(question => {
              if (Object.keys(users[authedUser].answers).includes(question.id))
                return null;
              return (
                <QuestionItem
                  key={question.id}
                  userName={users[question.author].name}
                  avatarURL={users[question.author].avatarURL}
                  optionOne={question.optionOne.text}
                  optionTwo={question.optionTwo.text}
                />
              );
            })}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          {authedUser &&
            Object.keys(users[authedUser].answers).map(answerId => {
              const author = questions[answerId].author;
              return (
                <QuestionItem
                  key={answerId}
                  userName={users[author].name}
                  avatarURL={users[author].avatarURL}
                  optionOne={questions[answerId].optionOne.text}
                  optionTwo={questions[answerId].optionTwo.text}
                />
              );
            })}
        </TabPanel>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    questions,
    users,
    authedUser
  };
}

export default connect(mapStateToProps)(QuestionsList);
