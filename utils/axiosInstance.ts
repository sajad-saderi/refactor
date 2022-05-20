import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: process.env.PRODUCTION_ENDPOINT,
  timeout: 30000,
});
