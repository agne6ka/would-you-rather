import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const RECIVE_QUESTIONS = "RECIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTIONS_ANSWER = "ADD_QUESTIONS_ANSWER";

export function reciveQuestions(questions) {
  return {
    type: RECIVE_QUESTIONS,
    questions
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

function addAnswerToQuestions(authedUser, qid, answer) {
  return {
    type: ADD_QUESTIONS_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then(question => dispatch(addQuestion(question)));
  };
}

export function handleAddAnswerToQuestions(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(dispatch(addAnswerToQuestions(authedUser, qid, answer)))
      .catch(error => console.log(error));
  };
}
