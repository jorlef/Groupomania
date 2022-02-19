import React, { useState } from "react";

import SignUpForm from "./SignUpForm/SignUpForm";
import LoginForm from "./LoginForm/LoginForm";

const LoginRegisterChoice = () => {
  const [signUpChoice, setSignUpChoice] = useState(false);
  const [loginChoice, setLoginChoice] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChoice = (e) => {
    if (e.target.id === "signup") {
      setLoginChoice(false);
      setSignUpChoice(true);
    } else if (e.target.id === "login") {
      setLoginChoice(true);
      setSignUpChoice(false);
    }
  };

  return (
    <div className="connection">
      <div className="connection__container">
        <ul className="connection__choice">
          <li onClick={handleChoice} id="login" className={loginChoice ? "connection__active-btn" : null}>
            Se connecter
          </li>
          <li onClick={handleChoice} id="signup" className={signUpChoice ? "connection__active-btn" : null}>
            S'inscrire
          </li>
        </ul>
        {signUpChoice && <SignUpForm setLoginChoice={setLoginChoice} setSignUpChoice={setSignUpChoice} setSuccessMessage={setSuccessMessage} />}
        {loginChoice && <LoginForm successMessage={successMessage} />}
      </div>
    </div>
  );
};

export default LoginRegisterChoice;
