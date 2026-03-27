import axios from 'axios';

const API_BASE = 'http://localhost:9000/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- AUTH / USERS ---
export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);
export const getUsers = () => api.get('/users');
export const getUserProfile = (id) => api.get(`/users/${id}`);
export const updateUserProfile = (id, data) => api.patch(`/users/${id}`, data);
export const resetPassword = (email) => api.post('/users/resetpassword', { email });

// --- ADDRESSES ---
export const getAddresses = () => api.get('/users/address');
export const addAddress = (data) => api.post('/users/address', data);
export const updateAddress = (data) => api.patch('/users/address', data);
export const deleteAddress = (data) => api.delete('/users/address', { data });

// --- CATALOG ---
export const getProducts = () => api.get('/catalog/products');
export const getProductById = (id) => api.get(`/catalog/products/${id}`);
export const createProduct = (data) => api.post('/catalog/products', data);
export const updateProduct = (id, data) => api.patch(`/catalog/products/${id}`, data);

export const getCategories = () => api.get('/catalog/categories');
export const getCategoryById = (id) => api.get(`/catalog/categories/${id}`);
export const createCategory = (data) => api.post('/catalog/categories', data);
export const updateCategory = (id, data) => api.patch(`/catalog/categories/${id}`, data);

// --- INVENTORIES ---
export const getInventories = () => api.get('/catalog/inventories');
export const createInventory = (data) => api.post('/catalog/inventories', data);
export const updateInventory = (id, data) => api.patch(`/catalog/inventories/${id}`, data);

// --- SHOPPING ---
export const getCart = () => api.get('/shopping/cart');
export const addToCart = (data) => api.post('/shopping/cart', data);
export const updateCartQuantity = (id, quantity) => api.patch(`/shopping/cart/${id}`, { quantity });
export const deleteCartItem = (id) => api.delete(`/shopping/cart/${id}`);

export const getOrders = () => api.get('/shopping/orders');
export const getOrderById = (id) => api.get(`/shopping/orders/${id}`);
export const createOrder = (data) => api.post('/shopping/orders', data);
export const updateOrderStatus = (id, status) => api.patch(`/shopping/orders/${id}`, { status });

// --- PAYMENTS & SHIPPING ---
export const getPayments = () => api.get('/shopping/payments');
export const createPayment = (data) => api.post('/shopping/payments', data);
export const verifyPayment = (paymentId, data) => api.post('/shopping/payments/verify', { paymentId, ...data });

export const trackShipping = (orderId) => api.get(`/shopping/shipping/${orderId}/track`);

export default api;
