import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Header() {
  const navigate = useNavigate(); // Hook for programmatic navigation

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
        <button className="button-login" onClick={() => navigate("/Login")}>
          Login
        </button>
        <button
          className="button-signup"
          onClick={() => navigate("/RegisterSelection")}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}
