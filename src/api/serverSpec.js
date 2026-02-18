import api from "./axios";

export const fetchServerSpecItems = async () => {
  const response = await api.get("/api/servers/serverSpecItems");
  return response.data;
};
