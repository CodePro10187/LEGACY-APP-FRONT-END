import React, { useState, useEffect } from "react";

const AdminForm = ({ onSubmit, editingAdmin }) => {
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (editingAdmin) {
      setFormData(editingAdmin);
    } else {
      setFormData({ name: "", email: "", role: "" });
    }
  }, [editingAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", role: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
      <button type="submit">{editingAdmin ? "Update" : "Add Admin"}</button>
    </form>
  );
};

export default AdminForm;
