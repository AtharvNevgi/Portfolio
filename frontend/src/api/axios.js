import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/cms",
});

export default API;