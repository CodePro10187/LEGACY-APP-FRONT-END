import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AdminPanel.css";
import Header from "../common/Header";
import Footer from "../common/Footer";

const AdminPanel = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <aside className="sidebar">
          <button  className="sidebar-btn">🏠 Dashboard</button>
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
          <button onClick={() => navigate("/SystemReport")} className="sidebar-btn">📊 System Report</button>
          <button onClick={() => navigate("/Security")} className="sidebar-btn">🛡️ Security</button>
        </aside>

        <main className="main-content">
          <h2>Admin</h2>

          <div className="stats-container">
            <div className="stat-box light-blue">
              <div className="stat-value">320</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-box blue">
              <div className="stat-value">150</div>
              <div className="stat-label">Drafted Wills</div>
            </div>
            <div className="stat-box blue">
              <div className="stat-value">84</div>
              <div className="stat-label">Generated Trusts</div>
            </div>
            <div className="stat-box blue">
              <div className="stat-value">212</div>
              <div className="stat-label">Completed Agreements</div>
            </div>
          </div>

          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Document Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sam</td>
                  <td>sam@gmail.com</td>
                  <td>Will</td>
                  <td>pending</td>
                </tr>
                <tr>
                  <td>Vinu</td>
                  <td>jonali@gmail.com</td>
                  <td>Trust</td>
                  <td>complete</td>
                </tr>
              </tbody>
            </table>
            <div className="view-all">View All</div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
