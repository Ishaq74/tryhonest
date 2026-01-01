import { useState } from 'react';
import type { Language } from '../types/i18n';
import { getTranslation } from '../i18n';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange?: (lang: Language) => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export default function Header({ currentLang, onLanguageChange }: HeaderProps) {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = getTranslation(currentLang);
  
  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  const handleLanguageChange = (lang: Language) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
    setIsLangMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">
              {t.home.title}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.home}
            </a>
            <a href="/explore" className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.explore}
            </a>
            <a href="/events" className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.events}
            </a>
            <a href="/hiking" className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.hiking}
            </a>
            <a href="/magazine" className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.magazine}
            </a>
            <a href="/classifieds" className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.classifieds}
            </a>
            <a href="/community" className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.community}
            </a>
          </nav>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <span className="text-xl">{currentLanguage.flag}</span>
              <span className="hidden sm:inline text-gray-700">{currentLanguage.label}</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${
                      lang.code === currentLang ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                {t.nav.home}
              </a>
              <a href="/explore" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                {t.nav.explore}
              </a>
              <a href="/events" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                {t.nav.events}
              </a>
              <a href="/hiking" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                {t.nav.hiking}
              </a>
              <a href="/magazine" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                {t.nav.magazine}
              </a>
              <a href="/classifieds" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                {t.nav.classifieds}
              </a>
              <a href="/community" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                {t.nav.community}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
