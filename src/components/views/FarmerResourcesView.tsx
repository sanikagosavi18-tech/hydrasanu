import React, { useState } from 'react';
import {
  BookOpen,
  CloudSun,
  PhoneCall,
  ExternalLink,
  ArrowLeft,
  Coins,
  TrendingUp,
  TrendingDown,
  Minus,
  Landmark,
  ShieldAlert,
  Wind,
  Droplets,
  Thermometer
} from 'lucide-react';
import { MANDI_PRICES, FARMER_SCHEMES } from '../../data/mockData';
import { AgroWeatherData } from '../../types';

interface FarmerResourcesViewProps {
  onBack: () => void;
  weather?: AgroWeatherData;
  onDetectLocation?: () => Promise<void>;
  isDetecting?: boolean;
  onOpenWeatherView?: () => void;
}

export const FarmerResourcesView: React.FC<FarmerResourcesViewProps> = ({
  onBack,
  weather,
  onDetectLocation,
  isDetecting,
  onOpenWeatherView,
}) => {
  const [activeTab, setActiveTab] = useState<'mandi' | 'schemes' | 'weather' | 'helpline'>('mandi');
  const [mandiFilter, setMandiFilter] = useState('');

  const filteredMandi = MANDI_PRICES.filter(
    (item) =>
      item.commodity.toLowerCase().includes(mandiFilter.toLowerCase()) ||
      item.market.toLowerCase().includes(mandiFilter.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
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
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Farmer Resources & Advisory
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Market rates (Mandi), government schemes, agro-weather, and expert support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        <button
          onClick={() => setActiveTab('mandi')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'mandi'
              ? 'bg-[#e11d48] text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>APMC Mandi Rates</span>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'weather'
              ? 'bg-[#e11d48] text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
          }`}
        >
          <CloudSun className="w-4 h-4" />
          <span>Agro-Weather Advisory</span>
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'schemes'
              ? 'bg-[#e11d48] text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Government Schemes</span>
        </button>

        <button
          onClick={() => setActiveTab('helpline')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'helpline'
              ? 'bg-[#e11d48] text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Expert Helplines</span>
        </button>
      </div>

      {/* Tab 1: Mandi Prices */}
      {activeTab === 'mandi' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-rose-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Live Agricultural APMC Price Rates
              </h3>
              <p className="text-xs text-slate-500">
                Official daily market arrival rates updated for agricultural trading
              </p>
            </div>
            <input
              type="text"
              placeholder="Filter commodity or market..."
              value={mandiFilter}
              onChange={(e) => setMandiFilter(e.target.value)}
              className="px-4 py-1.5 rounded-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMandi.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-rose-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.commodity}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {item.variety} · {item.market}, {item.state}
                    </span>
                  </div>

                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                      item.trend === 'up'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : item.trend === 'down'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : item.trend === 'down' ? (
                      <TrendingDown className="w-3.5 h-3.5" />
                    ) : (
                      <Minus className="w-3.5 h-3.5" />
                    )}
                    <span className="capitalize">{item.trend}</span>
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Modal Price:</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
                      ₹{item.modalPrice}
                    </span>
                    <span className="text-xs text-slate-500 block -mt-1">{item.unit}</span>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-slate-400 flex justify-between">
                  <span>Min: ₹{item.minPrice}</span>
                  <span>Max: ₹{item.maxPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Agro Weather */}
      {activeTab === 'weather' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#075985] text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    Live Farm Weather Station
                  </span>
                  {weather && (
                    <span className="bg-emerald-400/20 text-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-300/30">
                      📍 {weather.locationName}, {weather.stateOrCountry}
                    </span>
                  )}
                </div>

                <h3 className="text-3xl sm:text-4xl font-black mb-1 tabular-nums">
                  {weather ? `${weather.current.temp}°C · ${weather.current.weatherDescription}` : '26°C · Partly Sunny'}
                </h3>
                <p className="text-xs text-sky-100 max-w-xl">
                  {weather ? weather.advisory.sprayMessage : 'Ideal conditions for field operations and spray applications today.'}
                </p>

                {onDetectLocation && (
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={onDetectLocation}
                      disabled={isDetecting}
                      className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                    >
                      <span>{isDetecting ? 'Detecting Location...' : '📍 Detect My GPS Location'}</span>
                    </button>
                    {onOpenWeatherView && (
                      <button
                        onClick={onOpenWeatherView}
                        className="px-4 py-1.5 rounded-full bg-white text-sky-900 text-xs font-bold transition-all hover:bg-sky-50 shadow-xs cursor-pointer"
                      >
                        <span>View 7-Day Forecast & Advisory →</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center self-stretch md:self-auto border border-white/10">
                <div>
                  <Droplets className="w-5 h-5 mx-auto mb-1 text-sky-200" />
                  <span className="text-[11px] text-sky-200 block">Humidity</span>
                  <span className="text-base font-bold tabular-nums">
                    {weather ? `${weather.current.humidity}%` : '58%'}
                  </span>
                </div>
                <div>
                  <Wind className="w-5 h-5 mx-auto mb-1 text-sky-200" />
                  <span className="text-[11px] text-sky-200 block">Wind Speed</span>
                  <span className="text-base font-bold tabular-nums">
                    {weather ? `${weather.current.windSpeed} km/h` : '8 km/h'}
                  </span>
                </div>
                <div>
                  <Thermometer className="w-5 h-5 mx-auto mb-1 text-sky-200" />
                  <span className="text-[11px] text-sky-200 block">Root Soil Temp</span>
                  <span className="text-base font-bold tabular-nums">
                    {weather ? `${weather.current.soilTemp}°C` : '23°C'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                Spraying Advisory: {weather ? weather.advisory.sprayCondition : 'Favorable'}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {weather ? weather.advisory.sprayMessage : 'Wind speeds below 12 km/h. Best spraying window: 7:00 AM – 10:30 AM before direct noon heat.'}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-400 block mb-1">
                Irrigation Recommendation
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {weather ? weather.advisory.irrigationAdvisory : 'No major precipitation forecast for next 48 hours. Light furrow irrigation advised for vegetables.'}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-1">
                Harvesting & Drying
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {weather ? weather.advisory.harvestingAdvice : 'Sunny afternoon hours are optimal for paddy threshed grain open sun-drying.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Government Schemes */}
      {activeTab === 'schemes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FARMER_SCHEMES.map((sch) => (
            <div
              key={sch.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-rose-100 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                    {sch.category}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {sch.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {sch.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Key Benefit:</span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {sch.benefit}
                  </span>
                </div>

                <a
                  href={sch.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e11d48] hover:underline"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Expert Helpline */}
      {activeTab === 'helpline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#0b5c46] flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Kisan Call Center (KCC)
                </h4>
                <p className="text-xs text-slate-500">Government 24x7 Toll-Free Agri-Advisory</p>
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl mb-3">
              <p className="text-2xl font-black text-[#0b5c46] dark:text-emerald-400 tabular-nums">
                1800-180-1551
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
                Free calling in 22 regional Indian languages (Hindi, Marathi, Telugu, Tamil, Gujarati, etc.)
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Speak directly with agricultural scientists regarding seed rates, pests, disease control, and weather advisories.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Krishi Vigyan Kendra (KVK) Network
                </h4>
                <p className="text-xs text-slate-500">District Agricultural Research Center</p>
              </div>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-2xl mb-3">
              <p className="text-base font-bold text-rose-900 dark:text-rose-300">
                Over 730+ KVK Centers Nationwide
              </p>
              <p className="text-xs text-rose-700 dark:text-rose-400 mt-1">
                Providing local soil tests, demonstration plots, and disease testing labs.
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Bring physical plant leaf or soil samples to your local KVK for verified lab testing and agronomist consultation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
