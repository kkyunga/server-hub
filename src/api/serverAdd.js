import api from "./axios";

export const serverAdd = async ({ keyFile, ...serverData }) => {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(serverData)], { type: "application/json" }),
  );
  if (keyFile) {
    formData.append("keyFile", keyFile);
  }
  const response = await api.post("/api/servers/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
