// useLeadForm hook — handles lead submission form logic
import { useState } from 'react';
import toast from 'react-hot-toast';
import { submitLead } from '../services/lead.service';

const initialState = {
  name: '',
  email: '',
  budget: '',
  message: '',
};

export function useLeadForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.budget || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const data = await submitLead(form);
      if (data.message) {
        setSubmitted(true);
        toast.success('Your message has been sent! We\'ll be in touch soon.');
        setForm(initialState);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm(initialState);
  };

  return { form, loading, submitted, handleChange, handleSubmit, resetForm };
}
