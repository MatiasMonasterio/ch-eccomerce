import axios from "axios";
import { apiconfig } from "../config";

const chEccomerceApi = axios.create({
  baseURL: apiconfig.baseUrl,
  headers: {
    // "Content-Type": "application/json application/x-www-form-urlencoded",
  },
});

chEccomerceApi.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");

    if (token) {
      request.headers = { ...request.headers, Authorization: `Bearer ${token}` };
    }

    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default chEccomerceApi;
