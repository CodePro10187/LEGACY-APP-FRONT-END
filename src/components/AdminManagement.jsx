import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../common/Header";
import Footer from "../common/Footer";
import AdminForm from "./AdminForm";
import "./AdminPanel.css";

const AdminManagement = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [admins, setAdmins] = useState([
    { id: 1, name: "Sam", email: "sam@gmail.com", role: "Super Admin" },
    { id: 2, name: "Vinu", email: "vinu@gmail.com", role: "Editor" },
  ]);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const handleAdd = (admin) => {
    setAdmins([...admins, { ...admin, id: Date.now() }]);
  };

  const handleDelete = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
  };

  const handleUpdate = (updatedAdmin) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === updatedAdmin.id ? updatedAdmin : admin
      )
    );
    setEditingAdmin(null);
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <aside className="sidebar">
          <button
            onClick={() => navigate("/AdminPanel")}
            className="sidebar-btn"
          >
            🏠 Dashboard
          </button>
          <button
            onClick={() => navigate("/AdminManagement")}
            className="sidebar-btn"
          >
            ⚙️ Admin Management
          </button>
          <button
            onClick={() => navigate("/PlatformSettings")}
            className="sidebar-btn"
          >
            🖨️ Platform Settings
          </button>
          <button
            onClick={() => navigate("/AuditLogs")}
            className="sidebar-btn"
          >
            📈 Audit Logs
          </button>
          <button
            onClick={() => navigate("/LegalTemplates")}
            className="sidebar-btn"
          >
            📄 Legal Templates
          </button>
          <button
            onClick={() => navigate("/SystemReport")}
            className="sidebar-btn"
          >
            📊 System Report
          </button>
          <button onClick={() => navigate("/Security")} className="sidebar-btn">
            🛡️ Security
          </button>
        </aside>

        <main className="main-content">
          <h2>Admin Management</h2>

          <AdminForm
            onSubmit={editingAdmin ? handleUpdate : handleAdd}
            editingAdmin={editingAdmin}
          />

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    <button onClick={() => handleEdit(admin)}>Edit</button>
                    <button onClick={() => handleDelete(admin.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminManagement;
