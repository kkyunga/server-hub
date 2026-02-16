import api from "./axios";
export const findPasswordApi = async (data) => {
  const response = await api.post("/api/auth/findPassword", data);
  return response.data;
};
