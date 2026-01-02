import axios from 'axios';

// Create axios instance with default config
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: `${BASE_URL.replace(/\/$/, '')}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('linkedin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('linkedin_user');
        localStorage.removeItem('linkedin_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

