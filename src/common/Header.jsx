// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Correct path to UserContext

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null); // Clear user context
    navigate("/"); // Navigate to homepage or login
  };

  return (
    <header className="header">
      <div className="logo">DigiLegacy</div>

      <nav className="nav">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About Us</a>
        <a href="/LegalDocuments">Legal Documents</a>
        <a href="/ContactLawyer">Contact Lawyer</a>
        <a href="/HelpFAQ">Help</a>
      </nav>

      <div className="auth-buttons">
        {user ? (
          <div className="user-info">
            <img
              src={user.profilePicture || "/default-profile.png"} // Fallback image if no profile picture
              alt="Profile"
              className="profile-pic"
            />
            <span className="user-name">
              {user.prefix} {user.firstName} {user.lastName}
            </span>
            <button onClick={handleLogout} className="button-logout">
              Logout
            </button>
          </div>
        ) : (
          <>
            <button className="button-login" onClick={() => navigate("/Login")}>
              Login
            </button>
            <button
              className="button-signup"
              onClick={() => navigate("/RegisterSelection")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
