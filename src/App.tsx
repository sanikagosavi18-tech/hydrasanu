/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, DiagnosisRecord, FarmTask, UserAccount, AgroWeatherData, Language } from './types';
import { INITIAL_DIAGNOSES, INITIAL_TASKS } from './data/mockData';
import {
  fetchAgroWeather,
  detectDeviceLocation,
  detectLocationAutomatically,
  getLiveWeatherAutomatically,
  DEFAULT_FALLBACK_WEATHER,
  AGRICULTURAL_HUBS
} from './services/weatherService';
import { getSavedUser, clearSavedUser, saveUserLocally } from './services/authService';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MainFeatureCards } from './components/MainFeatureCards';
import { MiddleDashboardSection } from './components/MiddleDashboardSection';
import { MissionBanner } from './components/MissionBanner';
import { Footer } from './components/Footer';

import { DiseaseDetectionView } from './components/views/DiseaseDetectionView';
import { CropCareGuideView } from './components/views/CropCareGuideView';
import { TaskPlannerView } from './components/views/TaskPlannerView';
import { FertilizerCalculatorView } from './components/views/FertilizerCalculatorView';
import { DiagnosisHistoryView } from './components/views/DiagnosisHistoryView';
import { FarmerResourcesView } from './components/views/FarmerResourcesView';
import { WeatherForecastView } from './components/views/WeatherForecastView';
import { SignInView } from './components/views/SignInView';
import { UserProfileModal } from './components/UserProfileModal';

