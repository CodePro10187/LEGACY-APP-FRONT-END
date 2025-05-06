import React, { useState } from "react";
import axios from "axios"; // Added missing import
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./LawyerContactDetail.css";

const LawyerContactDetail = ({ lawyer, onBack, isPremiumUser }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chatEnabled, setChatEnabled] = useState(false);

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        "http://localhost/lawyer-backend/book_appointment.php",
        {
          lawyerId: lawyer.id,
          date: selectedDate.toISOString().split("T")[0], // Format the date as 'YYYY-MM-DD'
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("There was an error booking your appointment.");
    }
  };

  const handleChatToggle = () => {
    if (isPremiumUser) {
      setChatEnabled(!chatEnabled);
    } else {
      alert("Chat is available only for premium users.");
    }
  };

  return (
    <div className="contact-detail-container">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>
      <div className="lawyer-detail-card">
        <img src={lawyer.profile_picture_url} alt={lawyer.name} />
        <div className="lawyer-info">
          <h2>{lawyer.name}</h2>
          <p>{lawyer.bio}</p>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <div className="action-buttons">
            <button onClick={handleBooking}>Make Appointment</button>
            <button onClick={handleChatToggle}>
              {isPremiumUser ? "Chat" : "Upgrade to Chat"}
            </button>
          </div>
          {chatEnabled && (
            <div className="chat-box">
              <p>Chatting with {lawyer.name}...</p>
              {/* Embed actual chat widget/component here */}
            </div>
          )}
          <div className="other-contact">
            <h4>Other Contact Methods</h4>
            <p>Email: {lawyer.email || "not provided"}</p>
            <p>Phone: {lawyer.phone || "not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerContactDetail;
