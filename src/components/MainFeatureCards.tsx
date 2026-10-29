import React from 'react';
import {
  ScanSearch,
  Sprout,
  CalendarDays,
  FlaskConical,
  History,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { NavTab, Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface MainFeatureCardsProps {
  onSelectTab: (tab: NavTab) => void;
  language: Language;
}

interface FeatureCardConfig {
  id: NavTab;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  cardGradient: string;
  cardBorder: string;
  iconBg: string;
  iconColor: string;
  buttonBg: string;
  buttonHoverBg: string;
  badgeBg: string;
  badgeColor: string;
}

export const MainFeatureCards: React.FC<MainFeatureCardsProps> = ({ onSelectTab, language }) => {
  const t = TRANSLATIONS[language];

  const cards: FeatureCardConfig[] = [
    {
      id: 'disease-detection',
      title: t.cardDiseaseTitle,
      badge: t.cardDiseaseBadge,
      description: t.cardDiseaseDesc,
      icon: <ScanSearch className="w-7 h-7" />,
      cardGradient: 'from-emerald-50/90 via-[#eef9f3] to-[#e6f6ee] dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/20',
      cardBorder: 'border-emerald-200/80 dark:border-emerald-900/40 hover:border-emerald-400 dark:hover:border-emerald-600',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/50 shadow-emerald-500/10',
      iconColor: 'text-[#0b5c46] dark:text-emerald-300',
      buttonBg: 'bg-[#0b5c46]',
      buttonHoverBg: 'hover:bg-[#084534]',
      badgeBg: 'bg-emerald-200/70 dark:bg-emerald-900/60',
      badgeColor: 'text-emerald-800 dark:text-emerald-200',
    },
    {
      id: 'care-guide',
      title: t.cardCareTitle,
      badge: t.cardCareBadge,
      description: t.cardCareDesc,
      icon: <Sprout className="w-7 h-7" />,
      cardGradient: 'from-amber-50/90 via-[#fef9f0] to-[#fcf2df] dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-950/20',
      cardBorder: 'border-amber-200/80 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-600',
      iconBg: 'bg-amber-100 dark:bg-amber-900/50 shadow-amber-500/10',
      iconColor: 'text-[#b45309] dark:text-amber-300',
      buttonBg: 'bg-[#d97706]',
      buttonHoverBg: 'hover:bg-[#b45309]',
      badgeBg: 'bg-amber-200/70 dark:bg-amber-900/60',
      badgeColor: 'text-amber-800 dark:text-amber-200',
    },
    {
      id: 'task-planner',
      title: t.cardTaskTitle,
      badge: t.cardTaskBadge,
      description: t.cardTaskDesc,
      icon: <CalendarDays className="w-7 h-7" />,
      cardGradient: 'from-sky-50/90 via-[#f0f8ff] to-[#e4f2fe] dark:from-sky-950/30 dark:via-slate-900 dark:to-sky-950/20',
      cardBorder: 'border-sky-200/80 dark:border-sky-900/40 hover:border-sky-400 dark:hover:border-sky-600',
      iconBg: 'bg-sky-100 dark:bg-sky-900/50 shadow-sky-500/10',
      iconColor: 'text-[#0284c7] dark:text-sky-300',
      buttonBg: 'bg-[#0284c7]',
      buttonHoverBg: 'hover:bg-[#0369a1]',
      badgeBg: 'bg-sky-200/70 dark:bg-sky-900/60',
      badgeColor: 'text-sky-800 dark:text-sky-200',
    },
    {
      id: 'fertilizer-calc',
      title: t.cardFertilizerTitle,
      badge: t.cardFertilizerBadge,
      description: t.cardFertilizerDesc,
      icon: <FlaskConical className="w-7 h-7" />,
      cardGradient: 'from-purple-50/90 via-[#f9f4fd] to-[#f1e6fb] dark:from-purple-950/30 dark:via-slate-900 dark:to-purple-950/20',
      cardBorder: 'border-purple-200/80 dark:border-purple-900/40 hover:border-purple-400 dark:hover:border-purple-600',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50 shadow-purple-500/10',
      iconColor: 'text-[#7e22ce] dark:text-purple-300',
      buttonBg: 'bg-[#7e22ce]',
      buttonHoverBg: 'hover:bg-[#6b21a8]',
      badgeBg: 'bg-purple-200/70 dark:bg-purple-900/60',
      badgeColor: 'text-purple-800 dark:text-purple-200',
    },
    {
      id: 'diagnosis-history',
      title: t.cardHistoryTitle,
      badge: t.cardHistoryBadge,
      description: t.cardHistoryDesc,
      icon: <History className="w-7 h-7" />,
      cardGradient: 'from-teal-50/90 via-[#f0fbf9] to-[#e4f7f4] dark:from-teal-950/30 dark:via-slate-900 dark:to-teal-950/20',
      cardBorder: 'border-teal-200/80 dark:border-teal-900/40 hover:border-teal-400 dark:hover:border-teal-600',
      iconBg: 'bg-teal-100 dark:bg-teal-900/50 shadow-teal-500/10',
      iconColor: 'text-[#0f766e] dark:text-teal-300',
      buttonBg: 'bg-[#0f766e]',
      buttonHoverBg: 'hover:bg-[#115e59]',
      badgeBg: 'bg-teal-200/70 dark:bg-teal-900/60',
      badgeColor: 'text-teal-800 dark:text-teal-200',
    },
    {
      id: 'farmer-resources',
      title: t.cardResourcesTitle,
      badge: t.cardResourcesBadge,
      description: t.cardResourcesDesc,
      icon: <BookOpen className="w-7 h-7" />,
      cardGradient: 'from-rose-50/90 via-[#fdf2f4] to-[#fce5ea] dark:from-rose-950/30 dark:via-slate-900 dark:to-rose-950/20',
      cardBorder: 'border-rose-200/80 dark:border-rose-900/40 hover:border-rose-400 dark:hover:border-rose-600',
      iconBg: 'bg-rose-100 dark:bg-rose-900/50 shadow-rose-500/10',
      iconColor: 'text-[#e11d48] dark:text-rose-300',
      buttonBg: 'bg-[#e11d48]',
      buttonHoverBg: 'hover:bg-[#be123c]',
      badgeBg: 'bg-rose-200/70 dark:bg-rose-900/60',
      badgeColor: 'text-rose-800 dark:text-rose-200',
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>{t.featureHeaderTitle}</span>
            <Sparkles className="w-5 h-5 text-emerald-500" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.featureHeaderSub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectTab(card.id)}
            className={`bg-gradient-to-b ${card.cardGradient} rounded-3xl p-5 sm:p-5 flex flex-col items-center text-center justify-between border ${card.cardBorder} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden`}
          >
            {/* Top feature tag */}
            <div className="w-full flex justify-end mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeBg} ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>

            {/* Round Icon Badge */}
            <div
              className={`w-15 h-15 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center mb-3.5 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
            >
              {card.icon}
            </div>

            {/* Title & Description */}
            <div className="flex-1 flex flex-col justify-start mb-4">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-1.5 leading-snug">
                {card.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {card.description}
              </p>
            </div>

            {/* Go Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectTab(card.id);
              }}
              className={`${card.buttonBg} ${card.buttonHoverBg} text-white text-xs font-bold px-5 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all group-hover:gap-2 active:scale-95 cursor-pointer`}
            >
              <span>{t.cardGo}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
