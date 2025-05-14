import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext"; // Import useUser hook
import "./Beneficiaries.css";

const Beneficiaries = () => {
  const { user } = useUser(); // Get current user from context

  const [beneficiary, setBeneficiary] = useState({
    beneficiaryNIC: "",
    beneficiaryPersonalCode: "",
    relationship: "",
  });

  const [beneficiariesList, setBeneficiariesList] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      if (user && user.user_id) {
        try {
          const response = await fetch(
            "http://localhost/digilegacy-backend/get_beneficiaries.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.user_id,
              }),
            }
          );

          const result = await response.json();

          if (result.success) {
            setBeneficiariesList(result.beneficiaries);
          } else {
            setMessage(result.message || "Failed to load beneficiaries.");
            setMessageType("error");
          }
        } catch (error) {
          setMessage("Server error. Please try again later.");
          setMessageType("error");
        }
      }
    };

    fetchBeneficiaries();
  }, [user]); // Re-fetch when the user changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeneficiary((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBeneficiary = async () => {
    const { beneficiaryNIC, beneficiaryPersonalCode, relationship } =
      beneficiary;

    if (!beneficiaryNIC || !beneficiaryPersonalCode || !relationship) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }

    if (!user || !user.user_id) {
      setMessage("User not logged in.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/digilegacy-backend/add_beneficiary.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.user_id,
            beneficiaryNIC,
            beneficiaryPersonalCode,
            relationship,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        const newEntry = {
          beneficiaryName: result.beneficiaryName, // Use the full name from the response
          relationship,
          sharedCount: 1,
          addedDate: new Date().toISOString().split("T")[0],
        };
        setBeneficiariesList((prev) => [...prev, newEntry]);
        setMessage("Beneficiary added successfully.");
        setMessageType("success");
        setBeneficiary({
          beneficiaryNIC: "",
          beneficiaryPersonalCode: "",
          relationship: "",
        });
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

      {message && <div className={`message ${messageType}`}>{message}</div>}

      <div className="input-grid">
        <div className="input-group">
          <label htmlFor="beneficiaryNIC">Beneficiary NIC</label>
          <input
            id="beneficiaryNIC"
            type="text"
            name="beneficiaryNIC"
            placeholder="Beneficiary NIC"
            value={beneficiary.beneficiaryNIC}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="beneficiaryPersonalCode">
            Beneficiary Personal Code
          </label>
          <input
            id="beneficiaryPersonalCode"
            type="text"
            name="beneficiaryPersonalCode"
            placeholder="Beneficiary Personal Code"
            value={beneficiary.beneficiaryPersonalCode}
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
              <td>{b.beneficiaryName}</td>
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