export default function App() {
  // Fresh session access: Always start on sign-in screen without auto-logging into mock user
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Present the sign-in page first every time the app is accessed
  const [activeTab, setActiveTab] = useState<NavTab>('sign-in');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [diagnoses, setDiagnoses] = useState<DiagnosisRecord[]>(INITIAL_DIAGNOSES);
  const [tasks, setTasks] = useState<FarmTask[]>(INITIAL_TASKS);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [loginToast, setLoginToast] = useState<string | null>(null);

  // Multi-Language State (English, Hindi, Marathi)
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('hydromind_lang');
      if (saved === 'hi' || saved === 'mr' || saved === 'en') return saved;
    } catch (_) {}
    return 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('hydromind_lang', lang);
    } catch (_) {}
  };

  // Weather and Geolocation State - Automatic Location and Live Weather Detection
  const [weatherData, setWeatherData] = useState<AgroWeatherData>(DEFAULT_FALLBACK_WEATHER);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  // Automatically detect location and fetch real-time live weather on startup
  useEffect(() => {
    let isMounted = true;
    async function loadAutomaticWeather() {
      setIsDetectingLocation(true);
      try {
        const { weather: liveWeather, location: loc } = await getLiveWeatherAutomatically();
        if (isMounted) {
          setWeatherData(liveWeather);
          const sourceBadge = loc.source === 'gps' ? 'GPS' : loc.source === 'ip' ? 'Network' : 'Regional';
          setLoginToast(`📍 Live weather detected for ${loc.name} (${liveWeather.current.temp}°C, ${sourceBadge})`);
          setTimeout(() => setLoginToast(null), 4500);
        }
      } catch (err) {
        console.warn('Automatic location and weather detection error:', err);
      } finally {
        if (isMounted) {
          setIsDetectingLocation(false);
        }
      }
    }
    loadAutomaticWeather();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync dark class to html document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Automatic & On-demand Geolocation detector handler
  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    setLocationStatus('Detecting farm coordinates & live weather...');
    try {
      const { weather: liveWeather, location: loc } = await getLiveWeatherAutomatically();
      setWeatherData(liveWeather);
      const sourceBadge = loc.source === 'gps' ? 'GPS Satellite' : 'Network Geolocation';
      setLocationStatus(`Locked: ${loc.name} (${sourceBadge}: ${loc.lat.toFixed(3)}°N, ${loc.lon.toFixed(3)}°E)`);
      setLoginToast(`Weather updated for ${loc.name}: ${liveWeather.current.temp}°C, ${liveWeather.current.weatherDescription}`);
      setTimeout(() => {
        setLocationStatus(null);
        setLoginToast(null);
      }, 5000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && err.message
          ? err.message
          : 'Could not access device GPS. Using regional weather hub.';
      setLocationStatus(errorMessage);
      setTimeout(() => setLocationStatus(null), 5000);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleSelectHub = async (hub: typeof AGRICULTURAL_HUBS[0]) => {
    setIsDetectingLocation(true);
    try {
      const live = await fetchAgroWeather(
        hub.lat,
        hub.lon,
        hub.name,
        `${hub.state}, India`
      );
      setWeatherData(live);
      setLoginToast(`Weather hub switched to ${hub.name}, ${hub.state}`);
      setTimeout(() => setLoginToast(null), 3000);
    } catch (err) {
      console.warn('Failed to switch hub:', err);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Diagnosis Handlers
  const handleSaveDiagnosis = (newRecord: DiagnosisRecord) => {
    setDiagnoses((prev) => [newRecord, ...prev]);
  };

  const handleDeleteDiagnosis = (id: string) => {
    setDiagnoses((prev) => prev.filter((item) => item.id !== id));
  };

  // Task Handlers
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask: FarmTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers - Save details and switch views
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    saveUserLocally(user, true);
    setActiveTab('home');
    setLoginToast(`Welcome back, ${user.name}! Your sign-in details have been saved.`);
    setTimeout(() => setLoginToast(null), 4000);
  };

  const handleSignOut = () => {
    clearSavedUser();
    setCurrentUser(null);
    setActiveTab('sign-in');
    setLoginToast('Signed out successfully. Session cleared.');
    setTimeout(() => setLoginToast(null), 3000);
  };

  const handleUpdateUser = (updated: UserAccount) => {
    setCurrentUser(updated);
    saveUserLocally(updated, true);
    setLoginToast('Profile details updated successfully!');
    setTimeout(() => setLoginToast(null), 3000);
  };

  // When activeTab is 'sign-in' (initial load or sign-out), present dedicated full-screen HydraMind sign-in portal
  if (activeTab === 'sign-in') {
    return (
      <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#f4f7f4] text-slate-800'}`}>
        {/* Toast Notification */}
        {loginToast && (
          <div className="fixed top-6 right-6 z-50 bg-[#0c5a3e] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold animate-in slide-in-from-top-2 border border-emerald-400/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span>{loginToast}</span>
          </div>
        )}

        <SignInView
          onBack={() => setActiveTab('home')}
          onLoginSuccess={handleLoginSuccess}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          language={language}
          onSetLanguage={handleSetLanguage}
          onExploreAsGuest={() => {
            setActiveTab('home');
            setLoginToast('Browsing as Guest Farmer. Sign in anytime to sync your farm data.');
            setTimeout(() => setLoginToast(null), 3500);
          }}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#f8faf9] text-slate-800'}`}>
      
      {/* Toast Notification */}
      {loginToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0b5c46] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold animate-in slide-in-from-top-2 border border-emerald-400/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
          <span>{loginToast}</span>
        </div>
      )}

      {/* Top Navigation Bar with exact 7+1 items, multi-language switcher and branding */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentUser={currentUser}
        weather={weatherData}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSignIn={() => setActiveTab('sign-in')}
        onSignOut={handleSignOut}
        language={language}
        setLanguage={handleSetLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">

        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onGetStarted={() => setActiveTab('disease-detection')}
              onLearnMore={() => {
                const el = document.getElementById('features-strip');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('care-guide');
              }}
              setActiveTab={setActiveTab}
              currentUser={currentUser}
              language={language}
            />

            {/* 6 Feature Cards in row */}
            <div id="features-strip">
              <MainFeatureCards onSelectTab={setActiveTab} language={language} />
            </div>

            {/* Middle 3-Column Dashboard Section */}
            <MiddleDashboardSection
              onSelectTab={setActiveTab}
              weather={weatherData}
              language={language}
            />

            {/* Our Mission Banner */}
            <MissionBanner language={language} />
          </>
        )}

        {/* Feature Sub-Views */}
        {activeTab === 'weather-forecast' && (
          <WeatherForecastView
            weather={weatherData}
            onDetectLocation={handleDetectLocation}
            onSelectHub={handleSelectHub}
            isDetecting={isDetectingLocation}
            onBack={() => setActiveTab('home')}
            locationStatus={locationStatus}
          />
        )}

        {activeTab === 'disease-detection' && (
          <DiseaseDetectionView
            onBack={() => setActiveTab('home')}
            onSaveToHistory={handleSaveDiagnosis}
            onViewHistory={() => setActiveTab('diagnosis-history')}
            currentUser={currentUser}
            language={language}
          />
        )}

        {activeTab === 'care-guide' && <CropCareGuideView onBack={() => setActiveTab('home')} />}

        {activeTab === 'task-planner' && (
          <TaskPlannerView
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onBack={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'fertilizer-calc' && <FertilizerCalculatorView onBack={() => setActiveTab('home')} />}

        {activeTab === 'diagnosis-history' && (
          <DiagnosisHistoryView
            history={diagnoses}
            onDeleteRecord={handleDeleteDiagnosis}
            onNewScan={() => setActiveTab('disease-detection')}
            onBack={() => setActiveTab('home')}
            currentUser={currentUser}
            language={language}
          />
        )}

        {activeTab === 'farmer-resources' && (
          <FarmerResourcesView
            onBack={() => setActiveTab('home')}
            weather={weatherData}
            onDetectLocation={handleDetectLocation}
            isDetecting={isDetectingLocation}
          />
        )}
      </main>

      {/* Footer Section */}
      <Footer setActiveTab={setActiveTab} />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onSignOut={handleSignOut}
      />
    </div>
  );
}
