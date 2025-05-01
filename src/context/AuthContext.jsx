import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // <--- IMPORTANT: Start as null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/auth/me", {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })
      .then((res) => {
        setUser(res.data); // set user if backend responds successfully
      })
      .catch(() => {
        setUser(null); // <--- IMPORTANT: set to null if request fails
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
