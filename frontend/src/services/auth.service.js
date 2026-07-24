// Auth service layer — all auth-related API calls
import api from '../lib/api';

/**
 * Login with email and password
 * @param {{ email: string, password: string }} credentials
 */
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

/**
 * Register the first super admin (only works once)
 * @param {{ name: string, email: string, password: string }} data
 */
export const registerFirstAdmin = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

/**
 * Create a new employee/admin account (super admin only)
 * @param {{ name: string, email: string, password: string, role?: string }} data
 */
export const registerEmployee = async (data) => {
  const response = await api.post('/auth/admin/register', data);
  return response.data;
};
