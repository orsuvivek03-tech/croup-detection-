import React, { useState } from 'react';
import { BookOpen, Search, Filter, ShieldCheck, AlertTriangle, Sprout, ChevronDown, ChevronUp } from 'lucide-react';
import { PLANT_VILLAGE_DISEASES } from '../data/plantVillageData';
import { useLanguage } from '../context/LanguageContext';
import { CropType, DiseaseInfo } from '../types';

export const DiseaseGuide: React.FC = () => {
  const { language, t, getCropName } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const filteredDiseases = PLANT_VILLAGE_DISEASES.filter((disease) => {
    // Crop filter
    if (selectedCrop !== 'all' && disease.crop !== selectedCrop) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameEn = disease.name.en.toLowerCase();
      const nameTe = disease.name.te.toLowerCase();
      const nameHi = disease.name.hi.toLowerCase();
      const symptoms = disease.symptoms[language]?.join(' ').toLowerCase() || '';

      return (
        nameEn.includes(q) ||
        nameTe.includes(q) ||
        nameHi.includes(q) ||
        symptoms.includes(q)
      );
    }

    return true;
  });

  const toggleExpand = (key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-emerald-700" />
          {t.guide.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          {t.guide.subtitle}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.guide.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium placeholder:text-slate-400 shadow-2xs"
          />
        </div>

        {/* Crop Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['all', 'Tomato', 'Potato', 'Corn'].map((cropKey) => {
            const isSelected = selectedCrop === cropKey;
            const label =
              cropKey === 'all'
                ? t.guide.allCrops
                : getCropName(cropKey as CropType);

            return (
              <button
                key={cropKey}
                onClick={() => setSelectedCrop(cropKey)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Diseases List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredDiseases.map((d) => {
          const isExpanded = expandedKey === d.key;
          const localizedName = d.name[language] || d.name.en;
          const localizedCrop = getCropName(d.crop);
          const symptoms = d.symptoms[language] || d.symptoms.en;
          const recommendations = d.recommendations[language] || d.recommendations.en;
          const organic = d.organicTreatment[language] || d.organicTreatment.en;
          const chemical = d.chemicalTreatment[language] || d.chemicalTreatment.en;

          return (
            <div
              key={d.key}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                      {localizedCrop}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 leading-snug">
                      {localizedName}
                    </h4>
                  </div>

                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                      d.isHealthy
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : d.typicalSeverity === 'Severe'
                        ? 'bg-red-50 text-red-800 border-red-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    {d.isHealthy ? 'Healthy' : d.typicalSeverity}
                  </span>
                </div>

                {/* Short description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {d.description[language] || d.description.en}
                </p>

                {/* Key symptoms (first 2 preview) */}
                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1.5">
                    {t.result.symptomsTitle}:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {symptoms.slice(0, 2).map((sym, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable full management details */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    {/* All Symptoms */}
                    {symptoms.length > 2 && (
                      <div>
                        <span className="text-xs font-bold text-slate-800 block mb-1">
                          More Symptoms:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {symptoms.slice(2).map((sym, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-600 font-bold">•</span>
                              <span>{sym}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recommendations */}
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block mb-1">
                        {t.result.recommendationsTitle}:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">{i + 1}.</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Organic remedies */}
                    {organic.length > 0 && (
                      <div className="p-3 rounded-xl bg-green-50 text-green-950 text-xs">
                        <span className="font-bold block mb-1">🌱 Organic & Biological:</span>
                        <ul className="space-y-1">
                          {organic.map((org, i) => (
                            <li key={i}>• {org}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Chemical remedies */}
                    {!d.isHealthy && chemical.length > 0 && (
                      <div className="p-3 rounded-xl bg-blue-50 text-blue-950 text-xs">
                        <span className="font-bold block mb-1">🧪 Chemical Fungicides:</span>
                        <ul className="space-y-1">
                          {chemical.map((ch, i) => (
                            <li key={i}>• {ch}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Toggle button */}
              <button
                onClick={() => toggleExpand(d.key)}
                className="w-full px-5 py-3 border-t border-slate-100 bg-slate-50/70 hover:bg-slate-100 text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isExpanded ? 'Show Less' : t.guide.viewFullInfo}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
