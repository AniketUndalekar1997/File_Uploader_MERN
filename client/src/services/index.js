import axios from "axios";
import { getUserTokenFromLS } from "../utils/localStorage";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// This will add authorization header in every request
api.interceptors.request.use((config) => {
  config.headers.authorization = getUserTokenFromLS();
  return config;
});

export { api };
