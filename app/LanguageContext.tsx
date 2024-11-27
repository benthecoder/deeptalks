'use client';

import { createContext, useContext, useState } from 'react';
import type { SupportedLanguages } from '@/types';

type LanguageContextType = {
  language: SupportedLanguages;
  setLanguage: (language: SupportedLanguages) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguages>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}