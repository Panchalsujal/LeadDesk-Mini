// LoginPage — Premium split-screen login. Inspired by ShadcnBlocks login blocks.
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Zap, BarChart2, Users, TrendingUp } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../contexts/AuthContext';

const FEATURES = [
  { icon: BarChart2, text: 'Real-time analytics & KPI dashboard' },
  { icon: Users,     text: 'Manage leads from a single workspace' },
  { icon: TrendingUp, text: 'Track conversions and close more deals' },
];

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const { handleLogin, loading } = useLogin();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    handleLogin(form);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand side */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 dot-bg opacity-10" />

        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

        {/* Logo */}
        <div className="relative flex items-center gap-3 z-10">
          <div className="w-9 h-9 bg-white/15 backdrop-blur rounded-lg flex items-center justify-center">
            <Zap size={18} color="white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">LeadDesk</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Your leads.<br />Your pipeline.<br />Your growth.
          </h1>
          <p className="text-indigo-200 text-base leading-relaxed mb-8 max-w-sm">
            LeadDesk gives your team everything they need to capture, manage, and close leads faster.
          </p>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={14} color="white" />
                </div>
                <span className="text-sm text-indigo-100">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <div className="relative z-10 p-5 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
          <p className="text-sm text-indigo-100 leading-relaxed italic">
            "LeadDesk transformed how we handle inbound leads. Response times dropped by 60%."
          </p>
          <p className="text-xs text-indigo-300 mt-2 font-medium">— Sarah K., Head of Sales</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap size={16} color="white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">LeadDesk</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your admin dashboard</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="form-label">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="admin@example.com"
                  className={`form-input pl-9 h-10 ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="form-label mb-0">Password</label>
                <button type="button" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Your password"
                  className={`form-input pl-9 pr-10 h-10 ${errors.password ? 'border-red-400 focus:border-red-400' : ''}`}
                  autoComplete="current-password"
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

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 accent-indigo-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-500 select-none cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center h-10 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-xs text-gray-400">First time here?</span>
            </div>
          </div>

          <Link
            to="/register"
            className="btn-outline w-full justify-center h-10"
          >
            Set up Super Admin account
          </Link>

          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to our{' '}
            <Link to="/" className="text-indigo-600 hover:underline">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
