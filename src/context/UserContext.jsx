// src/context/UserContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const UserContext = createContext();

// UserProvider component to wrap around your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Example: Fetch user data from an API on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/users"); // Adjust the endpoint to match your API
        if (res.ok) {
          const data = await res.json();
          setUser(data); // Set user data to the state
        } else {
          // If the user is not authenticated, handle accordingly
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []); // Empty array ensures this effect runs only once when the component mounts

  // Return the context provider with the user state and setUser function
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access to the user context
export const useUser = () => {
  return useContext(UserContext);
};
