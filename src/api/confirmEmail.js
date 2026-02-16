import api from "./axios";
export const confirmEmailApi = async (data) => {
  const response = await api.post("/api/auth/confirmEmail", data);

  return response.data;
};
