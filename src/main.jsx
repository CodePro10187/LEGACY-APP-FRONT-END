import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/UserContext"; // Import the UserProvider
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
