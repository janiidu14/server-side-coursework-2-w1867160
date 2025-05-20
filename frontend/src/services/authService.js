import { apiInstance, secureApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../common/constants";

const PATH_URL = "/auth";

export const register = async (userData) => {
  return apiInstance
    .request({
      url: `${PATH_URL}/register`,
      method: HTTP_METHODS.POST,
      data: userData,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to register user.", error.message);
      throw error;
    });
};

export const login = async (userData) => {
  return apiInstance
    .request({
      url: `${PATH_URL}/login`,
      method: HTTP_METHODS.POST,
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to login user.", error.message);
      throw error;
    });
};

export const logout = async (userData) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/logout`,
      method: HTTP_METHODS.POST,
      data: userData,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to logout user.", error.message);
      throw error;
    });
};
