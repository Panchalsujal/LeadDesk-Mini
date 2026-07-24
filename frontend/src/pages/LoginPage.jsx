// LoginPage — admin login with email and password
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const { handleLogin, loading } = useLogin();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);

  // Already logged in → go to dashboard
  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(form);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      {/* Ambient orbs */}
      <div className="orb orb-purple animate-pulse-glow"
        style={{ width: '500px', height: '500px', top: '-100px', left: '-100px', opacity: 0.5 }} />
      <div className="orb orb-magenta animate-pulse-glow"
        style={{ width: '400px', height: '400px', bottom: '-80px', right: '-80px', opacity: 0.35, animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back link */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sm mb-8 transition-colors"
          style={{ color: '#958ea0' }}
        >
          <span>←</span> Back to Home
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
            <p className="text-xs" style={{ color: '#958ea0' }}>Admin Portal</p>
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-8 animate-fade-in-up">
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#e0e3e5' }}>
            Welcome back
          </h1>
          <p className="mb-8 text-sm" style={{ color: '#cbc3d7' }}>
            Sign in to access the admin dashboard
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="admin@example.com"
                  className="form-input pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Your password"
                  className="form-input pl-10 pr-10"
                  required
                  autoComplete="current-password"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2 text-base"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Register link */}
        <p className="text-center text-sm mt-5" style={{ color: '#958ea0' }}>
          First time setup?{' '}
          <Link to="/register" className="font-semibold" style={{ color: '#a78bfa' }}>
            Create Super Admin
          </Link>
        </p>
      </div>
    </div>
  );
}
