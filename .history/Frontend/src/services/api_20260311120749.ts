import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api" // backend runs over HTTP in dev
});

export default API;