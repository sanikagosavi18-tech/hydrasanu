import React, { useState } from 'react';
import {
  CloudSun,
  MapPin,
  Navigation,
  Droplets,
  Wind,
  Thermometer,
  CloudRain,
  Sun,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Calendar,
  Sparkles,
  Search
} from 'lucide-react';
import { AgroWeatherData } from '../../types';
import { AGRICULTURAL_HUBS } from '../../services/weatherService';

interface WeatherForecastViewProps {
  weather: AgroWeatherData;
  onDetectLocation: () => Promise<void>;
  onSelectHub: (hub: typeof AGRICULTURAL_HUBS[0]) => Promise<void>;
  isDetecting: boolean;
  onBack: () => void;
  locationStatus?: string | null;
}

export const WeatherForecastView: React.FC<WeatherForecastViewProps> = ({
  weather,
  onDetectLocation,
  onSelectHub,
  isDetecting,
  onBack,
  locationStatus,
}) => {
  const [selectedHubIndex, setSelectedHubIndex] = useState<number>(0);
  const [hubSearch, setHubSearch] = useState('');

  const filteredHubs = AGRICULTURAL_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(hubSearch.toLowerCase()) ||
      h.state.toLowerCase().includes(hubSearch.toLowerCase()) ||
      h.region.toLowerCase().includes(hubSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Header & Breadcrumb */}
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
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 flex items-center justify-center">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Agro-Weather Forecast & Location Detection
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hyper-local meteorological data for spray scheduling, irrigation, and disease prevention
              </p>
            </div>
          </div>
        </div>

        {/* GPS Auto-Detect Location Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onDetectLocation}
            disabled={isDetecting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {isDetecting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Locating Farm via GPS...</span>
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4" />
                <span>Detect My Location</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Geolocation Status Feedback Toast */}
      {locationStatus && (
        <div className="mb-6 p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs font-medium text-sky-800 dark:text-sky-300 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{locationStatus}</span>
        </div>
      )}

      {/* Main Grid: Live Station on Top/Left, Hub Selector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Left Column (8 cols): Current Weather Station Card */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#075985] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col justify-between">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sky-100 text-xs font-semibold mb-2">
                <MapPin className="w-3.5 h-3.5 text-sky-300" />
                <span>{weather.locationName}, {weather.stateOrCountry}</span>
              </div>
              <p className="text-[11px] text-sky-200 font-mono">
                Coordinates: {weather.latitude.toFixed(4)}° N, {weather.longitude.toFixed(4)}° E
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-sky-200 block">Current Status</span>
              <span className="text-sm font-bold text-white">{weather.current.weatherDescription}</span>
            </div>
          </div>

          {/* Temperature & Main Display */}
          <div className="flex flex-wrap items-baseline gap-4 mb-8">
            <span className="text-6xl sm:text-7xl font-black tracking-tight tabular-nums">
              {weather.current.temp}°C
            </span>
            <div className="space-y-0.5">
              <p className="text-xs text-sky-100 font-medium">
                Feels like {weather.current.apparentTemp}°C
              </p>
              <p className="text-xs text-sky-200">
                Today: Max {weather.daily[0]?.maxTemp}°C · Min {weather.daily[0]?.minTemp}°C
              </p>
            </div>
          </div>

          {/* 4 Agricultural Primary Sensor Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-center p-2">
              <Droplets className="w-5 h-5 mx-auto mb-1 text-sky-200" />
              <span className="text-[11px] text-sky-200 block">Relative Humidity</span>
              <span className="text-base font-bold tabular-nums">{weather.current.humidity}%</span>
            </div>

            <div className="text-center p-2">
              <Wind className="w-5 h-5 mx-auto mb-1 text-sky-200" />
              <span className="text-[11px] text-sky-200 block">Wind Speed</span>
              <span className="text-base font-bold tabular-nums">{weather.current.windSpeed} km/h</span>
            </div>

            <div className="text-center p-2">
              <Thermometer className="w-5 h-5 mx-auto mb-1 text-sky-200" />
              <span className="text-[11px] text-sky-200 block">Root Soil Temp</span>
              <span className="text-base font-bold tabular-nums">{weather.current.soilTemp}°C</span>
            </div>

            <div className="text-center p-2">
              <CloudRain className="w-5 h-5 mx-auto mb-1 text-sky-200" />
              <span className="text-[11px] text-sky-200 block">Precipitation</span>
              <span className="text-base font-bold tabular-nums">{weather.daily[0]?.rainProbability}% rain</span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Agricultural Hub Selector */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-sky-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Agricultural Hubs</span>
              </h3>
              <span className="text-[10px] text-slate-400">Major Farm Zones</span>
            </div>

            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search district or state..."
                value={hubSearch}
                onChange={(e) => setHubSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
              {filteredHubs.map((hub, idx) => {
                const isSelected = weather.locationName === hub.name;
                return (
                  <button
                    key={hub.name}
                    onClick={() => {
                      setSelectedHubIndex(idx);
                      onSelectHub(hub);
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#0284c7] bg-sky-50 dark:bg-sky-950/40 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-sky-300 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {hub.name}, {hub.state}
                      </p>
                      <p className="text-[10px] text-slate-400 font-normal">
                        Key crops: {hub.region}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Smart Agricultural Advisory Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-emerald-100 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Smart Agronomic Weather Advisory for {weather.locationName}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Spray condition */}
          <div
            className={`p-4 rounded-2xl border ${
              weather.advisory.sprayCondition === 'Optimal'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                : weather.advisory.sprayCondition === 'Caution'
                ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Spraying Suitability
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  weather.advisory.sprayCondition === 'Optimal'
                    ? 'bg-emerald-600 text-white'
                    : weather.advisory.sprayCondition === 'Caution'
                    ? 'bg-amber-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {weather.advisory.sprayCondition}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {weather.advisory.sprayMessage}
            </p>
          </div>

          {/* Card 2: Fungal Disease Risk */}
          <div
            className={`p-4 rounded-2xl border ${
              weather.advisory.diseaseRisk === 'High'
                ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
                : weather.advisory.diseaseRisk === 'Moderate'
                ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
                : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Fungal Disease Threat
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  weather.advisory.diseaseRisk === 'High'
                    ? 'bg-rose-600 text-white'
                    : weather.advisory.diseaseRisk === 'Moderate'
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {weather.advisory.diseaseRisk} Risk
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {weather.advisory.diseaseRiskMessage}
            </p>
          </div>

          {/* Card 3: Irrigation Guidance */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Irrigation Advisory
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white">
                Moisture Management
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {weather.advisory.irrigationAdvisory}
            </p>
          </div>

          {/* Card 4: Harvesting & Drying */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Harvesting & Drying
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white">
                Field Operation
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {weather.advisory.harvestingAdvice}
            </p>
          </div>

        </div>
      </div>

      {/* 24-Hour Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-600" />
          <span>24-Hour Farm Activity Window & Weather Timeline</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {weather.hourly.map((h, i) => (
            <div
              key={i}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-slate-500 block mb-1">{h.time}</span>
              <span className="text-lg font-black text-slate-900 dark:text-white my-1 tabular-nums">
                {h.temp}°C
              </span>
              <div className="text-[10px] space-y-0.5 text-slate-500">
                <span className="flex items-center justify-center gap-1 text-sky-600 font-semibold">
                  <CloudRain className="w-3 h-3" />
                  <span>{h.rainProbability}%</span>
                </span>
                <span>{h.windSpeed} km/h wind</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Day-by-Day Forecast */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" />
          <span>7-Day Agricultural Weather Outlook</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {weather.daily.map((d, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border text-center flex flex-col justify-between transition-all ${
                i === 0
                  ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700 shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
                  {d.dayName}
                </span>
                <span className="text-[10px] text-slate-400 block mb-2">{d.date}</span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {d.description}
                </p>
              </div>

              <div className="my-2">
                <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
                  {d.maxTemp}°
                </span>
                <span className="text-xs text-slate-400 ml-1">/ {d.minTemp}°</span>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[11px] font-semibold text-sky-600 flex items-center justify-center gap-1">
                <CloudRain className="w-3.5 h-3.5" />
                <span>{d.rainProbability}% Rain</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
