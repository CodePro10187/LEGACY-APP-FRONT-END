// src/components/LawyerProfileEdit.jsx
import React, { useState, useEffect } from "react";
import "./LawyerProfileEdit.css";

const LawyerProfileEdit = ({ lawyerId }) => {
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
    lawFirmName: "",
    lawFirmAddress: "",
    professionalLicenseNumber: "",
    licenseExpiryDate: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState({ error: null, success: null });

  useEffect(() => {
    // Load existing profile data
    const fetchLawyer = async () => {
      try {
        const res = await fetch(`/api/lawyers/${lawyerId}`);
        const data = await res.json();
        setFormData(data);
        if (data.profileImageUrl) setPreviewImage(data.profileImageUrl);
      } catch (err) {
        setMessage({ error: "Failed to load lawyer data", success: null });
      }
    };

    fetchLawyer();
  }, [lawyerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      form.append(key, val);
    });

    if (profileImage) form.append("profileImage", profileImage);
    if (documentFile) form.append("documentFile", documentFile);

    try {
      const res = await fetch(`/api/lawyers/${lawyerId}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error(await res.text());
      setMessage({ success: "Profile updated successfully!", error: null });
    } catch (err) {
      setMessage({ error: err.message || "Update failed", success: null });
    }
  };

  return (
    <div className="lawyer-profile-edit-container">
      <h2>Edit Lawyer Profile</h2>
      {message.error && <p className="error-message">{message.error}</p>}
      {message.success && <p className="success-message">{message.success}</p>}

      <form onSubmit={handleSubmit} className="lawyer-profile-form">
        <div className="profile-upload">
          <label>Profile Picture</label>
          {previewImage && (
            <img src={previewImage} className="profile-preview" alt="Preview" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="lawyer-form-grid">
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
            <label htmlFor="documentFile">Upload Verification Document</label>
            <input
              id="documentFile"
              type="file"
              name="documentFile"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default LawyerProfileEdit;
