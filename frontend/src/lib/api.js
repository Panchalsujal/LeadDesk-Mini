// Central API config using axios
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://lead-desk-mini-virid.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: sends cookies (JWT token) with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach token if present
api.interceptors.request.use(
  (config) => {
    try {
      const storedToken = localStorage.getItem('leaddesk_token');
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
    } catch {
      // Ignore localStorage errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('leaddesk_user');
      localStorage.removeItem('leaddesk_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
