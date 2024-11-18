import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://watchbox2-backend-production.up.railway.app/api"
});

export default apiRequest;
// https://watchbox2-0-backend.onrender.com/api
// http://localhost:2137/api"
