import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LawyerList.css";
import LawyerContactDetail from "./LawyerContactDetail";
import { useUser } from "../context/UserContext";

const LawyerList = ({ isPremiumUser }) => {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const { user } = useUser();
  const [contractStatuses, setContractStatuses] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/digilegacy-backend/get_lawyers.php")
      .then((response) => {
        setLawyers(response.data);
        if (user) {
          // Fetch status for all lawyers
          response.data.forEach((lawyer) => {
            axios
              .get(
                "http://localhost/digilegacy-backend/check_contract_status.php",
                {
                  params: {
                    lawyer_id: lawyer.id,
                    user_id: user.user_id,
                  },
                }
              )
              .then((res) => {
                setContractStatuses((prev) => ({
                  ...prev,
                  [lawyer.id]: res.data.status,
                }));
              })
              .catch((error) => {
                console.error("Error checking contract status:", error);
              });
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching lawyers:", error);
      });
  }, [user]);

  const sendRequest = (lawyerId) => {
    console.log("Sending contract request with:", {
      lawyer_id: lawyerId,
      user_id: user?.user_id,
    });
    axios
      .post("http://localhost/digilegacy-backend/send_contract_request.php", {
        lawyer_id: lawyerId,
        user_id: user.user_id,
      })
      .then((res) => {
        alert(res.data.message);
        setContractStatuses((prev) => ({
          ...prev,
          [lawyerId]: "pending",
        }));
      })
      .catch((err) => {
        console.error("Request failed", err);
        if (err.response) {
          // Log the full error response from the server
          console.error("Error response: ", err.response);
          alert(`Error: ${err.response.status} - ${err.response.statusText}`);
        } else {
          alert("Request failed. Please check the console for details.");
        }
      });
  };

  if (selectedLawyer) {
    return (
      <LawyerContactDetail
        lawyer={selectedLawyer}
        onBack={() => setSelectedLawyer(null)}
        isPremiumUser={isPremiumUser}
      />
    );
  }

  return (
    <div className="lawyer-list-container">
      <h2>Our Lawyers</h2>
      <div className="lawyer-cards">
        {lawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            className={`lawyer-card ${
              lawyer.active_status === "1" ? "active" : "inactive"
            }`}
          >
            <img src={lawyer.profile_picture_url} alt={lawyer.name} />
            <h3>{lawyer.name}</h3>
            <p>{lawyer.bio}</p>
            <p
              className={`status ${
                lawyer.active_status === "1"
                  ? "status-active"
                  : "status-inactive"
              }`}
            >
              {lawyer.active_status === "1" ? "Active" : "Inactive"}
            </p>

            {contractStatuses[lawyer.id] === "accepted" ? (
              <button onClick={() => setSelectedLawyer(lawyer)}>Contact</button>
            ) : (
              <button
                onClick={() => sendRequest(lawyer.id)} // Pass lawyer.id when button is clicked
                disabled={contractStatuses[lawyer.id] === "pending"}
              >
                {contractStatuses[lawyer.id] === "pending"
                  ? "Requested"
                  : "Request"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerList;
