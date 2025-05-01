import React from "react";
import "./Header.css";
import { useAuth } from "../context/AuthContext"; // Make sure path matches

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="header">
      <div className="logo">DigiLegacy</div>

      <nav className="nav">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About Us</a>
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
            <button
              className="button-dark"
              onClick={() => alert("Login Clicked")}
            >
              Login
            </button>
            <button
              className="button-sky-blue"
              onClick={() => alert("Sign Up Clicked")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
