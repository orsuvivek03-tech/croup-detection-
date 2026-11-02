import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, CropType, SeverityLevel } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CROPS_METADATA, PLANT_VILLAGE_DISEASES } from '../data/plantVillageData';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (typeof UI_TRANSLATIONS)['en'];
  getCropName: (crop: CropType) => string;
  getDiseaseName: (diseaseKey?: string, fallbackName?: string) => string;
  getSeverityName: (severity: SeverityLevel) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('plant_health_lang') as SupportedLanguage;
      if (saved && (saved === 'en' || saved === 'te' || saved === 'hi')) {
        return saved;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('plant_health_lang', lang);
    }
  };

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const getCropName = (crop: CropType): string => {
    const meta = CROPS_METADATA[crop];
    if (meta && meta.name[language]) {
      return meta.name[language];
    }
    return crop;
  };

  const getDiseaseName = (diseaseKey?: string, fallbackName?: string): string => {
    if (diseaseKey) {
      const found = PLANT_VILLAGE_DISEASES.find((d) => d.key === diseaseKey);
      if (found && found.name[language]) {
        return found.name[language];
      }
    }
    // Try matching by English name
    if (fallbackName) {
      const match = PLANT_VILLAGE_DISEASES.find(
        (d) => d.name.en.toLowerCase() === fallbackName.toLowerCase()
      );
      if (match && match.name[language]) {
        return match.name[language];
      }
      return fallbackName;
    }
    return diseaseKey || 'Unknown Condition';
  };

  const getSeverityName = (severity: SeverityLevel): string => {
    return t.severities[severity] || severity;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getCropName,
        getDiseaseName,
        getSeverityName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
