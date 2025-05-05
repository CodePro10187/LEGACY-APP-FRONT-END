import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import "./UserProfileEdit.css";

const UserProfileEdit = () => {
  const { user, setUser } = useUser();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log("User object from context:", user);
      setFormData((prev) => ({ ...prev, ...user }));
      if (user.profileImageUrl) setPreviewImage(user.profileImageUrl);
      setLoading(false);
    } else {
      setMessage({ error: "Failed to load user data", success: null });
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setProfileImage(null);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append user details as JSON blob
    form.append(
      "userDetails",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    // Only append image if selected
    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      setMessage({ error: null, success: "Profile updated successfully!" });
    } catch (err) {
      setMessage({
        error: err.message || "An unexpected error occurred.",
        success: null,
      });
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

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
                value={formData[name] || ""}
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
