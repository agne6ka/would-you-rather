export const RECIVE_USERS = "RECIVE_USERS";

export function reciveUsers(users) {
  return {
    type: RECIVE_USERS,
    users
  };
}
