import React, { useEffect, useState } from "react";
import axios from "axios"; // Added missing import
import "./LawyerList.css";
import LawyerContactDetail from "./LawyerContactDetail";

const LawyerList = ({ isPremiumUser }) => {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/lawyer-backend/get_lawyers.php")
      .then((response) => {
        console.log("Full response:", response);
        console.log("Response data:", response.data);
        setLawyers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lawyers:", error);
      });
  }, []);

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
          <div key={lawyer.id} className="lawyer-card">
            <img src={lawyer.profile_picture_url} alt={lawyer.name} />
            <h3>{lawyer.name}</h3>
            <p>{lawyer.bio}</p>
            <button onClick={() => setSelectedLawyer(lawyer)}>Contact</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerList;
