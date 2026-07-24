// CreateEmployeePage — super admin creates new employee accounts
import { UserPlus, User, Mail, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useCreateEmployee } from '../../hooks/useCreateEmployee';

const ROLE_OPTIONS = [
  { value: 'EMPLOYEE', label: 'Employee' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'ADMIN', label: 'Admin' },
];

export default function CreateEmployeePage() {
  const { form, loading, handleChange, handleSubmit } = useCreateEmployee();
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: '#e0e3e5' }}>Create Employee Account</h1>
        <p className="text-sm mt-1" style={{ color: '#958ea0' }}>
          Add new team members to access the LeadDesk admin panel
        </p>
      </div>

      <div className="max-w-lg">
        {/* Info banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl mb-6" style={{
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}>
          <ShieldCheck size={18} style={{ color: '#a78bfa', flexShrink: 0, marginTop: '2px' }} />
          <div className="text-sm" style={{ color: '#cbc3d7' }}>
            <p>
              Only <strong style={{ color: '#a78bfa' }}>Super Admin</strong> can create new team accounts.
              The created user can immediately log in with these credentials.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="glass-card p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                Full Name <span style={{ color: '#8b5cf6' }}>*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
                <input
                  id="emp-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Employee full name"
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                Email Address <span style={{ color: '#8b5cf6' }}>*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
                <input
                  id="emp-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="employee@company.com"
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                Role
              </label>
              <select
                id="emp-role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="form-input"
              >
                {ROLE_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <p className="text-xs mt-1.5" style={{ color: '#958ea0' }}>
                All roles can access the admin panel and view leads.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                Password <span style={{ color: '#8b5cf6' }}>*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
                <input
                  id="emp-password"
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-1 text-base"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Employee Account
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
