import React, { useState } from 'react';
import {
  Sprout,
  Search,
  Droplets,
  Sun,
  Timer,
  Layers,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { CROP_GUIDES } from '../../data/mockData';
import { CropGuideItem } from '../../types';

interface CropCareGuideViewProps {
  onBack: () => void;
}

export const CropCareGuideView: React.FC<CropCareGuideViewProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCropId, setExpandedCropId] = useState<string | null>('crop-tomato');

  const categories = ['All', 'Cereals', 'Vegetables', 'Cash Crops'];

  const filteredCrops = CROP_GUIDES.filter((crop) => {
    const matchesCategory =
      selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedCropId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-emerald-100 dark:border-slate-800">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5c46] dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Crop Care Guide
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Agronomic best practices, watering schedules, and soil care
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop or disease..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-[#d97706] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-amber-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCrops.map((crop: CropGuideItem) => {
          const isExpanded = expandedCropId === crop.id;

          return (
            <div
              key={crop.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-100/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md"
            >
              {/* Card Header & Summary */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-2xs border border-amber-200/50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                          {crop.name}
                        </h2>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40">
                          {crop.category}
                        </span>
                      </div>
                      <p className="text-xs italic text-slate-500 dark:text-slate-400">
                        {crop.scientificName}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(crop.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Expand details"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {crop.description}
                </p>

                {/* Agronomic specs grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                      <Droplets className="w-3 h-3 text-sky-500" />
                      <span>Water</span>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{crop.waterNeed}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                      <Sun className="w-3 h-3 text-amber-500" />
                      <span>Sunlight</span>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{crop.sunlight}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                      <Layers className="w-3 h-3 text-emerald-500" />
                      <span>Soil pH</span>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{crop.soilPh}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                      <Timer className="w-3 h-3 text-purple-500" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{crop.harvestDuration}</span>
                  </div>
                </div>
              </div>

              {/* Expandable Stage by Stage Guidance */}
              {isExpanded && (
                <div className="bg-[#fefaf3] dark:bg-slate-950/60 p-6 border-t border-amber-100 dark:border-slate-800 animate-in fade-in space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4" />
                    <span>Stage-by-Stage Agronomic Plan</span>
                  </h4>

                  <div className="space-y-3">
                    {crop.stages.map((st, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-amber-200/50 dark:border-slate-800 text-xs shadow-2xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {st.stage}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mb-2">
                          <strong className="text-slate-800 dark:text-slate-200">Action:</strong> {st.action}
                        </p>
                        <div className="inline-block bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-emerald-200/60 dark:border-emerald-800">
                          Fertilizer: {st.fertilizer}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Common Pests */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      <span>Key Pests & Pathogens to Monitor</span>
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {crop.keyPests.map((pest, pIndex) => (
                        <span
                          key={pIndex}
                          className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-lg text-xs font-medium border border-rose-200/60 dark:border-rose-900"
                        >
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
