import React from "react";
import "./SubscriptionPlan.css";

const plans = [
  {
    name: "Free",
    price: "$0/month",
    features: [
      "Plan your legacy",
      "Store and share documents with beneficiaries",
      "Add beneficiaries",
    ],
  },
  {
    name: "Premium",
    price: "$12/month",
    features: [
      "Plan your legacy",
      "Store and share documents with beneficiaries",
      "Add beneficiaries",
      "Contact a lawyer",
      "Use themes/layouts for legal documents",
    ],
  },
];

const SubscriptionPlan = () => {
  return (
    <div className="plans-container">
      <h1 className="plans-title">Choose Your Plan</h1>
      <div className="plans">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card ${plan.name === "Premium" ? "premium" : ""}`}
          >
            <h2>{plan.name}</h2>
            <p className="plan-price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="subscribe-btn">
              {plan.name === "Free" ? "Start for Free" : "Upgrade to Premium"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
