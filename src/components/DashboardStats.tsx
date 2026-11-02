import React from 'react';
import { Sprout, ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DashboardMetrics } from '../types';

interface DashboardStatsProps {
  stats: DashboardMetrics;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const { t } = useLanguage();

  const cards = [
    {
      title: t.stats.totalScans,
      value: stats.totalScans,
      icon: Sprout,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200/80',
    },
    {
      title: t.stats.healthyPlants,
      value: stats.healthyPlants,
      icon: ShieldCheck,
      color: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200/80',
    },
    {
      title: t.stats.diseasesDetected,
      value: stats.diseasesDetected,
      icon: AlertTriangle,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200/80',
    },
    {
      title: t.stats.avgConfidence,
      value: `${stats.avgConfidence}%`,
      icon: Sparkles,
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-200/80',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 sm:p-5 rounded-2xl bg-white border ${card.border} shadow-xs hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-600 line-clamp-1">
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                <IconComponent className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${card.color}`}>
              {card.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
