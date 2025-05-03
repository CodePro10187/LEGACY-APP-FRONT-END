import React, { useState } from "react";
import "./UserRegister.css";

const LawyerRegister = () => {
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
  const [successMessage, setSuccessMessage] = useState(null);

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
      setSuccessMessage(null);
      return;
    }

    const formPayload = new FormData();
    for (let key in formData) {
      formPayload.append(key, formData[key]);
    }
    if (documentFile) {
      formPayload.append("documentFile", documentFile);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/lawyers/register",
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (response.ok) {
        setSuccessMessage("Registration successful!");
        setError(null);
        setFormData({
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
        setDocumentFile(null);
      } else {
        const errText = await response.text();
        setError(errText || "Registration failed.");
        setSuccessMessage(null);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="user-register-container">
      <h2 className="user-register-heading">Lawyer Registration</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

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
