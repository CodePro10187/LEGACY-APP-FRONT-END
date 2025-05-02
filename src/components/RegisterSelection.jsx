// src/components/RegisterSelection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterSelection.css";

const RegisterSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="register-selection-container">
      <h2 className="register-selection-heading">Choose Registration Type</h2>
      <div className="register-buttons">
        <button onClick={() => navigate("/UserRegister")}>
          Register as User
        </button>
        <button onClick={() => navigate("/LawyerRegister")}>
          Register as Lawyer
        </button>
      </div>
    </div>
  );
};

export default RegisterSelection;
