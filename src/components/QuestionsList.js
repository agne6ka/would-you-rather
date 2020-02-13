import React, { Component } from "react";
import { connect } from "react-redux";
import { handleQuestionsData, handleUsersData } from "../actions/shared";

class QuestionsList extends Component {
  componentDidMount() {
    this.props.dispatch(handleQuestionsData());
    this.props.dispatch(handleUsersData());
  }
  render() {
    return <div className="QuestionsList"></div>;
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
