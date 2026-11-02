import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

export interface ImageQualityResult {
  isValid: boolean;
  isLeaf: boolean;
  message: string;
  objectDetected?: string;
  width?: number;
  height?: number;
  score?: number;
}

export async function validateLeafImage(
  dataUrl: string,
  lang: SupportedLanguage = 'en'
): Promise<ImageQualityResult> {
  const t = UI_TRANSLATIONS[lang].qualityCheck;

  return new Promise((resolve) => {
    if (!dataUrl || !dataUrl.startsWith('data:image/')) {
      return resolve({
        isValid: false,
        isLeaf: false,
        message: UI_TRANSLATIONS[lang].errors.unsupportedImage,
      });
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;

      // Minimum resolution check
      if (width < 80 || height < 80) {
        return resolve({
          isValid: false,
          isLeaf: false,
          message: t.tooSmall,
          width,
          height,
        });
      }

      try {
        // Sample on offscreen canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const sampleSize = 80;
        canvas.width = sampleSize;
        canvas.height = sampleSize;

        if (!ctx) {
          return resolve({ isValid: true, isLeaf: true, message: t.good, width, height });
        }

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imgData.data;

        let totalBrightness = 0;
        let pixelCount = 0;
        let minBrightness = 255;
        let maxBrightness = 0;

        let plantFoliagePixels = 0;
        let humanSkinPixels = 0;
        let syntheticBluePixels = 0;
        let neutralGrayPixels = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          totalBrightness += brightness;
          pixelCount++;
          if (brightness < minBrightness) minBrightness = brightness;
          if (brightness > maxBrightness) maxBrightness = brightness;

          // 1. Plant Leaf and Foliage Detection (Healthy Green, Chlorotic Yellow, Foliar Necrotic Brown)
          const isHealthyGreen = (g > r * 1.05 && g > b * 1.12 && g > 35) || (g >= r && g > b + 10 && g > 30);
          const isYellowChlorosis = (r > 85 && g > 80 && b < r * 0.72 && Math.abs(r - g) < 45);
          const isFoliarBrownLesion = (r > 50 && g > 30 && b < 65 && r >= g && g > b && (r - b) > 18);
          const isOliveLeafMold = (g >= r * 0.88 && g > b * 1.18 && g > 38 && g < 160);

          if (isHealthyGreen || isYellowChlorosis || isFoliarBrownLesion || isOliveLeafMold) {
            plantFoliagePixels++;
          }

          // 2. Human Skin Tone Detection
          const isSkinTone = (r > 95 && g > 40 && b > 20 && (r - g) > 15 && (r - b) > 15 && r > g && g > b && (r - g) > (g - b) * 0.4 && b < 185);
          if (isSkinTone) {
            humanSkinPixels++;
          }

          // 3. Synthetic Blue/Purple Non-Plant Objects
          if (b > g + 25 && b > r + 25 && b > 60) {
            syntheticBluePixels++;
          }

          // 4. Neutral Monochrome / Gray / White Paper / Metallic Surface
          if (Math.abs(r - g) < 9 && Math.abs(g - b) < 9 && Math.abs(r - b) < 9) {
            neutralGrayPixels++;
          }
        }

        const avgBrightness = totalBrightness / pixelCount;
        const contrastRange = maxBrightness - minBrightness;

        // Extremely dark (e.g. lens covered or pitch black)
        if (avgBrightness < 18) {
          return resolve({
            isValid: false,
            isLeaf: false,
            message: t.tooDark,
            width,
            height,
          });
        }

        // Completely white or washed out flash
        if (avgBrightness > 248 && contrastRange < 20) {
          return resolve({
            isValid: false,
            isLeaf: false,
            message: t.tooBright,
            width,
            height,
          });
        }

        // Almost zero contrast (solid single color plane)
        if (contrastRange < 15) {
          return resolve({
            isValid: false,
            isLeaf: false,
            message: t.unclear,
            width,
            height,
          });
        }

        const foliageRatio = plantFoliagePixels / pixelCount;
        const skinRatio = humanSkinPixels / pixelCount;
        const blueRatio = syntheticBluePixels / pixelCount;
        const neutralRatio = neutralGrayPixels / pixelCount;

        // STRICT LEAF CHECK:
        // Rule A: High human skin presence and low vegetation -> Person / Face / Hand
        if (skinRatio > 0.28 && foliageRatio < 0.16) {
          return resolve({
            isValid: false,
            isLeaf: false,
            message: t.notLeaf,
            objectDetected: 'Human / Skin',
            width,
            height,
            score: 10,
          });
        }

        // Rule B: High blue synthetic objects (clothes, car, sky, screen) and low vegetation
        if (blueRatio > 0.30 && foliageRatio < 0.12) {
          return resolve({
            isValid: false,
            isLeaf: false,
            message: t.notLeaf,
            objectDetected: 'Synthetic / Blue Object',
            width,
            height,
            score: 15,
          });
        }

        // Rule C: Neutral indoor surfaces, documents, appliances, walls with near zero foliage
        if (neutralRatio > 0.70 && foliageRatio < 0.10) {
          return resolve({
            isValid: false,
            isLeaf: false,
            message: t.notLeaf,
            objectDetected: 'Document / Appliance / Surface',
            width,
            height,
            score: 10,
          });
        }

        // Rule D: General minimum foliage threshold for agricultural crop leaves
        // Crop leaves in PlantVillage always have visible plant tissue (green, necrotic spots, or chlorosis)
        if (foliageRatio < 0.13) {
          return resolve({
            isValid: false,
            isLeaf: false,
            message: t.notLeaf,
            objectDetected: 'Non-Plant Object',
            width,
            height,
            score: 20,
          });
        }

        return resolve({
          isValid: true,
          isLeaf: true,
          message: t.leafVerified,
          width,
          height,
          score: Math.min(100, Math.round(foliageRatio * 70 + contrastRange * 0.3)),
        });
      } catch (err) {
        // Fallback to valid if canvas security policy restricts pixel reading
        return resolve({ isValid: true, isLeaf: true, message: t.good, width, height });
      }
    };

    img.onerror = () => {
      resolve({
        isValid: false,
        isLeaf: false,
        message: UI_TRANSLATIONS[lang].errors.unsupportedImage,
      });
    };

    img.src = dataUrl;
  });
}
