import axios from "axios";

const auth_api_url = process.env.REACT_APP_AUTH_API;
const headers = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

export const authLogin = (login) => {
  return axios.post(`${auth_api_url}/login`, login, headers);
};

export const authSignUp = (signUp) => {
  return axios.post(`${auth_api_url}/signup`, signUp, headers);
};