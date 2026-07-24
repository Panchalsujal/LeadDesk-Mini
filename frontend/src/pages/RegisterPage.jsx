// RegisterPage — first-time super admin registration (only works once)
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Zap, User, Mail, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerFirstAdmin } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const data = await registerFirstAdmin(form);
      if (data.success) {
        toast.success('Super Admin account created! Please sign in.');
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      {/* Ambient orbs */}
      <div className="orb orb-purple animate-pulse-glow"
        style={{ width: '500px', height: '500px', top: '-100px', right: '-100px', opacity: 0.45 }} />
      <div className="orb orb-blue"
        style={{ width: '350px', height: '350px', bottom: '-80px', left: '-60px', opacity: 0.3 }} />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back link */}
        <Link to="/login" className="flex items-center gap-2 text-sm mb-8" style={{ color: '#958ea0' }}>
          <span>←</span> Back to Login
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #7c3aed, #d946ef)',
          }}>
            <Zap size={20} color="white" />
          </div>
          <div>
            <p className="text-xl font-bold" style={{ color: '#e0e3e5' }}>LeadDesk</p>
            <p className="text-xs" style={{ color: '#958ea0' }}>Initial Setup</p>
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-8 animate-fade-in-up">
          {/* Banner */}
          <div className="flex items-center gap-3 p-3 rounded-xl mb-6" style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
          }}>
            <ShieldCheck size={20} style={{ color: '#a78bfa', flexShrink: 0 }} />
            <p className="text-xs" style={{ color: '#cbc3d7' }}>
              This registration is for the <strong style={{ color: '#a78bfa' }}>Super Admin</strong> account only.
              It can only be created once. Future accounts must be created by the Super Admin.
            </p>
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ color: '#e0e3e5' }}>
            Create Super Admin
          </h1>
          <p className="mb-6 text-sm" style={{ color: '#cbc3d7' }}>
            Set up the first administrator account for your LeadDesk system.
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your full name"
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="admin@yourdomain.com"
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
                <input
                  id="register-password"
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Min. 6 characters"
                  className="form-input pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#958ea0' }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2 text-base"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Create Super Admin Account
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: '#958ea0' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold" style={{ color: '#a78bfa' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
