import axios from "axios";

const api = axios.create({
  baseURL: "https://weather-app-react-server.vercel.app/api/v1/user",
});
//https://weather-app-react-server.vercel.app/
// http://localhost:3000/api/v1/user

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
