import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL as string,
});

// add a request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO: have to add token to headers.
    const token = localStorage.getItem("access-token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
