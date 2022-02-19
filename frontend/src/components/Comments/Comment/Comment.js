import React, { useContext } from "react";
import DayJS from "react-dayjs";

import { deleteComment } from "../../../api/comments";

import { AuthContext } from "../../Context/AuthContext";

const Comment = ({ comment, handlePosts, onePost, retrievePost }) => {
  const { isAdmin, token, userId } = useContext(AuthContext);

  const delComment = () => {
    if (isAdmin || userId === comment.User.uuid)
      deleteComment(comment.id, token || localStorage.getItem("token"))
        .then(() => {
          if (onePost) {
            retrievePost();
          } else {
            handlePosts();
          }
          console.log("commentaire supprimé");
        })
        .catch(() => console.log("erreur suppression commentaire"));
  };

  return (
    <div className="comment__card">
      {(isAdmin || userId === comment.User.uuid) && (
        <button className="comment__delete" onClick={delComment} aria-label="supprimer commentaire" title="Supprimer le commentaire">
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      )}
      <p>{{ comment }.comment.comments}</p>
      <p>
        Commenté par {{ comment }.comment.User.first_name} {{ comment }.comment.User.last_name}
      </p>
      <p>
        le <DayJS format="DD-MM-YY / HH:mm:ss">{{ comment }.comment.createdAt}</DayJS>
      </p>
    </div>
  );
};

export default Comment;
