// AdminLayout — premium white sidebar + header. Inspired by Preline sidenav patterns.
import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Settings,
  User,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/ui/Avatar';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/leads',     icon: Users,           label: 'Leads' },
  { to: '/admin/profile',   icon: User,            label: 'My Profile' },
];

const SUPER_ADMIN_ITEMS = [
  { to: '/admin/create-employee', icon: UserPlus, label: 'Create Admin' },
];

function SidebarLink({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
    >
      <Icon size={17} className="shrink-0" />
      <span className="flex-1">{label}</span>
      <ChevronRight size={13} className="opacity-30 ml-auto" />
    </NavLink>
  );
}

export default function AdminLayout() {
  const { user, logout, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  // Derive page title from route
  const pageTitles = {
    '/admin/dashboard':       'Dashboard',
    '/admin/leads':           'Leads',
    '/admin/profile':         'My Profile',
    '/admin/create-employee': 'Create Admin',
  };
  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  const SidebarContent = ({ onNavClick }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
          <Zap size={16} color="white" />
        </div>
        <div>
          <p className="font-bold text-sm text-gray-900 leading-none">LeadDesk</p>
          <p className="text-xs text-gray-400 mt-0.5">CRM Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="section-label">Main Menu</p>
        <div className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <SidebarLink key={item.to} {...item} onClick={onNavClick} />
          ))}
        </div>

        {isSuperAdmin && (
          <>
            <p className="section-label">Administration</p>
            <div className="flex flex-col gap-0.5">
              {SUPER_ADMIN_ITEMS.map((item) => (
                <SidebarLink key={item.to} {...item} onClick={onNavClick} />
              ))}
            </div>
          </>
        )}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
          <Avatar name={user?.name || 'User'} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate leading-none mb-0.5">
              {user?.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50"
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 mt-1 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-gray-200 fixed top-0 left-0 h-full z-30">
        <SidebarContent onNavClick={undefined} />
      </aside>

      {/* ─── Mobile Sidebar Overlay ─── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl animate-slide-in-left z-50">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={18} />
            </button>
            <SidebarContent onNavClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* ─── Main Area ─── */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-14 flex items-center px-4 lg:px-6 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden btn-ghost p-1.5"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Page title */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">LeadDesk</span>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="font-medium text-gray-800">{pageTitle}</span>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* Notification bell */}
            <button className="btn-ghost p-2 relative" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse-dot" />
            </button>

            {/* Settings */}
            <NavLink
              to="/admin/profile"
              className="btn-ghost p-2"
              aria-label="Settings"
            >
              <Settings size={18} />
            </NavLink>

            {/* User avatar */}
            <NavLink to="/admin/profile">
              <Avatar name={user?.name || 'User'} size="sm" />
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
