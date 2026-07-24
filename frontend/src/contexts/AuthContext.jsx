// Auth context — manages user state globally + token storage
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const USER_STORAGE_KEY = 'leaddesk_user';
const TOKEN_STORAGE_KEY = 'leaddesk_token';

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

  const login = useCallback((userData, token) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
