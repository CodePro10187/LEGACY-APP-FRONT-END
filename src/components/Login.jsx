// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a login request
    if (email === "test@example.com" && password === "password") {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Sign In</h2>
      {error && <p className="error-message">{error}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>

      <div className="extra-links">
        <button
          onClick={() => navigate("/forgot-password")}
          className="link-button"
        >
          Forgot password?
        </button>
        <button onClick={() => navigate("/register")} className="link-button">
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
