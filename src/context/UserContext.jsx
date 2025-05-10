// src/context/UserContext.jsx
import React, { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Create the UserProvider component to wrap around the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if the user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // If exists, use stored data, otherwise null
  });

  const login = (userData) => {
    // Save user data to localStorage and update the state
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Clear user data from localStorage and reset state
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
