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

// Auth
export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);

// Catalog
export const getProducts = () => api.get('/catalog/products');
export const getProductById = (id) => api.get(`/catalog/products/${id}`);
export const createProduct = (data) => api.post('/catalog/products', data);

export const getCategories = () => api.get('/catalog/categories');
export const createCategory = (data) => api.post('/catalog/categories', data);

// Shopping
export const getCart = () => api.get('/shopping/cart');
export const addToCart = (data) => api.post('/shopping/cart', data);
export const updateCart = (id, data) => api.patch(`/shopping/cart/${id}`, data);

export const getOrders = () => api.get('/shopping/orders');
export const createOrder = (data) => api.post('/shopping/orders', data);

export default api;
