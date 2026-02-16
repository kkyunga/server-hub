import api from "./axios";

export const sendResetLinkApi = async (data) => {
  console.log(data);
  const response = await api.post("/api/auth/reset-password-link", data);
  return response.data;
};
