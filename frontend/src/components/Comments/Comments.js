import React /*, { useEffect, useState }*/ from "react";

import NewComment from "./NewComment/NewComment";
import Comment from "./Comment/Comment";

const Comments = ({ comments, post, handlePosts, onePost, retrievePost }) => {
  // test up state
  // const [usetest, setUseTest] = useState(0)
  // useEffect(()=> {
  //   console.log(usetest)
  // },[usetest, setUseTest])
  return (
    <div className="comment">
      <NewComment post={post} handlePosts={handlePosts} onePost={onePost} retrievePost={retrievePost} />
      {comments
        .sort((a, b) => b.id - a.id)
        .map((comment) => {
          return <Comment comment={comment} key={comment.id} handlePosts={handlePosts} onePost={onePost} retrievePost={retrievePost} /*usestate={usetest} setusestate={setUseTest}*/ />;
        })}
    </div>
  );
};

export default Comments;
