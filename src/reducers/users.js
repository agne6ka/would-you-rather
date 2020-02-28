import {
  RECIVE_USERS,
  ADD_USERS_ANSWER,
  ADD_USERS_QUESTION
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USERS_QUESTION:
      const { author, id } = action.question;
      console.log(action);
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: [...state[author].questions.concat([id])]
        }
      };
    case ADD_USERS_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    default:
      return state;
  }
}
