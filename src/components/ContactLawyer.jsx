import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ContactLawyer.css"; // Style separately

const ContactLawyer = ({ isPremiumUser }) => {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chatEnabled, setChatEnabled] = useState(false);

  useEffect(() => {
    // Fetch lawyer data from your backend
    axios
      .get("/api/lawyers")
      .then((response) => setLawyers(response.data))
      .catch((error) => console.error("Error fetching lawyers:", error));
  }, []);

  const handleBooking = (lawyerId, date) => {
    axios
      .post("/api/book", {
        lawyerId,
        date,
      })
      .then(() => {
        alert("Meeting booked! Check your email for Zoom link.");
      });
  };

  const handleChatToggle = () => {
    if (isPremiumUser) {
      setChatEnabled(!chatEnabled);
    } else {
      alert("Chat is available only for premium users.");
    }
  };

  return (
    <div className="contact-lawyer-container">
      <h2>Contact a Lawyer</h2>
      <div className="lawyer-list">
        {lawyers.map((lawyer) => (
          <div key={lawyer.id} className="lawyer-card">
            <img
              src={lawyer.profilePictureUrl}
              alt={lawyer.name}
              className="profile-pic"
            />
            <h3>{lawyer.name}</h3>
            <p>{lawyer.specialization}</p>
            <p>{lawyer.bio}</p>

            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedLawyer(lawyer);
              }}
              value={selectedDate}
            />

            <button onClick={() => handleBooking(lawyer.id, selectedDate)}>
              Book Meeting
            </button>

            <button onClick={handleChatToggle}>
              {isPremiumUser ? "Start Chat" : "Upgrade to Chat"}
            </button>

            {chatEnabled && selectedLawyer?.id === lawyer.id && (
              <div className="chat-box">
                <p>Chat with {lawyer.name}</p>
                {/* Placeholder: Embed your chat component here */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactLawyer;
