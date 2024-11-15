import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://watchbox2-0-backend.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
// https://watchbox2-0-backend.onrender.com/api
// http://localhost:2137/api"
