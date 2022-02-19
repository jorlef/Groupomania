import React, { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { userProfil } from "../api/users";

import { AuthContext } from "../components/Context/AuthContext";

import Posts from "../components/Posts/Posts";

const Home = () => {
  const { isAdmin, setIsAdmin, setUserId, token } = useContext(AuthContext);

  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      const decodedToken = jwt_decode(token || localStorage.getItem("token"));
      const userUuid = decodedToken.userId;
      userProfil(userUuid, token || localStorage.getItem("token")).then((res) => {
        setUserId(res.data.user.uuid);
        if (res.data.user.role === "admin") {
          setIsAdmin(true);
        }
      });
    }
  }, [isAdmin, setIsAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <Posts />
    </main>
  );
};

export default Home;
