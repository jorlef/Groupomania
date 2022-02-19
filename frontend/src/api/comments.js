import axios from "axios";

const comments_api_url = process.env.REACT_APP_COMMENTS_API;
const headers = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

export const getAllComments = (postId) => {
  return axios.get(`${comments_api_url}/${postId}/allcomments`, headers);
};

export const addComment = (commentData, token) => {
  return axios.post(`${comments_api_url}/`, commentData, { headers: { Authorization: "Bearer " + token } });
};

export const deleteComment = (commentId, token /*, commentToDelete*/) => {
  return axios.delete(`${comments_api_url}/${commentId}` /*, commentToDelete*/, { headers: { Authorization: "Bearer " + token } });
};
