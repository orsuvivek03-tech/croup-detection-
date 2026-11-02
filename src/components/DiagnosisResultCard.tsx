import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Square,
  Printer,
  BookmarkCheck,
  RefreshCw,
  Sparkles,
  Info,
  ShieldCheck,
  FlaskConical,
  Sprout,
  HeartHandshake,
} from 'lucide-react';
import { PredictionResult } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { speakText, stopSpeaking, isSpeaking } from '../services/audioSpeech';
import { PLANT_VILLAGE_DISEASES } from '../data/plantVillageData';

interface DiagnosisResultCardProps {
  prediction: PredictionResult;
  onScanAnother: () => void;
  onSaveToHistory?: (prediction: PredictionResult) => void;
}

export const DiagnosisResultCard: React.FC<DiagnosisResultCardProps> = ({
  prediction,
  onScanAnother,
  onSaveToHistory,
}) => {
  const { language, t, getCropName, getDiseaseName, getSeverityName } = useLanguage();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isHealthy =
    prediction.severity === 'Healthy' ||
    prediction.status === 'Plant Appears Healthy' ||
    prediction.disease.toLowerCase().includes('healthy');

  // Look up enriched info from knowledge base if available
  const diseaseMeta = PLANT_VILLAGE_DISEASES.find(
    (d) =>
      d.key === prediction.diseaseKey ||
      d.name.en.toLowerCase() === prediction.disease.toLowerCase()
  );

  const localizedDiseaseName = getDiseaseName(prediction.diseaseKey, prediction.disease);
  const localizedCropName = getCropName(prediction.crop);

  // Localized symptoms & recommendations with fallback to API response
  const symptomsList =
    diseaseMeta && diseaseMeta.symptoms[language]
      ? diseaseMeta.symptoms[language]
      : prediction.symptoms || [];

  const recommendationsList =
    diseaseMeta && diseaseMeta.recommendations[language]
      ? diseaseMeta.recommendations[language]
      : prediction.recommendation || [];

  const organicList =
    diseaseMeta && diseaseMeta.organicTreatment[language]
      ? diseaseMeta.organicTreatment[language]
      : prediction.organicTreatment || [];

  const chemicalList =
    diseaseMeta && diseaseMeta.chemicalTreatment[language]
      ? diseaseMeta.chemicalTreatment[language]
      : prediction.chemicalTreatment || [];

  const preventionList =
    diseaseMeta && diseaseMeta.prevention[language]
      ? diseaseMeta.prevention[language]
      : prediction.preventionTips || [];

  // Audio speech synthesis helper
  const handleToggleAudio = () => {
    if (isPlayingAudio || isSpeaking()) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    let speechScript = '';
    if (isHealthy) {
      if (language === 'te') {
        speechScript = `${localizedCropName} పంట ఆరోగ్యంగా ఉంది. AI ఖచ్చితత్వం ${prediction.confidence} శాతం. మీ మొక్క ఎటువంటి తెగుళ్ళు లేకుండా ఆరోగ్యంగా ఉంది. సాధారణ సంరక్షణ మరియు మంచి సాగు పద్ధతులను కొనసాగించండి.`;
      } else if (language === 'hi') {
        speechScript = `${localizedCropName} की फसल स्वस्थ है। एआई सटीकता ${prediction.confidence} प्रतिशत है। पौधा किसी भी बीमारी से मुक्त है। नियमित देखभाल और संतुलित सिंचाई जारी रखें।`;
      } else {
        speechScript = `Your ${localizedCropName} plant appears healthy. AI Confidence is ${prediction.confidence} percent. Continue regular monitoring and good agricultural practices.`;
      }
    } else {
      if (language === 'te') {
        speechScript = `${localizedCropName} పంటలో వ్యాధి గుర్తించబడింది. వ్యాధి పేరు: ${localizedDiseaseName}. AI ఖచ్చితత్వం: ${prediction.confidence} శాతం. వ్యాధి తీవ్రత: ${getSeverityName(prediction.severity)}. ముఖ్య సూచనలు: ${recommendationsList.join('. ')}`;
      } else if (language === 'hi') {
        speechScript = `${localizedCropName} की फसल में रोग पाया गया है। रोग का नाम: ${localizedDiseaseName}। एआई सटीकता: ${prediction.confidence} प्रतिशत। मुख्य सुझाव: ${recommendationsList.join('. ')}`;
      } else {
        speechScript = `Disease detected on your ${localizedCropName} plant. Diagnosis is ${localizedDiseaseName} with confidence of ${prediction.confidence} percent. Key recommended action: ${recommendationsList[0] || 'Remove infected leaves.'}`;
      }
    }

    setIsPlayingAudio(true);
    speakText(speechScript, language, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleSave = () => {
    if (onSaveToHistory) {
      onSaveToHistory(prediction);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Severity color styles
  const severityStyles: Record<string, { badge: string; border: string; text: string }> = {
    Healthy: {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      border: 'border-emerald-300',
      text: 'text-emerald-700',
    },
    Mild: {
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      border: 'border-amber-300',
      text: 'text-amber-700',
    },
    Moderate: {
      badge: 'bg-orange-100 text-orange-800 border-orange-300',
      border: 'border-orange-300',
      text: 'text-orange-700',
    },
    Severe: {
      badge: 'bg-red-100 text-red-800 border-red-300',
      border: 'border-red-300',
      text: 'text-red-700',
    },
  };

  const currentSevStyle =
    severityStyles[prediction.severity] || severityStyles.Moderate;

  // Circular progress math (circumference = 2 * PI * r)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (prediction.confidence / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none print:border-none">
      {/* Top Banner */}
      <div
        className={`px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b ${
          isHealthy
            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200'
            : 'bg-gradient-to-r from-amber-50 to-red-50 border-amber-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${
              isHealthy ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
            }`}
          >
            {isHealthy ? (
              <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
            ) : (
              <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
            )}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              🌱 {localizedCropName}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {isHealthy ? t.result.healthyTitle : t.result.diseaseTitle}
            </h2>
          </div>
        </div>

        {/* Action Controls: Audio read-aloud & print */}
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              isPlayingAudio
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'
            }`}
            title="Read out diagnosis in selected language"
          >
            {isPlayingAudio ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>{t.result.stopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>{t.result.readAloud}</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
            title="Print diagnosis report"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">{t.result.printReport}</span>
          </button>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Upper Row: Image + Diagnosis Header + Confidence Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Leaf Thumbnail */}
          <div className="md:col-span-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-4/3 flex items-center justify-center border border-slate-200 shadow-inner group">
              <img
                src={prediction.imageUrl}
                alt="Diagnosed plant leaf"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[11px] font-bold">
                {localizedCropName}
              </div>
            </div>
          </div>

          {/* Primary Condition & Confidence */}
          <div className="md:col-span-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
            <div className="space-y-2 flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {t.result.title}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                {localizedDiseaseName}
              </h3>

              {/* Severity Pill */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-slate-500">
                  {t.result.severityLabel}:
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border ${currentSevStyle.badge}`}
                >
                  {getSeverityName(prediction.severity)}
                </span>
              </div>
            </div>

            {/* Circular Confidence Meter (Requested in Section 8) */}
            <div className="flex flex-col items-center justify-center shrink-0 self-center sm:self-auto">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                  {/* Track */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-200"
                    fill="transparent"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={isHealthy ? 'text-emerald-500' : 'text-amber-500'}
                    fill="transparent"
                  />
                </svg>

                {/* Number inside */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    {prediction.confidence}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    AI Match
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 mt-1">
                {t.result.confidenceLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Healthy Plant Specific Section */}
        {isHealthy ? (
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-emerald-950">
                  {t.result.healthyTitle}
                </h4>
                <p className="text-xs text-emerald-800 font-medium">
                  {localizedCropName} — {prediction.confidence}% AI Confidence
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-emerald-900 leading-relaxed font-medium">
              {t.result.healthyMessage}
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                Good Routine Practices:
              </h5>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-emerald-900">
                {recommendationsList.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* Disease Detected Multi-Column Breakdown */
          <div className="space-y-6">
            {/* Symptoms and Immediate Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Symptoms */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-extrabold">
                    1
                  </span>
                  {t.result.symptomsTitle}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {symptomsList.map((sym, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span className="leading-snug">{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Farmer Actions */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <h4 className="text-sm sm:text-base font-bold text-emerald-950 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-extrabold">
                    2
                  </span>
                  {t.result.recommendationsTitle}
                </h4>
                <ol className="space-y-2 text-xs sm:text-sm text-emerald-950">
                  {recommendationsList.map((action, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-medium">
                      <span className="font-extrabold text-emerald-700 shrink-0">
                        {i + 1}.
                      </span>
                      <span className="leading-snug">{action}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Organic Remedies vs Chemical Remedies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organic Remedies */}
              {organicList.length > 0 && (
                <div className="p-5 rounded-2xl bg-green-50/60 border border-green-200">
                  <h4 className="text-sm sm:text-base font-bold text-green-950 mb-3 flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-green-700" />
                    {t.result.organicTitle}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-green-900">
                    {organicList.map((org, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{org}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Chemical Remedies */}
              {chemicalList.length > 0 && (
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200">
                  <h4 className="text-sm sm:text-base font-bold text-blue-950 mb-3 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-blue-700" />
                    {t.result.chemicalTitle}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-blue-900">
                    {chemicalList.map((chem, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{chem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Long term prevention */}
            {preventionList.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">
                  {t.result.preventionTitle}:
                </span>
                <p className="leading-relaxed">
                  {preventionList.join(' · ')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 print:hidden">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onScanAnother}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.result.scanAnother}</span>
            </button>

            <button
              onClick={handleSave}
              disabled={savedSuccess}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all border ${
                savedSuccess
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              <span>{savedSuccess ? t.result.savedToast : t.result.savePrediction}</span>
            </button>
          </div>
        </div>

        {/* Agricultural Expert AI Disclaimer (Requested in Section 23) */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-3">
          <HeartHandshake className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <div className="font-bold">{t.result.disclaimer}</div>
            <div className="text-amber-800 mt-0.5">{t.result.disclaimerContact}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
