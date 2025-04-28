// src/components/StepProgressBar.jsx
import React, { useState } from "react";
import "./StepProgressBar.css";

const StepProgressBar = () => {
  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState(1);
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Step Progress Bar</h2>
      <div className="step-progress-container">
        <div className="progress-line">
          <div
            className="progress-fill"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          ></div>
        </div>
        <div className="step-circles">
          {steps.map((step) => (
            <div
              key={step}
              className={`step-circle ${step <= currentStep ? "active" : ""}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </button>
        <button onClick={nextStep} disabled={currentStep === totalSteps}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepProgressBar;
