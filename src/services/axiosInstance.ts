import axios, { AxiosError } from 'axios';

const API_BASE = 'https://nestjs-api-coursera.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 30000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const storedAuth = localStorage.getItem('auth-storage');

        if (storedAuth) {
            const auth = JSON.parse(storedAuth);

            if (auth.token) {
                config.headers.Authorization = `Bearer ${auth.token}`;
            }
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth-storage');

            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
