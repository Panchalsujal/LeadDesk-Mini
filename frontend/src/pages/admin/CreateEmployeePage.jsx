// CreateEmployeePage — Create Admin page with validation. Inspired by Preline form components.
import { useState } from 'react';
import { UserPlus, User, Mail, Lock, Shield, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useCreateEmployee } from '../../hooks/useCreateEmployee';
import PageHeader from '../../components/ui/PageHeader';

const ROLE_OPTIONS = [
  { value: 'EMPLOYEE', label: 'Employee',  desc: 'Can view and manage leads.' },
  { value: 'MANAGER',  label: 'Manager',   desc: 'Can manage team and leads.' },
  { value: 'ADMIN',    label: 'Admin',     desc: 'Full admin panel access.' },
];

function getPasswordStrength(pw) {
  if (!pw) return null;
  if (pw.length < 6) return { level: 1, label: 'Too short', color: 'bg-red-400' };
  if (pw.length < 10 || !/[0-9]/.test(pw)) return { level: 2, label: 'Weak', color: 'bg-orange-400' };
  if (!/[A-Z]/.test(pw) || !/[^a-zA-Z0-9]/.test(pw)) return { level: 3, label: 'Fair', color: 'bg-yellow-400' };
  return { level: 4, label: 'Strong', color: 'bg-green-500' };
}

export default function CreateEmployeePage() {
  const { form, loading, handleChange, handleSubmit } = useCreateEmployee();
  const [showPw, setShowPw]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [selectedRole, setSelectedRole] = useState(form.role || 'EMPLOYEE');

  const pwStrength = getPasswordStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.name?.trim())   e.name = 'Full name is required';
    if (!form.email?.trim())  e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password)       e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    handleSubmit(e);
  };

  const handleRoleClick = (value) => {
    setSelectedRole(value);
    handleChange({ target: { name: 'role', value } });
  };

  return (
    <div>
      <PageHeader
        title="Create Admin Account"
        subtitle="Add a new team member to the LeadDesk admin panel"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>

              {/* Name */}
              <div>
                <label htmlFor="emp-name" className="form-label">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="emp-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => { handleChange(e); setErrors((p) => ({ ...p, name: '' })); }}
                    placeholder="Full name"
                    className={`form-input pl-9 ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
                    autoComplete="name"
                  />
                </div>
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="emp-email" className="form-label">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="emp-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => { handleChange(e); setErrors((p) => ({ ...p, email: '' })); }}
                    placeholder="name@company.com"
                    className={`form-input pl-9 ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              {/* Role Selector */}
              <div>
                <label className="form-label">Role</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ROLE_OPTIONS.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRoleClick(value)}
                      className={`text-left p-3.5 rounded-xl border-2 transition-all ${
                        selectedRole === value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-semibold ${selectedRole === value ? 'text-indigo-700' : 'text-gray-800'}`}>
                          {label}
                        </span>
                        {selectedRole === value && (
                          <CheckCircle size={15} className="text-indigo-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="emp-password" className="form-label">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="emp-password"
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={(e) => { handleChange(e); setErrors((p) => ({ ...p, password: '' })); }}
                    placeholder="Min. 6 characters"
                    className={`form-input pl-9 pr-10 ${errors.password ? 'border-red-400 focus:border-red-400' : ''}`}
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

                {/* Password strength */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((l) => (
                        <div
                          key={l}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            l <= (pwStrength?.level || 0) ? pwStrength.color : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      Password strength: <span className="font-medium text-gray-600">{pwStrength?.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center h-10"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Create Account
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                <Shield size={15} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Access Control</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Only <span className="font-medium text-indigo-600">Super Admins</span> can create new accounts. Created users can immediately log in.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Role Permissions</h3>
            <div className="space-y-3">
              {[
                { role: 'Employee', perms: ['View leads', 'Update status'] },
                { role: 'Manager',  perms: ['View leads', 'Update status', 'Manage team'] },
                { role: 'Admin',    perms: ['Full access', 'Create accounts', 'Analytics'] },
              ].map(({ role, perms }) => (
                <div key={role}>
                  <p className="text-xs font-semibold text-gray-700 mb-1">{role}</p>
                  <div className="flex flex-wrap gap-1">
                    {perms.map((p) => (
                      <span key={p} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
