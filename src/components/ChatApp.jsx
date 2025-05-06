import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ChatApp.css";

const API_URL = "http://localhost/lawyer-backend/chat_backend.php";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showDocuments, setShowDocuments] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get(API_URL);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    await axios.post(API_URL, {
      content: input,
      type: "text",
    });
    setInput("");
    fetchMessages();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate upload path
    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch("upload.php", {
      method: "POST",
      body: formData,
    });

    const result = await uploadResponse.json();
    if (result.success) {
      await axios.post(API_URL, {
        content: file.name,
        type: "file",
        file_path: result.path,
      });
      fetchMessages();
    }
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
              <a href={msg.file_path} target="_blank" rel="noreferrer">
                📎 {msg.content}
              </a>
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
