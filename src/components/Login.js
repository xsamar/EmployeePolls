import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ users, dispatch }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the stored location or default to the homepage
  const { from } = location.state || { from: { pathname: "/" } };

  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(selectedUser));

    // Store the redirect path in localStorage for future logins
    const redirectAfterLogin = localStorage.getItem("redirectAfterLogin") || from.pathname;
    localStorage.removeItem("redirectAfterLogin"); // Clear the redirect path after use

    // Redirect to the stored or intended location
    navigate(redirectAfterLogin);
  };

  return (
    <div className="login">
      <h3 className="center">Login</h3>
      <form onSubmit={handleSubmit}>
        <select value={selectedUser} onChange={handleChange}>
          <option value="" disabled>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button type="submit" disabled={selectedUser === ""}>
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users),
});

export default connect(mapStateToProps)(Login);
