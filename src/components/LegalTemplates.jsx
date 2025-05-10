import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./AdminPanel.css";

const LegalTemplates = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const dummyTemplates = [
      {
        id: 1,
        title: "Standard Will Template",
        type: "Will",
        uploadedBy: "admin",
        uploadedAt: "2025-04-28",
      },
      {
        id: 2,
        title: "Family Trust Agreement",
        type: "Trust",
        uploadedBy: "vinu",
        uploadedAt: "2025-04-27",
      },
      {
        id: 3,
        title: "Business Partnership Agreement",
        type: "Agreement",
        uploadedBy: "sam",
        uploadedAt: "2025-04-26",
      },
    ];
    setTemplates(dummyTemplates);
  }, []);

  const handlePreview = (templateId) => {
    alert(`Previewing template ID: ${templateId}`);
  };

  const handleDownload = (templateId) => {
    alert(`Downloading template ID: ${templateId}`);
  };

  const handleDelete = (templateId) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates(templates.filter((t) => t.id !== templateId));
    }
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
          <button onClick={() => navigate("/AuditLogs")} className="sidebar-btn">📈 Audit Logs</button>
          <button className="sidebar-btn">📄 Legal Templates</button>
          <button onClick={() => navigate("/SystemReport")} className="sidebar-btn">📊 System Report</button>
          <button onClick={() => navigate("/Security")} className="sidebar-btn">🛡️ Security</button>
        </aside>

        <main className="main-content">
          <h2>Legal Templates</h2>
          <div className="template-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Uploaded By</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id}>
                    <td>{template.title}</td>
                    <td>{template.type}</td>
                    <td>{template.uploadedBy}</td>
                    <td>{template.uploadedAt}</td>
                    <td>
                      <button onClick={() => handlePreview(template.id)}>Preview</button>
                      <button onClick={() => handleDownload(template.id)}>Download</button>
                      <button onClick={() => handleDelete(template.id)} className="delete-btn">Delete</button>
                    </td>
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

export default LegalTemplates;
