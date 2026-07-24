// useLeads hook — fetches all leads for admin dashboard
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { fetchLeads } from '../services/lead.service';

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeads();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch leads.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Derived stats
  const stats = {
    total: leads.length,
    newLeads: leads.filter((l) => l.status === 'NEW').length,
    contacted: leads.filter((l) => l.status === 'CONTACTED').length,
    closed: leads.filter((l) => l.status === 'CLOSED').length,
  };

  return { leads, loading, error, stats, refetch: load };
}
