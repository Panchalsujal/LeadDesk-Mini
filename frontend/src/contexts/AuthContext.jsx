// Auth context — manages user state globally
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const USER_STORAGE_KEY = 'leaddesk_user';

/**
 * Reads user from localStorage
 */
const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUserFromStorage());

  const login = useCallback((userData) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, login, logout, isSuperAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
