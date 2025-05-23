import { useState } from "react";
import FileEditor from "../common/FileEditor";
import "./LegalDocuments.css";

const templates = {
  NDA: `NON-DISCLOSURE AGREEMENT

This Agreement is made on [Date] between [Disclosing Party] and [Receiving Party].

1. Confidential Information includes all data, materials, and information...
2. The Receiving Party agrees not to disclose...

Signed,
[Disclosing Party Signature]
[Receiving Party Signature]`,

  RentalAgreement: `RENTAL AGREEMENT

This Rental Agreement is entered on [Date] by and between [Landlord] and [Tenant].

1. The landlord agrees to rent the property located at [Address]...
2. Rent shall be $[Amount] per month, due on the [Day] of each month...

Signed,
[Landlord Signature]
[Tenant Signature]`,

  PowerOfAttorney: `POWER OF ATTORNEY

I, [Your Name], appoint [Agent Name] as my attorney-in-fact to act in my name on my behalf.

1. Powers include managing property, signing documents...
2. This POA shall remain in effect until revoked...

Signed,
[Your Signature]`,
};

const LegalDocuments = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [customFileName, setCustomFileName] = useState("");

  const handleTemplateSelect = (e) => {
    const templateKey = e.target.value;
    setSelectedTemplate(templateKey);
    setTemplateContent(templates[templateKey]);
    setCustomFileName(`${templateKey}.txt`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTemplateContent(event.target.result);
        setCustomFileName(file.name);
        setSelectedTemplate(""); // Clear template selection
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  return (
    <div
      className="legal-documents"
      style={{ padding: "2rem", fontFamily: "sans-serif" }}
    >
      <h1>Create Legal Documents</h1>
      <p>
        Select a premade legal document template or upload your own .txt file:
      </p>

      <select onChange={handleTemplateSelect} value={selectedTemplate}>
        <option value="">-- Choose a Template --</option>
        <option value="NDA">Non-Disclosure Agreement (NDA)</option>
        <option value="RentalAgreement">Rental Agreement</option>
        <option value="PowerOfAttorney">Power of Attorney</option>
      </select>

      <br />
      <br />

      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <br />
      <br />

      {templateContent && (
        <>
          <label>
            Rename file:&nbsp;
            <input
              type="text"
              value={customFileName}
              onChange={(e) => setCustomFileName(e.target.value)}
              style={{ width: "250px" }}
            />
          </label>
          <br />
          <br />
          <FileEditor
            initialContent={templateContent}
            initialFileName={customFileName}
          />
        </>
      )}
    </div>
  );
};

export default LegalDocuments;
