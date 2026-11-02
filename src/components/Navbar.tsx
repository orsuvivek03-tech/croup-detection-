import React, { useState } from 'react';
import { Leaf, Globe, Menu, X, Camera, BarChart3, BookOpen, Info, History } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../types';

interface NavbarProps {
  activeTab: 'dashboard' | 'scanner' | 'history' | 'guide' | 'about';
  setActiveTab: (tab: 'dashboard' | 'scanner' | 'history' | 'guide' | 'about') => void;
  onOpenScanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenScanner }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: { code: SupportedLanguage; label: string; nativeName: string; flag: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const handleNavClick = (tab: 'dashboard' | 'scanner' | 'history' | 'guide' | 'about') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'scanner') {
      onOpenScanner();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('dashboard')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                {t.appName}
              </h1>
              <p className="text-xs font-medium text-emerald-700 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              {t.nav.dashboard}
            </button>

            <button
              onClick={() => handleNavClick('scanner')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'scanner'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Camera className="w-4 h-4" />
              {t.nav.scanner}
            </button>

            <button
              onClick={() => handleNavClick('history')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <History className="w-4 h-4" />
              {t.nav.history}
            </button>

            <button
              onClick={() => handleNavClick('guide')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t.nav.guide}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'about'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Info className="w-4 h-4" />
              {t.nav.about}
            </button>
          </nav>

          {/* Right Controls: Highly Visible Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Scan Action Button */}
            <button
              onClick={() => handleNavClick('scanner')}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md"
            >
              <Camera className="w-4 h-4" />
              <span>{t.hero.scanBtn.replace('📷 ', '')}</span>
            </button>

            {/* Prominent Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 hover:bg-emerald-100/70 font-semibold text-sm transition-all shadow-2xs"
                title="Change language / భాష మార్చండి / भाषा बदलें"
                aria-label="Language selector"
              >
                <Globe className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-base">{currentLangObj.flag}</span>
                <span className="font-bold text-sm tracking-wide">
                  {currentLangObj.nativeName}
                </span>
                <span className="text-xs text-emerald-700">▼</span>
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-xs font-medium text-slate-500">
                      Select Language / భాష / भाषा
                    </div>
                    {languages.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors text-left ${
                          language === item.code
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{item.flag}</span>
                          <div>
                            <div className="text-sm font-semibold">{item.nativeName}</div>
                            <div className="text-[11px] text-slate-400">{item.label}</div>
                          </div>
                        </div>
                        {language === item.code && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold ${
              activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700'
            }`}
          >
            <BarChart3 className="w-5 h-5 text-emerald-700" />
            {t.nav.dashboard}
          </button>
          <button
            onClick={() => handleNavClick('scanner')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold ${
              activeTab === 'scanner' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700'
            }`}
          >
            <Camera className="w-5 h-5 text-emerald-700" />
            {t.nav.scanner}
          </button>
          <button
            onClick={() => handleNavClick('history')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold ${
              activeTab === 'history' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700'
            }`}
          >
            <History className="w-5 h-5 text-emerald-700" />
            {t.nav.history}
          </button>
          <button
            onClick={() => handleNavClick('guide')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold ${
              activeTab === 'guide' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700'
            }`}
          >
            <BookOpen className="w-5 h-5 text-emerald-700" />
            {t.nav.guide}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold ${
              activeTab === 'about' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700'
            }`}
          >
            <Info className="w-5 h-5 text-emerald-700" />
            {t.nav.about}
          </button>
        </div>
      )}
    </header>
  );
};
