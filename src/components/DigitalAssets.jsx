import React from "react";
import ReusableFileBoxContainer from "../common/ReusableFileBoxContainer";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Beneficiaries from "../common/Beneficiaries";
import StepProgressBar from "../common/StepProgressBar";

const DigitalAssets = () => {
  const handleAddFile = (id) => {
    console.log(`Add file to box #${id}`);
  };

  const handleEditFile = (id) => {
    console.log(`Edit file in box #${id}`);
  };

  const handleRemoveBox = (id) => {
    console.log(`Box #${id} removed`);
  };

  return (
    <div>
      <Header />
      <h1>My Page</h1>
      <Beneficiaries />
      <ReusableFileBoxContainer
        onAddFile={handleAddFile}
        onEditFile={handleEditFile}
        onRemoveBox={handleRemoveBox}
        containerTitle="My Custom File Box Section"
      />
      <StepProgressBar />
      <Footer />
    </div>
  );
};

export default DigitalAssets;
