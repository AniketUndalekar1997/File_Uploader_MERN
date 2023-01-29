import { api } from ".";

export const uploadFiles = (files = []) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return api
    .post("/api/files/upload", formData, config)
    .then((response) => response.data);
};

export const getFiles = (pageNumber) => {
  return api
    .get(`/api/files?page=${pageNumber}`)
    .then((response) => response.data);
};

export const getFile = (fileid) => {
  return api
    .get(`/api/download/file/${fileid}`, { responseType: "blob" })
    .then((response) => {
      const blob = response.data;
      return window.URL.createObjectURL(blob);
    });
};

// sending files in multipart form data
