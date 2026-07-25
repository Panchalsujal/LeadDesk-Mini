// App.jsx — main router configuration
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';

// Pages
import LeadCapturePage from './pages/LeadCapturePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import LeadsPage from './pages/admin/LeadsPage';
import CreateEmployeePage from './pages/admin/CreateEmployeePage';
import ProfilePage from './pages/admin/ProfilePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#111827',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              borderRadius: '0.5rem',
              padding: '10px 14px',
            },
            success: {
              iconTheme: { primary: '#4f46e5', secondary: '#ffffff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
            },
          }}
        />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LeadCapturePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<DashboardPage />} />
              <Route path="/admin/leads" element={<LeadsPage />} />
              <Route path="/admin/profile" element={<ProfilePage />} />

              {/* Super admin only */}
              <Route element={<ProtectedRoute requireSuperAdmin />}>
                <Route path="/admin/create-employee" element={<CreateEmployeePage />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
