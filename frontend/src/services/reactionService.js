import { apiInstance, secureApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../common/constants";

const PATH_URL = "/reactions";

export const createReaction = async (data) => {
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
      console.error("Failed to create user reaction.", error.message);
      throw error;
    });
};

export const fetchReactions = async () => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch user reactions.", error.message);
      throw error;
    });
};

export const fetchReactionsToAllBlogs = async () => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/blogs`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch user reactions to blogs.", error.message);
      throw error;
    });
};

export const fetchReactionsToAllBlogsPublic = async () => {
  return apiInstance
    .request({
      url: `${PATH_URL}/blogs/public`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch user reactions to public blogs.", error.message);
      throw error;
    });
};
