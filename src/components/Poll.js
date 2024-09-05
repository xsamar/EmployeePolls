import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const Poll = ({ question, author }) => {
  if (!question) {
    return <p>This question doesn't exist.</p>;
  }

  const { id, timestamp, optionOne } = question;

  return (
    <div className="question-card">
      <div className="author-info">
        <img src={author.avatarURL} alt={`Avatar of ${author.name}`} />
        <h4>{author.name}</h4>
      </div>
      <p className="timestamp">{formatDate(timestamp)}</p>
      <p className="question-text">{optionOne.text} or...</p>
      <Link to={`/questions/${id}`} className="show-button">
        Show
      </Link>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const author = question ? users[question.author] : null;

  return {
    authedUser,
    question,
    author,
  };
};

export default connect(mapStateToProps)(Poll);
