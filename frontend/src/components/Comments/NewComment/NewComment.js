import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../Context/AuthContext";

import { addComment } from "../../../api/comments";

const NewComment = ({ post, handlePosts, onePost, retrievePost }) => {
  const { token } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [newComment, setNewComment] = useState({
    comments: "",
    ownerId: post.ownerId,
    postId: post.id,
  });

  const handleNewComment = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const submitNewComment = (e) => {
    e.preventDefault();

    addComment(newComment, token || localStorage.getItem("token"))
      .then(() => {
        setResMessage("Commentaire créé");
        setNewComment({ comments: "", ownerId: post.ownerId, postId: post.id });
        if (onePost) {
          retrievePost();
        } else {
          handlePosts();
        }
      })
      .catch((err) => setResMessage("Problème lors de la création du post"));
  };

  useEffect(() => {
    if (newComment.comments !== "") {
      setActiveButton(true);
    }
    if (newComment.comments === "") {
      setActiveButton(false);
    }
    if (resMessage) {
      setTimeout(() => setResMessage(""), 3000);
    }
  }, [newComment, resMessage]);

  return (
    <div className="newComment">
      <div className="newComment__success">{resMessage}</div>
      <form action="" onSubmit={submitNewComment} className="newComment__form">
        <div className="newComment__content">
          <label htmlFor="new_comment">Commentaire</label>
          <textarea type="text" id="new_comment" name="comments" value={newComment.comments} onChange={(e) => handleNewComment(e)} />
        </div>
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

export default NewComment;
