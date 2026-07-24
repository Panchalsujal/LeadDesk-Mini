// Central API config using axios
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: sends cookies (JWT token) with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach token if in localStorage
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data on unauthorized
      localStorage.removeItem('leaddesk_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
