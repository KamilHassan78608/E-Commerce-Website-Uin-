import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios Instance
// Every request you make using api will automatically start with your API_URL
const api = axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type" : 'application/json'
    }
});

// Adding token to every request automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth Apis
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const getProfile = () => api.get('/auth/profile');
export const getUsers = () => api.get('/auth/user');

export default api;