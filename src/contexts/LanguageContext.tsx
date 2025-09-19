import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, getBrowserLanguage, DEFAULT_LANGUAGE } from '../locales';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// RTL languages
const RTL_LANGUAGES: SupportedLanguage[] = ['ar', 'ur'];

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('communityaware_language');
    if (savedLanguage && savedLanguage in require('../locales').SUPPORTED_LANGUAGES) {
      return savedLanguage as SupportedLanguage;
    }
    // Otherwise, detect from browser
    return getBrowserLanguage();
  });

  const [isRTL, setIsRTL] = useState<boolean>(
    RTL_LANGUAGES.includes(currentLanguage)
  );

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    setIsRTL(RTL_LANGUAGES.includes(language));
    localStorage.setItem('communityaware_language', language);
    
    // Update document direction
    document.documentElement.dir = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  useEffect(() => {
    // Set initial document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, isRTL]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
