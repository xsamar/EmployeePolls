import React, { useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { handleInitialData } from "../actions/shared";
import RequireAuth from "./RequireAuth";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import NewPoll from "./NewPoll";
import Leaderboard from "./Leaderboard";
import PollDetails from "./PollDetails";
import Nav from "./Nav";
import Login from "./Login";
import NotFound from "./NotFound"; // Import the NotFound component
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const App = (props) => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location (URL)

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (!props.authedUser && location.pathname !== "/login") {
      localStorage.setItem("redirectAfterLogin", location.pathname);
    }
  }, [props.authedUser, location.pathname]);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all unknown paths to login */}
          </Routes>
        ) : (
          <Fragment>
            <Routes>
              <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/questions/:id" element={<RequireAuth><PollDetails /></RequireAuth>} />
              <Route path="/add" element={<RequireAuth><NewPoll /></RequireAuth>} />
              <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
            </Routes>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser, // Pass authedUser to use in the component
});

export default connect(mapStateToProps)(App);
