export type CropType = 'Tomato' | 'Potato' | 'Corn';

export type SeverityLevel = 'Healthy' | 'Mild' | 'Moderate' | 'Severe';

export type HealthStatus = 'Plant Appears Healthy' | 'Disease Detected';

export type SupportedLanguage = 'en' | 'te' | 'hi';

export interface PredictionResult {
  id: string;
  crop: CropType;
  disease: string;
  diseaseKey: string;
  confidence: number;
  severity: SeverityLevel;
  status: HealthStatus;
  symptoms: string[];
  recommendation: string[];
  organicTreatment?: string[];
  chemicalTreatment?: string[];
  preventionTips?: string[];
  imageUrl: string;
  thumbnailUrl?: string;
  timestamp: string;
  language: SupportedLanguage;
  isDemo?: boolean;
  isLeaf?: boolean;
  objectDetected?: string;
}

export interface DiseaseInfo {
  key: string;
  crop: CropType;
  name: {
    en: string;
    te: string;
    hi: string;
  };
  isHealthy: boolean;
  typicalSeverity: SeverityLevel;
  symptoms: {
    en: string[];
    te: string[];
    hi: string[];
  };
  recommendations: {
    en: string[];
    te: string[];
    hi: string[];
  };
  organicTreatment: {
    en: string[];
    te: string[];
    hi: string[];
  };
  chemicalTreatment: {
    en: string[];
    te: string[];
    hi: string[];
  };
  prevention: {
    en: string[];
    te: string[];
    hi: string[];
  };
  description: {
    en: string;
    te: string;
    hi: string;
  };
  colorTheme: string;
}

export interface DashboardMetrics {
  totalScans: number;
  healthyPlants: number;
  diseasesDetected: number;
  avgConfidence: number;
}
