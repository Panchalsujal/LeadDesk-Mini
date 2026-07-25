// ProfilePage — Update profile + change password. Inspired by ShadcnBlocks settings-profile blocks.
import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Save, Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../../components/ui/Avatar';
import PageHeader from '../../components/ui/PageHeader';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuth();

  const [profileForm, setProfileForm] = useState({
    name:  user?.name  || '',
    email: user?.email || '',
  });
  const [profileLoading, setProfileLoading] = useState(false);

  const [pwForm, setPwForm] = useState({
    currentPassword: '',
    newPassword:     '',
    confirmPassword: '',
  });
  const [pwLoading, setPwLoading]   = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [pwErrors, setPwErrors]       = useState({});

  const handleProfileChange = (e) =>
    setProfileForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePwChange = (e) =>
    setPwForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      // Placeholder — wire to auth.service updateProfile when endpoint is ready
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!pwForm.currentPassword) errs.currentPassword = 'Current password is required';
    if (!pwForm.newPassword)     errs.newPassword     = 'New password is required';
    else if (pwForm.newPassword.length < 6) errs.newPassword = 'Must be at least 6 characters';
    if (pwForm.newPassword !== pwForm.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (Object.keys(errs).length) { setPwErrors(errs); return; }
    setPwErrors({});
    setPwLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Password changed successfully');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      toast.error('Failed to change password');
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information and account security"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Avatar card */}
        <div className="lg:col-span-1">
          <div className="card p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar name={user?.name || 'User'} size="xl" />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors shadow-sm">
                <Camera size={13} />
              </button>
            </div>
            <h3 className="text-base font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-400 mt-0.5">{user?.email}</p>
            <span className="badge badge-indigo mt-3">
              {user?.role?.replace('_', ' ')}
            </span>

            <div className="w-full mt-6 pt-5 border-t border-gray-100 space-y-2 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Role</span>
                <span className="font-medium text-gray-700 capitalize">{user?.role?.toLowerCase().replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className="flex items-center gap-1 font-medium text-emerald-600">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Forms */}
        <div className="lg:col-span-2 space-y-5">

          {/* Update Profile Form */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
              Profile Information
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="profile-name" className="form-label">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="profile-name"
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="form-input pl-9"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="profile-email" className="form-label">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="profile-email"
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="form-input pl-9"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="btn-primary h-9 gap-1.5"
                >
                  {profileLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
              Change Password
            </h2>
            <form onSubmit={handlePwSubmit} className="space-y-4" noValidate>
              {/* Current Password */}
              <div>
                <label htmlFor="current-pw" className="form-label">Current Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="current-pw"
                    type={showCurrent ? 'text' : 'password'}
                    name="currentPassword"
                    value={pwForm.currentPassword}
                    onChange={handlePwChange}
                    className={`form-input pl-9 pr-10 ${pwErrors.currentPassword ? 'border-red-400' : ''}`}
                    placeholder="Your current password"
                  />
                  <button type="button" onClick={() => setShowCurrent((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {pwErrors.currentPassword && <p className="form-error">{pwErrors.currentPassword}</p>}
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="new-pw" className="form-label">New Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="new-pw"
                    type={showNew ? 'text' : 'password'}
                    name="newPassword"
                    value={pwForm.newPassword}
                    onChange={handlePwChange}
                    className={`form-input pl-9 pr-10 ${pwErrors.newPassword ? 'border-red-400' : ''}`}
                    placeholder="Min. 6 characters"
                  />
                  <button type="button" onClick={() => setShowNew((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {pwErrors.newPassword && <p className="form-error">{pwErrors.newPassword}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-pw" className="form-label">Confirm New Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="confirm-pw"
                    type="password"
                    name="confirmPassword"
                    value={pwForm.confirmPassword}
                    onChange={handlePwChange}
                    className={`form-input pl-9 ${pwErrors.confirmPassword ? 'border-red-400' : ''}`}
                    placeholder="Repeat new password"
                  />
                </div>
                {pwErrors.confirmPassword && <p className="form-error">{pwErrors.confirmPassword}</p>}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={pwLoading}
                  className="btn-primary h-9 gap-1.5"
                >
                  {pwLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Lock size={14} />
                  )}
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
