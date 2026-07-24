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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1d2022',
              color: '#e0e3e5',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#a78bfa', secondary: '#1d2022' },
            },
            error: {
              iconTheme: { primary: '#f87171', secondary: '#1d2022' },
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
