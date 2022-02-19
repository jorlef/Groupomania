import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./components/Context/AuthContext";

import Header from "./components/Header/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import DetailPost from "./pages/DetailPost";
import UserProfil from "./pages/UserProfil";

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

const RequireAuth = ({ children }) => {
  return isMyTokenValid() ? children : <Navigate to="/" />;
};

const AlreadyConnected = ({ children }) => {
  return isMyTokenValid() ? <Navigate to="/home" /> : children;
};

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
  return (
    <Router>
      <AuthContext.Provider value={{ userId, setUserId, isAdmin, setIsAdmin, token, setToken, isMyTokenValid, isConnected, setIsConnected }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <AlreadyConnected>
                <Login />
              </AlreadyConnected>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/post/:id"
            element={
              <RequireAuth>
                <DetailPost />
              </RequireAuth>
            }
          />
          <Route
            path="/profil"
            element={
              <RequireAuth>
                <UserProfil />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
