import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_APP_URL } = getEnvVariables();
const calendarApi = axios.create({
  baseURL: VITE_APP_URL,
});

calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default calendarApi;
