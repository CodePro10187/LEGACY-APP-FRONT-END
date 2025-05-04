// src/components/UserProfileEdit.jsx
import React, { useState, useEffect } from "react";
import "./UserProfileEdit.css";

const UserProfileEdit = ({ userId }) => {
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
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState({ error: null, success: null });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        setFormData(data);
        if (data.profileImageUrl) setPreviewImage(data.profileImageUrl);
      } catch (err) {
        setMessage({ error: "Failed to load user data", success: null });
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error(await res.text());
      setMessage({ error: null, success: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ error: err.message, success: null });
    }
  };

  return (
    <div className="user-profile-edit-container">
      <h2>Edit Profile</h2>
      {message.error && <p className="error-message">{message.error}</p>}
      {message.success && <p className="success-message">{message.success}</p>}

      <form onSubmit={handleSubmit} className="user-profile-edit-form">
        <div className="profile-picture-section">
          <label>Profile Picture</label>
          {previewImage && (
            <img src={previewImage} alt="Preview" className="profile-preview" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfileEdit;
