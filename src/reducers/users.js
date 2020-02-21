import { RECIVE_USERS, ADD_USERS_ANSWER } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECIVE_USERS:
      return {
        ...state,
        ...action.users
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
