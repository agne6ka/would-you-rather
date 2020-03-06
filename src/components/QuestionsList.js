import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import QuestionItem from "./QuestionItem";
import { useLocation } from "react-router-dom";

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
      {value === index && <Box p={2}>{children}</Box>}
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

function QuestionsList(props) {
  let location = useLocation();
  const initState = location.state ? parseInt(location.state.tab) : 0;
  const [value, setValue] = useState(initState);
  const { users, authedUser, questions } = props;
  const handleChange = (event, newPosition) => {
    setValue(newPosition);
  };

  return (
    <div className="QuestionsList">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
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
      <TabPanel value={value} index={0}>
        {authedUser &&
          Object.values(questions).map(question => {
            if (Object.keys(users[authedUser].answers).includes(question.id))
              return null;
            return (
              <QuestionItem
                key={question.id}
                id={question.id}
                userName={users[question.author].name}
                avatarURL={users[question.author].avatarURL}
                optionOne={question.optionOne.text}
                optionTwo={question.optionTwo.text}
                tab="0"
              />
            );
          })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {authedUser &&
          Object.values(questions).map(question => {
            const userAnswers = users[authedUser].answers[question.id];
            if (!userAnswers) return <div></div>;
            return (
              <QuestionItem
                key={question.id}
                id={question.id}
                userName={users[question.author].name}
                avatarURL={users[question.author].avatarURL}
                optionOne={question.optionOne.text}
                optionTwo={question.optionTwo.text}
                tab="1"
              />
            );
          })}
      </TabPanel>
    </div>
  );
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    questions: Object.values(questions).sort(
      (a, b) => b.timestamp - a.timestamp
    ),
    users,
    authedUser
  };
}

export default connect(mapStateToProps)(QuestionsList);
