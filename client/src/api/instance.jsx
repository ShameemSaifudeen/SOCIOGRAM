import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.sociograam.online",
  // Add any other default configuration options you need
});


export default instance;