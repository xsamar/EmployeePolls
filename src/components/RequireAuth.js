import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, authedUser }) => {
  const location = useLocation();

  if (!authedUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(RequireAuth);
