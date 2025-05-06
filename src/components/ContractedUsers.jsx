import React from "react";
import "./Dashboard.css";

const users = [
  { id: 1, name: "John Doe", img: "https://via.placeholder.com/80" },
  { id: 2, name: "Jane Smith", img: "https://via.placeholder.com/80" },
];

const ContractedUsers = () => {
  return (
    <div className="section">
      <h2>Contracted Users</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-box">
            <img src={user.img} alt={user.name} />
            <p>{user.name}</p>
            <button>Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractedUsers;
