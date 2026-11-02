import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { BarChart3, PieChart as PieIcon } from 'lucide-react';
import { PredictionResult } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DiseaseAnalyticsProps {
  predictions: PredictionResult[];
}

export const DiseaseAnalytics: React.FC<DiseaseAnalyticsProps> = ({ predictions }) => {
  const { language, t } = useLanguage();

  // 1. Disease Distribution Aggregate
  const categoriesCount: Record<string, number> = {
    'Early Blight': 0,
    'Late Blight': 0,
    'Rust': 0,
    'Leaf Spot': 0,
    'Healthy': 0,
  };

  predictions.forEach((p) => {
    const d = p.disease.toLowerCase();
    if (d.includes('healthy')) categoriesCount['Healthy']++;
    else if (d.includes('early blight')) categoriesCount['Early Blight']++;
    else if (d.includes('late blight')) categoriesCount['Late Blight']++;
    else if (d.includes('rust')) categoriesCount['Rust']++;
    else if (d.includes('leaf spot') || d.includes('septoria') || d.includes('gray')) categoriesCount['Leaf Spot']++;
    else categoriesCount['Early Blight']++;
  });

  const barData = Object.entries(categoriesCount).map(([name, count]) => ({
    name,
    count,
  }));

  // 2. Crop Health Severity Breakdown
  const severityCounts: Record<string, number> = {
    Healthy: 0,
    Mild: 0,
    Moderate: 0,
    Severe: 0,
  };

  predictions.forEach((p) => {
    if (p.severity === 'Healthy' || p.disease.toLowerCase().includes('healthy')) {
      severityCounts.Healthy++;
    } else if (p.severity === 'Mild') {
      severityCounts.Mild++;
    } else if (p.severity === 'Severe') {
      severityCounts.Severe++;
    } else {
      severityCounts.Moderate++;
    }
  });

  const total = Math.max(1, predictions.length);
  const pieData = [
    { name: t.analytics.healthy, value: severityCounts.Healthy, color: '#10B981' },
    { name: t.analytics.mild, value: severityCounts.Mild, color: '#F59E0B' },
    { name: t.analytics.moderate, value: severityCounts.Moderate, color: '#EA580C' },
    { name: t.analytics.severe, value: severityCounts.Severe, color: '#DC2626' },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-emerald-700" />
          {t.analytics.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          {t.analytics.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Disease Distribution Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm sm:text-base font-bold text-slate-800">
              {t.analytics.distributionTitle}
            </h4>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {predictions.length} Scans
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{
                    borderRadius: '12px',
                    borderColor: '#CBD5E1',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                />
                <Bar dataKey="count" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Overview Pie Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-700" />
              {t.analytics.overviewTitle}
            </h4>
          </div>

          <div className="h-56 sm:h-64 w-full flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => {
                      const num = Number(val) || 0;
                      return [`${num} scans (${((num / total) * 100).toFixed(0)}%)`, 'Cases'];
                    }}
                    contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-400">No severity data available</div>
            )}
          </div>

          {/* Quick percentages */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900 font-semibold flex items-center justify-between">
              <span>{t.analytics.healthy}:</span>
              <span className="font-extrabold">{((severityCounts.Healthy / total) * 100).toFixed(0)}%</span>
            </div>
            <div className="p-2 rounded-xl bg-red-50 text-red-900 font-semibold flex items-center justify-between">
              <span>{t.analytics.severe}:</span>
              <span className="font-extrabold">{((severityCounts.Severe / total) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
