import React, { useEffect, useState } from "react";

import { authSignUp } from "../../../api/auth";

const SignUpForm = ({ setSignUpChoice, setLoginChoice, setSuccessMessage }) => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  let signup = {};

  const handleSignUp = (e) => {
    e.preventDefault();
    const firstNameError = document.querySelector(".firstname.error");
    const lastNameError = document.querySelector(".lastname.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const checkPasswordError = document.querySelector(".checkpassword.error");

    firstNameError.innerHTML = "";
    lastNameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    checkPasswordError.innerHTML = "";

    if (password !== checkPassword) {
      checkPasswordError.innerHTML = "mots de passe différents";
    }
    signup = { first_name: firstName, last_name: lastName, email, password };
    authSignUp(signup)
      .then((res) => {
        setFormSubmit(true);
      })
      .catch((err) => {
        let errors = err.response.data.errors;
        firstNameError.innerHTML = errors.first_name ? errors.first_name : null;
        lastNameError.innerHTML = errors.last_name ? errors.last_name : null;
        emailError.innerHTML = errors.email ? errors.email : null;
        passwordError.innerHTML = errors.password ? errors.password : null;
      });
  };

  useEffect(() => {
    if (formSubmit === true) {
      setLoginChoice(true);
      setSignUpChoice(false);
      setSuccessMessage("Vous pouvez maintenant vous connecter");
    }
  }, [formSubmit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="connection__signup">
      <form action="" onSubmit={handleSignUp} id="signUpForm" className="signup__form">
        <label htmlFor="firstName">Prénom</label>
        <input type="text" name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        <div className="firstname error"></div>

        <label htmlFor="lastName">Nom</label>
        <input type="text" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />
        <div className="lastname error"></div>

        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className="email error"></div>

        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <div className="password error"></div>

        <label htmlFor="checkPassword">Confirmer le mot de passe</label>
        <input type="password" name="checkPassword" id="checkPassword" onChange={(e) => setCheckPassword(e.target.value)} value={checkPassword} />
        <div className="checkpassword error"></div>

        <input type="submit" className="signup__button" value="Valider l'inscription" />
      </form>
    </div>
  );
};

export default SignUpForm;
