import { _getUsers } from "../utils/_DATA";
import { _getQuestions } from "../utils/_DATA";
import { reciveUsers } from "./users";
import { reciveQuestions } from "./questions";

export function handleUsersData() {
  return dispatch => {
    return _getUsers().then(users => {
      dispatch(reciveUsers(users));
    });
  };
}

export function handleQuestionsData() {
  return dispatch => {
    return _getQuestions().then(questions => {
      dispatch(reciveQuestions(questions));
    });
  };
}
