import React from 'react';
import { Check } from 'lucide-react';
import { CropType } from '../types';
import { CROPS_METADATA } from '../data/plantVillageData';
import { useLanguage } from '../context/LanguageContext';

interface CropSelectorProps {
  selectedCrop: CropType;
  onSelectCrop: (crop: CropType) => void;
  disabled?: boolean;
}

export const CropSelector: React.FC<CropSelectorProps> = ({
  selectedCrop,
  onSelectCrop,
  disabled = false,
}) => {
  const { language, t } = useLanguage();
  const crops: CropType[] = ['Tomato', 'Potato', 'Corn'];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {t.hero.selectCropTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.hero.selectCropSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {crops.map((crop) => {
          const meta = CROPS_METADATA[crop];
          const isSelected = selectedCrop === crop;
          const localizedName = meta.name[language] || crop;

          return (
            <button
              key={crop}
              type="button"
              disabled={disabled}
              onClick={() => onSelectCrop(crop)}
              className={`relative flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer text-center group ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50/60'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <span className="text-3xl sm:text-4xl mb-2 select-none group-hover:scale-110 transition-transform">
                {meta.icon}
              </span>

              <span
                className={`text-sm sm:text-base font-bold tracking-tight ${
                  isSelected ? 'text-emerald-950 font-extrabold' : 'text-slate-800'
                }`}
              >
                {localizedName}
              </span>

              <span className="text-[11px] text-slate-500 italic mt-0.5 hidden sm:block">
                {meta.scientificName}
              </span>

              <span
                className={`text-[11px] mt-1.5 px-2 py-0.5 rounded-md font-medium ${
                  isSelected
                    ? 'bg-emerald-200/60 text-emerald-900 font-semibold'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {meta.diseasesCount} {language === 'te' ? 'కేటగిరీలు' : language === 'hi' ? 'श्रेणियां' : 'Classes'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
