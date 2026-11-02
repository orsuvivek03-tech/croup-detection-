import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Check, RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { validateLeafImage, ImageQualityResult } from '../services/imageValidation';
import { generateSampleLeaf } from '../services/sampleLeafGenerator';
import { FlaskConical } from 'lucide-react';

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageSelected: (dataUrl: string) => void;
  onClearImage: () => void;
  onAnalyze: () => void;
  isAnalyzing?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  imagePreview,
  onImageSelected,
  onClearImage,
  onAnalyze,
  isAnalyzing = false,
}) => {
  const { language, t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [qualityNotice, setQualityNotice] = useState<ImageQualityResult | null>(null);

  const processFile = async (file: File) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setQualityNotice({
        isValid: false,
        isLeaf: false,
        message: t.errors.unsupportedImage,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      if (result) {
        const quality = await validateLeafImage(result, language);
        setQualityNotice(quality);
        onImageSelected(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {!imagePreview ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer group ${
            dragActive
              ? 'border-emerald-600 bg-emerald-50/80 scale-[1.01]'
              : 'border-slate-300 bg-white hover:border-emerald-500 hover:bg-slate-50/60'
          }`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xs">
            <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2]" />
          </div>

          <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
            {t.upload.dropzoneTitle}
          </h4>

          <p className="text-xs sm:text-sm text-slate-500 mb-5">
            {t.upload.dropzoneSubtitle}
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm shadow-xs group-hover:bg-emerald-800 transition-colors pointer-events-none"
          >
            <ImageIcon className="w-4 h-4" />
            <span>{t.upload.browse}</span>
          </button>

          <p className="text-[11px] text-slate-400 mt-4">
            {t.upload.supportedFormats}
          </p>

          {/* Quick Test Samples */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-6 pt-5 border-t border-slate-200/80 text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
                <span>Instant Test Samples (1-Click Test):</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                No photo needed
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <button
                type="button"
                onClick={async () => {
                  const url = generateSampleLeaf('tomato_early_blight');
                  const quality = await validateLeafImage(url, language);
                  setQualityNotice(quality);
                  onImageSelected(url);
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 font-bold text-slate-700 hover:text-emerald-950 transition-all text-center flex flex-col items-center gap-1 cursor-pointer shadow-2xs"
              >
                <span className="text-lg">🍅</span>
                <span className="text-[11px]">Early Blight</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  const url = generateSampleLeaf('potato_late_blight');
                  const quality = await validateLeafImage(url, language);
                  setQualityNotice(quality);
                  onImageSelected(url);
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 font-bold text-slate-700 hover:text-emerald-950 transition-all text-center flex flex-col items-center gap-1 cursor-pointer shadow-2xs"
              >
                <span className="text-lg">🥔</span>
                <span className="text-[11px]">Late Blight</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  const url = generateSampleLeaf('corn_rust');
                  const quality = await validateLeafImage(url, language);
                  setQualityNotice(quality);
                  onImageSelected(url);
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 font-bold text-slate-700 hover:text-emerald-950 transition-all text-center flex flex-col items-center gap-1 cursor-pointer shadow-2xs"
              >
                <span className="text-lg">🌽</span>
                <span className="text-[11px]">Common Rust</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  const url = generateSampleLeaf('healthy');
                  const quality = await validateLeafImage(url, language);
                  setQualityNotice(quality);
                  onImageSelected(url);
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 font-bold text-slate-700 hover:text-emerald-950 transition-all text-center flex flex-col items-center gap-1 cursor-pointer shadow-2xs"
              >
                <span className="text-lg">🌿</span>
                <span className="text-[11px]">Healthy Leaf</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  const url = generateSampleLeaf('non_leaf');
                  const quality = await validateLeafImage(url, language);
                  setQualityNotice(quality);
                  onImageSelected(url);
                }}
                className="p-2.5 rounded-xl bg-rose-50/70 hover:bg-rose-100/80 hover:border-rose-300 border border-rose-200 font-bold text-rose-800 transition-all text-center flex flex-col items-center gap-1 cursor-pointer shadow-2xs"
                title="Test non-leaf rejection feature"
              >
                <span className="text-lg">🚫</span>
                <span className="text-[11px]">Non-Leaf Test</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-700" />
              {t.upload.previewTitle}
            </h4>

            <button
              onClick={() => {
                setQualityNotice(null);
                onClearImage();
              }}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t.upload.chooseAnother}
            </button>
          </div>

          {/* Leaf image preview */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-[360px] sm:max-h-[420px] mb-4">
            <img
              src={imagePreview}
              alt="Leaf to analyze"
              className="w-full h-auto max-h-[360px] sm:max-h-[420px] object-contain"
            />
          </div>

          {/* Quality and Leaf Validation Notice */}
          {qualityNotice && (!qualityNotice.isValid || !qualityNotice.isLeaf) && (
            <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-rose-900 block text-sm">
                  {t.qualityCheck.nonLeafDetectedTitle}
                </span>
                <span className="text-rose-800 leading-relaxed block mt-0.5">
                  {qualityNotice.message}
                </span>
              </div>
            </div>
          )}

          {qualityNotice && qualityNotice.isValid && qualityNotice.isLeaf && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold">{t.qualityCheck.leafVerified}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing || !!(qualityNotice && !qualityNotice.isLeaf)}
              className={`w-full sm:flex-1 py-3.5 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                qualityNotice && !qualityNotice.isLeaf
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                  : 'bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white shadow-md shadow-emerald-700/20 cursor-pointer'
              } disabled:opacity-50`}
            >
              <Sparkles className="w-5 h-5" />
              <span>
                {qualityNotice && !qualityNotice.isLeaf
                  ? 'Plant Leaf Required'
                  : t.upload.analyzeBtn}
              </span>
            </button>

            <button
              onClick={handleBrowseClick}
              disabled={isAnalyzing}
              className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              {t.upload.chooseAnother}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
