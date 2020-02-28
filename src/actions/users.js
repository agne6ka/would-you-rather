import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const RECIVE_USERS = "RECIVE_USERS";
export const ADD_USERS_ANSWER = "ADD_USERS_ANSWER";
export const ADD_USERS_QUESTION = "ADD_USERS_QUESTION";

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

function addQuestionToUser(question) {
  return {
    type: ADD_USERS_QUESTION,
    question
  };
}

export function handleAddQuestionToUsers(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then(question => dispatch(addQuestionToUser(question)));
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
