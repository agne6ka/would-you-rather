import {
  RECIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_ANSWER
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      return { ...state, [action.question.id]: action.question };
    case ADD_ANSWER:
      console.log(action);
      return { ...state, [action.questions]: action.questions };
    default:
      return state;
  }
}
