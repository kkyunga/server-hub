import api from "./axios";

export const loginApi = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};
