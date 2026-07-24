// Lead service layer — all lead-related API calls
import api from '../lib/api';

/**
 * Submit a new lead (public - no auth required)
 * @param {{ name: string, email: string, budget: string, message: string }} data
 */
export const submitLead = async (data) => {
  const response = await api.post('/user/connect', data);
  return response.data;
};

/**
 * Fetch all leads (requires auth: admin, employee, super_admin, manager)
 */
export const fetchLeads = async () => {
  const response = await api.get('/lead/get-leads');
  return response.data;
};
