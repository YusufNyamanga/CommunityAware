import { Theme } from '../types';

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: '#FF8C00', // Dark orange
    primaryLight: '#FFB347', // Light orange
    primaryDark: '#CC7000', // Darker orange
    secondary: '#FFA500', // Orange
    background: '#000000', // Pure black
    surface: '#1a1a1a', // Dark gray for cards/surfaces
    text: '#ffffff', // White text
    textSecondary: '#b3b3b3', // Light gray text
    accent: '#FF6B35', // Rust-like accent color
    border: '#333333', // Dark gray border
    error: '#ff5252',
    success: '#4caf50',
    warning: '#ff9800',
  },
};

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#FF8C00', // Dark orange
    primaryLight: '#FFB347', // Light orange
    primaryDark: '#CC7000', // Darker orange
    secondary: '#FFA500', // Orange
    background: '#ffffff', // White
    surface: '#f8f9fa', // Light gray for cards/surfaces
    text: '#212529', // Dark text
    textSecondary: '#6c757d', // Gray text
    accent: '#FF6B35', // Rust-like accent color
    border: '#dee2e6', // Light gray border
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
  },
};

export const getTheme = (isDark: boolean): Theme => isDark ? darkTheme : lightTheme;
