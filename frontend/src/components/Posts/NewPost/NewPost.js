import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../Context/AuthContext";

import { addPost } from "../../../api/posts";

const NewPost = ({ handlePosts }) => {
  const { token } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    attachment: "",
  });

  const handleNewPost = (e) => {
    if (e.target.name !== "attachment") {
      setNewPost({ ...newPost, [e.target.name]: e.target.value });
    } else {
      setNewPost({
        ...newPost,
        attachment: e.target.files[0],
      });
    }
  };

  const submitNewPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    if (newPost.attachment) {
      formData.append("post_image", newPost.attachment, newPost.attachment.name);
    }

    addPost(formData, token || localStorage.getItem("token"))
      .then(() => {
        setResMessage("Post créé");
        setActiveButton(false);
        setNewPost({ title: "", content: "", attachment: "" });
        document.getElementById("attachment").value = "";
        handlePosts();
      })
      .catch((err) => setResMessage("Problème lors de la création du post"));
  };

  useEffect(() => {
    if (newPost.title !== "" && newPost.content !== "") {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
    if (resMessage) {
      setTimeout(() => setResMessage(""), 3000);
    }
  }, [newPost, resMessage]);

  return (
    <div className="newPost">
      <span className="newPost__new">Nouvelle Publication</span>
      <div className="newPost__success">{resMessage}</div>
      <form action="" onSubmit={submitNewPost} className="newPost__form">
        <label htmlFor="title">Titre</label>
        <input type="text" id="title" name="title" value={newPost.title} onChange={(e) => handleNewPost(e)} />

        <label htmlFor="content">Contenu</label>
        <textarea type="text" id="content" name="content" value={newPost.content} onChange={(e) => handleNewPost(e)} />
        <label htmlFor="attachment"></label>
        <input type="file" id="attachment" name="attachment" onChange={(e) => handleNewPost(e)} />

        {activeButton ? (
          <button type="submit">Poster</button>
        ) : (
          <button disabled type="submit">
            Poster
          </button>
        )}
      </form>
    </div>
  );
};

export default NewPost;
