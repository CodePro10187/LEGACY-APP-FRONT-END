import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./AdminPanel.css";

const AuditLogs = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Dummy data simulating audit logs
    const dummyLogs = [
      {
        id: 1,
        user: "admin",
        action: "LOGIN",
        timestamp: "2025-05-01 09:32:10",
        description: "Admin user logged in.",
      },
      {
        id: 2,
        user: "vinu",
        action: "CREATE",
        timestamp: "2025-05-01 10:10:45",
        description: "Created a new trust document.",
      },
      {
        id: 3,
        user: "sam",
        action: "DELETE",
        timestamp: "2025-05-01 11:15:00",
        description: "Deleted a draft will.",
      },
      {
        id: 4,
        user: "admin",
        action: "UPDATE",
        timestamp: "2025-05-01 12:00:00",
        description: "Updated user access permissions.",
      },
    ];
    setLogs(dummyLogs);
  }, []);

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <aside className="sidebar">
          <button onClick={() => navigate("/AdminPanel")} className="sidebar-btn">🏠 Dashboard</button>
          <button onClick={() => navigate("/AdminManagement")} className="sidebar-btn">
            ⚙️ Admin Management
          </button>
          <button onClick={() => navigate("/PlatformSettings")} className="sidebar-btn">
            🖨️ Platform Settings
          </button>
          <button className="sidebar-btn">📈 Audit Logs</button>
          <button onClick={() => navigate("/LegalTemplates")} className="sidebar-btn">
            📄 Legal Templates
          </button>
          <button onClick={() => navigate("/SystemReport")} className="sidebar-btn">📊 System Report</button>
          <button onClick={() => navigate("/Security")} className="sidebar-btn">🛡️ Security</button>
        </aside>

        <main className="main-content">
          <h2>Audit Logs</h2>
          <div className="audit-log-table">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.timestamp}</td>
                    <td>{log.user}</td>
                    <td>{log.action}</td>
                    <td>{log.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AuditLogs;
