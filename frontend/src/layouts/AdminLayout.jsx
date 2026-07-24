// AdminLayout — sidebar + main content layout for admin pages
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  LogOut,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/leads', icon: Users, label: 'Leads' },
];

const superAdminItems = [
  { to: '/admin/create-employee', icon: UserPlus, label: 'Create Employee' },
];

export default function AdminLayout() {
  const { user, logout, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{
        background: 'rgba(13, 15, 20, 0.95)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Logo */}
        <div className="px-6 py-6 flex items-center gap-3" style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #7c3aed, #d946ef)',
          }}>
            <Zap size={18} color="white" />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: '#e0e3e5' }}>LeadDesk</p>
            <p className="text-xs" style={{ color: '#958ea0' }}>Mini CRM</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: '#494454' }}>
            Navigation
          </p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
              <ChevronRight size={14} className="ml-auto opacity-40" />
            </NavLink>
          ))}

          {isSuperAdmin && (
            <>
              <p className="px-3 pb-2 pt-4 text-xs font-semibold uppercase tracking-widest" style={{ color: '#494454' }}>
                Super Admin
              </p>
              {superAdminItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  <ChevronRight size={14} className="ml-auto opacity-40" />
                </NavLink>
              ))}
            </>
          )}
        </nav>

        {/* User info + logout */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="glass-card-sm p-3 mb-3">
            <p className="text-sm font-semibold truncate" style={{ color: '#e0e3e5' }}>
              {user?.name}
            </p>
            <p className="text-xs truncate" style={{ color: '#958ea0' }}>
              {user?.email}
            </p>
            <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium" style={{
              background: 'rgba(139, 92, 246, 0.2)',
              color: '#a78bfa',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}>
              {user?.role?.replace('_', ' ')}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-link w-full text-sm"
            style={{ color: '#f87171' }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
