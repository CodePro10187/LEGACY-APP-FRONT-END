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

  const [userType, setUserType] = useState(() => {
    // Check if the userType exists in localStorage
    const storedUserType = localStorage.getItem("userType");
    return storedUserType ? storedUserType : null; // If exists, use stored data, otherwise null
  });

  const login = (userData, type) => {
    // Save user data and userType to localStorage and update the state
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userType", type);
    setUser(userData);
    setUserType(type);
  };

  const logout = () => {
    // Clear user data from localStorage and reset state
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setUser(null);
    setUserType(null);
  };

  return (
    <UserContext.Provider value={{ user, userType, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
