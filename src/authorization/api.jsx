import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/user",
});
// http://localhost:3000/api/v1/user
// https://react-food-delivery-h5oa.onrender.com/api/v1/user
// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessTokenUser");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
