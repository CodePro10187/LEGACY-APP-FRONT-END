import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext"; // update with actual path
import "./ReusableFileBoxContainer.css";

const Modal = ({ onClose, boxId, uploadedBy, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [visibleTo, setVisibleTo] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boxRes, beneficiariesRes] = await Promise.all([
          fetch(
            `http://localhost/digilegacy-backend/get_box_details.php?box_id=${boxId}`
          ),
          fetch(
            `http://localhost/digilegacy-backend/get_beneficiaries_for_user.php?user_id=${uploadedBy}`
          ),
        ]);
        const boxData = await boxRes.json();
        const beneficiariesData = await beneficiariesRes.json();
        setBeneficiaries(beneficiariesData);

        setTitle(boxData.box.title || "");
        setContent(boxData.box.content || "");
        setVisibleTo(JSON.parse(boxData.box.visible_to || "[]"));
        setFiles(boxData.files || []);
      } catch (err) {
        console.error("Failed to fetch data in modal:", err);
      }
    };

    fetchData();
  }, [boxId]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleVisibleToChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setVisibleTo(selected);
  };

  const handleFileDelete = async (filePath) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const response = await fetch(
        "http://localhost/digilegacy-backend/delete_file.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file_path: filePath }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        // Update local file state
        setFiles(files.filter((file) => file.file_path !== filePath));
      } else {
        alert("Failed to delete file");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the file.");
    }
  };

  const handleUpdateAccess = async () => {
    try {
      const response = await fetch(
        "http://localhost/digilegacy-backend/upload_file.php",
        {
          method: "POST",
          body: new URLSearchParams({
            box_id: boxId,
            uploaded_by: uploadedBy,
            visible_to: JSON.stringify(visibleTo), // stringified JSON array
          }),
        }
      );
      const result = await response.json();
      if (result.status === "success") alert("Access updated!");
      else alert("Failed to update access.");
    } catch (err) {
      console.error(err);
      alert("Error updating access.");
    }
  };

  const handleUploadFiles = async () => {
    if (selectedFiles.length === 0) {
      alert("No files selected.");
      return;
    }

    const formData = new FormData();
    formData.append("box_id", boxId);
    formData.append("uploaded_by", uploadedBy);

    Array.from(selectedFiles).forEach((file) => {
      if (
        !file.type.startsWith("image/") &&
        !file.type.startsWith("application/pdf")
      ) {
        alert(`Invalid file type: ${file.name}`);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(`File too large: ${file.name}`);
        return;
      }

      formData.append("files[]", file);
    });

    try {
      const response = await fetch(
        "http://localhost/digilegacy-backend/upload_file.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        alert("Files uploaded successfully!");
        setSelectedFiles([]); // Clear selection
        if (onUpdate) onUpdate(); // Refresh parent
        // Re-fetch files
        const boxRes = await fetch(
          `http://localhost/digilegacy-backend/get_box_details.php?box_id=${boxId}`
        );
        const boxData = await boxRes.json();
        setFiles(boxData.files || []);
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading files.");
    }
  };

  const handleSaveDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost/digilegacy-backend/upload_file.php",
        {
          method: "POST",
          body: new URLSearchParams({
            box_id: boxId,
            uploaded_by: uploadedBy,
            title,
            content,
          }),
        }
      );
      const result = await response.json();
      if (result.status === "success") alert("Title & content updated!");
      else alert("Failed to update box.");
    } catch (err) {
      console.error(err);
      alert("Error updating title/content.");
    }
  };

  return (
    <div className="modal-overlay">
      <ul>
        {files.map((file, idx) => (
          <li key={idx}>
            <a
              href={`http://localhost/digilegacy-backend/${file.file_path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.file_name}
            </a>
          </li>
        ))}
      </ul>

      <div className="modal-content">
        <h2>Edit Box #{boxId}</h2>
        <button className="close-modal" onClick={onClose}>
          X
        </button>

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label>Visible To (Select multiple users):</label>
        <select multiple value={visibleTo} onChange={handleVisibleToChange}>
          {beneficiaries.map((b) => (
            <option key={b.user_id} value={b.user_id}>
              {b.first_name} {b.last_name}
            </option>
          ))}
        </select>

        <label>Upload Files:</label>
        <input
          type="file"
          name="files[]"
          multiple
          onChange={handleFileChange}
        />

        <div className="existing-files-section">
          <p>Existing Files:</p>
          <ul className="uploaded-files-list">
            {files.map((file, idx) => (
              <li key={idx}>
                <a
                  href={`http://localhost/digilegacy-backend/${file.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.file_name}
                </a>
                <button
                  onClick={() => handleFileDelete(file.file_path)}
                  className="delete-file-btn"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSaveDetails}>💾 Save Title & Content</button>
          <button onClick={handleUpdateAccess}>🔐 Update Access</button>
          <button onClick={handleUploadFiles}>📁 Upload Files</button>
        </div>
      </div>
    </div>
  );
};

const FileBox = ({ id, title, onRemove, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boxDetails, setBoxDetails] = useState(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const { user } = useUser();
  const uploadedBy = user?.user_id || "unknown";

  useEffect(() => {
    fetch(
      `http://localhost/digilegacy-backend/get_box_details.php?box_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBoxDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching box details:", error);
      });
  }, [id]);

  return (
    <div className="file-box">
      <p>{title}</p> {/* Display the title here */}
      <button onClick={toggleModal} aria-label="Edit box">
        Edit
      </button>
      <button onClick={() => onRemove?.(id)} aria-label="Remove box">
        Remove
      </button>
      {isModalOpen && (
        <Modal
          boxId={id}
          uploadedBy={uploadedBy}
          onClose={toggleModal}
          onUpdate={onUpdate} // Pass the refresh callback
        />
      )}
    </div>
  );
};

const ReusableFileBoxContainer = ({ containerTitle = "File Boxes" }) => {
  const [boxes, setBoxes] = useState([]);
  const { user } = useUser(); // 👈 Get current user
  const userId = user?.user_id;

  const refreshBoxes = async () => {
    if (!userId) return;

    const res = await fetch(
      `http://localhost/digilegacy-backend/get_user_boxes.php?user_id=${userId}`
    );
    const data = await res.json();
    if (data.status === "success") {
      const boxDetails = data.boxes.map((box) => ({
        id: box.box_id,
        title: box.title, // Title is included
        content: box.content,
        visible_to: box.visible_to,
        files: box.files || [], // Ensure files are part of the box data
      }));
      setBoxes(boxDetails); // Store full box data
    }
  };

  useEffect(() => {
    // 🔄 Fetch saved boxes for the logged-in user
    const fetchBoxes = async () => {
      if (!userId) return;

      const res = await fetch(
        `http://localhost/digilegacy-backend/get_user_boxes.php?user_id=${userId}`
      );
      const data = await res.json();
      if (data.status === "success") {
        const boxDetails = data.boxes.map((box) => ({
          id: box.box_id,
          title: box.title, // Title is included
          content: box.content,
          visible_to: box.visible_to,
          files: box.files || [], // Ensure files are part of the box data
        }));
        setBoxes(boxDetails); // Store full box data
      }
    };

    fetchBoxes();
  }, [userId]);

  const addBox = async () => {
    const newBox = {
      title: "",
      content: "",
      visible_to: [],
      files: [],
    };

    try {
      const response = await fetch(
        "http://localhost/digilegacy-backend/create_box.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        const newBoxId = data.box_id; // Ensure box_id is returned from the backend
        setBoxes((prevBoxes) => [
          ...prevBoxes,
          { id: newBoxId, title: "", content: "", visible_to: [], files: [] },
        ]);
      } else {
        alert(`Failed to add box: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating new box:", error);
      alert("An error occurred while adding a new box.");
    }
  };

  const removeBox = async (id) => {
    setBoxes(boxes.filter((box) => box.id !== id));

    // Optionally remove from DB
    await fetch(
      `http://localhost/digilegacy-backend/delete_box.php?box_id=${id}`
    );
  };

  return (
    <div className="file-box-wrapper">
      <h3>{containerTitle}</h3>
      <button onClick={addBox}>➕ Add Box</button>
      <div className="file-container">
        {boxes.map((box) => (
          <FileBox
            key={box.id}
            id={box.id}
            title={box.title} // Pass title as prop
            onRemove={removeBox}
            onUpdate={refreshBoxes}
          />
        ))}
      </div>
    </div>
  );
};

export default ReusableFileBoxContainer;
