import React from 'react';
import { Quote, Sparkles, Shield, HeartHandshake } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface MissionBannerProps {
  language: Language;
}

export const MissionBanner: React.FC<MissionBannerProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#e5f6ee] via-[#f2faf5] to-[#ebf7f1] dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-emerald-200/70 dark:border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Left side: Plant art + Mission text */}
        <div className="flex items-center gap-5 sm:gap-6 max-w-2xl relative z-10">
          {/* Stylized Plant Graphic */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-700/25 ring-2 ring-emerald-400/30">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 0 0-4 19.2V22h8v-.8A10 10 0 0 0 12 2Z" fill="currentColor" fillOpacity="0.25" />
              <path d="M12 2v20" />
              <path d="M8.5 7.5A5.5 5.5 0 0 1 12 13a5.5 5.5 0 0 1-3.5 5.5" />
              <path d="M15.5 7.5A5.5 5.5 0 0 0 12 13a5.5 5.5 0 0 0 3.5 5.5" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                {t.ourMissionTitle}
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Farmer-First
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t.ourMissionText}
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> {t.freeForSmallholders}
              </span>
              <span className="inline-flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" /> {t.agronomistVerified}
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Editorial Quote */}
        <div className="flex items-start gap-3 bg-white/85 dark:bg-slate-800/85 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-emerald-200/80 dark:border-slate-700 shrink-0 self-stretch md:self-auto justify-center shadow-sm relative z-10">
          <Quote className="w-7 h-7 text-emerald-600 dark:text-emerald-400 rotate-180 shrink-0" />
          <div className="italic text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 leading-snug">
            {t.quoteText}
          </div>
        </div>

      </div>
    </section>
  );
};
