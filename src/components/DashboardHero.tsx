import React from 'react';
import { Camera, UploadCloud, Sprout, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CropType } from '../types';

interface DashboardHeroProps {
  onScanClick: () => void;
  onUploadClick: () => void;
  selectedCrop: CropType;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  onScanClick,
  onUploadClick,
  selectedCrop,
}) => {
  const { t, getCropName } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-green-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl">
      {/* Decorative leaf watermarks */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-700/20 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-green-500/10 blur-xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-6">
        {/* Selected Crop Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-emerald-200">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>Active Crop: <strong className="text-white font-extrabold">{getCropName(selectedCrop)}</strong></span>
        </div>

        {/* Hero Title and Subtitle */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {t.hero.title}
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Farmer-Friendly Large Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
          {/* Scan Plant (Camera) */}
          <button
            onClick={onScanClick}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white text-emerald-950 font-extrabold text-base sm:text-lg shadow-lg hover:bg-emerald-50 active:scale-98 transition-all cursor-pointer group"
          >
            <Camera className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform" />
            <span>{t.hero.scanBtn}</span>
          </button>

          {/* Upload Image */}
          <button
            onClick={onUploadClick}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-base sm:text-lg border border-white/20 backdrop-blur-md active:scale-98 transition-all cursor-pointer group"
          >
            <UploadCloud className="w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform" />
            <span>{t.hero.uploadBtn}</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-200/80">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            PlantVillage 54,000+ leaf dataset
          </span>
          <span>•</span>
          <span>Tomato, Potato, Corn</span>
          <span>•</span>
          <span className="text-emerald-300 font-bold">🌿 Leaf-Only Scanner (Other Objects Rejected)</span>
          <span>•</span>
          <span>English · తెలుగు · हिन्दी</span>
        </div>
      </div>
    </div>
  );
};
