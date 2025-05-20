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
      console.error("Failed to create blog.", error.message);
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
      console.error("Failed to fetch f.", error.message);
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
      console.error("Failed to fetch f.", error.message);
      throw error;
    });
};

export const fetchReactionsToAllBlogsPublic = async () => {
  return apiInstance
    .request({
        url: `${PATH_URL}/public`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch f.", error.message);
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
      console.error("Failed to fetch blog by id.", error.message);
      throw error;
    });
}


export const updateBlogById = async (id, data) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/${id}`,
      method: HTTP_METHODS.PUT,
      data: data
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to update blog by id.", error.message);
      throw error;
    });
};

export const deleteInteractionByUserId = async (id, data) => {
    return secureApiInstance
      .request({
        url: `${PATH_URL}/${id}`,
        method: HTTP_METHODS.DELETE,
        data: data
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Failed to delete blog by id.", error.message);
        throw error;
      });
  };
