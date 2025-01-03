import axios from "axios"
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/todoapp/todo-back/v1";

const api = axios.create({
    // baseURL : "http://127.0.0.1:8000",
    // baseURL : import.meta.env.VITE_API_URL?import.meta.env.VITE_API_URL:apiUrl,
    baseURL : apiUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token && !config.url.includes('/user/register') ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;