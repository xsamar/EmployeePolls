import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { handleSaveAnswer } from "../actions/questions";
import NotFound from "./NotFound";

const PollDetails = ({ questions, users, authedUser, dispatch }) => {
  const { id } = useParams(); 
  const [poll, setPoll] = useState(null);
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const selectedPoll = questions[id];
    if (selectedPoll) {
      setPoll(selectedPoll);
      setAuthor(users[selectedPoll.author]);
    }
  }, [id, questions, users]);

  if (!poll) {
    return <NotFound />;
  }

  const { optionOne, optionTwo } = poll;
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const userHasVoted =
    optionOne.votes.includes(authedUser) ||
    optionTwo.votes.includes(authedUser);

  const handleVote = (answer) => {
    if (!userHasVoted) {
      dispatch(handleSaveAnswer({ authedUser, qid: poll.id, answer })).then(
        () => {
          setHasVoted(true);
          setShowMessage(true);
        }
      );
    }
  };

  const renderOption = (option, optionText, selected) => (
    <div
      className={`option ${selected ? "selected" : ""}`}
      onClick={() => handleVote(optionText)}
    >
      <p>{option.text}</p>
      {userHasVoted && (
        <div className="vote-info">
          <p>
            {option.votes.length} out of {totalVotes} votes
          </p>
          <p>{((option.votes.length / totalVotes) * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="poll-details">
      <h3>Would You Rather</h3>
      {showMessage && (
        <p className="success-message">Your answer has been saved!</p>
      )}
      <div className="poll-author">
        <img
          src={author.avatarURL}
          alt={`Avatar of ${author.name}`}
          className="avatar"
        />
        <span>{author.name} asks:</span>
      </div>
      <div className="poll-options">
        {renderOption(
          optionOne,
          "optionOne",
          optionOne.votes.includes(authedUser)
        )}
        {renderOption(
          optionTwo,
          "optionTwo",
          optionTwo.votes.includes(authedUser)
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions,
  users,
});

export default connect(mapStateToProps)(PollDetails);
