// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import "./UserRegister.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      securityQuestion,
      answer,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setMessage("Password reset instructions sent to your email.");
        setError(null);
      } else {
        setError("Failed to send reset instructions.");
        setMessage(null);
      }
    } catch {
      setError("Error connecting to server.");
      setMessage(null);
    }
  };

  return (
    <div className="user-register-container">
      <h2 className="user-register-heading">Forgot Password</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <form className="user-register-form" onSubmit={handleSubmit}>
        <div className="user-form-grid">
          <div className="form-group full-width">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="securityQuestion">Security Question</label>
            <input
              id="securityQuestion"
              name="securityQuestion"
              type="text"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="answer">Answer</label>
            <input
              id="answer"
              name="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
