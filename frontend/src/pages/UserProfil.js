import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";

import { userProfil } from "../api/users";

import { AuthContext } from "../components/Context/AuthContext";

import MyProfil from "../components/MyProfil/MyProfil";

const UserProfil = () => {
  const { isAdmin, setIsAdmin, setUserId, token } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState();

  const getUserProfil = (userUuid) => {
    if (token || localStorage.getItem("token")) {
      const decodedToken = jwt_decode(token || localStorage.getItem("token"));
      const userUuid = decodedToken.userId;
      userProfil(userUuid, token || localStorage.getItem("token")).then((res) => {
        setUserId(res.data.user.uuid);
        setDataUser(res.data.user);
        if (res.data.user.role === "admin") {
          setIsAdmin(true);
        }
      });
    }
  };

  useEffect(
    () => {
      getUserProfil();
    },
    [isAdmin, setIsAdmin] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return (
    <main>
      <MyProfil dataUser={dataUser} getUserProfil={getUserProfil} />
    </main>
  );
};

export default UserProfil;
