/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { DashboardHero } from './components/DashboardHero';
import { DashboardStats } from './components/DashboardStats';
import { CropSelector } from './components/CropSelector';
import { LiveCameraModal } from './components/LiveCameraModal';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisLoading } from './components/AnalysisLoading';
import { DiagnosisResultCard } from './components/DiagnosisResultCard';
import { RecentPredictionsFeed } from './components/RecentPredictionsFeed';
import { DiseaseAnalytics } from './components/DiseaseAnalytics';
import { DiseaseGuide } from './components/DiseaseGuide';
import { AboutArchitecture } from './components/AboutArchitecture';
import { PredictionDetailModal } from './components/PredictionDetailModal';
import { CropType, PredictionResult, DashboardMetrics } from './types';
import {
  requestPrediction,
  fetchPredictions,
  fetchDashboardStats,
  savePredictionLocally,
  clearPredictionHistory,
} from './services/predictionApi';
import { validateLeafImage } from './services/imageValidation';
import { AlertCircle, Camera, UploadCloud, Sprout, ArrowDown, Leaf, AlertTriangle } from 'lucide-react';

function MainApp() {
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'history' | 'guide' | 'about'>('dashboard');
  const [selectedCrop, setSelectedCrop] = useState<CropType>('Tomato');
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [latestPrediction, setLatestPrediction] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<PredictionResult | null>(null);

  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [stats, setStats] = useState<DashboardMetrics>({
    totalScans: 5,
    healthyPlants: 1,
    diseasesDetected: 4,
    avgConfidence: 95.6,
  });

  const diagnosisRef = useRef<HTMLDivElement | null>(null);
  const scannerSectionRef = useRef<HTMLDivElement | null>(null);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [preds, initialStats] = await Promise.all([
        fetchPredictions(),
        fetchDashboardStats(),
      ]);
      if (preds && preds.length > 0) {
        setPredictions(preds);
      }
      if (initialStats) {
        setStats(initialStats);
      }
    } catch (err) {
      console.warn('Initial load error:', err);
    }
  };

  const handleStartAnalysis = async (imageDataUrl: string) => {
    setImagePreview(imageDataUrl);
    setErrorMessage(null);
    setLatestPrediction(null);

    // 1. Strict Client-Side Pre-Check for Plant Leaf Presence
    const leafCheck = await validateLeafImage(imageDataUrl, language);
    if (!leafCheck.isValid || !leafCheck.isLeaf) {
      setErrorMessage(leafCheck.message || t.qualityCheck.notLeaf);
      setIsAnalyzing(false);
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await requestPrediction(imageDataUrl, selectedCrop, language, true);
      setLatestPrediction(result);

      // Prepend to predictions
      const updated = [result, ...predictions];
      setPredictions(updated);

      // Update statistics dynamically
      const total = updated.length;
      const healthy = updated.filter(
        (p) =>
          p.severity === 'Healthy' ||
          p.status === 'Plant Appears Healthy' ||
          p.disease.toLowerCase().includes('healthy')
      ).length;
      const diseased = total - healthy;
      const avgConf = Number(
        (updated.reduce((sum, p) => sum + (p.confidence || 90), 0) / total).toFixed(1)
      );

      setStats({
        totalScans: total,
        healthyPlants: healthy,
        diseasesDetected: diseased,
        avgConfidence: avgConf,
      });

      // Smooth scroll to diagnosis card
      setTimeout(() => {
        if (diagnosisRef.current) {
          diagnosisRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || t.errors.predictionFailed);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOpenScanner = () => {
    setActiveTab('scanner');
    if (scannerSectionRef.current) {
      scannerSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearHistory = async () => {
    await clearPredictionHistory();
    loadData();
  };

  const handleResetScan = () => {
    setLatestPrediction(null);
    setImagePreview(null);
    setErrorMessage(null);
    if (scannerSectionRef.current) {
      scannerSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-slate-900 font-sans">
      {/* Navbar with brand and prominent Language Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScanner={() => setCameraModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Hero Welcome Banner */}
            <DashboardHero
              onScanClick={() => setCameraModalOpen(true)}
              onUploadClick={() => {
                setActiveTab('scanner');
                setTimeout(() => {
                  if (scannerSectionRef.current) {
                    scannerSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 50);
              }}
              selectedCrop={selectedCrop}
            />

            {/* Dashboard 4 Dynamic Statistics Cards */}
            <DashboardStats stats={stats} />

            {/* Crop Selector Component */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <CropSelector
                selectedCrop={selectedCrop}
                onSelectCrop={setSelectedCrop}
                disabled={isAnalyzing}
              />
            </div>

            {/* If analyzing or result ready on dashboard, show here */}
            {isAnalyzing && (
              <div className="py-6">
                <AnalysisLoading />
              </div>
            )}

            {latestPrediction && !isAnalyzing && (
              <div ref={diagnosisRef} className="py-2">
                <DiagnosisResultCard
                  prediction={latestPrediction}
                  onScanAnother={handleResetScan}
                  onSaveToHistory={savePredictionLocally}
                />
              </div>
            )}

            {/* Disease Analytics Charts */}
            <DiseaseAnalytics predictions={predictions} />

            {/* Recent Predictions Feed Section */}
            <RecentPredictionsFeed
              predictions={predictions}
              onSelectPrediction={setSelectedHistoryItem}
              onClearHistory={handleClearHistory}
            />
          </div>
        )}

        {/* TAB 2: SCANNER */}
        {activeTab === 'scanner' && (
          <div ref={scannerSectionRef} className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Instant Disease Detection
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.nav.scanner}
              </h2>
              <p className="text-sm text-slate-600">
                {t.camera.instructions}
              </p>
              {/* Leaf-only strict policy badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Leaf-Only Scanner: Non-plant objects are strictly filtered out</span>
              </div>
            </div>

            {/* Crop Selection */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs">
              <CropSelector
                selectedCrop={selectedCrop}
                onSelectCrop={setSelectedCrop}
                disabled={isAnalyzing}
              />
            </div>

            {/* Live Camera Quick Trigger Card */}
            <div className="bg-gradient-to-br from-emerald-700 to-green-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold">
                  {t.camera.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-md">
                  {t.camera.instructions}
                </p>
              </div>

              <button
                onClick={() => setCameraModalOpen(true)}
                disabled={isAnalyzing}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-emerald-950 font-extrabold text-base shadow-md hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Camera className="w-5 h-5 text-emerald-700" />
                <span>{t.hero.scanBtn}</span>
              </button>
            </div>

            {/* Image Uploader & Dropzone */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-emerald-700" />
                <span>Or Upload Leaf Photo</span>
              </h3>

              <ImageUploader
                imagePreview={imagePreview}
                onImageSelected={(url) => {
                  setImagePreview(url);
                  setErrorMessage(null);
                }}
                onClearImage={() => {
                  setImagePreview(null);
                  setLatestPrediction(null);
                  setErrorMessage(null);
                }}
                onAnalyze={() => {
                  if (imagePreview) {
                    handleStartAnalysis(imagePreview);
                  }
                }}
                isAnalyzing={isAnalyzing}
              />
            </div>

            {/* Error Message Notice */}
            {errorMessage && (
              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 text-xs sm:text-sm flex items-start gap-3.5 shadow-md">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-black text-rose-900 text-base">
                    {t.qualityCheck.nonLeafDetectedTitle}
                  </div>
                  <div className="font-semibold text-rose-800 leading-relaxed">
                    {errorMessage}
                  </div>
                  <div className="text-xs text-rose-700 pt-1 font-medium">
                    {t.qualityCheck.nonLeafDetectedDesc}
                  </div>
                </div>
              </div>
            )}

            {/* Loading step animation */}
            {isAnalyzing && (
              <div className="pt-4">
                <AnalysisLoading />
              </div>
            )}

            {/* Diagnosis Result Card */}
            {latestPrediction && !isAnalyzing && (
              <div ref={diagnosisRef} className="pt-4">
                <DiagnosisResultCard
                  prediction={latestPrediction}
                  onScanAnother={handleResetScan}
                  onSaveToHistory={savePredictionLocally}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 3: RECENT PREDICTIONS HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <RecentPredictionsFeed
              predictions={predictions}
              onSelectPrediction={setSelectedHistoryItem}
              onClearHistory={handleClearHistory}
            />
          </div>
        )}

        {/* TAB 4: DISEASE GUIDE */}
        {activeTab === 'guide' && (
          <div>
            <DiseaseGuide />
          </div>
        )}

        {/* TAB 5: ABOUT AI MODEL & ARCHITECTURE */}
        {activeTab === 'about' && (
          <div>
            <AboutArchitecture />
          </div>
        )}
      </main>

      {/* Live Camera Modal */}
      <LiveCameraModal
        isOpen={cameraModalOpen}
        selectedCrop={selectedCrop}
        onCropChange={setSelectedCrop}
        onClose={() => setCameraModalOpen(false)}
        onCaptureImage={(captured) => {
          setCameraModalOpen(false);
          handleStartAnalysis(captured);
        }}
      />

      {/* History Detail Modal */}
      <PredictionDetailModal
        prediction={selectedHistoryItem}
        onClose={() => setSelectedHistoryItem(null)}
        onScanAnother={() => {
          setSelectedHistoryItem(null);
          handleOpenScanner();
        }}
      />

      {/* Farmer-Friendly Clean Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200/80 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
              🌱
            </div>
            <span>Instant Plant Health Diagnosis • PlantVillage Deep Learning</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Tomato</span>
            <span>·</span>
            <span>Potato</span>
            <span>·</span>
            <span>Corn / Maize</span>
            <span>·</span>
            <span>English · తెలుగు · हिन्दी</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
