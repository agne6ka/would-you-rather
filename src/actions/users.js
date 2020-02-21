import { _saveQuestionAnswer } from "../utils/_DATA";

export const RECIVE_USERS = "RECIVE_USERS";
export const ADD_USERS_ANSWER = "ADD_USERS_ANSWER";

export function reciveUsers(users) {
  return {
    type: RECIVE_USERS,
    users
  };
}

function addAnswerToUsers(authedUser, qid, answer) {
  return {
    type: ADD_USERS_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export function handleAddAnswerToUsers(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(dispatch(addAnswerToUsers(authedUser, qid, answer)));
  };
}
