// src/components/UserRegister.jsx
import React, { useState } from "react";
import "./UserRegister.css";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    prefix: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    occupation: "",
    country: "",
    address1: "",
    address2: "",
    nicPassportNumber: "",
    postalCode: "",
    securityQuestion: "",
    answer: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      prefix: "",
      email: "",
      mobileNumber: "",
      dateOfBirth: "",
      occupation: "",
      country: "",
      address1: "",
      address2: "",
      nicPassportNumber: "",
      postalCode: "",
      securityQuestion: "",
      answer: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setSuccess(null);
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed.");
      }

      const data = await response.json();
      console.log("User registered:", data);
      setSuccess("User registered successfully!");
      setError(null);
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="user-register-container">
      <h2 className="user-register-heading">User Registration</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="user-register-form" onSubmit={handleSubmit}>
        <div className="user-form-grid">
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Prefix", name: "prefix" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobileNumber" },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Occupation", name: "occupation" },
            { label: "Country", name: "country" },
            { label: "Address 1", name: "address1" },
            { label: "Address 2", name: "address2", fullWidth: true },
            { label: "NIC/Passport Number", name: "nicPassportNumber" },
            { label: "Postal Code", name: "postalCode" },
            { label: "Security Question", name: "securityQuestion" },
            { label: "Answer", name: "answer", fullWidth: true },
            { label: "Create Password", name: "password", type: "password" },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
            },
          ].map(({ label, name, type = "text", fullWidth }) => (
            <div
              className={`form-group ${fullWidth ? "full-width" : ""}`}
              key={name}
            >
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
