import React, { useState, type ReactNode } from 'react';
import LanguageContext from './language-context';

interface LanguageProps {
  children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProps> = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  const languageHandler = (lang: 'EN' | 'ID'): void => {
    setLanguage(lang);
  };

  const languageContext = {
    language,
    languageHandler
  };

  return (
    <LanguageContext.Provider value={languageContext}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
