import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme } from '../types';
import { getTheme } from '../styles/theme';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Default to light mode
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('communityaware-theme');
    return saved ? JSON.parse(saved) : false; // Default to light mode
  });

  const theme = getTheme(isDark);

  const toggleTheme = () => {
    setIsDark((prev: boolean) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('communityaware-theme', JSON.stringify(isDark));
  }, [isDark]);

  const value: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
