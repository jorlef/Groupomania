import React, { useEffect, useContext } from "react";

import jwt_decode from "jwt-decode";

import { userProfil } from "../api/users";

import { AuthContext } from "../components/Context/AuthContext";

import OnePost from "../components/OnePost/OnePost";

const DetailPost = () => {
  const { isAdmin, setIsAdmin, token, setUserId } = useContext(AuthContext);

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
      <OnePost />
    </main>
  );
};

export default DetailPost;
