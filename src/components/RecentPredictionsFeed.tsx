import React, { useState } from 'react';
import {
  History,
  Filter,
  Trash2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PredictionResult, CropType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RecentPredictionsFeedProps {
  predictions: PredictionResult[];
  onSelectPrediction: (prediction: PredictionResult) => void;
  onClearHistory: () => void;
}

export const RecentPredictionsFeed: React.FC<RecentPredictionsFeedProps> = ({
  predictions,
  onSelectPrediction,
  onClearHistory,
}) => {
  const { language, t, getCropName, getDiseaseName, getSeverityName } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: t.history.filterAll },
    { id: 'Tomato', label: t.history.filterTomato },
    { id: 'Potato', label: t.history.filterPotato },
    { id: 'Corn', label: t.history.filterCorn },
    { id: 'healthy', label: t.history.filterHealthy },
    { id: 'disease', label: t.history.filterDisease },
  ];

  const filteredList = predictions.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Tomato') return item.crop === 'Tomato';
    if (activeFilter === 'Potato') return item.crop === 'Potato';
    if (activeFilter === 'Corn') return item.crop === 'Corn';
    if (activeFilter === 'healthy') {
      return (
        item.severity === 'Healthy' ||
        item.status === 'Plant Appears Healthy' ||
        item.disease.toLowerCase().includes('healthy')
      );
    }
    if (activeFilter === 'disease') {
      return (
        item.severity !== 'Healthy' &&
        item.status !== 'Plant Appears Healthy' &&
        !item.disease.toLowerCase().includes('healthy')
      );
    }
    return true;
  });

  const formatTimestamp = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat(language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const handleClear = () => {
    if (window.confirm(t.history.clearConfirm)) {
      onClearHistory();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-emerald-700" />
            {t.history.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.history.subtitle}
          </p>
        </div>

        {predictions.length > 0 && (
          <button
            onClick={handleClear}
            className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.history.clearAll}</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveFilter(opt.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === opt.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Predictions Cards Grid */}
      {filteredList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <History className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-800 mb-1">
            {t.history.emptyState}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.history.emptySubtitle}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredList.map((item) => {
            const isHealthy =
              item.severity === 'Healthy' ||
              item.status === 'Plant Appears Healthy' ||
              item.disease.toLowerCase().includes('healthy');

            const localizedDisease = getDiseaseName(item.diseaseKey, item.disease);
            const localizedCrop = getCropName(item.crop);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail and badges */}
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-16/10 mb-3.5">
                    <img
                      src={item.imageUrl}
                      alt={localizedDisease}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Crop badge */}
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold">
                      {item.crop === 'Tomato' ? '🍅' : item.crop === 'Potato' ? '🥔' : '🌽'} {localizedCrop}
                    </div>

                    {/* Status badge */}
                    <div
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-md ${
                        isHealthy
                          ? 'bg-emerald-600/90 text-white'
                          : 'bg-amber-600/90 text-white'
                      }`}
                    >
                      {isHealthy ? 'Healthy' : item.severity}
                    </div>
                  </div>

                  {/* Disease Title */}
                  <h4 className="text-base font-bold text-slate-900 line-clamp-1 mb-1">
                    {localizedDisease}
                  </h4>

                  {/* AI Confidence and Severity */}
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                    <span className="flex items-center gap-1 font-semibold text-emerald-800">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      {t.result.confidenceLabel}: {item.confidence}%
                    </span>

                    <span className="font-medium text-slate-500">
                      {getSeverityName(item.severity)}
                    </span>
                  </div>
                </div>

                {/* Card footer: timestamp & View Details */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimestamp(item.timestamp)}
                  </span>

                  <button
                    onClick={() => onSelectPrediction(item)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>{t.history.viewDetails}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
