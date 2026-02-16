import api from "./axios";
export const signUpApi = async (data) => {
  const response = await api.post("/api/auth/signup", data);
  return response.data;
};
