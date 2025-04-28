import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Beneficiaries.css";

const Beneficiaries = () => {
  const [beneficiary, setBeneficiary] = useState({
    name: "",
    personalCode: "",
    relationship: "",
  });

  const [beneficiariesList, setBeneficiariesList] = useState([]);

  useEffect(() => {
    // Example placeholder for backend data fetching
    // axios.get('/api/beneficiaries')
    //   .then(response => setBeneficiariesList(response.data))
    //   .catch(error => console.error('Error fetching beneficiaries:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeneficiary((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBeneficiary = () => {
    if (
      !beneficiary.name ||
      !beneficiary.personalCode ||
      !beneficiary.relationship
    )
      return;

    const newBeneficiary = {
      ...beneficiary,
      sharedCount: 1, // Placeholder
      addedDate: new Date().toISOString().split("T")[0],
    };

    setBeneficiariesList((prev) => [...prev, newBeneficiary]);
    setBeneficiary({ name: "", personalCode: "", relationship: "" });
  };

  return (
    <div className="beneficiaries-container">
      <h2>Add Beneficiary</h2>
      <div className="input-grid">
        <div className="input-group">
          <label htmlFor="name">Beneficiary Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Beneficiary Name"
            value={beneficiary.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="personalCode">Personal Code</label>
          <input
            id="personalCode"
            type="text"
            name="personalCode"
            placeholder="Personal Code"
            value={beneficiary.personalCode}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="relationship">Relationship</label>
          <input
            id="relationship"
            type="text"
            name="relationship"
            placeholder="Relationship"
            value={beneficiary.relationship}
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={handleAddBeneficiary}>Add Beneficiary</button>

      <h3>Beneficiaries List</h3>
      <table>
        <thead>
          <tr>
            <th>Beneficiary Name</th>
            <th>Relationship</th>
            <th>Shared Count</th>
            <th>Added Date</th>
          </tr>
        </thead>
        <tbody>
          {beneficiariesList.map((b, index) => (
            <tr key={index}>
              <td>{b.name}</td>
              <td>{b.relationship}</td>
              <td>{b.sharedCount}</td>
              <td>{b.addedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Beneficiaries;
