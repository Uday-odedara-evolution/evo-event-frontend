import axios from "axios";

const APICall = axios.create({
  baseURL: "http://localhost:3000",
});

export default APICall;
