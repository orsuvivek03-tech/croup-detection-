import React from 'react';
import { X } from 'lucide-react';
import { PredictionResult } from '../types';
import { DiagnosisResultCard } from './DiagnosisResultCard';

interface PredictionDetailModalProps {
  prediction: PredictionResult | null;
  onClose: () => void;
  onScanAnother: () => void;
}

export const PredictionDetailModal: React.FC<PredictionDetailModalProps> = ({
  prediction,
  onClose,
  onScanAnother,
}) => {
  if (!prediction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6">
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 shadow-xl transition-transform hover:scale-110 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <DiagnosisResultCard
          prediction={prediction}
          onScanAnother={() => {
            onClose();
            onScanAnother();
          }}
        />
      </div>
    </div>
  );
};
