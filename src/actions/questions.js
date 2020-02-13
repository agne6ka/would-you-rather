export const RECIVE_QUESTIONS = "RECIVE_QUESTIONS";

export function reciveQuestions(questions) {
  return {
    type: RECIVE_QUESTIONS,
    questions
  };
}
