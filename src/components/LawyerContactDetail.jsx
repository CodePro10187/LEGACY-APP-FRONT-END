import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LawyerContactDetail.css";
import ChatApp from "./ChatApp";

const LawyerContactDetail = ({ lawyer, onBack, isPremiumUser }) => {
  const [details, setDetails] = useState(null);
  const [chatEnabled, setChatEnabled] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost/digilegacy-backend/get_lawyer_details.php?lawyer_id=${lawyer.id}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching lawyer details:", error);
      }
    };

    fetchDetails();
  }, [lawyer.id]);

  const handleChatToggle = () => {
    if (isPremiumUser) {
      setChatEnabled(!chatEnabled);
    } else {
      alert("Chat is available only for premium users.");
    }
  };

  if (!details) return <p>Loading lawyer details...</p>;

  const { lawyer: lawyerData, schedule, appointments } = details;

  return (
    <div className="contact-detail-container">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>
      <div className="lawyer-detail-card">
        <img src={lawyerData.profile_picture_url} alt={lawyerData.name} />
        <div className="lawyer-info">
          <h2>{lawyerData.name}</h2>
          <p>{lawyerData.bio}</p>
          <p>Email: {lawyerData.email || "N/A"}</p>
          <p>Phone: {lawyerData.mobile_number || "N/A"}</p>

          <h3>Available Schedule</h3>
          {schedule.length > 0 ? (
            <ul>
              {schedule.map((slot) => (
                <li key={slot.schedule_id}>
                  {slot.date} | {slot.starting_time} - {slot.ending_time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No available schedule found.</p>
          )}

          <h3>Appointments</h3>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appt) => (
                <li key={appt.appointment_id}>
                  {appt.date} | {appt.starting_time}-{appt.ending_time} |
                  Status: {appt.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments found.</p>
          )}

          <h3>Chat with {lawyerData.name}</h3>
          <div className="chat-box">
            <ChatApp lawyerId={lawyerData.lawyer_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerContactDetail;
