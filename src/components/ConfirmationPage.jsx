// src/components/ConfirmRegistration.jsx
import React, { useState } from "react";
import "./ConfirmationPage.css"; // Reuse the same CSS for consistent styling

const ConfirmRegistration = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code === "123456") {
      alert("Registration confirmed!");
      // Redirect or further logic
    } else {
      setError("Invalid confirmation code.");
    }
  };

  return (
    <div className="user-register-container">
      <h2 className="user-register-heading">Confirm Registration</h2>
      {error && <p className="error-message">{error}</p>}

      <form className="user-register-form" onSubmit={handleSubmit}>
        <div className="form-group full-width">
          <label htmlFor="confirmationCode">Confirmation Code</label>
          <input
            id="confirmationCode"
            type="text"
            name="confirmationCode"
            placeholder="Enter Confirmation Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default ConfirmRegistration;
