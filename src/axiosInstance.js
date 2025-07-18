import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
console.log(BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
