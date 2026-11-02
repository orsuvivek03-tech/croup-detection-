import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CropType } from '../types';
import { validateLeafImage } from '../services/imageValidation';

interface LiveCameraModalProps {
  isOpen: boolean;
  selectedCrop: CropType;
  onCropChange: (crop: CropType) => void;
  onClose: () => void;
  onCaptureImage: (imageDataUrl: string) => void;
}

export const LiveCameraModal: React.FC<LiveCameraModalProps> = ({
  isOpen,
  selectedCrop,
  onCropChange,
  onClose,
  onCaptureImage,
}) => {
  const { language, t, getCropName } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(true);
  const [qualityWarning, setQualityWarning] = useState<string | null>(null);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  // Initialize camera when modal opens
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
      setQualityWarning(null);
      setCameraError(null);
      return;
    }

    startCamera();

    // Check if device has multiple cameras
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoDevices = devices.filter((d) => d.kind === 'videoinput');
        setHasMultipleCameras(videoDevices.length > 1);
      }).catch(() => {});
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setIsStarting(true);
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('MediaDevices API not supported');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setIsStarting(false);
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setIsStarting(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError(t.camera.permissionDenied);
      } else if (err.name === 'NotFoundError') {
        setCameraError(t.camera.notFound);
      } else {
        // Retry with basic constraints
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          setStream(fallbackStream);
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            await videoRef.current.play();
          }
        } catch (fallbackErr) {
          setCameraError(t.camera.permissionDenied);
        }
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleSwitchCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    setCapturedImage(dataUrl);

    // Validate captured image quality and strictly check for leaf
    const quality = await validateLeafImage(dataUrl, language);
    if (!quality.isValid || !quality.isLeaf) {
      setQualityWarning(quality.message);
    } else {
      setQualityWarning(null);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setQualityWarning(null);
    if (!stream) {
      startCamera();
    }
  };

  const handleConfirmAnalyze = () => {
    if (!capturedImage) return;
    if (qualityWarning) {
      // Prevent analyzing non-leaf objects
      return;
    }
    stopCamera();
    onCaptureImage(capturedImage);
  };

  const handleCloseModal = () => {
    stopCamera();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 text-white flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-slate-900/90 border-b border-slate-800 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                {t.camera.title}
              </h2>
              <span className="text-xs text-emerald-400 font-medium">
                {getCropName(selectedCrop)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Crop quick-switch pill */}
            <div className="flex bg-slate-800 rounded-xl p-1 text-xs">
              {(['Tomato', 'Potato', 'Corn'] as CropType[]).map((c) => (
                <button
                  key={c}
                  onClick={() => onCropChange(c)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    selectedCrop === c
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {getCropName(c)}
                </button>
              ))}
            </div>

            <button
              onClick={handleCloseModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close camera"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[440px]">
          {/* Live Video View */}
          {!capturedImage && !cameraError && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Guiding Box Overlay: "Position the leaf inside the frame" */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-2 border-dashed border-emerald-400/90 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  {/* Corner accents */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />

                  {/* Gentle pulsing center crosshair */}
                  <div className="w-8 h-8 rounded-full border border-emerald-400/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-xs sm:text-sm font-semibold text-emerald-300 text-center shadow-md">
                  {t.camera.frameGuide}
                </div>
              </div>

              {isStarting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80">
                  <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-sm font-medium text-slate-300">
                    {t.camera.starting}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Captured Preview View */}
          {capturedImage && (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
              <img
                src={capturedImage}
                alt="Captured leaf"
                className="max-h-[380px] sm:max-h-[440px] w-auto object-contain rounded-xl shadow-lg"
              />

              {qualityWarning && (
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-rose-950/95 border border-rose-600 text-rose-200 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5 shadow-xl backdrop-blur-md">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-rose-300 text-sm">
                      {t.qualityCheck.nonLeafDetectedTitle}
                    </div>
                    <div className="mt-0.5 text-xs sm:text-sm text-rose-100">{qualityWarning}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error View (e.g. Permission denied) */}
          {cameraError && (
            <div className="p-6 text-center max-w-md">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Camera Access Needed
              </h3>
              <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                {cameraError}
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-colors"
                >
                  {t.camera.cancel}
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Modal Bottom Controls */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
          {!capturedImage ? (
            <>
              {/* Cancel */}
              <button
                onClick={handleCloseModal}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors"
              >
                {t.camera.cancel}
              </button>

              {/* Main Shutter Button */}
              <button
                onClick={handleCapture}
                disabled={isStarting || !!cameraError}
                className="relative group flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white text-slate-900 p-1 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Capture leaf photo"
              >
                <div className="w-full h-full rounded-full border-4 border-emerald-600 bg-white flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-600" />
                </div>
              </button>

              {/* Switch Camera */}
              <button
                onClick={handleSwitchCamera}
                disabled={isStarting || !!cameraError}
                className={`p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors flex items-center gap-1.5 ${
                  !hasMultipleCameras ? 'opacity-70' : ''
                }`}
                title={t.camera.switchCam}
              >
                <RefreshCw className="w-5 h-5" />
                <span className="text-xs hidden sm:inline">{t.camera.switchCam}</span>
              </button>
            </>
          ) : (
            <>
              {/* Retake */}
              <button
                onClick={handleRetake}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                  qualityWarning
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.camera.retake}</span>
              </button>

              {/* Confirm / Analyze Plant Button */}
              <button
                onClick={handleConfirmAnalyze}
                disabled={!!qualityWarning}
                className={`flex-1 max-w-xs flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all ${
                  qualityWarning
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer'
                }`}
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>{qualityWarning ? 'Leaf Required' : t.camera.analyze}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
