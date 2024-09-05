import React from "react";
import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="user-info">
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
                <div>
                  <p>{user.name}</p>
                  <p className="user-id">{user.id}</p>
                </div>
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users).sort((a, b) => {
      const scoreA = Object.keys(a.answers).length + a.questions.length;
      const scoreB = Object.keys(b.answers).length + b.questions.length;
      return scoreB - scoreA;
    }),
  };
};

export default connect(mapStateToProps)(Leaderboard);
