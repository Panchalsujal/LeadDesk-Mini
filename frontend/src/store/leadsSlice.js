// Redux store — leadsSlice
import { createSlice } from '@reduxjs/toolkit';

const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLeads(state, action) {
      state.leads = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    patchLeadStatus(state, action) {
      const { id, status } = action.payload;
      const lead = state.leads.find((l) => l._id === id);
      if (lead) lead.status = status;
    },
  },
});

export const { setLeads, setLoading, setError, patchLeadStatus } = leadsSlice.actions;

// Derived selectors
export const selectLeads    = (state) => state.leads.leads;
export const selectLoading  = (state) => state.leads.loading;
export const selectError    = (state) => state.leads.error;
export const selectStats    = (state) => {
  const leads = state.leads.leads;
  return {
    total:     leads.length,
    newLeads:  leads.filter((l) => l.status === 'NEW').length,
    contacted: leads.filter((l) => l.status === 'CONTACTED').length,
    closed:    leads.filter((l) => l.status === 'CLOSED').length,
  };
};

export default leadsSlice.reducer;
