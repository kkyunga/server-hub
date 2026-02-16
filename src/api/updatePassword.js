import api from "./axios";
export const updatePasswordApi = async (data) => {
  const response = await api.post("/api/auth/updatePassword", data);
  return response.data;
};
