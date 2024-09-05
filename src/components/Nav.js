import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authedUser";

const Nav = ({ user, dispatch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink
            to="/"
            end
            style={({ isActive }) =>
              isActive ? { color: '#817e7d', fontWeight: 'bold', borderBottom: '2px solid #817e7d' } : { color: '#333' }
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leaderboard"
            style={({ isActive }) =>
              isActive ? { color: '#817e7d', fontWeight: 'bold', borderBottom: '2px solid #817e7d' } : { color: '#333' }
            }
          >
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            style={({ isActive }) =>
              isActive ? { color: '#817e7d', fontWeight: 'bold', borderBottom: '2px solid #817e7d' } : { color: '#333' }
            }
          >
            New Poll
          </NavLink>
        </li>
      </ul>
      {user ? (
        <div className="user-info">
          <img src={user.avatarURL} alt={`Avatar of ${user.name}`} />
          <span>{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="user-info">
          <span>...</span>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  return {
    user,
  };
};

export default connect(mapStateToProps)(Nav);
