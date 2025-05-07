import { apiInstance, secureApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../common/constants";

const PATH_URL = "/blogs";

export const createBlog = async (data) => {
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

export const fetchBlogs = async () => {
  return apiInstance
    .request({
      url: PATH_URL,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch blogs.", error.message);
      throw error;
    });
};


export const updateBlogById = async (id, data) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/${id}`,
      method: HTTP_METHODS.PATCH,
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

export const deleteBlogById = async (id) => {
    return secureApiInstance
      .request({
        url: `${PATH_URL}/${id}`,
        method: HTTP_METHODS.DELETE
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Failed to delete blog by id.", error.message);
        throw error;
      });
  };
