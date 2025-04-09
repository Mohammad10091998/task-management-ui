import axios from "axios";

const API_BASE_URL = "https://localhost:7143/api";

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/Auth/login`, credentials);
  return response.data; // usually includes the token
};

export const registerUser = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/User/register`, userData);
  return response.data;
};
