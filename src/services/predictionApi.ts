import { CropType, PredictionResult, DashboardMetrics, SupportedLanguage } from '../types';

export async function requestPrediction(
  imageDataUrl: string,
  crop: CropType,
  language: SupportedLanguage,
  isLeaf: boolean = true
): Promise<PredictionResult> {
  const response = await fetch('/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: imageDataUrl,
      crop,
      language,
      isLeaf,
    }),
  });

  if (!response.ok) {
    let errorMsg = 'Failed to analyze plant image.';
    try {
      const errJson = await response.json();
      if (errJson.error) errorMsg = errJson.error;
    } catch {
      // fallback
    }
    throw new Error(errorMsg);
  }

  const data: PredictionResult = await response.json();
  return data;
}

export async function fetchPredictions(): Promise<PredictionResult[]> {
  try {
    const response = await fetch('/api/predictions');
    if (!response.ok) throw new Error('Failed to fetch predictions');
    const data = await response.json();
    return data.predictions || [];
  } catch (err) {
    console.warn('Using local fallback for predictions:', err);
    return [];
  }
}

export async function savePredictionLocally(prediction: PredictionResult): Promise<void> {
  try {
    await fetch('/api/predictions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prediction),
    });
  } catch (err) {
    console.error('Failed to save to server:', err);
  }
}

export async function clearPredictionHistory(): Promise<void> {
  try {
    await fetch('/api/predictions', { method: 'DELETE' });
  } catch (err) {
    console.error('Failed to clear predictions on server:', err);
  }
}

export async function fetchDashboardStats(): Promise<DashboardMetrics> {
  try {
    const response = await fetch('/api/stats');
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (err) {
    return {
      totalScans: 0,
      healthyPlants: 0,
      diseasesDetected: 0,
      avgConfidence: 94.5,
    };
  }
}
