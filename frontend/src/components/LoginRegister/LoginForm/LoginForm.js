import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { authLogin } from "../../../api/auth";

import { AuthContext } from "../../Context/AuthContext";

const LoginForm = ({ successMessage }) => {
  const { setIsConnected, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    const login = { email: email, password: password };

    authLogin(login)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setIsConnected(true);
        navigate("/home");
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        if (err.response.data.error.includes("user")) emailError.innerHTML = "utilisateur incorrect";
        if (err.response.data.error.includes("password")) passwordError.innerHTML = "mot de passe incorrect";
      });
  };

  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="connection__login">
      <div className="signup__success">{successMessage}</div>
      <form action="" onSubmit={handleLogin} id="connection__login" className="login__form">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        <div className="email error"></div>

        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        <div className="password error"></div>

        <input type="submit" value="Se connecter" className="login__button" />
      </form>
    </div>
  );
};

export default LoginForm;
