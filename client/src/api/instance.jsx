import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  // Add any other default configuration options you need
});

export default instance;