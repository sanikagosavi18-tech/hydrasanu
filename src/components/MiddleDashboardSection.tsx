import React from 'react';
import {
  Sprout,
  ScanSearch,
  CalendarDays,
  FlaskConical,
  History,
  BookOpen,
  Zap,
  TrendingUp,
  Users,
  ChevronRight,
  ArrowRight,
  Leaf,
  CloudSun,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { NavTab, AgroWeatherData, Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface MiddleDashboardSectionProps {
  onSelectTab: (tab: NavTab) => void;
  weather?: AgroWeatherData;
  language: Language;
}

export const MiddleDashboardSection: React.FC<MiddleDashboardSectionProps> = ({
  onSelectTab,
  weather,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (4 cols on lg): Latest Features Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-emerald-100/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-[#0b5c46] dark:text-emerald-400 flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                    {t.latestFeaturesTitle}
                  </h3>
                  <p className="text-[11px] text-slate-400">Regularly updated agronomy tools</p>
                </div>
              </div>
              <button
                onClick={() => onSelectTab('care-guide')}
                className="text-xs font-bold text-[#0b5c46] dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{t.viewAll}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List Items */}
            <div className="space-y-3">
              {/* Feature 1 */}
              <button
                onClick={() => onSelectTab('disease-detection')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-emerald-50/70 dark:hover:bg-slate-800/80 transition-all text-left group border border-transparent hover:border-emerald-200 dark:hover:border-slate-700 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ScanSearch className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0b5c46] dark:group-hover:text-emerald-400 transition-colors">
                        {t.cardDiseaseTitle}
                      </h4>
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {t.cardDiseaseBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.cardDiseaseDesc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Feature 2 */}
              <button
                onClick={() => onSelectTab('care-guide')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-amber-50/70 dark:hover:bg-slate-800/80 transition-all text-left group border border-transparent hover:border-amber-200 dark:hover:border-slate-700 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        {t.cardCareTitle}
                      </h4>
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        {t.cardCareBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.cardCareDesc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600 dark:text-amber-400 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Feature 3 */}
              <button
                onClick={() => onSelectTab('task-planner')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-sky-50/70 dark:hover:bg-slate-800/80 transition-all text-left group border border-transparent hover:border-sky-200 dark:hover:border-slate-700 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                        {t.cardTaskTitle}
                      </h4>
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                        {t.cardTaskBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.cardTaskDesc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-sky-600 dark:text-sky-400 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Feature 4 */}
              <button
                onClick={() => onSelectTab('fertilizer-calc')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-purple-50/70 dark:hover:bg-slate-800/80 transition-all text-left group border border-transparent hover:border-purple-200 dark:hover:border-slate-700 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                        {t.cardFertilizerTitle}
                      </h4>
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                        {t.cardFertilizerBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.cardFertilizerDesc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Column (5 cols on lg): AI Smarter Decisions Banner + 3 Bottom Highlights */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Top Banner Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#073629] via-[#094535] to-[#0d5945] dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 text-white p-7 sm:p-8 flex flex-col justify-between min-h-[300px] shadow-xl border border-emerald-700/40">
            {/* Background Image of AI Leaf with Neural Net */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-5/12 overflow-hidden opacity-90 pointer-events-none">
              <img
                src="/src/assets/images/smart_crop_leaf_ai_1793081890937.jpg"
                alt="AI Glowing Leaf"
                className="w-full h-full object-cover object-center scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#073629] via-[#073629]/75 to-transparent dark:from-slate-950 dark:via-slate-950/70" />
            </div>

            {/* Neural status pill */}
            <div className="relative z-10 flex items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{t.engineActiveBadge}</span>
              </div>
            </div>

            {/* Left Content in Banner */}
            <div className="relative z-10 max-w-[65%] sm:max-w-[62%]">
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2.5 drop-shadow-sm">
                {t.smarterDecisionsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal mb-5">
                {t.smarterDecisionsSub}
              </p>

              <button
                onClick={() => onSelectTab('disease-detection')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-950/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t.smarterDecisionsCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Row: 3 Highlight Cards with richer look */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4 text-center border border-emerald-100/80 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 shadow-2xs">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                {t.healthyCropsHighlight}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Zero crop loss</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4 text-center border border-emerald-100/80 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 shadow-2xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                {t.betterYieldsHighlight}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">+28% gain</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4 text-center border border-emerald-100/80 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                {t.thrivingFarmersHighlight}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Empowered daily</span>
            </div>
          </div>
        </div>

        {/* Right Column (3 cols on lg): Quick Access Card */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-emerald-100/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-sky-500" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                    {t.quickAccessTitle}
                  </h3>
                  <p className="text-[11px] text-slate-400">Direct launch buttons</p>
                </div>
              </div>

              {weather && (
                <button
                  onClick={() => onSelectTab('weather-forecast')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 text-[11px] font-bold border border-sky-200 dark:border-sky-800 hover:bg-sky-100 transition-colors cursor-pointer"
                  title="Open live Agro-Weather forecast"
                >
                  <CloudSun className="w-3.5 h-3.5 text-sky-500" />
                  <span className="truncate max-w-[65px]">{weather.locationName}</span>
                  <span className="tabular-nums font-bold">{weather.current.temp}°C</span>
                </button>
              )}
            </div>

            {/* 2x3 Grid with elevated buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Button 1 */}
              <button
                onClick={() => onSelectTab('disease-detection')}
                className="p-3.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/90 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50 border border-emerald-200/80 dark:border-emerald-800/40 flex flex-col items-center justify-center text-center transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-200/60 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <ScanSearch className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 line-clamp-1">
                  {t.cardDiseaseTitle}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{t.cardDiseaseBadge}</span>
              </button>

              {/* Button 2 */}
              <button
                onClick={() => onSelectTab('care-guide')}
                className="p-3.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/90 dark:bg-amber-950/30 dark:hover:bg-amber-900/50 border border-amber-200/80 dark:border-amber-800/40 flex flex-col items-center justify-center text-center transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-200/60 dark:bg-amber-800/60 text-amber-800 dark:text-amber-200 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <Sprout className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 line-clamp-1">
                  {t.cardCareTitle}
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400">{t.cardCareBadge}</span>
              </button>

              {/* Button 3 */}
              <button
                onClick={() => onSelectTab('task-planner')}
                className="p-3.5 rounded-2xl bg-sky-50/70 hover:bg-sky-100/90 dark:bg-sky-950/30 dark:hover:bg-sky-900/50 border border-sky-200/80 dark:border-sky-800/40 flex flex-col items-center justify-center text-center transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-200/60 dark:bg-sky-800/60 text-sky-800 dark:text-sky-200 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-sky-900 dark:text-sky-200 line-clamp-1">
                  {t.cardTaskTitle}
                </span>
                <span className="text-[10px] text-sky-600 dark:text-sky-400">{t.cardTaskBadge}</span>
              </button>

              {/* Button 4 */}
              <button
                onClick={() => onSelectTab('fertilizer-calc')}
                className="p-3.5 rounded-2xl bg-purple-50/70 hover:bg-purple-100/90 dark:bg-purple-950/30 dark:hover:bg-purple-900/50 border border-purple-200/80 dark:border-purple-800/40 flex flex-col items-center justify-center text-center transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-200/60 dark:bg-purple-800/60 text-purple-800 dark:text-purple-200 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200 line-clamp-1">
                  {t.cardFertilizerTitle}
                </span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400">{t.cardFertilizerBadge}</span>
              </button>

              {/* Button 5 */}
              <button
                onClick={() => onSelectTab('diagnosis-history')}
                className="p-3.5 rounded-2xl bg-teal-50/70 hover:bg-teal-100/90 dark:bg-teal-950/30 dark:hover:bg-teal-900/50 border border-teal-200/80 dark:border-teal-800/40 flex flex-col items-center justify-center text-center transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-200/60 dark:bg-teal-800/60 text-teal-800 dark:text-teal-200 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <History className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-teal-900 dark:text-teal-200 line-clamp-1">
                  {t.cardHistoryTitle}
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400">{t.cardHistoryBadge}</span>
              </button>

              {/* Button 6 */}
              <button
                onClick={() => onSelectTab('farmer-resources')}
                className="p-3.5 rounded-2xl bg-rose-50/70 hover:bg-rose-100/90 dark:bg-rose-950/30 dark:hover:bg-rose-900/50 border border-rose-200/80 dark:border-rose-800/40 flex flex-col items-center justify-center text-center transition-all group cursor-pointer shadow-2xs hover:scale-[1.02]"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-200/60 dark:bg-rose-800/60 text-rose-800 dark:text-rose-200 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-rose-900 dark:text-rose-200 line-clamp-1">
                  {t.cardResourcesTitle}
                </span>
                <span className="text-[10px] text-rose-600 dark:text-rose-400">{t.cardResourcesBadge}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
