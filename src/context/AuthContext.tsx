import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  nickname: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (nickname: string, pass: string) => boolean;
  register: (name: string, nickname: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (nickname: string, pass: string) => {
    // Проста імітація авторизації
    if (nickname === 'admin' && pass === '123456') {
      setUser({ nickname, role: 'admin' });
      return true;
    } else if (nickname.length > 2 && pass.length > 2) {
      setUser({ nickname, role: 'user' });
      return true;
    }
    return false;
  };

  const register = (name: string, nickname: string, pass: string) => {
    // Проста імітація реєстрації
    if (nickname.length > 2 && pass.length > 2) {
      setUser({ nickname, role: 'user' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
