import { useState } from 'react';
import { User } from '../types/auth';
import { AuthContext } from './AuthContextDefinition';

// Helper function para carregar do localStorage
const loadFromStorage = (): { token: string | null; user: User | null } => {
  try {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      return {
        token: storedToken,
        user: JSON.parse(storedUser) as User,
      };
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }

  return { token: null, user: null };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Inicializa com os valores do localStorage
  const [token, setToken] = useState<string | null>(() => loadFromStorage().token);
  const [user, setUser] = useState<User | null>(() => loadFromStorage().user);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
