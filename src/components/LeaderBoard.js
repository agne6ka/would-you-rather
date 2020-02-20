import React from "react";
import { connect } from "react-redux";
import LeaderBoardItem from "./LeaderBoardItem";

function LeaderBoard(props) {
  const { users } = props;
  const calcAnswers = user => Object.keys(user.answers).length;
  const calcQuestions = user => user.questions.length;

  return (
    <div>
      {Object.values(users).map((user, index) => {
        return (
          <LeaderBoardItem
            key={user.id}
            place={index}
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
    users: Object.values(users).sort((userA, userB) => {
      let scoreA = userA.questions.length + Object.keys(userA.answers).length;
      let scoreB = userB.questions.length + Object.keys(userB.answers).length;
      return scoreB - scoreA;
    })
  };
}

export default connect(mapStateToProps)(LeaderBoard);
