import axios from "axios";

const posts_api_url = process.env.REACT_APP_POSTS_API;
const headers = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

export const getAllPosts = (token) => {
  return axios.get(`${posts_api_url}/`, { headers: { Authorization: "Bearer " + token } });
};

export const getOnePost = (postId, token) => {
  return axios.get(`${posts_api_url}/${postId}`, { headers: { Authorization: "Bearer " + token } });
};

export const addPost = (postData, token) => {
  return axios.post(`${posts_api_url}/`, postData, { headers: { Authorization: "Bearer " + token } });
};

export const updatePost = (postId, updatedPost) => {
  return axios.put(`${posts_api_url}/${postId}`, updatedPost, headers);
};

export const deletePost = (postId, token) => {
  return axios.delete(`${posts_api_url}/${postId}`, { headers: { Authorization: "Bearer " + token } });
};
