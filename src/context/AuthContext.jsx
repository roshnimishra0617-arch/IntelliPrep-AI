import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("prepvyera_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("prepvyera_user", JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("prepvyera_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}