import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DayJS from "react-dayjs";

import { AuthContext } from "../../Context/AuthContext";

import { deletePost } from "../../../api/posts";

import Comments from "../../Comments/Comments";

const Post = ({ post, handlePosts }) => {
  const { isAdmin, token, userId } = useContext(AuthContext);

  const delPost = () => {
    if (isAdmin || userId === post.User.uuid)
      deletePost(post.id, token || localStorage.getItem("token"))
        .then(() => {
          handlePosts();
          console.log("post supprimé");
        })
        .catch(() => console.log("erreur suppression post"));
  };

  return (
    <div className="post" id={post.id}>
      <div className="post__data">
        {(isAdmin || userId === post.User.uuid) && (
          <button className="post__delete" onClick={delPost}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        )}
        <Link to={"/post/" + post.id}>
          <h2 className="post__title">{post.title}</h2>
        </Link>
        <div>
          <p className="post__content">{post.content}</p>
          <img src={post.attachment} className="post__img" alt="" />
          <div className="post__stamp">
            <span>
              Créé par {post.User.first_name} {post.User.last_name}
              <img src={post.User.profil_picture} className="post__avatar" alt="" />
            </span>
            <br />
            {post.updatedAt === post.createdAt ? (
              <span>
                Créé le <DayJS format="DD-MM-YY / HH:mm:ss">{post.createdAt}</DayJS>
              </span>
            ) : (
              <>
                <span>
                  Créé le <DayJS format="DD-MM-YY / HH:mm:ss">{post.createdAt}</DayJS>
                </span>
                <br />
                <span>
                  Modifié le <DayJS format="DD-MM-YY / HH:mm:ss">{post.updatedAt}</DayJS>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="post__comment">
        <Comments comments={post.Comments} post={post} handlePosts={handlePosts} />
      </div>
    </div>
  );
};

export default Post;
