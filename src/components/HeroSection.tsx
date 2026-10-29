import React from 'react';
import { ArrowRight, Leaf, Sparkles, Sprout, ShieldCheck, Zap, Activity } from 'lucide-react';
import { NavTab, UserAccount, Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface HeroSectionProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
  setActiveTab: (tab: NavTab) => void;
  currentUser?: UserAccount | null;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onLearnMore,
  setActiveTab,
  currentUser,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f7ee] via-[#f5fbf7] to-[#eef9f4] dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border-b border-emerald-100/80 dark:border-slate-800 transition-colors font-sans">
      {/* Dynamic ambient background glow accents */}
      <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-emerald-300/30 dark:bg-emerald-900/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-amber-200/25 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-teal-200/20 dark:bg-teal-950/20 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, CTAs, Trust Metrics */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Top Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0b5c46] to-[#0f766e] text-white text-xs font-bold shadow-sm shadow-emerald-900/20 ring-1 ring-white/20">
                <Sprout className="w-4 h-4 text-emerald-300 animate-pulse" />
                <span>{t.smartFarmingBadge}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-[#0b5c46] dark:text-emerald-300 text-xs font-semibold border border-emerald-200/70 dark:border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>PlantVillage Kaggle Dataset Benchmark</span>
              </div>

              {currentUser && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-slate-700">
                  <span>{currentUser.name} ({currentUser.farmName})</span>
                </div>
              )}
            </div>

            {/* Main Heading */}
            <div className="space-y-1 mb-5">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                {t.heroWelcome}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#0b5c46] via-[#047857] to-[#10b981] bg-clip-text text-transparent tracking-tight drop-shadow-xs">
                  {t.brandName}
                </h1>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 dark:text-emerald-400 fill-emerald-500/30 rotate-12" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                {t.heroTagline}
              </p>
            </div>

            {/* Sub-headline text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-6 font-normal">
              {t.heroSubtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0b5c46] to-[#047857] hover:from-[#094a38] hover:to-[#035f45] text-white text-base font-bold shadow-lg shadow-emerald-900/25 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer ring-2 ring-emerald-400/30"
              >
                <span>{t.heroGetStarted}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLearnMore}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white dark:bg-slate-800/90 border-2 border-[#0b5c46] dark:border-emerald-500 text-[#0b5c46] dark:text-emerald-300 hover:bg-emerald-50/80 dark:hover:bg-slate-700 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs"
              >
                {t.heroLearnMore}
              </button>
            </div>

            {/* Quick Live Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-emerald-200/70 dark:border-slate-700 shadow-sm">
              <div className="text-center sm:text-left px-2">
                <div className="text-base sm:text-lg font-black text-[#0b5c46] dark:text-emerald-400">
                  99.4%
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {t.accuracyMetric}
                </div>
              </div>
              <div className="text-center sm:text-left px-2 border-l border-slate-200 dark:border-slate-700">
                <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-300">
                  54,305
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {t.datasetMetric}
                </div>
              </div>
              <div className="text-center sm:text-left px-2 border-l border-slate-200 dark:border-slate-700">
                <div className="text-base sm:text-lg font-black text-teal-600 dark:text-teal-300">
                  38
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {t.classesMetric}
                </div>
              </div>
              <div className="text-center sm:text-left px-2 border-l border-slate-200 dark:border-slate-700">
                <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 flex items-center justify-center sm:justify-start gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>&lt; 1.5s</span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {t.speedMetric}
                </div>
              </div>
            </div>

            {/* Quick Diagnostic Shortcut Chips */}
            <div className="mt-4 flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t.quickTestLabel}</span>
              <button
                onClick={() => setActiveTab('disease-detection')}
                className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
              >
                🍅 {language === 'hi' ? 'टमाटर अगेती झुलसा' : language === 'mr' ? 'टोमॅटो करपा' : 'Tomato Early Blight'}
              </button>
              <button
                onClick={() => setActiveTab('disease-detection')}
                className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
              >
                🥔 {language === 'hi' ? 'आलू पछेती झुलसा' : language === 'mr' ? 'बटाटा लेट ब्लाइट' : 'Potato Late Blight'}
              </button>
              <button
                onClick={() => setActiveTab('disease-detection')}
                className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
              >
                🌽 {language === 'hi' ? 'मक्का रतुआ' : language === 'mr' ? 'मका तांबेरा' : 'Corn Leaf Rust'}
              </button>
            </div>

          </div>

          {/* Right Column: Hero Image with Cursive Motto & Floating Proof Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Cursive Handwriting Slogan */}
            <div className="absolute -top-4 sm:-top-6 left-0 sm:left-4 z-20 pointer-events-none transform -rotate-6 select-none bg-white/85 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-200/80 dark:border-slate-800 shadow-md">
              <p className="font-handwriting text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b5c46] dark:text-emerald-300 leading-tight">
                {t.mottoHealthyCrops} <br />
                <span className="ml-4">{t.mottoBetterYields}</span> <br />
                <span className="ml-8">{t.mottoBrighterFuture}</span>
              </p>
            </div>

            {/* Hero Image Container with Polished Frame */}
            <div className="relative w-full max-w-[530px] aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl shadow-emerald-950/15 border-4 border-white/90 dark:border-slate-800 bg-gradient-to-br from-emerald-100 to-teal-50 group">
              <img
                src="/src/assets/images/farmer_hero_tablet_1793081890794.jpg"
                alt="Smiling farmer holding smart tablet in lush agricultural farm field"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Bottom Left Badge: Yield Boost */}
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-white px-3.5 py-2 rounded-2xl border border-emerald-200/70 dark:border-slate-700 shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{t.yieldGainBadge}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {t.yieldGainSub}
                  </div>
                </div>
              </div>

              {/* Bottom Right Tag */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.aiConnectedFarm}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
