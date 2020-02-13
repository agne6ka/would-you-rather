import { _getUsers } from "../utils/_DATA";
import { _getQuestions } from "../utils/_DATA";
import { setAuthedUser } from "./authedUser";
import { reciveUsers } from "./users";
import { reciveQuestions } from "./questions";

const AUTHED_ID = "";

export function handleUsersData() {
  return dispatch => {
    return _getUsers().then(users => {
      dispatch(reciveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID));
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
