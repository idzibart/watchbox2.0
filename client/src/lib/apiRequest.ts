import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:2137/api",
  withCredentials: true,
});

export default apiRequest;
// https://watchbox2-0-backend.onrender.com/
// http://localhost:2137/api"