import React, { useState } from "react";
import "./Dashboard.css";
import ContractedUsers from "./ContractedUsers";

const LawyerDashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2025-05-10", time: "10:00 - 11:00", status: "pending" },
    { id: 2, date: "2025-05-11", time: "14:00 - 15:00", status: "confirmed" },
  ]);
  const [availableDate, setAvailableDate] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showContracted, setShowContracted] = useState(false);

  const addSchedule = () => {
    if (availableDate && availableTime) {
      setSchedules([
        ...schedules,
        { date: availableDate, time: availableTime },
      ]);
      setAvailableDate("");
      setAvailableTime("");
    }
  };

  const handleAppointmentAction = (id, action) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: action } : appt))
    );
  };

  return (
    <div className="dashboard">
      <h1>Lawyer Dashboard</h1>
      <label>
        <input
          type="checkbox"
          checked={disabled}
          onChange={() => setDisabled(!disabled)}
        />
        Temporarily Disable Services
      </label>

      <div className="section">
        <h2>Add Available Schedule</h2>
        <input
          type="date"
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Time Period (e.g., 09:00 - 10:00)"
          value={availableTime}
          onChange={(e) => setAvailableTime(e.target.value)}
        />
        <button onClick={addSchedule}>Add</button>
      </div>

      <div className="section">
        <h2>Available Schedules</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s, i) => (
              <tr key={i}>
                <td>{s.date}</td>
                <td>{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>User Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleAppointmentAction(appt.id, "confirmed")
                        }
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleAppointmentAction(appt.id, "declined")
                        }
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="contracted-btn"
        onClick={() => setShowContracted(true)}
      >
        View Contracted Users
      </button>

      {showContracted && <ContractedUsers />}
    </div>
  );
};

export default LawyerDashboard;
