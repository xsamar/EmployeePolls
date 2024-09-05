import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewPoll = ({ dispatch, authedUser }) => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser));
    navigate("/");
  };

  return (
    <div>
      <h3 className="center">Would You Rather</h3>
      <form className="new-poll" onSubmit={handleSubmit}>
        <input
          placeholder="Option One"
          value={optionOneText}
          onChange={(e) => setOptionOneText(e.target.value)}
        />
        <input
          placeholder="Option Two"
          value={optionTwoText}
          onChange={(e) => setOptionTwoText(e.target.value)}
        />
        <button className="btn" type="submit" disabled={optionOneText === "" || optionTwoText === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(NewPoll);
