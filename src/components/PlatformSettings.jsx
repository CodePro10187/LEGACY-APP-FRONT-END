import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./AdminPanel.css";

const PlatformSettings = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [settings, setSettings] = useState({
    platformName: "My Legal Platform",
    email: "admin@legalplatform.com",
    maintenanceMode: false,
    allowRegistrations: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
    console.log(settings);
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <aside className="sidebar">
          <button onClick={() => navigate("/AdminPanel")} className="sidebar-btn">
            🏠 Dashboard
          </button>
          <button onClick={() => navigate("/AdminManagement")} className="sidebar-btn">
            ⚙️ Admin Management
          </button>
          <button className="sidebar-btn">🖨️ Platform Settings</button>
          <button onClick={() => navigate("/AuditLogs")} className="sidebar-btn">📈 Audit Logs</button>
          <button onClick={() => navigate("/LegalTemplates")} className="sidebar-btn">📄 Legal Templates</button>
          <button onClick={() => navigate("/SystemReport")} className="sidebar-btn">📊 System Report</button>
          <button onClick={() => navigate("/Security")} className="sidebar-btn">🛡️ Security</button>
        </aside>

        <main className="main-content">
          <h2>Platform Settings</h2>

          <form className="platform-settings-form" onSubmit={handleSave}>
            <label>
              Platform Name:
              <input
                type="text"
                name="platformName"
                value={settings.platformName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Contact Email:
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              Enable Maintenance Mode
            </label>

            <label>
              <input
                type="checkbox"
                name="allowRegistrations"
                checked={settings.allowRegistrations}
                onChange={handleChange}
              />
              Allow User Registrations
            </label>

            <button type="submit">Save Settings</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PlatformSettings;
