import { CropType, DiseaseInfo } from '../types';

export const CROPS_METADATA: Record<CropType, {
  name: { en: string; te: string; hi: string };
  scientificName: string;
  icon: string;
  color: string;
  description: { en: string; te: string; hi: string };
  diseasesCount: number;
}> = {
  Tomato: {
    name: {
      en: 'Tomato',
      te: 'టమోటా',
      hi: 'टमाटर',
    },
    scientificName: 'Solanum lycopersicum',
    icon: '🍅',
    color: 'emerald',
    description: {
      en: 'Major cash crop susceptible to fungal leaf blights, molds, and bacterial spots.',
      te: 'శిలీంధ్రాల తెగుళ్లు, బూజు మరియు బాక్టీరియల్ మచ్చలకు గురయ్యే ప్రధాన వాణిజ్య పంట.',
      hi: 'अगेती व पछेती झुलसा, फफूंद और जीवाणु धब्बों के प्रति संवेदनशील प्रमुख फसल।',
    },
    diseasesCount: 7,
  },
  Potato: {
    name: {
      en: 'Potato',
      te: 'బంగాళాదుంప',
      hi: 'आलू',
    },
    scientificName: 'Solanum tuberosum',
    icon: '🥔',
    color: 'amber',
    description: {
      en: 'Tuber crop prone to devastating Late Blight epidemics and Early Blight defoliation.',
      te: 'తీవ్రమైన లేట్ బ్లైట్ మరియు ఎర్లీ బ్లైట్ తెగుళ్ళ వలన ఆకులు రాలిపోయే దుంప పంట.',
      hi: 'पछेती व अगेती झुलसा जैसी घातक बीमारियों से अत्यधिक प्रभावित होने वाली कंद फसल।',
    },
    diseasesCount: 3,
  },
  Corn: {
    name: {
      en: 'Corn / Maize',
      te: 'మొక్కజొన్న',
      hi: 'मक्का',
    },
    scientificName: 'Zea mays',
    icon: '🌽',
    color: 'yellow',
    description: {
      en: 'Cereal grain vulnerable to rust pustules, gray rectangular lesions, and cigar-shaped blights.',
      te: 'తుప్పు తెగులు, బూడిద దీర్ఘచతురస్రాకార మచ్చలు మరియు పొడవాటి ఆకు ఎండు తెగులు సోకే తృణధాన్య పంట.',
      hi: 'रतुआ, धूसर पत्ती धब्बा और उत्तरी झुलसा से प्रभावित होने वाली प्रमुख खाद्यान्न फसल।',
    },
    diseasesCount: 4,
  },
};

