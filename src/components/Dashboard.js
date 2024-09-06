import React, { useState } from "react";
import { connect } from "react-redux";
import Poll from "./Poll";

const Dashboard = ({ answered, unanswered }) => {
  const [showAnswered, setShowAnswered] = useState(false);

  return (
    <div className="dashboard">
      <h3 className="center">Questions</h3>

      <div className="segment-control">
        <button
          className={!showAnswered ? "active" : ""}
          onClick={() => setShowAnswered(false)}
        >
          Unanswered Questions
        </button>
        <button
          className={showAnswered ? "active" : ""}
          onClick={() => setShowAnswered(true)}
        >
          Answered Questions
        </button>
      </div>

      <div className="questions-section">
        <div className="questions-list">
          {!showAnswered
            ? unanswered.map((id) => (
                <div key={id}>
                  <Poll id={id} />
                </div>
              ))
            : answered.map((id) => (
                <div key={id}>
                  <Poll id={id} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  const answeredIds = Object.keys(users[authedUser].answers);
  const unanswered = Object.keys(questions).filter(
    (id) => !answeredIds.includes(id)
  );
  const answered = Object.keys(questions).filter((id) =>
    answeredIds.includes(id)
  );

  return {
    unanswered: unanswered.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    answered: answered.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
};

export default connect(mapStateToProps)(Dashboard);
