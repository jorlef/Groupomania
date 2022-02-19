import React, { useContext, useEffect, useState } from "react";
import DayJS from "react-dayjs";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";

import { getOnePost, deletePost } from "../../api/posts";

import Comments from "../Comments/Comments";

const OnePost = () => {
  const { token, isAdmin, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const postId = window.location.href.split("post/")[1];

  const retrievePost = () => {
    getOnePost(postId, token || localStorage.getItem("token")).then((res) => {
      setPost(res.data);
    });
  };

  const delPost = () => {
    if (isAdmin || userId === post.User.uuid)
      deletePost(post.id, token || localStorage.getItem("token"))
        .then(() => {
          console.log("post supprimé");
          navigate("/home");
        })
        .catch(() => console.log("erreur suppression post"));
  };

  useEffect(() => {
    if (!post) {
      retrievePost();
    }
  }, [post]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    post && (
      <div className="onePost">
        <div className="onePost__delete">
          {(isAdmin || userId === post.User.uuid) && (
            <button onClick={delPost} className="onePost__delbutton" aria-label="delete this post" title="Delete this post">
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
        </div>
        <h2 className="onePost__title">{post.title}</h2>
        <div className="onePost__data">
          <p className="onePost__content">{post.content}</p>
          <img src={post.attachment} className="onePost__img" alt="" />
          <div className="onePost__stamp">
            <img src={post.User.profil_picture} className="onePost__avatar" alt="" />
            <div>
              Créé par {post.User.first_name} {post.User.last_name}
            </div>
            {post.createdAt === post.updatedAt ? (
              <div>
                Créé le <DayJS format="DD-MM-YY / HH:mm:ss">{post.createdAt}</DayJS>
              </div>
            ) : (
              <>
                <div>
                  Créé le <DayJS format="DD-MM-YY / HH:mm:ss">{post.createdAt}</DayJS>
                </div>

                <div>
                  Modifié le <DayJS format="DD-MM-YY / HH:mm:ss">{post.updatedAt}</DayJS>
                </div>
              </>
            )}
          </div>
        </div>
        <Comments comments={post.Comments} post={post} onePost={true} retrievePost={retrievePost} />
      </div>
    )
  );
};

export default OnePost;
