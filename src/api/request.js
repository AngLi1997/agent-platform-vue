import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

// 请求拦截器（添加 Token）
service.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// 响应拦截器（统一错误处理）
service.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response?.status === 401) {
            alert('登录过期，请重新登录');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
export default service;