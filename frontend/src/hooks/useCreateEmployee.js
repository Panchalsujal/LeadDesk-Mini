// useCreateEmployee hook — handles creating employee accounts (super admin)
import { useState } from 'react';
import toast from 'react-hot-toast';
import { registerEmployee } from '../services/auth.service';

const initialForm = {
  name: '',
  email: '',
  password: '',
  role: 'EMPLOYEE',
};

export function useCreateEmployee() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const data = await registerEmployee(form);
      if (data.success) {
        toast.success(`Account created for ${data.user.name}!`);
        setForm(initialForm);
        return data.user;
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create account.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, handleChange, handleSubmit };
}
