import api from "./axios";

export const validateKeyFile = async (file) => {
  const formData = new FormData();
  formData.append("keyFile", file);
  const response = await api.post("/api/servers/validate-key", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
