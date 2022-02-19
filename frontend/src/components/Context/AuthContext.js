import React, { useState, createContext } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // const [reload, setReload] = useState(false);
  const [token, setToken] = useState("");
  // const [userId, setUserId] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const isMyTokenValid = () => {
    if (localStorage.getItem("token")) {
      const decodedToken = jwt_decode(localStorage.getItem("token"));
      const dateNow = new Date();
      if (decodedToken.exp > dateNow / 1000) {
        return true;
      } else {
        localStorage.clear();
      }
    }
  };

  return <AuthContext.Provider value={{ /* reload, setReload, userId, setUserId, isAdmin, setIsAdmin, */ token, setToken, isMyTokenValid, isConnected, setIsConnected }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
