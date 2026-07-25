// RegisterPage — first-time super admin registration (white + indigo theme)
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Zap, User, Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerFirstAdmin } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = 'Full name is required';
    if (!form.email?.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const data = await registerFirstAdmin(form);
      if (data.success) {
        toast.success('Super Admin account created! Please sign in.');
        navigate('/login');
      } else {
        toast.error(data.message || 'Registration failed.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link to="/login" className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowRight size={14} className="rotate-180" /> Back to Login
        </Link>

        {/* Header / Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Zap size={20} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">LeadDesk</h1>
            <p className="text-xs text-gray-500">Initial Setup</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          {/* Info Banner */}
          <div className="flex items-start gap-3 p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl mb-6">
            <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-900 leading-relaxed">
              This registration sets up the <strong className="font-semibold text-indigo-700">Super Admin</strong> account.
              Future team members are created via the Admin Panel.
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">Create Super Admin</h2>
          <p className="text-sm text-gray-500 mb-6">Set up the first administrator account for your workspace</p>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="register-name" className="form-label">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your full name"
                  className={`form-input pl-9 h-10 ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
                  required
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="form-label">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="admin@yourdomain.com"
                  className={`form-input pl-9 h-10 ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                  required
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="register-password" className="form-label">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="register-password"
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Min. 6 characters"
                  className={`form-input pl-9 pr-10 h-10 ${errors.password ? 'border-red-400 focus:border-red-400' : ''}`}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center h-10 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Create Super Admin Account
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
