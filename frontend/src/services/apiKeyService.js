import { secureApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../common/constants";

const PATH_URL = "/api-keys";

export const generateAPIKey = async (id) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/generate`,
      method: HTTP_METHODS.POST,
      data: {
        userId: id,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to register user.", error.message);
      throw error;
    });
};

export const fetchAPIKeys = async () => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/all`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to register user.", error.message);
      throw error;
    });
};

export const fetchAPIKeysByUserId = async (userId) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/users/${userId}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to register user.", error.message);
      throw error;
    });
};

export const deactivateAPIKey = async (key) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/deactivate`,
      method: HTTP_METHODS.PUT,
      data: {
        key: key,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to register user.", error.message);
      throw error;
    });
};
