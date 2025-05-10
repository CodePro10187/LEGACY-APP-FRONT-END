import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./AdminPanel.css";

const SystemReport = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [reportData, setReportData] = useState({
    totalUsers: 325,
    activeSessions: 28,
    generatedDocs: 580,
    systemUptime: "99.99%",
  });

  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    const dummyLog = [
      { id: 1, user: "sam", action: "Generated Will", date: "2025-04-30 10:30 AM" },
      { id: 2, user: "vinu", action: "Uploaded Agreement", date: "2025-04-30 9:15 AM" },
      { id: 3, user: "admin", action: "Deleted User", date: "2025-04-29 4:50 PM" },
    ];
    setActivityLog(dummyLog);
  }, []);

  const handleDownloadReport = () => {
    alert("Downloading system report...");
  };

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
          <button onClick={() => navigate("/AuditLogs")} className="sidebar-btn">
            📈 Audit Logs
          </button>
          <button onClick={() => navigate("/LegalTemplates")} className="sidebar-btn">
            📄 Legal Templates
          </button>
          <button className="sidebar-btn">📊 System Report</button>
          <button onClick={() => navigate("/Security")} className="sidebar-btn">🛡️ Security</button>
        </aside>

        <main className="main-content">
          <h2>System Report</h2>
          
          <div className="report-summary">
            <div className="report-card"><strong>{reportData.totalUsers}</strong><br />Total Users</div>
            <div className="report-card"><strong>{reportData.generatedDocs}</strong><br />Documents Generated</div>
            <div className="report-card"><strong>{reportData.activeSessions}</strong><br />Active Sessions</div>
            <div className="report-card"><strong>{reportData.systemUptime}</strong><br />System Uptime</div>
          </div>

          <div className="activity-log">
            <h4>Recent Activities</h4>
            <ul>
              {activityLog.map((log) => (
                <li key={log.id}>
                  <strong>{log.user}</strong> - {log.action} <span className="log-date">({log.date})</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="download-btn" onClick={handleDownloadReport}>Download Full Report</button>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SystemReport;
