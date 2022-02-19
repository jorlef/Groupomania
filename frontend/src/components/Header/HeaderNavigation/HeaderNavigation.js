import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";

const HeaderNavigation = () => {
  const { setIsConnected, setIsAdmin, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsConnected(false);
    setIsAdmin(false);
    setUserId("");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header__nav">
      <Link to="/profil">
        <p>Mon Profil</p>
      </Link>
      <div className="header__logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default HeaderNavigation;
