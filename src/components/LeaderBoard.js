import React from "react";
import { connect } from "react-redux";
import LeaderBoardItem from "./LeaderBoardItem";

function LeaderBoard(props) {
  const { users } = props;
  const calcAnswers = user => Object.keys(user.answers).length;
  const calcQuestions = user => user.questions.length;

  return (
    <div>
      {Object.values(users).map(user => {
        return (
          <LeaderBoardItem
            key={user.id}
            userName={user.name}
            avatarURL={user.avatarURL}
            answers={calcAnswers(user)}
            questions={calcQuestions(user)}
            score={calcAnswers(user) + calcQuestions(user)}
          />
        );
      })}
    </div>
  );
}

function mapStateToProps({ questions, users }) {
  return {
    questions,
    users
  };
}

export default connect(mapStateToProps)(LeaderBoard);
