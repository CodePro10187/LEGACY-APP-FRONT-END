import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./AdminPanel.css";

const Security = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [policy, setPolicy] = useState({
    minLength: 8,
    requireNumbers: true,
    requireSpecialChars: true,
  });

  const [twoFA, setTwoFA] = useState(true);
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    const dummyLogins = [
      { id: 1, user: "admin", time: "2025-05-01 10:20 AM", ip: "192.168.1.10" },
      { id: 2, user: "vinu", time: "2025-04-30 08:15 AM", ip: "192.168.1.14" },
    ];
    setLoginHistory(dummyLogins);
  }, []);

  const toggle2FA = () => {
    setTwoFA(!twoFA);
  };

  const updatePolicy = () => {
    alert("Security policy updated!");
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
          <button onClick={() => navigate("/SystemReport")} className="sidebar-btn">📊 System Report</button>
          <button className="sidebar-btn">🛡️ Security</button>
        </aside>

        <main className="main-content">
          <h2>Security Settings</h2>

          <div className="security-section">
            <h4>Password Policy</h4>
            <label>
              Minimum Length:
              <input
                type="number"
                value={policy.minLength}
                onChange={(e) =>
                  setPolicy({ ...policy, minLength: parseInt(e.target.value) })
                }
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={policy.requireNumbers}
                onChange={(e) =>
                  setPolicy({ ...policy, requireNumbers: e.target.checked })
                }
              />
              Require Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={policy.requireSpecialChars}
                onChange={(e) =>
                  setPolicy({ ...policy, requireSpecialChars: e.target.checked })
                }
              />
              Require Special Characters
            </label>
            <button onClick={updatePolicy}>Update Policy</button>
          </div>

          <div className="security-section">
            <h4>Two-Factor Authentication</h4>
            <label>
              <input type="checkbox" checked={twoFA} onChange={toggle2FA} />
              Enable 2FA for all admins
            </label>
          </div>

          <div className="security-section">
            <h4>Login History</h4>
            <table className="login-history">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Time</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((log) => (
                  <tr key={log.id}>
                    <td>{log.user}</td>
                    <td>{log.time}</td>
                    <td>{log.ip}</td>
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

export default Security;
