import { createContext, useContext, useState, ReactNode } from 'react';

interface LangContextType {
  lang: 'uk' | 'en';
  setLang: (lang: 'uk' | 'en') => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<'uk' | 'en'>('uk');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}
