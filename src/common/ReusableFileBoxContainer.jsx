import React, { useState } from "react";
import "./ReusableFileBoxContainer.css";

// Mock file data for demonstration purposes
const mockFiles = [
  { name: "file1.txt", size: "2MB" },
  { name: "file2.png", size: "3MB" },
  { name: "file3.pdf", size: "1MB" },
];

const FileBox = ({ id, onRemove, onAddFile, onEditFile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="file-box">
      <p>Box #{id}</p>
      <button onClick={() => onAddFile?.(id)}>Add File</button>
      <button onClick={toggleModal}>Edit</button>
      <button onClick={() => onRemove?.(id)}>Remove</button>

      {isModalOpen && <Modal onClose={toggleModal} />}
    </div>
  );
};

const Modal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [singleSelectValue, setSingleSelectValue] = useState("");

  const handleMultiSelectChange = (event) => {
    const options = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setMultiSelectValue(options);
  };

  const handleSingleSelectChange = (event) => {
    setSingleSelectValue(event.target.value);
  };

  const handleCancel = () => {
    // Reset values if needed or just close without saving
    setTitle("");
    setContent("");
    setMultiSelectValue([]);
    setSingleSelectValue("");
    onClose(); // Close the modal without saving changes
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Box</h2>

        <button className="close-modal" onClick={onClose}>
          X
        </button>

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit Title"
        />

        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Edit content here..."
        ></textarea>

        <label>Multiple Options (Select multiple):</label>
        <select
          multiple
          value={multiSelectValue}
          onChange={handleMultiSelectChange}
        >
          <option value="Option1">Option 1</option>
          <option value="Option2">Option 2</option>
          <option value="Option3">Option 3</option>
        </select>

        <label>Single Option (Select one):</label>
        <select value={singleSelectValue} onChange={handleSingleSelectChange}>
          <option value="">Select an Option</option>
          <option value="OptionA">Option A</option>
          <option value="OptionB">Option B</option>
          <option value="OptionC">Option C</option>
        </select>

        <label>Uploaded Files:</label>
        <ul>
          {mockFiles.map((file, index) => (
            <li key={index}>
              {file.name} - {file.size}
            </li>
          ))}
        </ul>

        <div className="modal-buttons">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
};

const ReusableFileBoxContainer = ({
  initialBoxes = [],
  onAddFile,
  onEditFile,
  onRemoveBox,
  containerTitle = "File Boxes",
}) => {
  const [boxes, setBoxes] = useState(initialBoxes);

  const addBox = () => {
    const newId = Date.now();
    setBoxes([...boxes, newId]);
  };

  const removeBox = (id) => {
    setBoxes(boxes.filter((boxId) => boxId !== id));
    onRemoveBox?.(id);
  };

  return (
    <div className="file-box-wrapper">
      <h3>{containerTitle}</h3>
      <button onClick={addBox}>➕ Add Box</button>
      <div className="file-container">
        {boxes.map((id) => (
          <FileBox
            key={id}
            id={id}
            onRemove={removeBox}
            onAddFile={onAddFile}
            onEditFile={onEditFile}
          />
        ))}
      </div>
    </div>
  );
};

export default ReusableFileBoxContainer;
