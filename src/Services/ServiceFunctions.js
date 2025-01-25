import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.SERVER_URL,
});

export const registerUSER = async (data) => {
  try {
    const response = await api.post("/register/", data);
    return response.data;
  } catch (error) {
    console.error("Error During Registration", error);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/token/", data);
    return response.data;
  } catch (error) {
    console.error("Error during login: ", error);
  }
};

export const refreshToken = async (token) => {
  try {
    const response = await api.post("/token/refesh/", { refresh: token });
    return response.data;
  } catch (error) {
    console.error("Error during refresh", error);
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile", error);
  }
};
