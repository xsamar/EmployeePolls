import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_ANSWER = "SAVE_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return _saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => dispatch(addQuestion(question))
    );
  };
}

function saveAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveAnswer(info) {
  return (dispatch) => {
    return _saveQuestionAnswer(info).then(() =>
      dispatch(saveAnswer(info))
    );
  };
}
