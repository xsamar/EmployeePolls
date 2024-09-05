import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import RequireAuth from "./RequireAuth";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import NewPoll from "./NewPoll";
import Leaderboard from "./Leaderboard";
import PollDetails from "./PollDetails";
import Nav from "./Nav";
import Login from "./Login";
import NotFound from "./NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);


  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading === true ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <Fragment>
            <Routes>
              <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/questions/:id" element={<RequireAuth><PollDetails /></RequireAuth>} />
              <Route path="/add" element={<RequireAuth><NewPoll /></RequireAuth>} />
              <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
            </Routes>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);