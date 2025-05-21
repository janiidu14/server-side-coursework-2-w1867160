import { secureApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../common/constants";

const PATH_URL = "/countries";

export const fetchCountries = async (filter, userId) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/${filter}`,
      method: HTTP_METHODS.GET,
      headers: {
        ...secureApiInstance.defaults.headers.common,
        "user-id": userId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch countries", error.message);
      throw error;
    });
};

export const fetchCountryDetailsByName = async (name, userId) => {
  return secureApiInstance
    .request({
      url: `${PATH_URL}/name/${name}`,
      method: HTTP_METHODS.GET,
      headers: {
        ...secureApiInstance.defaults.headers.common,
        "user-id": userId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch country details by name", error.message);
      throw error;
    });
};
