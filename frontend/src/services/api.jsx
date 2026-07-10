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
export const updateProfile = (userData) => api.put('/auth/update', userData);
export const getProfile = () => api.get('/auth/profile');
export const getUsers = () => api.get('/auth/user');

// Order Apis
// export const createOrder = (orderData) => api.post('/orders/create', orderData);
// export const getMyOrders = () => api.get('/orders/my-orders');

// services/api.js
export const getMyOrders = (userId) => {
    return api.get(`/orders/my-orders?userId=${userId}`);
};

export const createOrder = (orderData) => {
    return api.post('/orders/create', orderData);
};

export const cancelOrder = (id) => {
    return api.put(`/orders/${id}/cancel`);
};

// Wallet Apis
export const getWalletInfo = () => api.get('/wallet/info');
export const addBalance = (data) => api.post('/wallet/add-balance', data);
export const getTransactionHistory = () => api.get('/wallet/transactions');
export const useWalletBalance = (data) => api.post('/wallet/use-balance', data);

// Card Apis
export const addCard = (cardData) => api.post('/wallet/card/add', cardData);
export const getMyCards = () => api.get('/wallet/cards');
export const setDefaultCard = (cardId) => api.put(`/wallet/card/${cardId}/default`);
export const deleteCard = (cardId) => api.delete(`/wallet/card/${cardId}`);

// Cart Apis
export const getMyCart = () => api.get('/cart/my-cart');
export const addToCartAPI = (cartData) => api.post('/cart/add-item', cartData);
export const updateCartItemAPI = (updateData) => api.put('/cart/update-item', updateData);
export const removeFromCartAPI = (removeData) => api.delete('/cart/remove-item', { data: removeData });
export const clearCartAPI = () => api.delete('/cart/clear-cart');

// Product Apis
export const getAllProducts = (params) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (formData) => api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProduct = (id, formData) => api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Admin Apis
export const getAllUsers = () => api.get('/admin/users');
export const getUserById = (id) => api.get(`/admin/users/${id}`);
export const updateUserRole = (id, role) => api.put(`/admin/users/${id}/role`, { role });
export const getAllOrders = () => api.get('/admin/orders');
export const getOrderById = (id) => api.get(`/admin/orders/${id}`);
export const updateOrderStatus = (id, status) => api.put(`/admin/orders/${id}`, { status });
export const deleteOrder = (id) => api.delete(`/admin/orders/${id}`);

export default api;