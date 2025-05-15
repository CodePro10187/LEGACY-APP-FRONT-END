import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import ContractedUsers from "./ContractedUsers";
import { useUser } from "../context/UserContext"; // ✅ Adjust the path if needed

const LawyerDashboard = () => {
  const { user, userType } = useUser(); // ✅ Use context
  const lawyerId = user?.lawyer_id; // ✅ Dynamically pull lawyer ID
  const [schedules, setSchedules] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [availableDate, setAvailableDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showContracted, setShowContracted] = useState(false);

  useEffect(() => {
    fetchLawyerStatus();
    fetchSchedules();
    fetchAppointments();
  }, []);

  const toggleServiceStatus = async () => {
    const newStatus = disabled ? 1 : 0;
    await fetch(
      "http://localhost/digilegacy-backend/update_lawyer_status.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lawyer_id: lawyerId, active_status: newStatus }),
      }
    );
    setDisabled(!disabled);
  };

  const deleteSchedule = async (scheduleId) => {
    console.log("Deleting schedule with ID:", scheduleId);
    await fetch("http://localhost/digilegacy-backend/delete_schedule.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule_id: scheduleId }),
    });
    fetchSchedules(); // Refresh after deletion
  };

  const fetchLawyerStatus = async () => {
    const res = await fetch(
      `http://localhost/digilegacy-backend/get_lawyer_status.php?lawyer_id=${lawyerId}`
    );
    const data = await res.json();
    setDisabled(data.active_status === 0); // 0 = inactive
  };

  const fetchSchedules = async () => {
    const response = await fetch(
      `http://localhost/digilegacy-backend/get_schedules.php?lawyer_id=${lawyerId}`
    );
    const data = await response.json();
    setSchedules(data);
  };

  const fetchAppointments = async () => {
    const response = await fetch(
      `http://localhost/digilegacy-backend/get_appointments.php?lawyer_id=${lawyerId}`
    );
    const data = await response.json();
    setAppointments(data);
  };

  const addSchedule = async () => {
    if (availableDate && startTime && endTime) {
      await fetch("http://localhost/digilegacy-backend/add_schedule.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lawyer_id: lawyerId,
          date: availableDate,
          starting_time: startTime,
          ending_time: endTime,
        }),
      });
      fetchSchedules(); // Refresh list
      setAvailableDate("");
      setStartTime("");
      setEndTime("");
    }
  };

  const handleAppointmentAction = async (id, action) => {
    await fetch(
      "http://localhost/digilegacy-backend/update_appointment_status.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointment_id: id, status: action }),
      }
    );
    fetchAppointments();
  };

  if (!lawyerId) {
    return <div>Loading dashboard...</div>; // fallback if user context hasn't loaded
  }

  return (
    <div className="dashboard">
      <h1>Lawyer Dashboard</h1>
      <label>
        <input
          type="checkbox"
          checked={disabled}
          onChange={toggleServiceStatus}
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
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button onClick={addSchedule}>Add</button>
      </div>

      <div className="section">
        <h2>Available Schedules</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s, i) => (
              <tr key={i}>
                <td>{s.date}</td>
                <td>{s.starting_time}</td>
                <td>{s.ending_time}</td>
                <td>
                  <button onClick={() => deleteSchedule(s.schedule_id)}>
                    Delete
                  </button>
                </td>
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
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.appointment_id}>
                <td>{appt.date}</td>
                <td>{appt.starting_time}</td>
                <td>{appt.ending_time}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleAppointmentAction(
                            appt.appointment_id,
                            "confirmed"
                          )
                        }
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleAppointmentAction(
                            appt.appointment_id,
                            "cancelled"
                          )
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

      {showContracted && <ContractedUsers lawyerId={lawyerId} />}
    </div>
  );
};

export default LawyerDashboard;
