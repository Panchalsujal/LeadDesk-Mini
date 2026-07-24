// ProtectedRoute — redirects to login if not authenticated
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ requireSuperAdmin = false }) {
  const { isAuthenticated, isSuperAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
