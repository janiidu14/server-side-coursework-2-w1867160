import { secureApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../common/constants";

const PATH_URL = "/interactions";

export const createUserInteraction = async (data) => {
  return secureApiInstance
    .request({
      url: PATH_URL,
      method: HTTP_METHODS.POST,
      data: data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to create user interaction.", error.message);
      throw error;
    });
};

export const fetchFollowingByUserId = async (userId) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/following/${userId}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch user interaction.", error.message);
      throw error;
    });
};

export const fetchFollowersByUserId = async (userId) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/followers/${userId}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch user interaction.", error.message);
      throw error;
    });
};

export const deleteInteractionByUserId = async (id, data) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/${id}`,
      method: HTTP_METHODS.DELETE,
      data: data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to delete user interaction.", error.message);
      throw error;
    });
};
