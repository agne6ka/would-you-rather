import { _saveQuestion } from "../utils/_DATA";

export const RECIVE_QUESTIONS = "RECIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

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
