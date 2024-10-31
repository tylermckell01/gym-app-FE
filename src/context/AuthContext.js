import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const useAuthInfo = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth_token")
  );

  const login = (token) => {
    localStorage.setItem("auth_token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
