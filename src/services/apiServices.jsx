import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = `http://localhost:3000`;

export const logout = () => {
  Cookies.remove("access_token");
  window.location.href = "/";
};

export const getAuthToken = () => {
  return Cookies.get("access_token");
};

const handleAuthError = (error) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    logout();
  }
};

export const postData = async (
  type = "post",
  endpoint,
  data = null,
  params = {}
) => {
  try {
    const headers = {};

    const token = getAuthToken();
    if (!token && endpoint !== "login" && endpoint !== "password-reset") {
      throw new Error("Authentication required");
    }
    headers.Authorization = `Bearer ${token}`;

    const response = await (type === "patch" ? axios.patch : axios.post)(
      `${BASE_URL}/${endpoint}`,
      data,
      {
        params,
        headers,
      }
    );

    return response;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const getData = async (endpoint, params = {}) => {
  try {
    const headers = {};

    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }
    headers.Authorization = `Bearer ${token}`;

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers,
      params,
    });

    return response;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};
