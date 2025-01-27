import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${api}/register`, data);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${api}/login`, data);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
