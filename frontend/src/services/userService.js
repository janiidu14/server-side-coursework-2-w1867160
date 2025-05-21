import { secureApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../common/constants";

const PATH_URL = "/users";

export const fetchUsers = async () => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch users.", error.message);
      throw error;
    });
};

export const fetchUserById = async (id) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/${id}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch user by id.", error.message);
      throw error;
    });
};
