import React, { useState } from 'react';
import {
  Home,
  ScanSearch,
  Sprout,
  CalendarDays,
  FlaskConical,
  History,
  BookOpen,
  Sun,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  CloudSun,
  Camera,
  Languages
} from 'lucide-react';
import { NavTab, UserAccount, AgroWeatherData, Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  currentUser: UserAccount | null;
  weather?: AgroWeatherData;
  onOpenProfile: () => void;
  onOpenSignIn: () => void;
  onSignOut: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  currentUser,
  weather,
  onOpenProfile,
  onOpenSignIn,
  onSignOut,
  language,
  setLanguage,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.navHome, icon: <Home className="w-4 h-4" /> },
    { id: 'disease-detection', label: t.navDiseaseDetection, icon: <ScanSearch className="w-4 h-4" /> },
    { id: 'care-guide', label: t.navCareGuide, icon: <Sprout className="w-4 h-4" /> },
    { id: 'task-planner', label: t.navTaskPlanner, icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'fertilizer-calc', label: t.navFertilizerCalc, icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'weather-forecast', label: t.navWeather, icon: <CloudSun className="w-4 h-4" /> },
    { id: 'diagnosis-history', label: t.navDiagnosisHistory, icon: <History className="w-4 h-4" /> },
    { id: 'farmer-resources', label: t.navFarmerResources, icon: <BookOpen className="w-4 h-4" /> },
  ];

  const languageOptions: { code: Language; label: string; scriptName: string }[] = [
    { code: 'en', label: 'English', scriptName: 'English' },
    { code: 'hi', label: 'Hindi', scriptName: 'हिंदी' },
    { code: 'mr', label: 'Marathi', scriptName: 'मराठी' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-100/90 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1 transition-transform hover:scale-[1.02] cursor-pointer group shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0b5c46] via-[#10b981] to-[#34d399] flex items-center justify-center text-white shadow-md shadow-emerald-700/25 group-hover:shadow-emerald-600/40 transition-shadow">
            <svg
              className="w-7 h-7 transition-transform group-hover:rotate-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" fill="currentColor" fillOpacity="0.3" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.1.9-4.9 2z" fill="currentColor" fillOpacity="0.3" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0a4834] dark:text-emerald-400">
                {t.brandName}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {t.proBadge}
              </span>
            </div>
            <p className="text-[11px] font-bold text-[#15803d] dark:text-emerald-300/90 -mt-0.5 tracking-wide">
              {t.assistantSubtitle}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0b5c46] text-white shadow-md shadow-emerald-950/20 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0b5c46] dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800'
                }`}
              >
                <span className={isActive ? 'text-emerald-200' : 'text-slate-500 dark:text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Language Switcher, Quick Scan, Weather, Theme toggle, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* LANGUAGE SELECTOR PILL (English | हिंदी | मराठी) */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0b5c46] dark:text-emerald-300 text-xs font-black border border-emerald-300/80 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
              title="Change Language (English / हिंदी / मराठी)"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {language === 'en' ? 'EN' : language === 'hi' ? 'हिंदी' : 'मराठी'}
              </span>
              <ChevronDown className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-emerald-100 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95"
                onClick={() => setLangDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  {t.selectLanguage}
                </div>
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors ${
                      language === opt.code
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0b5c46] dark:text-emerald-300'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt.scriptName}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({opt.label})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Scan CTA Button */}
          <button
            onClick={() => setActiveTab('disease-detection')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-emerald-300/30"
            title="Open AI Disease Scanner"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t.navScanLeafQuick}</span>
          </button>

          {/* Live Weather Pill */}
          {weather && (
            <button
              onClick={() => setActiveTab('weather-forecast')}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-sky-50 dark:bg-slate-800 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-slate-700 hover:border-sky-400 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Click to view full 7-day Agro-Weather Station"
            >
              <CloudSun className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
              <span>{weather.locationName}</span>
              <span className="font-extrabold tabular-nums">{weather.current.temp}°C</span>
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label="Toggle color theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs shrink-0"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          {/* User Sign In / Profile dropdown */}
          {currentUser ? (
            <div className="relative shrink-0">
              <button
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 hover:border-emerald-400 transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#0b5c46] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <span className="font-bold text-slate-800 dark:text-white block line-clamp-1">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 -mt-0.5 block font-semibold">
                    {currentUser.landArea} {currentUser.areaUnit}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.farmName}</p>
                  </div>

                  <button
                    onClick={onOpenProfile}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>{t.farmerProfile}</span>
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                  <button
                    onClick={onSignOut}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b5c46] hover:bg-[#084534] text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.signIn}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Scrollable Nav */}
      <div className="xl:hidden border-t border-emerald-50 dark:border-slate-800 px-4 py-2.5 overflow-x-auto flex items-center gap-2 no-scrollbar bg-slate-50/50 dark:bg-slate-900/50">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#0b5c46] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
