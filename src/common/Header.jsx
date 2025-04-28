import React from "react";
import "./Header.css"; // Optional: for styling

export default function Header() {
  return (
    <header className="header">
      <div className="logo">DigiLegacy</div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About Us</a>
      </nav>
      <div className="auth-buttons">
        <button
          //style={{ backgroundColor: "black", color: "white" }}
          className="button-dark"
          onClick={() => alert("Login Clicked")}
        >
          Login
        </button>
        <button
          //style={{ backgroundColor: "#80B0FD", color: "black" }}
          className="button-sky-blue"
          onClick={() => alert("Sign Up Clicked")}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}
