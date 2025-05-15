import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import "./ChatApp.css";

const API_URL = "http://localhost/digilegacy-backend/chat_backend.php";
const FILE_DELETE_URL =
  "http://localhost/digilegacy-backend/delete_chat_file.php";

const ChatApp = ({ lawyerId }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showDocuments, setShowDocuments] = useState(false);
  const fileInputRef = useRef(null);

  const userId = user?.user_id;

  useEffect(() => {
    if (userId && lawyerId) {
      fetchMessages();
    }
  }, [userId, lawyerId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL, {
        params: {
          from: userId,
          to: lawyerId,
        },
      });

      if (Array.isArray(res.data)) {
        setMessages(res.data);
      } else {
        console.error("Invalid response from server:", res.data);
        setMessages([]); // Fallback to empty array to prevent filter crash
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([]); // Prevents app from crashing
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    await axios.post(API_URL, {
      from: userId,
      to: lawyerId,
      content: input,
      type: "text",
    });
    setInput("");
    fetchMessages();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch(
      "http://localhost/digilegacy-backend/upload.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await uploadResponse.json();
    if (result.success) {
      await axios.post(API_URL, {
        user_id: userId,
        lawyer_id: lawyerId,
        content: file.name,
        type: "file",
        file_path: result.path,
      });
      fetchMessages();
    }
  };

  const handleDeleteFile = async (filePath) => {
    const confirmDelete = window.confirm("Delete this file?");
    if (!confirmDelete) return;

    await axios.post(FILE_DELETE_URL, {
      file_path: filePath,
      user_id: userId,
      lawyer_id: lawyerId,
    });

    fetchMessages();
  };

  const handleSendFileClick = () => {
    fileInputRef.current.click();
  };

  const filteredDocs = messages.filter((m) => m.type === "file");

  return (
    <div className="chat-container">
      <div className="header">Chat</div>
      <div className="messages">
        {(showDocuments ? filteredDocs : messages).map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.type === "text" ? (
              msg.content
            ) : (
              <div>
                <a
                  href={msg.file_path}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  📎 {msg.content}
                </a>
                <button onClick={() => handleDeleteFile(msg.file_path)}>
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={handleSendFileClick}>📎</button>
        <button onClick={() => setShowDocuments(!showDocuments)}>
          {showDocuments ? "Back to Chat" : "Shared Docs"}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default ChatApp;
