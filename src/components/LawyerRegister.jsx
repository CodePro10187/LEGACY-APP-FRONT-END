// src/components/LawyerRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserRegister.css";

const LawyerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    prefix: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    country: "",
    address1: "",
    address2: "",
    nicPassportNumber: "",
    postalCode: "",
    securityQuestion: "",
    answer: "",
    password: "",
    confirmPassword: "",
    lawFirmName: "",
    lawFirmAddress: "",
    professionalLicenseNumber: "",
    licenseExpiryDate: "",
  });

  const [documentFile, setDocumentFile] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (documentFile) {
      data.append("document", documentFile);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/lawyer-register",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        navigate("/confirm");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Error connecting to server.");
    }
  };

  return (
    <div className="user-register-container">
      <h2 className="user-register-heading">Lawyer Registration</h2>
      {error && <p className="error-message">{error}</p>}

      <form
        className="user-register-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="user-form-grid">
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Prefix", name: "prefix" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobileNumber" },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Country", name: "country" },
            { label: "Address 1", name: "address1" },
            { label: "Address 2", name: "address2", fullWidth: true },
            { label: "NIC/Passport Number", name: "nicPassportNumber" },
            { label: "Postal Code", name: "postalCode" },
            { label: "Security Question", name: "securityQuestion" },
            { label: "Answer", name: "answer", fullWidth: true },
            { label: "Law Firm Name", name: "lawFirmName" },
            {
              label: "Law Firm Address",
              name: "lawFirmAddress",
              fullWidth: true,
            },
            {
              label: "Professional License Number",
              name: "professionalLicenseNumber",
            },
            {
              label: "License Expiry Date",
              name: "licenseExpiryDate",
              type: "date",
            },
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
              />
            </div>
          ))}

          {/* File upload field */}
          <div className="form-group full-width">
            <label htmlFor="document">Upload Proof Document</label>
            <input
              id="document"
              type="file"
              name="document"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default LawyerRegister;
