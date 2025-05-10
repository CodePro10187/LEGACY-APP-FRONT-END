import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useUser } from "../context/UserContext"; // Import useUser hook

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // Get user data and logout function

  const handleLogout = () => {
    logout(); // Logout and clear user state
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">DigiLegacy</div>

      <nav className="nav">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>

        {!user ? (
          <div className="auth-buttons">
            <button className="button-login" onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className="button-signup"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="user-info">
            <span className="user-name">
              {user.prefix} {user.first_name} {user.last_name}
            </span>

            {user.profile_picture_url ? (
              <img
                src={user.profile_picture_url}
                alt="Profile"
                className="profile-pic"
              />
            ) : (
              <div className="default-profile-pic">👤</div>
            )}

            <button className="button-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
