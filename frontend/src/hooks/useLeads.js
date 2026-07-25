// useLeads hook — Redux-backed leads management
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchLeads, updateLeadStatus } from '../services/lead.service';
import {
  setLeads, setLoading, setError, patchLeadStatus,
  selectLeads, selectLoading, selectError, selectStats,
} from '../store/leadsSlice';

export function useLeads() {
  const dispatch = useDispatch();
  const leads   = useSelector(selectLeads);
  const loading = useSelector(selectLoading);
  const error   = useSelector(selectError);
  const stats   = useSelector(selectStats);

  const load = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await fetchLeads();
      if (data.success) {
        dispatch(setLeads(data.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch leads.';
      dispatch(setError(msg));
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (leads.length === 0) load();
  }, [load, leads.length]);

  const updateStatus = useCallback(async (id, newStatus) => {
    try {
      const data = await updateLeadStatus(id, newStatus);
      if (data.success) {
        dispatch(patchLeadStatus({ id, status: newStatus }));
        toast.success(`Status updated to ${newStatus}`);
        return true;
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update status.';
      toast.error(msg);
      return false;
    }
  }, [dispatch]);

  return { leads, loading, error, stats, refetch: load, updateStatus };
}
