import React from "react";
import { Link } from "react-router-dom";

import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";

import logo from "../../assets/img/icon-left-font-monochrome-black.svg";

const Header = () => {
  return (
    <header className="header">
      <Link to="/home">
        <img src={logo} className="header__logo" alt="Logo site Groupomania" />
      </Link>
      <HeaderNavigation />
    </header>
  );
};

export default Header;
