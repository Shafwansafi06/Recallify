import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  totalCards: number;
  masteredCards: number;
  plan: 'free' | 'premium';
  joinedAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@recallify.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  level: 12,
  xp: 2450,
  xpToNextLevel: 3000,
  streak: 24,
  totalCards: 847,
  masteredCards: 623,
  plan: 'premium',
  joinedAt: new Date('2024-01-15'),
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser(MOCK_USER);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({
      ...MOCK_USER,
      name,
      email,
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      streak: 0,
      totalCards: 0,
      masteredCards: 0,
      plan: 'free',
      joinedAt: new Date(),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addXP = (amount: number) => {
    if (user) {
      let newXP = user.xp + amount;
      let newLevel = user.level;
      let newXPToNextLevel = user.xpToNextLevel;

      while (newXP >= newXPToNextLevel) {
        newXP -= newXPToNextLevel;
        newLevel++;
        newXPToNextLevel = Math.floor(newXPToNextLevel * 1.5);
      }

      setUser({
        ...user,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNextLevel,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        addXP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
