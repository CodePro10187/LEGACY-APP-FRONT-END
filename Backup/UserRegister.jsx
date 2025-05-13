import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./UserRegister.css";

const UserRegister = () => {
  const initialFormData = {
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
    bio: "",
    profilePicture: null, // Add a field to store the uploaded file
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEmailVerified(false);
    setOtp("");
    setGeneratedOtp(null);
    setExpiryTime(null);
    setOtpSent(false);
  };

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const getExpiryTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    return now;
  };

  const sendOtp = (e) => {
    e.preventDefault();

    const otpValue = generateOtp();
    const expiry = getExpiryTime();

    const templateParams = {
      to_email: formData.email,
      passcode: otpValue,
      time: expiry.toLocaleTimeString(),
    };

    emailjs
      .send(
        "service_zqw90bk", // Your EmailJS service ID
        "template_lycp0qh", // Your template ID
        templateParams,
        "4zGWEA7HMRiT2Wod5" // Your public key
      )
      .then(() => {
        setGeneratedOtp(otpValue.toString());
        setExpiryTime(expiry);
        setOtpSent(true);
        setError("");
        alert("✅ OTP sent to your email");
      })
      .catch((err) => {
        console.error("❌ Failed to send OTP:", err);
        setError("Failed to send OTP. Please try again.");
      });
  };

  const verifyOtp = () => {
    const now = new Date();
    if (!generatedOtp || now > expiryTime) {
      setError("OTP expired or not sent. Please request a new one.");
      return;
    }

    if (otp === generatedOtp) {
      setIsEmailVerified(true);
      setError("");
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      setError("Please verify your email before submitting.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setSuccess(null);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        "http://localhost/digilegacy-backend/registeruser.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

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
      setError(err.message || "Something went wrong.");
      setSuccess(null);
    }
  };

  const fields = [
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
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  return (
    <div className="user-register-container">
      <h2 className="user-register-heading">User Registration</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="user-register-form" onSubmit={handleSubmit}>
        <div className="user-form-grid">
          {fields.map(({ label, name, type = "text", fullWidth }) => (
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

          {/* Add Profile Picture Upload Field */}
          <div className="form-group full-width">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              id="profilePicture"
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Write your bio here"
              rows={4}
              required
            />
          </div>

          {/* Email OTP Verification Section */}
          <div className="form-group full-width">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <button type="button" onClick={sendOtp} disabled={otpSent}>
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
          </div>

          {otpSent && (
            <div className="form-group full-width">
              <label htmlFor="otp">Enter OTP</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
              <button type="button" onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>
          )}
        </div>

        <button type="submit" disabled={!isEmailVerified}>
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
