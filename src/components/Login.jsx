// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost/digilegacy-backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }

      const data = await response.json();

      // Check user type and navigate to appropriate dashboard
      if (data.userType === "user") {
        navigate("/");
      } else if (data.userType === "lawyer") {
        navigate("/LawyerDashboard");
      } else {
        setError("Unknown user type.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
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
          Login
        </button>
      </form>

      <div className="extra-links">
        <button
          onClick={() => navigate("/ForgotPassword")}
          className="link-button"
        >
          Forgot password?
        </button>
        <button
          onClick={() => navigate("/RegisterSelection")}
          className="link-button"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
