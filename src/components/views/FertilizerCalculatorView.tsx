import React, { useState } from 'react';
import {
  FlaskConical,
  Scale,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Info,
  PackageCheck,
  Leaf
} from 'lucide-react';

interface FertilizerCalculatorViewProps {
  onBack: () => void;
}

export const FertilizerCalculatorView: React.FC<FertilizerCalculatorViewProps> = ({ onBack }) => {
  const [crop, setCrop] = useState<string>('Wheat');
  const [area, setArea] = useState<number>(2.5);
  const [areaUnit, setAreaUnit] = useState<'Acres' | 'Hectares'>('Acres');
  const [soilType, setSoilType] = useState<string>('Sandy Loam');
  const [stage, setStage] = useState<string>('Basal (At Sowing)');

  // Conversion factor to normalize to acres
  const acres = areaUnit === 'Hectares' ? area * 2.471 : area;

  // Agronomic N-P-K recommendation benchmarks per acre
  const cropNpkBenchmarks: Record<string, { n: number; p: number; k: number; fymTonnes: number }> = {
    Wheat: { n: 48, p: 24, k: 16, fymTonnes: 4 },
    'Rice (Paddy)': { n: 50, p: 25, k: 20, fymTonnes: 5 },
    Tomato: { n: 60, p: 40, k: 40, fymTonnes: 8 },
    Cotton: { n: 45, p: 20, k: 20, fymTonnes: 4 },
    Maize: { n: 52, p: 24, k: 20, fymTonnes: 5 },
    Potato: { n: 65, p: 45, k: 50, fymTonnes: 10 },
    Sugarcane: { n: 100, p: 35, k: 45, fymTonnes: 12 },
  };

  const currentBenchmark = cropNpkBenchmarks[crop] || { n: 45, p: 20, k: 20, fymTonnes: 4 };

  // Total pure nutrient requirements
  const totalN = Math.round(currentBenchmark.n * acres);
  const totalP = Math.round(currentBenchmark.p * acres);
  const totalK = Math.round(currentBenchmark.k * acres);

  // Fertilizer bag conversion:
  // DAP supplies 46% P2O5 and 18% N
  const dapKg = Math.round(totalP / 0.46);
  const dapBags = (dapKg / 50).toFixed(1);

  // Nitrogen from DAP
  const nFromDap = dapKg * 0.18;
  const remainingN = Math.max(0, totalN - nFromDap);

  // Urea supplies 46% N (45kg bag standard)
  const ureaKg = Math.round(remainingN / 0.46);
  const ureaBags = (ureaKg / 45).toFixed(1);

  // MOP supplies 60% K2O (50kg bag)
  const mopKg = Math.round(totalK / 0.6);
  const mopBags = (mopKg / 50).toFixed(1);

  // Organic Manure
  const totalFym = (currentBenchmark.fymTonnes * acres).toFixed(1);
  const totalVermicompost = (acres * 12).toFixed(1);

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
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Fertilizer Calculator
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scientific N-P-K recommendation and commercial bag estimator
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Input Parameters */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-purple-600" />
            <span>Farm & Crop Parameters</span>
          </h2>

          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Crop
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Wheat">Wheat</option>
              <option value="Rice (Paddy)">Rice (Paddy)</option>
              <option value="Tomato">Tomato</option>
              <option value="Cotton">Cotton</option>
              <option value="Maize">Maize</option>
              <option value="Potato">Potato</option>
              <option value="Sugarcane">Sugarcane</option>
            </select>
          </div>

          {/* Area & Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Land Area Size
              </label>
              <input
                type="number"
                min="0.25"
                max="500"
                step="0.25"
                value={area}
                onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Area Unit
              </label>
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value as 'Acres' | 'Hectares')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Acres">Acres</option>
                <option value="Hectares">Hectares</option>
              </select>
            </div>
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Soil Texture / Type
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Sandy Loam">Sandy Loam (Fast drainage, split N required)</option>
              <option value="Clay Loam">Clay Loam (High moisture retention)</option>
              <option value="Black Vertisol">Deep Black Soil (Rich in lime & iron)</option>
              <option value="Alluvial Soil">Alluvial River Basin Soil</option>
            </select>
          </div>

          {/* Growth Stage */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Application Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Basal (At Sowing)">Basal (Entire P + K + 1/3 Nitrogen at sowing)</option>
              <option value="1st Top Dressing">1st Top Dressing (Active tillering / vegetative)</option>
              <option value="2nd Top Dressing">2nd Top Dressing (Pre-flowering / panicle)</option>
            </select>
          </div>

          <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900 text-xs text-purple-900 dark:text-purple-300 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 text-purple-600 mt-0.5" />
            <p>
              Recommendations follow ICAR & State Agricultural University agronomic recommendations for {acres.toFixed(1)} acres.
            </p>
          </div>
        </div>

        {/* Right Card: Commercial Bag Output & Dosage Plan */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bags Calculation Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-purple-600" />
                <span>Commercial Fertilizer Requirement</span>
              </h2>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full border border-purple-200/60 dark:border-purple-900">
                For {area} {areaUnit} ({acres.toFixed(1)} Acres)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Urea */}
              <div className="bg-[#fcf8ff] dark:bg-slate-800/60 border border-purple-200/70 dark:border-slate-700 p-4 rounded-2xl text-center">
                <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-1">
                  Urea (46% N)
                </span>
                <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {ureaBags} <span className="text-sm font-semibold text-slate-500">Bags</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  ({ureaKg} kg total @ 45kg/bag)
                </p>
              </div>

              {/* DAP */}
              <div className="bg-[#f0fdf4] dark:bg-slate-800/60 border border-emerald-200/70 dark:border-slate-700 p-4 rounded-2xl text-center">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block mb-1">
                  DAP (18:46:0)
                </span>
                <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {dapBags} <span className="text-sm font-semibold text-slate-500">Bags</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  ({dapKg} kg total @ 50kg/bag)
                </p>
              </div>

              {/* MOP */}
              <div className="bg-[#eff6ff] dark:bg-slate-800/60 border border-sky-200/70 dark:border-slate-700 p-4 rounded-2xl text-center">
                <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider block mb-1">
                  MOP (60% K2O)
                </span>
                <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {mopBags} <span className="text-sm font-semibold text-slate-500">Bags</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  ({mopKg} kg total @ 50kg/bag)
                </p>
              </div>
            </div>

            {/* Pure Nutrient Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Pure Elemental Nutrient Breakdown:
              </span>
              <div className="flex items-center gap-6 text-slate-600 dark:text-slate-300">
                <span>
                  <strong>N (Nitrogen):</strong> {totalN} kg
                </span>
                <span>
                  <strong>P (Phosphorus):</strong> {totalP} kg
                </span>
                <span>
                  <strong>K (Potash):</strong> {totalK} kg
                </span>
              </div>
            </div>
          </div>

          {/* Organic Soil Enrichers */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-emerald-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Organic Soil Nutrition Alternatives</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-0.5">
                  Farm Yard Manure (FYM)
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Apply <strong>{totalFym} tonnes</strong> during final field preparation 15-20 days prior to sowing.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-0.5">
                  Vermicompost
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Or apply <strong>{totalVermicompost} quintals</strong> enriched with bio-fertilizers (Azotobacter / PSB).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
