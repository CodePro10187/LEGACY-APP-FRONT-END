import React from "react";
import "./Header.css";
import { useAuth } from "../context/AuthContext"; // Make sure path matches
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Header() {
  const { user, loading } = useAuth();
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <header className="header">
      <div className="logo">DigiLegacy</div>

      <nav className="nav">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About Us</a>
        <a href="/LegalDocuments">Legal Documents</a>
        <a href="/HelpFAQ">Help</a>
      </nav>

      <div className="auth-buttons">
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <div className="user-info">
            <img
              src={user.profilePhotoUrl}
              alt="Profile"
              className="profile-img"
            />
            <span>{user.name}</span>
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
