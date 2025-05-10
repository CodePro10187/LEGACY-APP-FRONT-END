import React, { useState, useEffect } from "react";
import "./Beneficiaries.css";

const Beneficiaries = () => {
  const [beneficiary, setBeneficiary] = useState({
    name: "",
    personalCode: "",
    relationship: "",
  });

  const [beneficiariesList, setBeneficiariesList] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // success or error

  useEffect(() => {
    // Optional: fetch existing beneficiaries if needed
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeneficiary((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBeneficiary = async () => {
    if (
      !beneficiary.name ||
      !beneficiary.personalCode ||
      !beneficiary.relationship
    ) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost/digilegacy-backend/add_beneficiary.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beneficiary),
      });

      const result = await response.json();

      if (result.success) {
        const newEntry = {
          ...beneficiary,
          sharedCount: 1,
          addedDate: new Date().toISOString().split("T")[0],
        };
        setBeneficiariesList((prev) => [...prev, newEntry]);
        setMessage("Beneficiary added successfully.");
        setMessageType("success");
        setBeneficiary({ name: "", personalCode: "", relationship: "" });
      } else {
        setMessage(result.message || "Failed to add beneficiary.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
      setMessageType("error");
      
    }
  };

  return (
    <div className="beneficiaries-container">
      <h2>Add Beneficiary</h2>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="input-grid">
        <div className="input-group">
          <label htmlFor="name">NIC</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="NIC"
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
            <th>NIC</th>
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
