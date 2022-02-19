import React, { useContext, useEffect, useState } from "react";

import { getAllPosts } from "../../api/posts";

import { AuthContext } from "../Context/AuthContext";

import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";

const Posts = () => {
  const { token } = useContext(AuthContext);
  const [apiData, setApiData] = useState(null);

  const handlePosts = () => {
    getAllPosts(token || localStorage.getItem("token"))
      .then((res) => {
        if (res.status === 200) {
          setApiData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!apiData) {
      handlePosts();
    }
  }, [apiData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {apiData && (
        <>
          <NewPost handlePosts={handlePosts} />
          <div className="posts">
            {apiData
              .sort((a, b) => b.id - a.id)
              .map((post) => {
                return <Post post={post} key={post.id} handlePosts={handlePosts} />;
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Posts;
