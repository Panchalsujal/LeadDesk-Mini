// useLeads hook — fetches all leads and handles status updates
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { fetchLeads, updateLeadStatus } from '../services/lead.service';

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

  const updateStatus = useCallback(async (id, newStatus) => {
    try {
      const data = await updateLeadStatus(id, newStatus);
      if (data.success) {
        toast.success(`Lead status updated to ${newStatus}`);
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead._id === id ? { ...lead, status: newStatus } : lead
          )
        );
        return true;
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update lead status.';
      toast.error(msg);
      return false;
    }
  }, []);

  // Derived stats
  const stats = {
    total: leads.length,
    newLeads: leads.filter((l) => l.status === 'NEW').length,
    contacted: leads.filter((l) => l.status === 'CONTACTED').length,
    closed: leads.filter((l) => l.status === 'CLOSED').length,
  };

  return { leads, loading, error, stats, refetch: load, updateStatus };
}
