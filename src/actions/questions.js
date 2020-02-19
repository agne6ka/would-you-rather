import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const RECIVE_QUESTIONS = "RECIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

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

function addAnswer(questions) {
  return {
    type: ADD_ANSWER,
    questions
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

export function handleAddAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(questions => dispatch(addAnswer(questions)));
  };
}
