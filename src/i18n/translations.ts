import { SupportedLanguage } from '../types';

export const UI_TRANSLATIONS: Record<SupportedLanguage, {
  appName: string;
  tagline: string;
  nav: {
    dashboard: string;
    scanner: string;
    history: string;
    guide: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
    scanBtn: string;
    uploadBtn: string;
    selectCropBtn: string;
    selectCropTitle: string;
    selectCropSubtitle: string;
  };
  stats: {
    totalScans: string;
    healthyPlants: string;
    diseasesDetected: string;
    avgConfidence: string;
  };
  camera: {
    title: string;
    instructions: string;
    frameGuide: string;
    capture: string;
    switchCam: string;
    cancel: string;
    retake: string;
    analyze: string;
    permissionDenied: string;
    notFound: string;
    starting: string;
  };
  upload: {
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    browse: string;
    supportedFormats: string;
    previewTitle: string;
    analyzeBtn: string;
    chooseAnother: string;
    qualityChecking: string;
  };
  qualityCheck: {
    good: string;
    unclear: string;
    tooDark: string;
    tooBright: string;
    tooSmall: string;
    notLeaf: string;
    leafVerified: string;
    nonLeafDetectedTitle: string;
    nonLeafDetectedDesc: string;
  };
  loading: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    title: string;
  };
  result: {
    title: string;
    healthyTitle: string;
    diseaseTitle: string;
    confidenceLabel: string;
    severityLabel: string;
    symptomsTitle: string;
    recommendationsTitle: string;
    organicTitle: string;
    chemicalTitle: string;
    preventionTitle: string;
    scanAnother: string;
    savePrediction: string;
    savedToast: string;
    readAloud: string;
    stopAudio: string;
    printReport: string;
    healthyMessage: string;
    disclaimer: string;
    disclaimerContact: string;
    demoNotice: string;
  };
  history: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterTomato: string;
    filterPotato: string;
    filterCorn: string;
    filterHealthy: string;
    filterDisease: string;
    viewDetails: string;
    emptyState: string;
    emptySubtitle: string;
    clearAll: string;
    clearConfirm: string;
    leafThumb: string;
  };
  analytics: {
    title: string;
    subtitle: string;
    distributionTitle: string;
    overviewTitle: string;
    healthy: string;
    mild: string;
    moderate: string;
    severe: string;
  };
  guide: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterCrop: string;
    allCrops: string;
    viewFullInfo: string;
    causalOrganism: string;
  };
  about: {
    title: string;
    subtitle: string;
    deepLearningTitle: string;
    deepLearningDesc: string;
    datasetTitle: string;
    datasetDesc: string;
    apiTitle: string;
    apiDesc: string;
  };
  errors: {
    noImage: string;
    unsupportedImage: string;
    predictionFailed: string;
    networkError: string;
    cameraDenied: string;
    nonLeafObject: string;
  };
  severities: {
    Healthy: string;
    Mild: string;
    Moderate: string;
    Severe: string;
  };
}> = {
  en: {
    appName: 'Instant Plant Health Diagnosis',
    tagline: 'AI-Powered Plant Disease Detection for Farmers',
    nav: {
      dashboard: 'Dashboard',
      scanner: 'Scan Plant',
      history: 'Recent Predictions',
      guide: 'Disease Guide',
      about: 'About AI Model',
    },
    hero: {
      title: 'Check Your Plant Health Instantly',
      subtitle: 'Take a photo of your crop leaf and get an AI-powered health diagnosis in seconds.',
      scanBtn: '📷 Scan Plant',
      uploadBtn: '🖼 Upload Image',
      selectCropBtn: '🌱 Select Crop',
      selectCropTitle: 'Select Your Crop',
      selectCropSubtitle: 'Choose which crop leaf you are diagnosing for maximum AI accuracy',
    },
    stats: {
      totalScans: 'Plants Scanned',
      healthyPlants: 'Healthy Plants',
      diseasesDetected: 'Diseases Detected',
      avgConfidence: 'Average Confidence',
    },
    camera: {
      title: 'Live Leaf Scanner',
      instructions: 'Hold camera steadily and fill the green frame with a single leaf',
      frameGuide: 'Position the leaf inside the frame',
      capture: 'Capture Leaf',
      switchCam: 'Switch Camera',
      cancel: 'Cancel',
      retake: 'Retake Photo',
      analyze: 'Analyze Plant',
      permissionDenied: 'Camera access is required to scan a plant. Please allow camera access in your browser settings.',
      notFound: 'No camera found on your device.',
      starting: 'Starting camera stream...',
    },
    upload: {
      dropzoneTitle: 'Drag & drop your leaf photo here',
      dropzoneSubtitle: 'or click to browse from your device',
      browse: 'Browse Photos',
      supportedFormats: 'Supports JPG, JPEG, PNG, WEBP (Max 15MB)',
      previewTitle: 'Image Preview',
      analyzeBtn: 'Analyze Image',
      chooseAnother: 'Retake / Choose Another Image',
      qualityChecking: 'Validating leaf image quality...',
    },
    qualityCheck: {
      good: 'Image quality is good for analysis.',
      unclear: 'The image is unclear. Please take another photo with good lighting and keep the leaf inside the frame.',
      tooDark: 'The image appears too dark. Please take photo under sunlight or daylight.',
      tooBright: 'The image is washed out with glare. Please reduce direct flashlight.',
      tooSmall: 'Resolution is too low for reliable leaf inspection.',
      notLeaf: 'Non-leaf object detected. Please capture or upload only an agricultural plant leaf (Tomato, Potato, Corn). Other objects cannot be diagnosed.',
      leafVerified: 'Plant leaf verified: Ready for health analysis.',
      nonLeafDetectedTitle: 'Non-Leaf Object Detected',
      nonLeafDetectedDesc: 'This scanner only diagnoses plant leaves. Please remove non-plant objects (people, faces, hands, animals, vehicles, electronics, furniture) and focus closely on a crop leaf.',
    },
    loading: {
      title: 'Diagnosing Plant Health...',
      step1: 'Capturing and pre-processing leaf image...',
      step2: 'Analyzing leaf texture, color variations, and lesions...',
      step3: 'Matching against PlantVillage deep learning categories...',
      step4: 'Synthesizing farmer remedies and treatment recommendations...',
    },
    result: {
      title: 'Plant Health Result',
      healthyTitle: '🌿 Plant Appears Healthy',
      diseaseTitle: '⚠️ Disease Detected',
      confidenceLabel: 'AI Confidence',
      severityLabel: 'Severity Level',
      symptomsTitle: 'Key Symptoms Observed',
      recommendationsTitle: 'Recommended Actions for Farmer',
      organicTitle: '🌱 Organic & Biological Remedies',
      chemicalTitle: '🧪 Chemical Management (If Necessary)',
      preventionTitle: '🛡️ Prevention & Long-Term Care',
      scanAnother: 'Scan Another Plant',
      savePrediction: 'Save Prediction',
      savedToast: 'Saved to recent predictions history!',
      readAloud: '🔊 Listen to Diagnosis',
      stopAudio: '⏹ Stop Audio',
      printReport: '📄 Print / Export Report',
      healthyMessage: 'Your plant appears healthy based on the uploaded image. Continue regular monitoring and good farming practices.',
      disclaimer: 'AI diagnosis is an initial assessment and should not replace professional agricultural advice.',
      disclaimerContact: 'For severe or uncertain cases, consult a local agricultural expert or Krishi Vigyan Kendra (KVK).',
      demoNotice: 'Demo result based on PlantVillage classification model.',
    },
    history: {
      title: 'Recent Predictions Feed',
      subtitle: 'Previous leaf scans and disease diagnoses stored locally and on the server',
      filterAll: 'All Scans',
      filterTomato: 'Tomato',
      filterPotato: 'Potato',
      filterCorn: 'Corn',
      filterHealthy: 'Healthy',
      filterDisease: 'Diseased',
      viewDetails: 'View Details',
      emptyState: 'No predictions found',
      emptySubtitle: 'Take a photo or upload a leaf image to see predictions here.',
      clearAll: 'Clear History',
      clearConfirm: 'Are you sure you want to clear all prediction history?',
      leafThumb: 'Leaf Photo',
    },
    analytics: {
      title: 'Field Health Analytics',
      subtitle: 'Real-time overview of scanned crop health and detected conditions',
      distributionTitle: 'Disease Distribution (PlantVillage Categories)',
      overviewTitle: 'Crop Health Severity Breakdown',
      healthy: 'Healthy',
      mild: 'Mild',
      moderate: 'Moderate',
      severe: 'Severe',
    },
    guide: {
      title: 'PlantVillage Disease Reference Guide',
      subtitle: 'Comprehensive handbook for major Tomato, Potato, and Corn diseases with verified symptoms and remedies',
      searchPlaceholder: 'Search disease name or symptom...',
      filterCrop: 'Filter by crop:',
      allCrops: 'All Crops',
      viewFullInfo: 'View Management Guide',
      causalOrganism: 'Pathogen / Cause',
    },
    about: {
      title: 'AI & Deep Learning Architecture',
      subtitle: 'Designed for lightweight, high-accuracy agricultural edge diagnosis',
      deepLearningTitle: 'Deep Learning Model (MobileNetV2 / EfficientNet)',
      deepLearningDesc: 'Trained on 54,306+ annotated leaf images from the benchmark PlantVillage dataset. Lightweight depthwise-separable convolutions enable sub-second mobile inference with >96% validation accuracy.',
      datasetTitle: 'PlantVillage Dataset Reference',
      datasetDesc: 'Covers major Solanaceae and cereal crops including Tomato (7 classes), Potato (3 classes), and Corn (4 classes).',
      apiTitle: 'Plug-and-Play REST API Architecture',
      apiDesc: 'Frontend communicates via POST /api/predict. It seamlessly interfaces with Gemini Vision intelligence or a dedicated Python FastAPI/Flask PyTorch/TensorFlow inference backend.',
    },
    errors: {
      noImage: 'Please capture or upload a plant image.',
      unsupportedImage: 'Please upload a JPG, PNG, JPEG, or WEBP image.',
      predictionFailed: 'We couldn’t analyze this image. Please try again with a clearer leaf photo.',
      networkError: 'Connection problem. Please check your internet connection and try again.',
      cameraDenied: 'Camera access is required to scan a plant. Please allow camera access in your browser settings.',
      nonLeafObject: 'Only plant leaves are accepted. No non-leaf objects (faces, hands, furniture, cars, electronics) can be diagnosed.',
    },
    severities: {
      Healthy: 'Healthy',
      Mild: 'Mild Severity',
      Moderate: 'Moderate Severity',
      Severe: 'Severe / Critical',
    },
  },

  te: {
    appName: 'తక్షణ మొక్కల ఆరోగ్య నిర్ధారణ',
    tagline: 'రైతుల కోసం కృత్రిమ మేధస్సు (AI) ఆధారిత మొక్కల వ్యాధి గుర్తింపు',
    nav: {
      dashboard: 'డ్యాష్‌బోర్డ్',
      scanner: 'మొక్కను స్కాన్ చేయండి',
      history: 'ఇటీవలి అంచనాలు',
      guide: 'వ్యాధుల సమాచారం',
      about: 'AI మోడల్ వివరాలు',
    },
    hero: {
      title: 'మీ మొక్క ఆరోగ్యాన్ని క్షణాల్లో తనిఖీ చేయండి',
      subtitle: 'మీ పంట ఆకు ఫోటో తీయండి మరియు సెకన్లలో AI ఆధారిత ఆరోగ్య నిర్ధారణను పొందండి.',
      scanBtn: '📷 మొక్కను స్కాన్ చేయండి',
      uploadBtn: '🖼 ఫోటో అప్‌లోడ్ చేయండి',
      selectCropBtn: '🌱 పంటను ఎంచుకోండి',
      selectCropTitle: 'మీ పంటను ఎంచుకోండి',
      selectCropSubtitle: 'ఖచ్చితమైన ఫలితం కోసం మీరు స్కాన్ చేయాలనుకుంటున్న పంట ఆకును ఎంచుకోండి',
    },
    stats: {
      totalScans: 'మొత్తం స్కాన్ చేసిన మొక్కలు',
      healthyPlants: 'ఆరోగ్యకరమైన మొక్కలు',
      diseasesDetected: 'గుర్తించబడిన వ్యాధులు',
      avgConfidence: 'సగటు AI ఖచ్చితత్వం',
    },
    camera: {
      title: 'లైవ్ ఆకు స్కానర్',
      instructions: 'కెమెరాను స్థిరంగా పట్టుకుని, ఆకును ఆకుపచ్చ ఫ్రేమ్‌లో ఉంచండి',
      frameGuide: 'ఆకును ఫ్రేమ్ లోపల ఉంచండి',
      capture: 'ఫోటో తీయండి',
      switchCam: 'కెమెరా మార్చండి',
      cancel: 'రద్దు చేయండి',
      retake: 'మళ్ళీ ఫోటో తీయండి',
      analyze: 'మొక్కను విశ్లేషించండి',
      permissionDenied: 'మొక్కను స్కాన్ చేయడానికి కెమెరా అనుమతి అవసరం. దయచేసి మీ బ్రౌజర్ సెట్టింగ్స్‌లో కెమెరాను అనుమతించండి.',
      notFound: 'మీ పరికరంలో కెమెరా కనుగొనబడలేదు.',
      starting: 'కెమెరా ప్రారంభమవుతోంది...',
    },
    upload: {
      dropzoneTitle: 'మీ పంట ఆకు ఫోటోను ఇక్కడ వేయండి',
      dropzoneSubtitle: 'లేదా మీ ఫోన్ నుండి ఎంచుకోవడానికి ఇక్కడ క్లిక్ చేయండి',
      browse: 'ఫోటోలు ఎంచుకోండి',
      supportedFormats: 'JPG, JPEG, PNG, WEBP ఫార్మాట్లు (గరిష్టంగా 15MB)',
      previewTitle: 'ఫోటో ప్రివ్యూ',
      analyzeBtn: 'చిత్రాన్ని విశ్లేషించండి',
      chooseAnother: 'మరొక ఫోటో ఎంచుకోండి / తీయండి',
      qualityChecking: 'చిత్ర నాణ్యత తనిఖీ చేయబడుతోంది...',
    },
    qualityCheck: {
      good: 'చిత్ర నాణ్యత విశ్లేషణకు అనువుగా ఉంది.',
      unclear: 'ఫోటో స్పష్టంగా లేదు. దయచేసి మంచి వెలుతురులో ఆకును ఫ్రేమ్ లోపల ఉంచి మరొక ఫోటో తీయండి.',
      tooDark: 'ఫోటో చాలా చీకటిగా ఉంది. దయచేసి ఎండ లేదా పగటి వెలుతురులో తీయండి.',
      tooBright: 'ఫోటోలో మిరుమిట్లు గొలిపే వెలుగు ఉంది. దయచేసి స్పష్టంగా తీయండి.',
      tooSmall: 'ఫోటో పరిమాణం చాలా తక్కువగా ఉంది.',
      notLeaf: 'ఆకు కాని వస్తువు గుర్తించబడింది. దయచేసి పంట ఆకును మాత్రమే (టమోటా, బంగాళాదుంప, లేదా మొక్కజొన్న) స్కాన్ చేయండి లేదా అప్‌లోడ్ చేయండి. ఇతర వస్తువులను విశ్లేషించలేము.',
      leafVerified: 'మొక్క ఆకు గుర్తించబడింది మరియు ధృవీకరించబడింది.',
      nonLeafDetectedTitle: 'ఆకు కాని వస్తువు గుర్తించబడింది',
      nonLeafDetectedDesc: 'ఈ స్కానర్ పంట ఆకులను మాత్రమే విశ్లేషిస్తుంది. మనుషులు, ముఖాలు, చేతులు, జంతువులు, వాహనాలు లేదా ఇతర వస్తువులను కాకుండా ఆకును మాత్రమే ఫ్రేమ్‌లో ఉంచండి.',
    },
    loading: {
      title: 'మొక్క ఆరోగ్యాన్ని విశ్లేషిస్తోంది...',
      step1: 'ఆకు చిత్రాన్ని సిద్ధం చేస్తోంది...',
      step2: 'ఆకు రంగు, మచ్చలు మరియు లక్షణాలను పరిశీలిస్తోంది...',
      step3: 'ప్లాంట్‌విలేజ్ డేటాబేస్‌తో సరిపోలుస్తోంది...',
      step4: 'రైతుకు అవసరమైన నివారణా మార్గాలను రూపొందిస్తోంది...',
    },
    result: {
      title: 'మొక్క ఆరోగ్య ఫలితం',
      healthyTitle: '🌿 మొక్క ఆరోగ్యంగా ఉంది',
      diseaseTitle: '⚠️ వ్యాధి గుర్తించబడింది',
      confidenceLabel: 'AI ఖచ్చితత్వం',
      severityLabel: 'వ్యాధి తీవ్రత స్థాయి',
      symptomsTitle: 'గుర్తించబడిన ముఖ్య లక్షణాలు',
      recommendationsTitle: 'రైతు పాటించవలసిన తక్షణ సూచనలు',
      organicTitle: '🌱 సేంద్రీయ & జీవ నియంత్రణ నివారణలు',
      chemicalTitle: '🧪 రసాయన మందుల యాజమాన్యం (అవసరమైతే)',
      preventionTitle: '🛡️ ముందస్తు జాగ్రత్తలు & దీర్ఘకాలిక సంరక్షణ',
      scanAnother: 'మరొక మొక్కను స్కాన్ చేయండి',
      savePrediction: 'ఈ ఫలితాన్ని భద్రపరచండి',
      savedToast: 'ఇటీవలి అంచనాల జాబితాలో భద్రపరచబడింది!',
      readAloud: '🔊 ఫలితాన్ని వినండి (ఆడియో)',
      stopAudio: '⏹ ఆడియో ఆపండి',
      printReport: '📄 నివేదికను ముద్రించండి / డౌన్‌లోడ్ చేయండి',
      healthyMessage: 'అప్‌లోడ్ చేసిన చిత్రం ప్రకారం మీ మొక్క ఆరోగ్యంగా ఉంది. సాధారణ సంరక్షణ మరియు మంచి సాగు పద్ధతులను కొనసాగించండి.',
      disclaimer: 'ఈ AI నిర్ధారణ ప్రాథమిక అంచనా మాత్రమే మరియు ఇది వ్యవసాయ శాస్త్రవేత్తల సలహాకు ప్రత్యామ్నాయం కాదు.',
      disclaimerContact: 'తీవ్రమైన లేదా అనుమానాస్పద సందర్భాలలో స్థానిక కృషి విజ్ఞాన కేంద్రం (KVK) లేదా వ్యవసాయ అధికారిని సంప్రదించండి.',
      demoNotice: 'ప్లాంట్‌విలేజ్ వర్గీకరణ నమూనా ఆధారంగా డెమో ఫలితం.',
    },
    history: {
      title: 'ఇటీవలి అంచనాలు',
      subtitle: 'గతంలో చేసిన ఆకుల స్కానింగ్ ఫలితాలు మరియు వివరాలు',
      filterAll: 'అన్నీ',
      filterTomato: 'టమోటా',
      filterPotato: 'బంగాళాదుంప',
      filterCorn: 'మొక్కజొన్న',
      filterHealthy: 'ఆరోగ్యంగా ఉన్నవి',
      filterDisease: 'తెగులు సోకినవి',
      viewDetails: 'వివరాలు చూడండి',
      emptyState: 'ఎటువంటి రికార్డులు కనుగొనబడలేదు',
      emptySubtitle: 'ఇక్కడ ఫలితాలు చూడటానికి ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.',
      clearAll: 'చరిత్రను క్లియర్ చేయండి',
      clearConfirm: 'మీరు మునుపటి ఫలితాలన్నింటినీ తొలగించాలనుకుంటున్నారా?',
      leafThumb: 'ఆకు చిత్రం',
    },
    analytics: {
      title: 'పంట ఆరోగ్య విశ్లేషణ',
      subtitle: 'స్కాన్ చేసిన పంటల ఆరోగ్యం మరియు గుర్తించిన తెగుళ్ళ వివరాలు',
      distributionTitle: 'వ్యాధుల విస్తరణ (ప్లాంట్‌విలేజ్ కేటగిరీలు)',
      overviewTitle: 'పంట ఆరోగ్య తీవ్రత వర్గీకరణ',
      healthy: 'ఆరోగ్యకరమైనవి',
      mild: 'స్వల్ప తీవ్రత',
      moderate: 'మధ్యస్థ తీవ్రత',
      severe: 'అధిక తీవ్రత',
    },
    guide: {
      title: 'ప్లాంట్‌విలేజ్ వ్యాధుల సమగ్ర సమాచారం',
      subtitle: 'టమోటా, బంగాళాదుంప, మొక్కజొన్న పంటల వ్యాధుల లక్షణాలు మరియు యాజమాన్య పద్ధతులు',
      searchPlaceholder: 'వ్యాధి పేరు లేదా లక్షణాలను వెతకండి...',
      filterCrop: 'పంట ప్రకారం వడపోత:',
      allCrops: 'అన్ని పంటలు',
      viewFullInfo: 'యాజమాన్య పద్ధతులు చూడండి',
      causalOrganism: 'కారణమయ్యే సూక్ష్మజీవి',
    },
    about: {
      title: 'AI మరియు డీప్ లెర్నింగ్ ఆర్కిటెక్చర్',
      subtitle: 'రైతులకు వేగవంతమైన, ఖచ్చితమైన విశ్లేషణ అందించే నమూనా',
      deepLearningTitle: 'డీప్ లెర్నింగ్ మోడల్ (MobileNetV2 / EfficientNet)',
      deepLearningDesc: 'ప్లాంట్‌విలేజ్ డేటాసెట్‌లోని 54,306+ చిత్రాలతో శిక్షణ పొందింది. స్మార్ట్‌ఫోన్లలో కూడా సెకన్లలో 96% పైగా ఖచ్చితత్వంతో పనిచేస్తుంది.',
      datasetTitle: 'ప్లాంట్‌విలేజ్ డేటాసెట్ ప్రమాణాలు',
      datasetDesc: 'టమోటా (7 రకాలు), బంగాళాదుంప (3 రకాలు), మొక్కజొన్న (4 రకాలు) వ్యాధులపై సమగ్ర సమాచారం.',
      apiTitle: 'REST API ఆర్కిటెక్చర్',
      apiDesc: 'ఫ్రంటెండ్ POST /api/predict ద్వారా సర్వర్‌తో కమ్యూనికేట్ చేస్తుంది. భవిష్యత్తులో పైథాన్ ఫాస్ట్-ఏపీఐతో సులభంగా అనుసంధానించవచ్చు.',
    },
    errors: {
      noImage: 'దయచేసి మొక్క ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.',
      unsupportedImage: 'దయచేసి JPG, PNG, JPEG లేదా WEBP ఇమేజ్‌ను మాత్రమే ఎంచుకోండి.',
      predictionFailed: 'ఈ చిత్రాన్ని విశ్లేషించలేకపోయాము. దయచేసి మరింత స్పష్టమైన ఫోటోతో మళ్ళీ ప్రయత్నించండి.',
      networkError: 'ఇంటర్నెట్ కనెక్షన్ సమస్య. దయచేసి నెట్‌వర్క్ తనిఖీ చేసి మళ్ళీ ప్రయత్నించండి.',
      cameraDenied: 'మొక్కను స్కాన్ చేయడానికి కెమెరా అనుమతి అవసరం. దయచేసి సెట్టింగ్స్‌లో అనుమతించండి.',
      nonLeafObject: 'మొక్కల ఆకులు మాత్రమే అనుమతించబడతాయి. ఇతర వస్తువులు (ముఖాలు, చేతులు, ఫర్నిచర్, వాహనాలు, పరికరాలు) అనుమతించబడవు.',
    },
    severities: {
      Healthy: 'ఆరోగ్యంగా ఉంది',
      Mild: 'స్వల్ప తీవ్రత',
      Moderate: 'మధ్యస్థ తీవ్రత',
      Severe: 'తీవ్రమైన ప్రమాదం',
    },
  },

  hi: {
    appName: 'त्वरित पौध स्वास्थ्य निदान',
    tagline: 'किसानों के लिए एआई (AI) आधारित फसल रोग पहचान प्रणाली',
    nav: {
      dashboard: 'डैशबोर्ड',
      scanner: 'पौधा स्कैन करें',
      history: 'हाल की भविष्यवाणियाँ',
      guide: 'रोग मार्गदर्शिका',
      about: 'एआई मॉडल जानकारी',
    },
    hero: {
      title: 'अपने पौधे के स्वास्थ्य की तुरंत जांच करें',
      subtitle: 'अपनी फसल की पत्ती की तस्वीर लें और कुछ ही सेकंड में एआई द्वारा स्वास्थ्य निदान प्राप्त करें।',
      scanBtn: '📷 पौधे को स्कैन करें',
      uploadBtn: '🖼 फोटो अपलोड करें',
      selectCropBtn: '🌱 फसल चुनें',
      selectCropTitle: 'अपनी फसल का चयन करें',
      selectCropSubtitle: 'सटीक परिणाम पाने के लिए उस फसल का चयन करें जिसकी पत्ती आप स्कैन कर रहे हैं',
    },
    stats: {
      totalScans: 'कुल स्कैन किए गए पौधे',
      healthyPlants: 'स्वस्थ पौधे',
      diseasesDetected: 'पहचाने गए रोग',
      avgConfidence: 'औसत एआई सटीकता',
    },
    camera: {
      title: 'लाइव पत्ती स्कैनर',
      instructions: 'कैमरे को स्थिर रखें और पत्ती को हरे फ्रेम के अंदर रखें',
      frameGuide: 'पत्ती को फ्रेम के अंदर रखें',
      capture: 'फोटो खींचें',
      switchCam: 'कैमरा बदलें',
      cancel: 'रद्द करें',
      retake: 'दोबारा फोटो लें',
      analyze: 'पौधे का विश्लेषण करें',
      permissionDenied: 'पौधे को स्कैन करने के लिए कैमरा एक्सेस आवश्यक है। कृपया अपनी ब्राउज़र सेटिंग्स में कैमरा चालू करें।',
      notFound: 'आपके डिवाइस पर कोई कैमरा नहीं मिला।',
      starting: 'कैमरा चालू हो रहा है...',
    },
    upload: {
      dropzoneTitle: 'अपनी फसल की पत्ती की फोटो यहाँ खींचें',
      dropzoneSubtitle: 'या अपने फोन से चुनने के लिए यहाँ क्लिक करें',
      browse: 'फोटो चुनें',
      supportedFormats: 'JPG, JPEG, PNG, WEBP फाइलें (अधिकतम 15MB)',
      previewTitle: 'फोटो का पूर्वावलोकन',
      analyzeBtn: 'फोटो का विश्लेषण करें',
      chooseAnother: 'दूसरी फोटो चुनें या खींचें',
      qualityChecking: 'फोटो गुणवत्ता की जांच की जा रही है...',
    },
    qualityCheck: {
      good: 'फोटो की गुणवत्ता विश्लेषण के लिए उपयुक्त है।',
      unclear: 'फोटो स्पष्ट नहीं है। कृपया अच्छी रोशनी में पत्ती को फ्रेम के अंदर रखकर दोबारा फोटो लें।',
      tooDark: 'फोटो में बहुत अंधेरा है। कृपया धूप या दिन के उजाले में फोटो लें।',
      tooBright: 'फोटो में बहुत अधिक चमक है। कृपया साफ फोटो लें।',
      tooSmall: 'फोटो का आकार बहुत छोटा है।',
      notLeaf: 'पत्ती के अलावा अन्य वस्तु पहचानी गई। कृपया केवल फसल की पत्ती (टमाटर, आलू, या मक्का) की फोटो लें या अपलोड करें। अन्य वस्तुओं का निदान नहीं किया जा सकता।',
      leafVerified: 'पौधे की पत्ती पहचानी और सत्यापित की गई।',
      nonLeafDetectedTitle: 'पत्ती के अलावा अन्य वस्तु मिली',
      nonLeafDetectedDesc: 'यह स्कैनर केवल पौधों की पत्तियों का निदान करता है। चेहरे, हाथ, जानवर, वाहन या अन्य सामान को हटाकर केवल फसल की पत्ती को फ्रेम में रखें।',
    },
    loading: {
      title: 'पौधे के स्वास्थ्य की जांच हो रही है...',
      step1: 'पत्ती की तस्वीर को तैयार किया जा रहा है...',
      step2: 'पत्ती के रंग, धब्बों और लक्षणों का विश्लेषण जारी है...',
      step3: 'प्लांटविलेज डेटाबेस से मिलान किया जा रहा है...',
      step4: 'किसान के लिए रोकथाम और उपचार के उपाय तैयार किए जा रहे हैं...',
    },
    result: {
      title: 'पौध स्वास्थ्य परिणाम',
      healthyTitle: '🌿 पौधा स्वस्थ दिखाई देता है',
      diseaseTitle: '⚠️ रोग पाया गया',
      confidenceLabel: 'एआई सटीकता (Confidence)',
      severityLabel: 'रोग की गंभीरता',
      symptomsTitle: 'पहचाने गए मुख्य लक्षण',
      recommendationsTitle: 'किसान के लिए तुरंत करने योग्य उपाय',
      organicTitle: '🌱 जैविक व प्राकृतिक उपचार',
      chemicalTitle: '🧪 रासायनिक नियंत्रण (आवश्यकता पड़ने पर)',
      preventionTitle: '🛡️ रोकथाम एवं दीर्घकालिक देखभाल',
      scanAnother: 'दूसरा पौधा स्कैन करें',
      savePrediction: 'यह परिणाम सहेजें',
      savedToast: 'हाल की भविष्यवाणियों में सुरक्षित कर लिया गया!',
      readAloud: '🔊 परिणाम सुनें (ऑडियो)',
      stopAudio: '⏹ ऑडियो बंद करें',
      printReport: '📄 रिपोर्ट प्रिंट / डाउनलोड करें',
      healthyMessage: 'अपलोड की गई तस्वीर के अनुसार आपका पौधा स्वस्थ है। नियमित निगरानी और अच्छी कृषि पद्धतियाँ जारी रखें।',
      disclaimer: 'यह एआई निदान एक प्रारंभिक मूल्यांकन है और यह कृषि विशेषज्ञों की सलाह का विकल्प नहीं है।',
      disclaimerContact: 'गंभीर स्थिति में अपने नजदीकी कृषि विज्ञान केंद्र (KVK) या कृषि विशेषज्ञ से परामर्श लें।',
      demoNotice: 'प्लांटविलेज वर्गीकरण मॉडल पर आधारित डेमो परिणाम।',
    },
    history: {
      title: 'हाल की भविष्यवाणियाँ',
      subtitle: 'आपके द्वारा पहले स्कैन की गई पत्तियों और उनके परिणामों का इतिहास',
      filterAll: 'सभी स्कैन',
      filterTomato: 'टमाटर',
      filterPotato: 'आलू',
      filterCorn: 'मक्का',
      filterHealthy: 'स्वस्थ',
      filterDisease: 'रोगग्रस्त',
      viewDetails: 'विवरण देखें',
      emptyState: 'कोई पिछला रिकॉर्ड नहीं मिला',
      emptySubtitle: 'यहाँ रिकॉर्ड देखने के लिए किसी पत्ती की फोटो लें या अपलोड करें।',
      clearAll: 'इतिहास साफ करें',
      clearConfirm: 'क्या आप सचमुच सभी पिछले रिकॉर्ड हटाना चाहते हैं?',
      leafThumb: 'पत्ती का चित्र',
    },
    analytics: {
      title: 'खेत स्वास्थ्य विश्लेषण',
      subtitle: 'स्कैन की गई फसलों के स्वास्थ्य और बीमारियों का वास्तविक समय विवरण',
      distributionTitle: 'रोग वितरण (प्लांटविलेज श्रेणियां)',
      overviewTitle: 'फसल स्वास्थ्य गंभीरता का वर्गीकरण',
      healthy: 'स्वस्थ',
      mild: 'हल्की गंभीरता',
      moderate: 'मध्यम गंभीरता',
      severe: 'अत्यधिक गंभीर',
    },
    guide: {
      title: 'प्लांटविलेज रोग संदर्भ मार्गदर्शिका',
      subtitle: 'टमाटर, आलू और मक्का के प्रमुख रोगों के लक्षण और संपूर्ण रोकथाम मार्गदर्शिका',
      searchPlaceholder: 'रोग का नाम या लक्षण खोजें...',
      filterCrop: 'फसल के अनुसार छांटें:',
      allCrops: 'सभी फसलें',
      viewFullInfo: 'रोकथाम उपाय देखें',
      causalOrganism: 'रोगजनक / कारण',
    },
    about: {
      title: 'एआई एवं डीप लर्निंग वास्तुकला',
      subtitle: 'किसानों के लिए तेज और सटीक मोबाइल आधारित निदान',
      deepLearningTitle: 'डीप लर्निंग मॉडल (MobileNetV2 / EfficientNet)',
      deepLearningDesc: 'प्लांटविलेज डेटासेट की 54,306+ प्रमाणित छवियों पर प्रशिक्षित। 96% से अधिक सटीकता के साथ स्मार्टफोन पर सेकंडों में परिणाम देता है।',
      datasetTitle: 'प्लांटविलेज डेटासेट संदर्भ',
      datasetDesc: 'टमाटर (7 श्रेणियां), आलू (3 श्रेणियां), और मक्का (4 श्रेणियां) के रोगों का सटीक वर्गीकरण।',
      apiTitle: 'प्लग-एंड-प्ले REST API आर्किटेक्चर',
      apiDesc: 'फ्रंटएंड POST /api/predict द्वारा सर्वर से जुड़ता है। इसे किसी भी पायथन फास्ट-एपीआई / फ्लास्क मॉडल से आसानी से बदला जा सकता है।',
    },
    errors: {
      noImage: 'कृपया पौधे की पत्ती की तस्वीर लें या अपलोड करें।',
      unsupportedImage: 'कृपया केवल JPG, PNG, JPEG या WEBP फाइल अपलोड करें।',
      predictionFailed: 'हम इस तस्वीर का विश्लेषण नहीं कर सके। कृपया अधिक स्पष्ट फोटो के साथ पुनः प्रयास करें।',
      networkError: 'इंटरनेट कनेक्शन में समस्या है। कृपया नेटवर्क जांचकर पुनः प्रयास करें।',
      cameraDenied: 'पौधा स्कैन करने के लिए कैमरा अनुमति आवश्यक है। कृपया सेटिंग्स में अनुमति दें।',
      nonLeafObject: 'केवल पौधों की पत्तियां स्वीकार्य हैं। चेहरे, हाथ, फर्नीचर, वाहन जैसी गैर-पत्ती वस्तुओं का परीक्षण नहीं हो सकता।',
    },
    severities: {
      Healthy: 'स्वस्थ पौधा',
      Mild: 'हल्की गंभीरता',
      Moderate: 'मध्यम गंभीरता',
      Severe: 'अत्यधिक गंभीर / संकटपूर्ण',
    },
  },
};