export const PLANT_VILLAGE_DISEASES: DiseaseInfo[] = [
  // TOMATO
  {
    key: 'tomato_early_blight',
    crop: 'Tomato',
    name: {
      en: 'Tomato Early Blight',
      te: 'టమోటా ప్రారంభ ఎండు తెగులు (ఎర్లీ బ్లైట్)',
      hi: 'टमाटर अगेती झुलसा (Early Blight)',
    },
    isHealthy: false,
    typicalSeverity: 'Moderate',
    symptoms: {
      en: [
        'Dark brown circular spots with characteristic concentric rings (target-board pattern)',
        'Yellowing halo around infected spots',
        'Lower, older leaves affected first, progressing upwards',
        'Premature leaf shedding and sunscald on fruits',
      ],
      te: [
        'వృత్తాకార ముదురు గోధుమ రంగు మచ్చలు మరియు కేంద్రక వలయాలు',
        'మచ్చల చుట్టూ పసుపు రంగు వలయం',
        'మొదట క్రింది మరియు పాత ఆకులకు సోకి పైకి వ్యాపిస్తుంది',
        'ఆకులు రాలిపోవడం మరియు కాయలపై ఎండ దెబ్బ',
      ],
      hi: [
        'पत्तियों पर गहरे भूरे रंग के संकेंद्री छल्लेदार (टारगेट बोर्ड) धब्बे',
        'धब्बों के चारों ओर पीलापन',
        'सबसे पहले निचली पुरानी पत्तियों का प्रभावित होना',
        'पत्तियों का समय से पहले झड़ना और फलों पर दाग',
      ],
    },
    recommendations: {
      en: [
        'Prune and destroy heavily infected lower foliage to reduce spore splash',
        'Water at soil level via drip irrigation; avoid overhead watering',
        'Stake and prune vines to maintain dry canopy and good airflow',
        'Rotate crops for 2-3 years avoiding Solanaceous family members',
      ],
      te: [
        'తీవ్రంగా ప్రభావితమైన కింది ఆకులను కత్తిరించి నాశనం చేయండి',
        'డ్రిప్ ద్వారా నేల దగ్గరే నీరు పెట్టండి; పైనుండి నీరు చిలకరించవద్దు',
        'మొక్కలకు కర్రల ఊతం ఇచ్చి గాలి వెలుతురు బాగా తగిలేలా చేయండి',
        'టమోటా, వంగ, బంగాళాదుంప లేని పంట మార్పిడి 2-3 ఏళ్ళు పాటించండి',
      ],
      hi: [
        'संक्रमित निचली पत्तियों को तोड़कर खेत से दूर नष्ट करें',
        'ड्रिप विधि से सिंचाई करें; पत्तियों पर ऊपर से पानी न डालें',
        'पौधों को सहारा देकर बांधें ताकि वायु संचार बेहतर रहे',
        '2-3 साल तक सोलेनेसी कुल के पौधों के साथ फसल चक्र अपनाएं',
      ],
    },
    organicTreatment: {
      en: [
        'Spray Copper Oxychloride or Bordeaux mixture (1%) at early symptom onset',
        'Apply Trichoderma viride or Bacillus subtilis biological bio-fungicide',
        'Neem oil spray (5ml per liter of water) mixed with mild soap emulsifier',
      ],
      te: [
        'కాపర్ ఆక్సిక్లోరైడ్ లేదా 1% బోర్డో మిశ్రమం పిచికారీ చేయండి',
        'ట్రైకోడెర్మా విరిడే లేదా బాసిల్లస్ సబ్టిలిస్ జీవ శిలీంధ్ర నాశిని వాడండి',
        'లీటరు నీటికి 5 మి.లీ వేప నూనె కలిపి పిచికారీ చేయండి',
      ],
      hi: [
        'शुरुआती लक्षण पर कॉपर ऑक्सीक्लोराइड या 1% बोर्डो मिश्रण का छिड़काव करें',
        'ट्राइकोडर्मा विरिडी या बैसिलस सबटिलिस जैव कवकनाशी का प्रयोग करें',
        'नीम का तेल (5 मिली प्रति लीटर पानी) मिलाकर छिड़कें',
      ],
    },
    chemicalTreatment: {
      en: [
        'Mancozeb 75% WP @ 2.5g per liter of water',
        'Chlorothalonil 75% WP @ 2g per liter of water',
        'Azoxystrobin 23% SC @ 1ml per liter for advanced spread',
      ],
      te: [
        'మ్యాంకోజెబ్ 75% WP లీటరు నీటికి 2.5 గ్రాములు కలపండి',
        'క్లోరోథలోనిల్ 75% WP లీటరు నీటికి 2 గ్రాములు పిచికారీ చేయండి',
        'తీవ్రత ఎక్కువైతే అజాక్సిస్ట్రోబిన్ 23% SC లీటరుకు 1 మి.లీ వాడండి',
      ],
      hi: [
        'मैनकोजेब 75% WP @ 2.5 ग्राम प्रति लीटर पानी',
        'क्लोरोथैलोनिल 75% WP @ 2 ग्राम प्रति लीटर पानी',
        'अधिक फैलाव होने पर एज़ोक्सिस्ट्रोबिन 23% SC @ 1 मिली प्रति लीटर',
      ],
    },
    prevention: {
      en: [
        'Use certified disease-free seeds',
        'Maintain proper planting distance (60cm x 45cm)',
        'Mulch soil surface with straw or plastic to block soil spores',
      ],
      te: [
        'ధృవీకరించబడిన నాణ్యమైన విత్తనాలను మాత్రమే వాడండి',
        'మొక్కల మధ్య సరైన దూరం (60 సెం.మీ x 45 సెం.మీ) పాటించండి',
        'నేలపై ఎండుగడ్డి లేదా ప్లాస్టిక్ మల్చింగ్ వేయండి',
      ],
      hi: [
        'प्रमाणित और रोगमुक्त बीजों का ही उपयोग करें',
        'पौधों के बीच उचित दूरी (60 सेमी x 45 सेमी) रखें',
        'मिट्टी पर पुआल या प्लास्टिक मल्चिंग बिछाएं',
      ],
    },
    description: {
      en: 'Fungal disease caused by Alternaria solani, flourishing in warm, humid weather with frequent rainfall or heavy dew.',
      te: 'ఆల్టర్నేరియా సొలానీ వల్ల వచ్చే శిలీంధ్ర వ్యాధి, వేడి మరియు తేమతో కూడిన వాతావరణంలో వేగంగా వ్యాపిస్తుంది.',
      hi: 'अल्टरनेरिया सोलानी कवक द्वारा होने वाला रोग, जो गर्म और उमस भरे मौसम में तेजी से फैलता है।',
    },
    colorTheme: '#D97706',
  },
  {
    key: 'tomato_late_blight',
    crop: 'Tomato',
    name: {
      en: 'Tomato Late Blight',
      te: 'టమోటా చివరి ఎండు తెగులు (లేట్ బ్లైట్)',
      hi: 'टमाटर पछेती झुलसा (Late Blight)',
    },
    isHealthy: false,
    typicalSeverity: 'Severe',
    symptoms: {
      en: [
        'Large, irregular water-soaked pale green or purplish-brown lesions',
        'White fuzzy fungal growth on the underside of leaves during high humidity',
        'Entire vine can wilt and turn brown within days resembling frost damage',
        'Greasy brown firm rot patches developing on fruit',
      ],
      te: [
        'నీటితో తడిసినట్టు ఉండే పెద్ద ఆకుపచ్చ లేదా గోధుమ రంగు మచ్చలు',
        'ఎక్కువ తేమ ఉన్నప్పుడు ఆకుల క్రింది భాగంలో తెల్లని బూజు వంటి పొర',
        'కొద్ది రోజుల్లోనే మొక్క మొత్తం కాలిపోయినట్లు ఎండిపోవడం',
        'టమోటా కాయలపై జిడ్డుగల గోధుమ రంగు కుళ్ళు మచ్చలు',
      ],
      hi: [
        'पत्तियों पर बड़े, अनियमित पानी सोखे हुए बैंगनी-भूरे रंग के धब्बे',
        'अधिक नमी में पत्तियों की निचली सतह पर सफेद रुई जैसी फफूंद',
        'कुछ ही दिनों में पूरा पौधा झुलस कर भूरा हो जाना',
        'फलों पर सख्त भूरे रंग के सड़े हुए धब्बे दिखाई देना',
      ],
    },
    recommendations: {
      en: [
        'Act immediately: Late blight spreads rapidly through wind and can destroy whole fields',
        'Bag and remove diseased plants entirely; do not compost them',
        'Cease overhead sprinkler irrigation',
        'Warn neighboring farmers as airborne sporangia travel miles',
      ],
      te: [
        'వెంటనే చర్య తీసుకోండి: లేట్ బ్లైట్ గాలి ద్వారా వ్యాపించి పంట మొత్తాన్ని నాశనం చేస్తుంది',
        'వ్యాధి సోకిన మొక్కలను కవర్లలో పెట్టి పీకేసి కాల్చండి; కంపోస్ట్ చేయవద్దు',
        'పైనుండి నీరు చల్లడం వెంటనే ఆపండి',
        'చుట్టుపక్కల రైతులకు కూడా సమాచారం ఇవ్వండి',
      ],
      hi: [
        'तुरंत कार्रवाई करें: यह रोग हवा से तेजी से फैलकर पूरी फसल चौपट कर देता है',
        'संक्रमित पौधों को उखाड़कर नष्ट करें; खाद के गड्ढे में न डालें',
        'फव्वारा सिंचाई तुरंत बंद करें',
        'आस-पास के किसानों को सूचित करें क्योंकि बीजाणु दूर तक उड़ते हैं',
      ],
    },
    organicTreatment: {
      en: [
        'Preventative copper hydroxide sprays before humid rainy conditions',
        'Bio-control using Potassium Phosphite or Bacillus amyloliquefaciens',
      ],
      te: [
        'వర్షాలు, తేమ రాకముందే ముందస్తుగా కాపర్ హైడ్రాక్సైడ్ పిచికారీ చేయండి',
        'పొటాషియం ఫాస్ఫైట్ లేదా జీవ నియంత్రణ శిలీంధ్రాలు వాడండి',
      ],
      hi: [
        'बारिश या अत्यधिक नमी से पहले ही कॉपर हाइड्रॉक्साइड का छिड़काव करें',
        'पोटेशियम फॉस्फाइट या बैसिलस आधारित जैव कवकनाशी का प्रयोग करें',
      ],
    },
    chemicalTreatment: {
      en: [
        'Metalaxyl + Mancozeb (Ridomil MZ) @ 2g per liter',
        'Cymoxanil + Mancozeb @ 2g per liter for curative intervention',
        'Dimethomorph 50% WP @ 1g per liter during outbreak conditions',
      ],
      te: [
        'మెటాలాక్సిల్ + మ్యాంకోజెబ్ (రిడోమిల్) లీటరు నీటికి 2 గ్రాములు కలపండి',
        'సైమోక్సానిల్ + మ్యాంకోజెబ్ లీటరుకు 2 గ్రాములు పిచికారీ చేయండి',
        'డైమెథోమార్ఫ్ 50% WP లీటరు నీటికి 1 గ్రాము చొప్పున వాడండి',
      ],
      hi: [
        'मेटालेक्सिल + मैनकोजेब (रिडोमिल) @ 2 ग्राम प्रति लीटर पानी',
        'साइमोक्सानिल + मैनकोजेब @ 2 ग्राम प्रति लीटर पानी',
        'डाइमेथोमोर्फ 50% WP @ 1 ग्राम प्रति लीटर पानी का छिड़काव',
      ],
    },
    prevention: {
      en: [
        'Plant resistant cultivars if available',
        'Ensure open canopy and sunny exposure',
        'Destroy volunteer tomato and potato cull piles before planting season',
      ],
      te: [
        'తెగులు తట్టుకునే రకాలను ఎంచుకోండి',
        'మంచి సూర్యరశ్మి మరియు గాలి తగిలేలా చూడండి',
        'పాత టమోటా మరియు బంగాళాదుంప అవశేషాలను పూర్తిగా తొలగించండి',
      ],
      hi: [
        'रोग प्रतिरोधी किस्मों की बुवाई करें',
        'पौधों को उचित धूप और खुली हवा मिलने दें',
        'पुराने आलू व टमाटर के अवशेषों को खेत के पास जमा न होने दें',
      ],
    },
    description: {
      en: 'Devastating disease caused by the oomycete Phytophthora infestans, famous for the Irish Potato Famine. Occurs in cool, wet weather (15-22°C).',
      te: 'ఫైటోఫ్తోరా ఇన్ఫెస్టాన్స్ అనే సూక్ష్మజీవి వల్ల వచ్చే ప్రమాదకరమైన తెగులు. చల్లని మరియు వర్షపు వాతావరణంలో త్వరగా వ్యాపిస్తుంది.',
      hi: 'फाइटोफ्थोरा इन्फेस्टन्स द्वारा जनित विनाशकारी रोग, जो ठंडे और गीले मौसम (15-22°C) में अत्यंत आक्रामक होता है।',
    },
    colorTheme: '#DC2626',
  },
  {
    key: 'tomato_leaf_mold',
    crop: 'Tomato',
    name: {
      en: 'Tomato Leaf Mold',
      te: 'టమోటా ఆకు బూజు తెగులు (లీఫ్ మోల్డ్)',
      hi: 'टमाटर पत्ती फफूंद (Leaf Mold)',
    },
    isHealthy: false,
    typicalSeverity: 'Moderate',
    symptoms: {
      en: [
        'Pale greenish-yellow indistinct spots on upper leaf surfaces',
        'Dense olive-green to velvet brown mold layer beneath leaves',
        'Infected leaves roll up, wither, and drop prematurely',
      ],
      te: [
        'ఆకు పైభాగంలో లేత పసుపు-పచ్చని మచ్చలు',
        'ఆకు క్రింది భాగంలో ఆలివ్ ఆకుపచ్చ లేదా గోధుమ రంగు వెల్వెట్ బూజు',
        'ఆకులు ముడుచుకుపోయి ఎండి రాలిపోతాయి',
      ],
      hi: [
        'पत्ती की ऊपरी सतह पर हल्के पीले-हरे धब्बे',
        'पत्ती की निचली सतह पर जैतून जैसे हरे-भूरे मखमली फफूंद की परत',
        'पत्तियां मुड़कर सूखने और गिरने लगती हैं',
      ],
    },
    recommendations: {
      en: [
        'Maximize ventilation in polytunnels or greenhouses (keep humidity < 85%)',
        'Increase plant spacing and prune lower suckers',
        'Water early in the morning so leaves dry quickly',
      ],
      te: [
        'గ్రీన్ హౌస్ లేదా పాలీహౌస్‌లలో గాలి బాగా ఆడేలా వెంటిలేషన్ పెంచండి',
        'మొక్కల మధ్య దూరం పెంచి అదనపు కొమ్మలను తొలగించండి',
        'ఆకులు త్వరగా ఆరిపోయేలా ఉదయమే నీరు పెట్టండి',
      ],
      hi: [
        'पॉलीहाउस या खेत में वायु संचार बढ़ाएं (नमी 85% से कम रखें)',
        'पौधों के बीच की दूरी बढ़ाएं और निचली शाखाओं की छंटाई करें',
        'सुबह जल्दी पानी दें ताकि पत्तियां दिनभर में सूख जाएं',
      ],
    },
    organicTreatment: {
      en: [
        'Potassium bicarbonate spray (3g/L) to alter leaf surface pH',
        'Copper-based organic protectant fungicides',
      ],
      te: [
        'పొటాషియం బైకార్బోనేట్ (లీటరుకు 3 గ్రాములు) పిచికారీ చేయండి',
        'కాపర్ ఆధారిత సేంద్రీయ శిలీంధ్ర నాశిని వాడండి',
      ],
      hi: [
        'पोटैशियम बाइकार्बोनेट (3 ग्राम/लीटर) का छिड़काव करें',
        'कॉपर आधारित जैविक कवकनाशी का प्रयोग करें',
      ],
    },
    chemicalTreatment: {
      en: [
        'Difenoconazole 25% EC @ 1ml per liter',
        'Thiophanate Methyl 70% WP @ 1g per liter',
      ],
      te: [
        'డైఫెనోకోనజోల్ 25% EC లీటరు నీటికి 1 మి.లీ కలపండి',
        'థియోఫానేట్ మిథైల్ 70% WP లీటరుకు 1 గ్రాము పిచికారీ చేయండి',
      ],
      hi: [
        'डाईफेनोकोनाजोल 25% EC @ 1 मिली प्रति लीटर पानी',
        'थियोफेनेट मिथाइल 70% WP @ 1 ग्राम प्रति लीटर पानी',
      ],
    },
    prevention: {
      en: [
        'Avoid high relative humidity (>85%)',
        'Sterilize greenhouse structures between crops',
      ],
      te: [
        'ఎక్కువ తేమ ఉండకుండా జాగ్రత్త వహించండి',
        'పంట ముగిసిన తర్వాత పరికరాలను శుభ్రపరచండి',
      ],
      hi: [
        'उच्च आर्द्रता (>85%) से बचाव रखें',
        'ग्रीनहाउस में स्वच्छता और उचित दूरी बनाए रखें',
      ],
    },
    description: {
      en: 'Fungus Passalora fulva thriving in warm conditions with relative humidity above 85%, especially common in greenhouses.',
      te: 'పాసలోరా ఫుల్వా అనే శిలీంధ్రం వల్ల 85% కంటే ఎక్కువ తేమ ఉన్నప్పుడు ఈ వ్యాధి వస్తుంది.',
      hi: 'पासालोरा फुल्वा फफूंद द्वारा जनित रोग जो 85% से अधिक आर्द्रता और गर्म माहौल में पनपता है।',
    },
    colorTheme: '#854D0E',
  },
  {
    key: 'tomato_septoria_leaf_spot',
    crop: 'Tomato',
    name: {
      en: 'Tomato Septoria Leaf Spot',
      te: 'టమోటా సెప్టోరియా ఆకుమచ్చ తెగులు',
      hi: 'टमाटर सेप्टोरिया पत्ती धब्बा (Septoria Leaf Spot)',
    },
    isHealthy: false,
    typicalSeverity: 'Moderate',
    symptoms: {
      en: [
        'Numerous small, circular spots (1.5 - 3mm) with gray/tan centers and dark brown margins',
        'Tiny black specks (pycnidia fruiting bodies) visible in center of spots',
        'Yellowing leaf tissue surrounding dense spots leading to leaf drop',
      ],
      te: [
        'ముదురు గోధుమ అంచులు మరియు బూడిద రంగు కేంద్రంతో చిన్న వృత్తాకార మచ్చలు',
        'మచ్చల మధ్యలో చిన్న నల్లటి చుక్కలు (శిలీంధ్ర బీజాలు) కనిపిస్తాయి',
        'మచ్చలు ఎక్కువై ఆకులు పసుపు రంగులోకి మారి రాలిపోతాయి',
      ],
      hi: [
        'छोटे गोल धब्बे (1.5-3 मिमी) जिनके केंद्र में धूसर और किनारे गहरे भूरे होते हैं',
        'धब्बों के बीच में छोटे काले बिंदु (कवक के बीजाणु) दिखाई देना',
        'धब्बों के आस-पास पत्ती का पीला पड़ना और नीचे से झड़ना',
      ],
    },
    recommendations: {
      en: [
        'Keep plants upright with trellises to prevent contact with damp ground',
        'Remove diseased bottom leaves upon initial spotting',
        'Clean pruners and garden tools with 70% alcohol between plants',
      ],
      te: [
        'నేలకు తాకకుండా మొక్కలను కర్రలతో కట్టండి',
        'మచ్చలు కనిపించిన వెంటనే క్రింది ఆకులను తుంచేయండి',
        'కత్తిరించే పనిముట్లను 70% ఆల్కహాల్‌తో శుభ్రం చేయండి',
      ],
      hi: [
        'पौधों को बांस के सहारे ऊपर रखें ताकि पत्तियां जमीन न छुएं',
        'शुरुआत में ही रोगग्रस्त निचली पत्तियों को हटा दें',
        'छंटाई के औजारों को सैनिटाइज करें',
      ],
    },
    organicTreatment: {
      en: [
        'Liquid copper soap or Copper Octanoate spray',
        'Biological spray with Streptomyces lydicus bio-fungicide',
      ],
      te: [
        'లిక్విడ్ కాపర్ లేదా సేంద్రీయ కాపర్ స్ప్రే చేయండి',
        'జీవ శిలీంధ్ర నాశినులను పిచికారీ చేయండి',
      ],
      hi: [
        'कॉपर सॉप या कॉपर कवकनाशी का छिड़काव करें',
        'जैविक फफूंदनाशी का इस्तेमाल करें',
      ],
    },
    chemicalTreatment: {
      en: [
        'Chlorothalonil 75% WP @ 2g/L at 7-10 day intervals',
        'Mancozeb @ 2.5g/L or Tebuconazole 25.9% EC @ 1ml/L',
      ],
      te: [
        'క్లోరోథలోనిల్ 75% WP లీటరుకు 2 గ్రాములు 7-10 రోజుల వ్యవధితో పిచికారీ చేయండి',
        'టెబుకొనజోల్ లీటరుకు 1 మి.లీ కలపండి',
      ],
      hi: [
        'क्लोरोथैलोनिल 75% WP @ 2 ग्राम/लीटर का 7-10 दिन पर छिड़काव',
        'टेबुकोनाजोल 25.9% EC @ 1 मिली प्रति लीटर पानी',
      ],
    },
    prevention: {
      en: [
        'Clean crop debris in fall',
        'Use plastic or organic mulch',
        'Practice 2-year rotation with non-solanaceous crops',
      ],
      te: [
        'పాత పంట అవశేషాలను పూర్తిగా తొలగించండి',
        'మల్చింగ్ పేపర్ లేదా గడ్డిని వాడండి',
        'రెండు సంవత్సరాల పంట మార్పిడి చేయండి',
      ],
      hi: [
        'खेत से खरपतवार और पुरानी फसल के अवशेष हटाएं',
        'मल्चिंग का उपयोग करें',
        '2 वर्ष का फसल चक्र अपनाएं',
      ],
    },
    description: {
      en: 'Fungus Septoria lycopersici which overwinters on solanaceous weeds and previous year crop residues.',
      te: 'సెప్టోరియా లైకోపెర్సిసి అనే శిలీంధ్రం వల్ల వచ్చే వ్యాధి.',
      hi: 'सेप्टोरिया लाइकोपरसिकी कवक जनित रोग जो नमी और गर्म मौसम में फैलता है।',
    },
    colorTheme: '#7C3AED',
  },
  {
    key: 'tomato_spider_mites',
    crop: 'Tomato',
    name: {
      en: 'Tomato Two-Spotted Spider Mites',
      te: 'టమోటా ఎర్ర నల్లి పురుగులు (స్పైడర్ మైట్స్)',
      hi: 'टमाटर मकड़ी घुन (Spider Mites)',
    },
    isHealthy: false,
    typicalSeverity: 'Moderate',
    symptoms: {
      en: [
        'Fine yellow or white stippling (tiny speckled dots) across leaf upper surface',
        'Delicate silken webbing visible on underside and tips of shoots',
        'Leaves turn bronze, dry out, feel brittle, and drop off in hot weather',
      ],
      te: [
        'ఆకు పైభాగంలో పసుపు లేదా తెల్లటి చిన్న చుక్కల మచ్చలు',
        'ఆకుల క్రింద మరియు చిగుళ్ళపై సన్నని బూజు వంటి సాలెగూళ్ళు',
        'ఎండ తీవ్రతకు ఆకులు గోధుమ రంగులోకి మారి ఎండి రాలిపోతాయి',
      ],
      hi: [
        'पत्ती की ऊपरी सतह पर हल्के पीले या सफेद बारीक धब्बेदार निशान',
        'पत्तियों के नीचे और कोपलों पर महीन जाले दिखाई देना',
        'गर्म मौसम में पत्तियां कांस्य रंग की होकर सूख जाती हैं',
      ],
    },
    recommendations: {
      en: [
        'Spray high-pressure water spray to physically dislodge mite webs and colonies',
        'Avoid excessive nitrogen fertilizers which promote rapid mite reproduction',
        'Release natural predatory mites (Phytoseiulus persimilis)',
      ],
      te: [
        'పురుగుల గూళ్లను తొలగించడానికి నీటిని ఫోర్స్‌తో పిచికారీ చేయండి',
        'ఎక్కువ నత్రజని ఎరువులు వేయవద్దు, అది పురుగుల సంతతిని పెంచుతుంది',
        'మిత్ర పురుగులను సంరక్షించండి',
      ],
      hi: [
        'तेज पानी की बौछार से जालों और घुनों को धोएं',
        'अत्यधिक यूरिया/नाइट्रोजन खाद के प्रयोग से बचें',
        'परभक्षी कीटों (मित्र कीट) का संरक्षण करें',
      ],
    },
    organicTreatment: {
      en: [
        'Cold-pressed Neem Oil 10,000 ppm @ 3ml/L with mild surfactant',
        'Horticultural mineral oil or insecticidal soap',
      ],
      te: [
        '10,000 ppm వేప నూనె లీటరుకు 3 మి.లీ పిచికారీ చేయండి',
        'సేంద్రీయ సబ్బు నీటి ద్రావణం వాడండి',
      ],
      hi: [
        'कोल्ड प्रेस्ड नीम तेल @ 3 मिली प्रति लीटर साबुन के साथ',
        'हॉर्टिकल्चरल ऑयल या कीटनाशक साबुन का प्रयोग',
      ],
    },
    chemicalTreatment: {
      en: [
        'Spiromesifen 22.9% SC @ 1ml per liter',
        'Propargite 57% EC @ 2ml per liter water',
        'Abamectin 1.9% EC @ 0.5ml per liter',
      ],
      te: [
        'స్పైరోమెసిఫెన్ 22.9% SC లీటరు నీటికి 1 మి.లీ వాడండి',
        'ప్రొపర్గైట్ 57% EC లీటరుకు 2 మి.లీ పిచికారీ చేయండి',
      ],
      hi: [
        'स्पाइरोमेसिफेन 22.9% SC @ 1 मिली प्रति लीटर पानी',
        'प्रोपारजाइट 57% EC @ 2 मिली प्रति लीटर पानी',
      ],
    },
    prevention: {
      en: [
        'Suppress field dust by keeping paths moist; mites love dusty conditions',
        'Inspect leaf undersides weekly with a 10x hand lens',
      ],
      te: [
        'ధూళి చేరకుండా తోట పరిసరాలను తేమగా ఉంచండి',
        'ఆకుల క్రింది భాగాన్ని క్రమం తప్పకుండా గమనించండి',
      ],
      hi: [
        'धूल भरे वातावरण से बचें, क्योंकि धूल में घुन तेजी से फैलते हैं',
        'पत्तियों की निचली सतह का नियमित निरीक्षण करें',
      ],
    },
    description: {
      en: 'Tiny sap-sucking arachnids (Tetranychus urticae) that proliferate under dry, dusty, and hot drought conditions.',
      te: 'ఎండ, పొడి వాతావరణంలో రసం పీల్చే చిన్న ఎర్ర నల్లి పురుగులు.',
      hi: 'सूखे और गर्म मौसम में तेजी से पनपने वाले सूक्ष्म रस चूसक कीट।',
    },
    colorTheme: '#EA580C',
  },
  {
    key: 'tomato_bacterial_spot',
    crop: 'Tomato',
    name: {
      en: 'Tomato Bacterial Spot',
      te: 'టమోటా బాక్టీరియల్ మచ్చ తెగులు',
      hi: 'टमाटर जीवाणु धब्बा (Bacterial Spot)',
    },
    isHealthy: false,
    typicalSeverity: 'Moderate',
    symptoms: {
      en: [
        'Small, greasy or water-soaked dark spots on leaves becoming angular with yellow haloes',
        'Scabby raised black blemishes on green and ripening tomato fruits',
        'Blossom drop and defoliation reducing harvest yield',
      ],
      te: [
        'ఆకులపై జిడ్డుగల చిన్న నల్లటి మచ్చలు మరియు చుట్టూ పసుపు వలయం',
        'కాయలపై గరుకైన నల్లటి పొక్కుల వంటి మచ్చలు',
        'పూత రాలిపోవడం మరియు దిగుబడి తగ్గడం',
      ],
      hi: [
        'पत्तियों पर छोटे, तेलीय जैसे काले कोणीय धब्बे जिनके चारों ओर पीलापन होता है',
        'फलों पर खुरदुरे उभरे हुए काले दाग',
        'फूलों का झड़ना और फल उत्पादन में भारी गिरावट',
      ],
    },
    recommendations: {
      en: [
        'Never work in fields or cultivate when foliage is wet with dew or rain',
        'Sterilize nursery trays, stakes, and pruning shears between batches',
        'Destroy all crop residue immediately following final harvest',
      ],
      te: [
        'ఆకులు తడిగా ఉన్నప్పుడు తోటలో పనులు చేయకండి, తెగులు వేగంగా వ్యాపిస్తుంది',
        'పనిముట్లను డెటాల్ లేదా శానిటైజర్‌తో శుభ్రం చేయండి',
        'పంట అయిపోగానే వ్యర్థాలను తగులబెట్టండి',
      ],
      hi: [
        'ओस या बारिश से भीगी पत्तियों के समय खेत में काम न करें',
        'नर्सरी ट्रे और औजारों को संक्रमण मुक्त रखें',
        'फसल कटाई के बाद अवशेषों को नष्ट करें',
      ],
    },
    organicTreatment: {
      en: [
        'Copper hydroxide combined with Bacillus subtilis bio-formulations',
        'Hot water seed treatment (50°C for 25 minutes) before sowing',
      ],
      te: [
        'కాపర్ హైడ్రాక్సైడ్ మరియు బాసిల్లస్ సబ్టిలిస్ జీవ నియంత్రణ మందులు వాడండి',
        'విత్తే ముందు వేడి నీటితో విత్తన శుద్ధి (50°C వద్ద 25 నిమిషాలు) చేయండి',
      ],
      hi: [
        'कॉपर हाइड्रोक्साइड के साथ जैव कवकनाशी का छिड़काव',
        'बुवाई से पहले बीज शोधन (50°C गर्म पानी में 25 मिनट)',
      ],
    },
    chemicalTreatment: {
      en: [
        'Streptocycline 100ppm (1g in 10L water) + Copper Oxychloride 50% WP (25g in 10L)',
        'Kasugamycin 3% SL @ 2ml per liter water',
      ],
      te: [
        'స్ట్రెప్టోసైక్లిన్ 1 గ్రాము + కాపర్ ఆక్సిక్లోరైడ్ 25 గ్రాములు 10 లీటర్ల నీటిలో కలపండి',
        'కసుగామైసిన్ 3% SL లీటరుకు 2 మి.లీ పిచికారీ చేయండి',
      ],
      hi: [
        'स्ट्रेप्टोसाइक्लिन 1 ग्राम + कॉपर ऑक्सीक्लोराइड 25 ग्राम प्रति 10 लीटर पानी',
        'कासुगामाइसिन 3% SL @ 2 मिली प्रति लीटर पानी',
      ],
    },
    prevention: {
      en: [
        'Sow only hot-water treated or certified disease-free seed stocks',
        'Implement 2-year rotation away from pepper and tomato',
      ],
      te: [
        'శుద్ధి చేసిన నాణ్యమైన విత్తనాలనే వాడండి',
        'మిరప మరియు టమోటా లేని పంట మార్పిడి చేయండి',
      ],
      hi: [
        'उपचारित व प्रमाणित बीजों का ही प्रयोग करें',
        'टमाटर और मिर्च के साथ फसल चक्र अपनाएं',
      ],
    },
    description: {
      en: 'Bacterial pathogen Xanthomonas that enters through natural stomata and mechanical wounds during warm stormy periods.',
      te: 'జాంతోమోనాస్ అనే బాక్టీరియా వల్ల వచ్చే వ్యాధి, వర్షపు తుంపర్ల ద్వారా వ్యాపిస్తుంది.',
      hi: 'जैंथोमोनास जीवाणु द्वारा जनित रोग जो बारिश की बूंदों और घावों से प्रवेश करता है।',
    },
    colorTheme: '#B91C1C',
  },
  {
    key: 'tomato_healthy',
    crop: 'Tomato',
    name: {
      en: 'Tomato — Healthy',
      te: 'టమోటా — మొక్క ఆరోగ్యంగా ఉంది',
      hi: 'टमाटर — पौधा स्वस्थ है',
    },
    isHealthy: true,
    typicalSeverity: 'Healthy',
    symptoms: {
      en: [
        'Deep green, vibrant uniform leaves with no blemishes or necrosis',
        'Firm upright stems with vigorous growing tips',
        'Normal flower development and clean fruit cluster sets',
      ],
      te: [
        'మచ్చలు లేని ముదురు ఆకుపచ్చని ఆరోగ్యకరమైన ఆకులు',
        'ధృఢమైన కాండం మరియు చురుకైన పెరుగుదల',
        'మంచి పూత మరియు ఆరోగ్యకరమైన పిందెలు',
      ],
      hi: [
        'पत्तियां गहरी हरी, चमकदार और किसी भी धब्बे से मुक्त',
        'मजबूत तना और स्वस्थ नई कोपलें',
        'फूल और फलों का सामान्य विकास',
      ],
    },
    recommendations: {
      en: [
        'Maintain consistent soil moisture through regular drip scheduling',
        'Apply balanced organic compost and seaweed extract at flowering',
        'Continue routine weekly scouting under leaf canopies for early signs',
      ],
      te: [
        'డ్రిప్ ద్వారా నేలకు సరిపడా తేమను క్రమం తప్పకుండా అందించండి',
        'పూత సమయంలో వర్మీకంపోస్ట్ లేదా పోషకాలను అందించండి',
        'వారానికి ఒకసారి ఆకుల కింద పరిశీలిస్తూ ఉండండి',
      ],
      hi: [
        'नियमित रूप से आवश्यकतानुसार संतुलित सिंचाई जारी रखें',
        'फूल आते समय संतुलित जैविक खाद और सूक्ष्म पोषक तत्व दें',
        'सप्ताह में एक बार पौधों की पत्तियों की जांच करते रहें',
      ],
    },
    organicTreatment: {
      en: ['No treatment required. Preventative neem spray every 15 days is optional.'],
      te: ['ఎటువంటి మందులు అవసరం లేదు. ముందస్తు రక్షణగా 15 రోజులకు ఒకసారి వేప నూనె చల్లుకోవచ్చు.'],
      hi: ['किसी रासायनिक उपचार की आवश्यकता नहीं है। सुरक्षा हेतु 15 दिनों में नीम तेल छिड़क सकते हैं।'],
    },
    chemicalTreatment: {
      en: ['Do not apply chemical pesticides or fungicides to healthy crops.'],
      te: ['ఆరోగ్యకరమైన పంటపై రసాయనాలు వాడవద్దు.'],
      hi: ['स्वस्थ पौधों पर अनावश्यक कीटनाशक या फफूंदनाशक न डालें।'],
    },
    prevention: {
      en: [
        'Continue good agricultural practices (GAP)',
        'Ensure proper staking and balanced fertilization',
      ],
      te: ['మంచి సాగు పద్ధతులను కొనసాగించండి', 'మొక్కలకు ఊతం కల్పిస్తూ సమతుల్య ఎరువులు వేయండి'],
      hi: ['उचित कृषि पद्धतियां जारी रखें', 'संतुलित खाद और पानी का ध्यान रखें'],
    },
    description: {
      en: 'The tomato leaf exhibits optimal chloroplast health, clean cuticle integrity, and zero pathogenic signs.',
      te: 'మొక్క ఎటువంటి రోగ లక్షణాలు లేకుండా సంపూర్ణ ఆరోగ్యంగా ఉంది.',
      hi: 'पौधे की पत्तियां पूर्णतः स्वस्थ हैं और किसी भी बीमारी के लक्षण नहीं हैं।',
    },
    colorTheme: '#10B981',
  },

  // POTATO
  {
    key: 'potato_early_blight',
    crop: 'Potato',
    name: {
      en: 'Potato Early Blight',
      te: 'బంగాళాదుంప ప్రారంభ ఎండు తెగులు',
      hi: 'आलू अगेती झुलसा (Early Blight)',
    },
    isHealthy: false,
    typicalSeverity: 'Moderate',
    symptoms: {
      en: [
        'Dark brown to black angular spots with concentric target rings on older foliage',
        'Yellow chlorotic halos outlining maturing lesions',
        'Leaves turn leathery, curl upwards, desiccate, and drop',
        'Dark sunken circular dry rot lesions on potato tubers',
      ],
      te: [
        'పాత ఆకులపై వలయాలు కలిగిన ముదురు గోధుమ-నలుపు మచ్చలు',
        'మచ్చల చుట్టూ పసుపు రంగు వలయాలు ఏర్పడటం',
        'ఆకులు ఎండిపోయి పైకి ముడుచుకుని రాలిపోవడం',
        'దుంపలపై లోతైన నల్లటి పొడి కుళ్ళు మచ్చలు',
      ],
      hi: [
        'पुरानी पत्तियों पर छल्लेदार गोल गहरे भूरे धब्बे',
        'धब्बों के चारों तरफ पीलापन फैलना',
        'पत्तियां कड़ी होकर सूखने और गिरने लगती हैं',
        'आलू के कंद पर धंसे हुए सूखे गोल धब्बे',
      ],
    },
    recommendations: {
      en: [
        'Hill potatoes thoroughly to bury growing tubers at least 5-10cm below soil away from falling spores',
        'Avoid harvesting during damp muddy conditions',
        'Destroy volunteer potato plants and nightshade weeds near fields',
      ],
      te: [
        'దుంపలపైకి మట్టిని బాగా ఎగదోయండి, తెగులు బీజాలు దుంపలకు తాకకుండా ఉంటాయి',
        'నేల తడిగా ఉన్నప్పుడు తవ్వకం చేయవద్దు',
        'పాత మొక్కలను, కలుపు మొక్కలను తొలగించండి',
      ],
      hi: [
        'पौधों पर मिट्टी अच्छी तरह चढ़ाएं ताकि आलू कंद सुरक्षित रहें',
        'गीली मिट्टी में आलू की खुदाई न करें',
        'खेत के आस-पास जंगली सोलेनेसी खरपतवार नष्ट करें',
      ],
    },
    organicTreatment: {
      en: [
        'Copper Oxychloride 50% WP @ 2.5g/L',
        'Pseudomonas fluorescens root and leaf spray @ 5g/L',
      ],
      te: [
        'కాపర్ ఆక్సిక్లోరైడ్ 50% WP లీటరుకు 2.5 గ్రాములు పిచికారీ చేయండి',
        'స్యూడోమోనాస్ ఫ్లోరోసెన్స్ లీటరుకు 5 గ్రాములు చొప్పున వాడండి',
      ],
      hi: [
        'कॉपर ऑक्सीक्लोराइड 50% WP @ 2.5 ग्राम प्रति लीटर',
        'स्यूडोमोनास फ्लोरेसेंस @ 5 ग्राम प्रति लीटर पानी',
      ],
    },
    chemicalTreatment: {
      en: [
        'Mancozeb 75% WP @ 2.5g/L or Propineb 70% WP @ 2g/L',
        'Pyraclostrobin 20% WG @ 1g/L for aggressive leaf cover',
      ],
      te: [
        'మ్యాంకోజెబ్ లేదా ప్రొపినెబ్ లీటరు నీటికి 2-2.5 గ్రాములు కలపండి',
        'పైరాక్లోస్ట్రోబిన్ లీటరుకు 1 గ్రాము పిచికారీ చేయండి',
      ],
      hi: [
        'मैनकोजेब 75% WP @ 2.5 ग्राम/लीटर या प्रोपिनेब @ 2 ग्राम/लीटर',
        'पायराक्लोस्ट्रोबिन 20% WG @ 1 ग्राम प्रति लीटर पानी',
      ],
    },
    prevention: {
      en: [
        'Plant certified disease-free seed tubers',
        'Maintain balanced nitrogen fertilization (avoid stressing plants)',
      ],
      te: ['సర్టిఫైడ్ విత్తన దుంపలను వాడండి', 'సమతుల్య నత్రజని ఎరువులు వేయండి'],
      hi: ['प्रमाणित रोगमुक्त आलू बीजों की बुवाई करें', 'संतुलित मात्रा में उर्वरकों का प्रयोग करें'],
    },
    description: {
      en: 'Fungus Alternaria solani causing substantial defoliation and tuber quality downgrade.',
      te: 'ఆల్టర్నేరియా సొలానీ శిలీంధ్రం వల్ల బంగాళాదుంప ఆకులు ఎండిపోయే తెగులు.',
      hi: 'अल्टरनेरिया सोलानी कवक द्वारा आलू की पत्तियों और कंदों को नुकसान पहुंचाने वाला रोग।',
    },
    colorTheme: '#D97706',
  },
  {
    key: 'potato_late_blight',
    crop: 'Potato',
    name: {
      en: 'Potato Late Blight',
      te: 'బంగాళాదుంప చివరి ఎండు తెగులు (లేట్ బ్లైట్)',
      hi: 'आलू पछेती झुलसा (Late Blight)',
    },
    isHealthy: false,
    typicalSeverity: 'Severe',
    symptoms: {
      en: [
        'Water-soaked dark lesions spreading rapidly from leaf margins and tips',
        'Delicate white mildew fuzz underneath infected leaves during foggy cool mornings',
        'Stems display black necrotic girdling; whole plant collapses in bad outbreaks',
        'Tubers show copper-brown dry granular rot under skin, decaying rapidly in storage',
      ],
      te: [
        'ఆకుల అంచుల నుండి వేగంగా వ్యాపించే నీటితో తడిసిన నల్లటి మచ్చలు',
        'పొగమంచు, చలి ఉన్న ఉదయాలలో ఆకుల వెనుక తెల్లని బూజు పొర',
        'కాండం నల్లబడి మొత్తం మొక్క కుప్పకూలిపోవడం',
        'దుంపల తొక్క క్రింద గోధుమ రంగు కుళ్ళు ఏర్పడి నిల్వలో నాశనమవడం',
      ],
      hi: [
        'पत्तियों के किनारों से तेजी से फैलने वाले काले-भूरे गीले धब्बे',
        'कोहरे वाली सुबह में पत्तियों के नीचे सफेद फफूंद की महीन परत',
        'तने काले पड़ जाते हैं और पूरा पौधा मुरझा कर गिर जाता है',
        'आलू कंद पर तांबे जैसा भूरा सूखा सड़न रोग और भंडारण में सड़ना',
      ],
    },
    recommendations: {
      en: [
        'Crucial: Spray protectant fungicides immediately when forecast predicts cool rain (< 20°C)',
        'Kill potato vines (dehaulm) 10-14 days before harvest to prevent tuber contamination',
        'Do not leave cull piles near fields; bury deeply or feed to livestock',
      ],
      te: [
        'చలి, వర్షపు సూచన ఉన్న వెంటనే రక్షక శిలీంధ్ర నాశినులను పిచికారీ చేయండి',
        'దుంపలు తీసే 10-14 రోజుల ముందే ఆకులను తొలగించండి (డీహాలింగ్)',
        'కుళ్ళిన దుంపలను పొలం దగ్గర ఉంచకుండా గొయ్యి తీసి పూడ్చండి',
      ],
      hi: [
        'मौसम में ठंडक और बारिश की संभावना पर तुरंत कवकनाशी का छिड़काव करें',
        'खुदाई से 10-14 दिन पहले पौधों की ऊपरी बेल काट दें (बेल कटाई)',
        'खराब आलुओं को खुले में न फेंकें, गड्ढे में गहरा दबाएं',
      ],
    },
    organicTreatment: {
      en: [
        'Copper Hydroxide or Bordeaux mixture 1% preventative spray',
        'Laminarin elicitor sprays to activate plant immune responses',
      ],
      te: [
        '1% బోర్డో మిశ్రమం లేదా కాపర్ హైడ్రాక్సైడ్ ముందస్తుగా పిచికారీ చేయండి',
        'రోగనిరోధక శక్తిని పెంచే సేంద్రీయ మందులను వాడండి',
      ],
      hi: [
        '1% बोर्डो मिश्रण या कॉपर हाइड्रोक्साइड का छिड़काव',
        'जैविक प्रतिरक्षा बढ़ाने वाले घोल का प्रयोग',
      ],
    },
    chemicalTreatment: {
      en: [
        'Dimethomorph 50% WP (1g/L) + Mancozeb (2g/L)',
        'Mandipropamid 23.4% SC @ 0.8ml per liter water',
        'Famoxadone + Cymoxanil @ 1g per liter during high risk',
      ],
      te: [
        'డైమెథోమార్ఫ్ 50% WP (1 గ్రాము) + మ్యాంకోజెబ్ (2 గ్రాములు) లీటరు నీటిలో కలపండి',
        'మాండిప్రోపమిడ్ 23.4% SC లీటరుకు 0.8 మి.లీ పిచికారీ చేయండి',
      ],
      hi: [
        'डाइमेथोमोर्फ (1 ग्राम) + मैनकोजेब (2 ग्राम) प्रति लीटर पानी',
        'मैंडिप्रोपामाइड 23.4% SC @ 0.8 मिली प्रति लीटर पानी',
      ],
    },
    prevention: {
      en: [
        'Use resistant varieties (e.g., Kufri Girdhari, Kufri Jyoti where adapted)',
        'Destroy cull piles before season starts',
        'Avoid furrow flooding that saturates root zones',
      ],
      te: [
        'తెగులును తట్టుకునే కుఫ్రీ రకాలను సాగు చేయండి',
        'పాత దుంపల కుప్పలను నాశనం చేయండి',
      ],
      hi: [
        'रोग रोधी किस्में (जैसे कुफरी ज्योति, कुफरी गिरधारी) लगाएं',
        'खेत में जलभराव न होने दें',
      ],
    },
    description: {
      en: 'Phytophthora infestans causing devastating foliage blight and tuber rotting under cool moist conditions.',
      te: 'ఫైటోఫ్తోరా ఇన్ఫెస్టాన్స్ వల్ల వచ్చే అత్యంత ప్రమాదకరమైన లేట్ బ్లైట్ తెగులు.',
      hi: 'फाइटोफ्थोरा इन्फेस्टन्स जनित महाविनाशक रोग जो कुछ ही दिनों में पूरे खेत को नष्ट कर सकता है।',
    },
    colorTheme: '#DC2626',
  },
  {
    key: 'potato_healthy',
    crop: 'Potato',
    name: {
      en: 'Potato — Healthy',
      te: 'బంగాళాదుంప — మొక్క ఆరోగ్యంగా ఉంది',
      hi: 'आलू — पौधा स्वस्थ है',
    },
    isHealthy: true,
    typicalSeverity: 'Healthy',
    symptoms: {
      en: [
        'Broad, lush green leaflets with smooth margins',
        'Vigorous leafy canopy forming full row closure',
        'Clean root stolons and developing tubers with intact skins',
      ],
      te: [
        'మచ్చలు లేని వెడల్పాటి ఆకుపచ్చని ఆకులు',
        'వరుసలు కప్పివేసేలా విస్తరించిన బలమైన కొమ్మలు',
        'ఆరోగ్యకరమైన వేర్లు మరియు దుంపలు',
      ],
      hi: [
        'पत्तियां चौड़ी, चमकदार हरी और किसी भी धब्बे से मुक्त',
        'स्वस्थ और मजबूत तने',
        'कंदों का सामान्य और सुदृढ़ विकास',
      ],
    },
    recommendations: {
      en: [
        'Perform earthing up (hilling) to cover developing tubers from sunlight',
        'Maintain uniform soil moisture during tuber initiation and bulking',
        'Monitor temperature and rainfall forecasts for blight warnings',
      ],
      te: [
        'దుంపలపై ఎండ పడకుండా మొక్క మొదళ్ళ వద్ద మట్టిని ఎగదోయండి',
        'దుంప ఊరే సమయంలో క్రమం తప్పకుండా నీటి తడులు అందించండి',
        'వాతావరణ సమాచారాన్ని గమనిస్తూ ఉండండి',
      ],
      hi: [
        'आलू कंदों पर समय पर मिट्टी चढ़ाएं ताकि वे धूप से हरे न हों',
        'कंद बनते समय खेत में नमी की कमी न होने दें',
        'मौसम के पूर्वानुमान पर नजर रखें',
      ],
    },
    organicTreatment: {
      en: ['No treatment required. Good cultural care is sufficient.'],
      te: ['ఎటువంటి చికిత్స అవసరం లేదు. సరైన యాజమాన్య పద్ధతులు సరిపోతాయి.'],
      hi: ['किसी दवा की आवश्यकता नहीं है। उचित देखभाल पर्याप्त है।'],
    },
    chemicalTreatment: {
      en: ['Chemical sprays are not needed.'],
      te: ['రసాయనాలు అవసరం లేదు.'],
      hi: ['किसी रासायनिक छिड़काव की जरूरत नहीं है।'],
    },
    prevention: {
      en: ['Ensure proper drainage and balanced potash applications.'],
      te: ['నీరు నిలవకుండా చూసుకోండి మరియు తగినంత పొటాష్ ఎరువు వేయండి.'],
      hi: ['जल निकासी की अच्छी व्यवस्था और संतुलित पोटाश खाद दें।'],
    },
    description: {
      en: 'Potato canopy shows strong photosynthetic activity and zero foliar or vascular infections.',
      te: 'బంగాళాదుంప మొక్క చాలా బలంగా, ఆరోగ్యంగా ఉంది.',
      hi: 'आलू की फसल पूर्णतः हरी-भरी और स्वस्थ है।',
    },
    colorTheme: '#10B981',
  },

  // CORN / MAIZE
  {
    key: 'corn_common_rust',
    crop: 'Corn',
    name: {
      en: 'Corn Common Rust',
      te: 'మొక్కజొన్న సాధారణ తుప్పు తెగులు',
      hi: 'मक्का साधारण रतुआ (Common Rust)',
    },
    isHealthy: false,
    typicalSeverity: 'Moderate',
    symptoms: {
      en: [
        'Small, circular to elongate golden-brown to cinnamon-brown powdery pustules',
        'Pustules erupt on both upper and lower leaf surfaces',
        'Pustules turn brownish-black later in the season as teliospores form',
        'Severe infestations cause premature yellowing, drying, and leaf tear',
      ],
      te: [
        'ఆకు రెండు వైపులా గోల్డెన్-గోధుమ రంగు పొడి బొబ్బలు (తుప్పు మచ్చలు)',
        'చేతితో తాకినప్పుడు వేళ్లకు ఇటుక రంగు పొడి అంటుకుంటుంది',
        'కాలం గడిచేకొద్దీ మచ్చలు నలుపు రంగులోకి మారుతాయి',
        'తీవ్రమైతే ఆకులు పసుపు రంగులోకి మారి ఎండిపోతాయి',
      ],
      hi: [
        'पत्ती की दोनों सतहों पर सुनहरे भूरे से दालचीनी जैसे उभरे हुए फफोले',
        'फफोलों को छूने पर अंगुलियों पर जंग जैसा पाउडर लगना',
        'मौसम के अंत में फफोलों का काला पड़ जाना',
        'अधिक संक्रमण में पत्तियां समय से पहले पीली होकर सूख जाना',
      ],
    },
    recommendations: {
      en: [
        'Plant rust-resistant hybrid seeds with Rp genes',
        'Plant early in the season to evade peak windborne urediniospore waves',
        'Spray fungicide only if rust reaches ear leaf before silking stage',
      ],
      te: [
        'తుప్పు తెగులును తట్టుకునే హైబ్రిడ్ విత్తనాలను ఎంచుకోండి',
        'తెగులు తీవ్రత పెరగకముందే ముందస్తు విత్తనం వేసుకోండి',
        'కంకి దశకు ముందే తెగులు కనిపిస్తే శిలీంధ్ర నాశిని పిచికారీ చేయండి',
      ],
      hi: [
        'रोग प्रतिरोधी संकर (हाइब्रिड) बीजों का चयन करें',
        'मौसम की शुरुआत में समय पर बुवाई करें',
        'सिल्क निकलने से पहले भुट्टे की पत्ती पर लक्षण दिखने पर ही दवा छिड़कें',
      ],
    },
    organicTreatment: {
      en: [
        'Wettable sulfur spray (80% WP @ 3g/L)',
        'Neem oil emulsifiable concentrate 5ml/L at initial signs',
      ],
      te: [
        'నీటిలో కరిగే గంధకం (సల్ఫర్ 80% WP) లీటరుకు 3 గ్రాములు పిచికారీ చేయండి',
        'వేప నూనె లీటరుకు 5 మి.లీ చొప్పున వాడండి',
      ],
      hi: [
        'घुलनशील गंधक (सल्फर 80% WP) @ 3 ग्राम प्रति लीटर',
        'नीम का तेल (5 मिली प्रति लीटर) का छिड़काव करें',
      ],
    },
    chemicalTreatment: {
      en: [
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1ml/L',
        'Propiconazole 25% EC (Tilt) @ 1ml per liter water',
        'Mancozeb 75% WP @ 2.5g per liter',
      ],
      te: [
        'ప్రొపికొనజోల్ 25% EC (టిల్ట్) లీటరు నీటికి 1 మి.లీ కలపండి',
        'అజాక్సిస్ట్రోబిన్ + డైఫెనోకోనజోల్ లీటరుకు 1 మి.లీ పిచికారీ చేయండి',
        'మ్యాంకోజెబ్ 75% WP లీటరుకు 2.5 గ్రాములు వాడండి',
      ],
      hi: [
        'प्रोपिकोनाजोल 25% EC @ 1 मिली प्रति लीटर पानी',
        'एजोक्सीस्ट्रोबिन + डाइफेनोकोनाजोल @ 1 मिली प्रति लीटर',
        'मैनकोजेब 75% WP @ 2.5 ग्राम प्रति लीटर पानी',
      ],
    },
    prevention: {
      en: [
        'Rotate with non-host legume crops (soybean, pigeonpea)',
        'Ensure recommended plant density to avoid excessive canopy humidity',
      ],
      te: [
        'పప్పుధాన్యాల పంటలతో (సోయా, కందులు) పంట మార్పిడి చేయండి',
        'సరైన సాంద్రతతో మొక్కలు నాటండి',
      ],
      hi: [
        'दलहनी फसलों (सोयाबीन, अरहर) के साथ फसल चक्र अपनाएं',
        'पौधों की उचित दूरी रखें',
      ],
    },
    description: {
      en: 'Fungus Puccinia sorghi producing wind-blown rust spores thriving in moderate temperatures (16-25°C) with high humidity.',
      te: 'పుక్సీనియా సోర్ఘై అనే శిలీంధ్రం వల్ల గాలి ద్వారా వ్యాపించే తుప్పు తెగులు.',
      hi: 'पक्सीनिया सोरघाई कवक द्वारा होने वाला रोग, जिसके बीजाणु हवा से दूर तक फैलते हैं।',
    },
    colorTheme: '#EA580C',
  },
  {
    key: 'corn_gray_leaf_spot',
    crop: 'Corn',
    name: {
      en: 'Corn Gray Leaf Spot',
      te: 'మొక్కజొన్న బూడిద ఆకుమచ్చ తెగులు',
      hi: 'मक्का धूसर पत्ती धब्बा (Gray Leaf Spot)',
    },
    isHealthy: false,
    typicalSeverity: 'Moderate',
    symptoms: {
      en: [
        'Distinct rectangular, blocky lesions strictly delimited by leaf veins',
        'Lesions start as tan specks, expanding into long gray-brown strips (1-5 cm long)',
        'Severe blighting merges lesions, causing entire leaf blades to die and lodge stems',
      ],
      te: [
        'ఆకు ఈనెల మధ్య ఉండే పొడవాటి దీర్ఘచతురస్రాకార బూడిద-గోధుమ మచ్చలు',
        'మచ్చలు కలిసిపోయి ఆకు మొత్తం ఎండిపోవడం',
        'మొక్క బలం కోల్పోయి నేలకొరిగే ప్రమాదం ఉంది',
      ],
      hi: [
        'पत्ती की शिराओं के बीच विशिष्ट आयताकार भूरे-धूसर धब्बे',
        'धब्बे 1 से 5 सेमी लंबे होकर पट्टियों का रूप ले लेते हैं',
        'पत्तियां सूखने से पौधा कमजोर होकर गिर सकता है',
      ],
    },
    recommendations: {
      en: [
        'Deep plow or chop corn stubble to accelerate residue decomposition where erosion permits',
        'Rotate away from corn for at least 1-2 seasons',
        'Choose hybrids rated with high Gray Leaf Spot tolerance',
      ],
      te: [
        'పాత మొక్కజొన్న మోళ్ళను లోతుగా దున్ని భూమిలో కలిపేయండి',
        '1-2 సీజన్లు మొక్కజొన్న కాకుండా ఇతర పంటలను వేయండి',
        'తెగులు తట్టుకునే హైబ్రిడ్ రకాలను ఎంచుకోండి',
      ],
      hi: [
        'फसल कटाई के बाद खेत की गहरी जुताई कर अवशेषों को मिट्टी में दबाएं',
        'कम से कम 1 वर्ष मक्का के बिना फसल चक्र अपनाएं',
        'रोग प्रतिरोधी किस्मों की बुवाई करें',
      ],
    },
    organicTreatment: {
      en: [
        'Copper Hydroxide organic formulations at early vegetative phases',
        'Bacillus subtilis bio-fungicide foliar applications',
      ],
      te: [
        'ప్రారంభ దశలో కాపర్ హైడ్రాక్సైడ్ పిచికారీ చేయండి',
        'బాసిల్లస్ సబ్టిలిస్ జీవ శిలీంధ్ర నాశిని వాడండి',
      ],
      hi: [
        'शुरुआती अवस्था में कॉपर कवकनाशी का छिड़काव करें',
        'बैसिलस आधारित जैव कवकनाशी का उपयोग करें',
      ],
    },
    chemicalTreatment: {
      en: [
        'Pyraclostrobin + Fluxapyroxad (Priaxor) @ 0.8ml per liter',
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L',
        'Propiconazole 25% EC @ 1ml/L applied at VT (tasseling) stage',
      ],
      te: [
        'ప్రయాక్సర్ లీటరుకు 0.8 మి.లీ పిచికారీ చేయండి',
        'అజాక్సిస్ట్రోబిన్ + డైఫెనోకోనజోల్ లీటరుకు 1 మి.లీ వాడండి',
        'కంకి విచ్చుకునే దశలో ప్రొపికొనజోల్ పిచికారీ చేయండి',
      ],
      hi: [
        'पायराक्लोस्ट्रोबिन + फ्लक्सापायरोक्साड @ 0.8 मिली/लीटर',
        'एजोक्सीस्ट्रोबिन + डाइफेनोकोनाजोल @ 1 मिली प्रति लीटर',
        'मंजरी (Tasseling) अवस्था में प्रोपिकोनाजोल 25% EC @ 1 मिली/लीटर',
      ],
    },
    prevention: {
      en: [
        'Do not plant continuous corn in minimum-till fields',
        'Maintain balanced potassium levels to increase stalk strength',
      ],
      te: ['వరుసగా మొక్కజొన్న వేయకండి', 'పొటాష్ ఎరువు సమతుల్యంగా వేయండి'],
      hi: ['लगातार मक्का की खेती से बचें', 'संतुलित पोटाश देकर तनों को मजबूत बनाएं'],
    },
    description: {
      en: 'Fungus Cercospora zeae-maydis that survives in surface debris and infects crops during warm, overcast, humid spells.',
      te: 'సెర్కోస్పోరా జీ-మేడిస్ అనే శిలీంధ్రం వల్ల వచ్చే బూడిద ఆకుమచ్చ తెగులు.',
      hi: 'सर्कॉस्पोरा कवक जनित रोग जो बादलों वाले गर्म और आर्द्र मौसम में फैलता है।',
    },
    colorTheme: '#6B7280',
  },
  {
    key: 'corn_northern_leaf_blight',
    crop: 'Corn',
    name: {
      en: 'Corn Northern Leaf Blight',
      te: 'మొక్కజొన్న ఉత్తర ఆకు ఎండు తెగులు',
      hi: 'मक्का उत्तरी पत्ती झुलसा (Northern Leaf Blight)',
    },
    isHealthy: false,
    typicalSeverity: 'Severe',
    symptoms: {
      en: [
        'Large, elongated cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long)',
        'Lesions have rounded ends and are not constrained by leaf veins',
        'During humid periods, dark olive-gray fungal spores appear in lesion centers',
        'Extensive canopy burn leading to immature ear development',
      ],
      te: [
        'ఆకులపై పొడవాటి సిగార్ ఆకారంలో బూడిద-గోధుమ రంగు పెద్ద మచ్చలు (2.5 నుండి 15 సెం.మీ)',
        'ఈ మచ్చలు ఈనెలను దాటి ఆకు మొత్తం విస్తరిస్తాయి',
        'తేమ ఉన్నప్పుడు మచ్చల మధ్యలో బూజు లాంటి నల్లటి పొర కనిపిస్తుంది',
        'ఆకులు ఎండిపోయి కంకులు సరిగ్గా గింజ కట్టవు',
      ],
      hi: [
        'पत्तियों पर बड़े सिगार के आकार के लंबे धब्बे (2.5 से 15 सेमी)',
        'धब्बे पत्तियों की शिराओं को पार करते हुए पूरे पत्ते पर फैलते हैं',
        'नम मौसम में धब्बों के बीच में गहरे बीजाणु दिखाई देना',
        'पत्तियों के झुलसने से भुट्टे में दाने नहीं भरते',
      ],
    },
    recommendations: {
      en: [
        'Select Ht-gene resistant hybrids adapted for your region',
        'Rotate field to soybeans or cowpea to break the disease cycle',
        'Scout lower leaves before pollination; treat if lesions present on 50% of plants',
      ],
      te: [
        'తెగులు తట్టుకునే Ht జన్యువు గల హైబ్రిడ్ రకాలను ఎంచుకోండి',
        'సోయా లేదా అలసంద పంటలతో పంట మార్పిడి చేయండి',
        'పుప్పొడి రాలే దశకు ముందే గమనించి అవసరమైతే మందులు పిచికారీ చేయండి',
      ],
      hi: [
        'Ht-जीन युक्त रोगरोधी संकर किस्में लगाएं',
        'सोयाबीन या दलहनी फसलों के साथ फसल चक्र अपनाएं',
        'परागण से पहले खेत का निरीक्षण करें और आवश्यकता पड़ने पर उपचार करें',
      ],
    },
    organicTreatment: {
      en: [
        'Bio-fungicide Trichoderma harzianum soil and foliar spray',
        'Copper soap preventative sprays in early vegetative phase',
      ],
      te: [
        'ట్రైకోడెర్మా హర్జియానమ్ జీవ శిలీంధ్ర నాశిని వాడండి',
        'కాపర్ సబ్బు ద్రావణాన్ని ముందస్తుగా పిచికారీ చేయండి',
      ],
      hi: [
        'ट्राइकोडर्मा हार्जिएनम जैव कवकनाशी का प्रयोग करें',
        'शुरुआत में कॉपर आधारित जैविक कवकनाशी का छिड़काव',
      ],
    },
    chemicalTreatment: {
      en: [
        'Mancozeb 75% WP @ 2.5g per liter or Zineb 75% WP @ 2g per liter',
        'Azoxystrobin + Difenoconazole @ 1ml/L at first sign on lower canopy',
        'Pyraclostrobin 20% WG @ 1g per liter',
      ],
      te: [
        'మ్యాంకోజెబ్ 75% WP లీటరుకు 2.5 గ్రాములు లేదా జినెబ్ 2 గ్రాములు పిచికారీ చేయండి',
        'అజాక్సిస్ట్రోబిన్ + డైఫెనోకోనజోల్ లీటరుకు 1 మి.లీ వాడండి',
      ],
      hi: [
        'मैनकोजेब 75% WP @ 2.5 ग्राम या जिनेब @ 2 ग्राम प्रति लीटर पानी',
        'एजोक्सीस्ट्रोबिन + डाइफेनोकोनाजोल @ 1 मिली प्रति लीटर',
      ],
    },
    prevention: {
      en: [
        'Bury infected corn residues deeply after harvest',
        'Avoid excessive overhead irrigation that extends leaf wetness',
      ],
      te: ['పంట కోత తర్వాత వ్యర్థాలను లోతుగా దున్నండి', 'ఆకులు ఎక్కువసేపు తడిగా ఉండకుండా చూడండి'],
      hi: ['कटाई के बाद अवशेषों को गहरी जुताई कर दबाएं', 'पत्तियों पर देर तक पानी जमा न रहने दें'],
    },
    description: {
      en: 'Fungus Exserohilum turcicum causing massive leaf blighting during moderate temperatures (18-27°C) accompanied by heavy dew.',
      te: 'ఎక్సెరోహిలమ్ టర్సికమ్ అనే శిలీంధ్రం వల్ల భారీగా ఆకులు ఎండిపోయే తెగులు.',
      hi: 'एक्सरोहिलम टर्सिकम कवक द्वारा जनित गंभीर झुलसा रोग जो भारी ओस और नमी में फैलता है।',
    },
    colorTheme: '#991B1B',
  },
  {
    key: 'corn_healthy',
    crop: 'Corn',
    name: {
      en: 'Corn — Healthy',
      te: 'మొక్కజొన్న — మొక్క ఆరోగ్యంగా ఉంది',
      hi: 'मक्का — पौधा स्वस्थ है',
    },
    isHealthy: true,
    typicalSeverity: 'Healthy',
    symptoms: {
      en: [
        'Vibrant emerald green leaves with clean unbroken venation',
        'Strong stout stalks with well-anchored brace roots',
        'Uniform tassel formation and healthy silk emergence',
      ],
      te: [
        'ఎటువంటి మచ్చలు లేని స్వచ్ఛమైన ముదురు ఆకుపచ్చని ఆకులు',
        'బలమైన కాండం మరియు దృఢమైన ఊత వేర్లు',
        'సమృద్ధిగా ఉన్న కంకి మరియు పట్టు పోగులు',
      ],
      hi: [
        'पत्तियां गहरी हरी, बिना किसी धब्बे या फफोले के',
        'मजबूत तना और अच्छी तरह विकसित जड़ें',
        'मंजरी और सिल्क का स्वस्थ विकास',
      ],
    },
    recommendations: {
      en: [
        'Apply split doses of nitrogen (urea) at knee-high and tasseling stages',
        'Ensure uninterrupted water availability during critical silking and grain filling',
        'Control fall armyworm and stem borer pests early if spotted',
      ],
      te: [
        'మోకాలి ఎత్తు మరియు కంకి దశలలో నత్రజని (యూరియా) ఎరువును సమతుల్యంగా వేయండి',
        'కంకి పాలు పోసుకునే దశలో నీటి ఎద్దడి లేకుండా చూడండి',
        'కత్తెర పురుగు కనిపించకుండా జాగ్రత్త వహించండి',
      ],
      hi: [
        'घुटने की ऊंचाई और मंजरी निकलने के समय यूरिया की शीर्ष ड्रेसिंग करें',
        'दाना भरते समय खेत में नमी की कमी न होने दें',
        'फॉल आर्मीवॉर्म कीट की समय-समय पर निगरानी करें',
      ],
    },
    organicTreatment: {
      en: ['No fungicide needed. Maintain soil vitality with Jeevamrut or Panchagavya.'],
      te: ['శిలీంధ్ర నాశినులు అవసరం లేదు. జీవామృతం లేదా పంచగవ్యతో నేల సారాన్ని పెంచండి.'],
      hi: ['किसी कवकनाशी की जरूरत नहीं है। जीवामृत या वर्मीवाश का उपयोग कर सकते हैं।'],
    },
    chemicalTreatment: {
      en: ['Do not apply chemical fungicides to healthy maize.'],
      te: ['ఆరోగ్యకరమైన పంటపై రసాయనాలు అవసరం లేదు.'],
      hi: ['स्वस्थ मक्के पर अनावश्यक रासायनिक छिड़काव न करें।'],
    },
    prevention: {
      en: [
        'Maintain optimal planting geometry (60cm row x 20cm plant)',
        'Ensure proper drainage to prevent waterlogging',
      ],
      te: ['సరైన నాటడం దూరం పాటించండి (60x20 సెం.మీ)', 'నీరు నిల్వ ఉండకుండా చూడండి'],
      hi: ['उचित दूरी (60 सेमी कतार x 20 सेमी पौधा) पर बुवाई करें', 'जल निकास की व्यवस्था रखें'],
    },
    description: {
      en: 'Corn leaf is photosynthetically prime, with zero fungal pustules or necrotic lesions.',
      te: 'మొక్కజొన్న పంట ఎంతో బలంగా, ఏ రోగం లేకుండా ఆరోగ్యంగా ఉంది.',
      hi: 'मक्के का पौधा पूरी तरह स्वस्थ और रोगमुक्त है।',
    },
    colorTheme: '#10B981',
  },
];
