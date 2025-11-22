import { createGlobalStyle } from 'styled-components';
import { Theme } from '../types';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  :root {
    --header-height: 85px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* Prevent horizontal scrolling on mobile */
    overflow-x: hidden;
    /* Improve text rendering on mobile */
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
                 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    line-height: 1.6;
    /* Prevent horizontal scrolling */
    overflow-x: hidden;
    /* Better mobile scrolling */
    -webkit-overflow-scrolling: touch;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }

  *::placeholder {
    font-size: 0.95rem;
  }

  html {
    scroll-behavior: smooth;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  code {
    font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 
                 'Liberation Mono', 'Courier New', monospace;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  /* Selection styles */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.isDark ? '#000' : '#fff'};
  }

  ::-moz-selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.isDark ? '#000' : '#fff'};
  }

  /* Focus styles for accessibility */
  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Animation utilities */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-slideInRight {
    animation: slideInFromRight 0.3s ease-out;
  }

  .animate-slideInLeft {
    animation: slideInFromLeft 0.3s ease-out;
  }

  /* Hide browser progress bars and loading indicators */
  progress {
    display: none !important;
  }
  
  /* Hide any webpack dev server progress bars */
  #webpack-dev-server-client-overlay {
    display: none !important;
  }
  
  /* Hide any other progress indicators that might appear */
  [role="progressbar"] {
    display: none !important;
  }
  
  /* Ensure no fixed position elements interfere at bottom */
  body::after,
  html::after {
    content: none !important;
    display: none !important;
  }
  
  /* Mobile touch optimizations */
  @media (max-width: 768px) {
    :root {
      --header-height: 60px;
    }
    /* Improve button touch targets */
    button {
      min-height: 44px;
      min-width: 44px;
    }
    
    /* Improve input touch targets */
    input, textarea, select {
      min-height: 44px;
      -webkit-appearance: none;
      border-radius: 0;
    }
    
    /* Prevent zoom on input focus */
    input[type="text"], input[type="email"], 
    input[type="password"], textarea {
      font-size: 16px;
    }
    
    /* Better tap highlighting */
    * {
      -webkit-tap-highlight-color: ${({ theme }) => theme.colors.primary}20;
    }
    *::placeholder {
      font-size: 0.85rem;
    }
  }
  
  /* Mobile-only utility class */
  .mobile-only {
    @media (min-width: 769px) {
      display: none !important;
    }
  }
  
  /* Extra small mobile optimizations */
  @media (max-width: 480px) {
    /* Reduce margins and padding on very small screens */
    h1, h2, h3, h4, h5, h6 {
      line-height: 1.2;
    }
    
    /* Improve readability */
    body {
      font-size: 16px;
      line-height: 1.5;
    }
  }
`;
