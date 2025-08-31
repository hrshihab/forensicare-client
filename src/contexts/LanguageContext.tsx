'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Always start with 'bn' to avoid hydration mismatch, then update after mount
  const [language, setLanguage] = useState<Language>('bn');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isClient, setIsClient] = useState(false);

  // Set client flag after mount to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
    // Load language from localStorage after mount
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'bn' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Persist language changes to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (isClient) {
      localStorage.setItem('language', lang);
    }
  };

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        if (language === 'bn') {
          const bnTranslations = await import('@/locales/bn.json');
          setTranslations(bnTranslations.default);
        } else {
          const enTranslations = await import('@/locales/en.json');
          setTranslations(enTranslations.default);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
