import React from 'react';
import { Sprout } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full bg-[#073b3a] text-white border-t border-emerald-950 mt-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        
        {/* Brand */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-white/20 transition-colors">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-white">
              HydroMind
            </div>
            <div className="text-[10px] text-emerald-300/80 font-medium tracking-wider uppercase">
              AI Farmer Assistant
            </div>
          </div>
        </button>

        {/* Center Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-emerald-100/90 font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-emerald-500/60">|</span>
          <button
            onClick={() => setActiveTab('disease-detection')}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Crop Disease Detection
          </button>
          <span className="text-emerald-500/60">|</span>
          <button
            onClick={() => setActiveTab('care-guide')}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Crop Care Guide
          </button>
          <span className="text-emerald-500/60">|</span>
          <button
            onClick={() => setActiveTab('task-planner')}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Farm Task Planner
          </button>
          <span className="text-emerald-500/60">|</span>
          <button
            onClick={() => setActiveTab('fertilizer-calc')}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Fertilizer Calculator
          </button>
          <span className="text-emerald-500/60">|</span>
          <button
            onClick={() => setActiveTab('weather-forecast')}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Weather Forecast
          </button>
          <span className="text-emerald-500/60">|</span>
          <button
            onClick={() => setActiveTab('diagnosis-history')}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Diagnosis History
          </button>
          <span className="text-emerald-500/60">|</span>
          <button
            onClick={() => setActiveTab('farmer-resources')}
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Farmer Resources
          </button>
        </div>

        {/* Right Slogan */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>Smart Farming. Brighter Future.</span>
        </div>

      </div>
    </footer>
  );
};
