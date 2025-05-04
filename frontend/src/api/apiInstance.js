import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const secureApiInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

secureApiInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie("csrf-token");
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: false,
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
