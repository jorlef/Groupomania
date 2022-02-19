import axios from "axios";

const users_api_url = process.env.REACT_APP_USERS_API;
// const headers = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

export const userProfil = (userId, token) => {
  return axios.get(`${users_api_url}/${userId}`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
};

export const userUpdate = (userId, userUpdated, token) => {
  return axios.put(`${users_api_url}/${userId}`, userUpdated, { headers: { Authorization: "Bearer " + token } });
};

export const userDelete = (token) => {
  return axios.delete(`${users_api_url}/delete_account`, { headers: { Authorization: "Bearer " + token } });
};
