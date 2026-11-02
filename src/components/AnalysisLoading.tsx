import React, { useState, useEffect } from 'react';
import { Leaf, Cpu, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AnalysisLoading: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: t.loading.step1, icon: Leaf },
    { title: t.loading.step2, icon: Cpu },
    { title: t.loading.step3, icon: ShieldCheck },
    { title: t.loading.step4, icon: Sparkles },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 600);
    const timer2 = setTimeout(() => setCurrentStep(2), 1300);
    const timer3 = setTimeout(() => setCurrentStep(3), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-emerald-200/80 p-8 sm:p-12 shadow-xl text-center max-w-lg mx-auto">
      {/* Scanning radar / leaf pulse icon */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
        <div className="absolute -inset-2 rounded-full border border-emerald-500/30 animate-pulse" />
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-xl shadow-emerald-700/25">
          <Leaf className="w-12 h-12 stroke-[2.2] animate-bounce" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
        {t.loading.title}
      </h3>

      <p className="text-sm font-semibold text-emerald-800 mb-8 min-h-[44px] flex items-center justify-center px-4">
        {steps[currentStep].title}
      </p>

      {/* Step progress pills */}
      <div className="space-y-3 text-left">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                isCurrent
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                  : isDone
                  ? 'border-slate-200 bg-slate-50 text-slate-500'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-emerald-500 text-white animate-spin'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? '✓' : <StepIcon className="w-3.5 h-3.5" />}
              </div>
              <span className="line-clamp-1">{step.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
