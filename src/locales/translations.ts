import { Language } from '../types';

export interface Translations {
  brandName: string;
  assistantSubtitle: string;
  proBadge: string;
  smartFarmingBadge: string;

  navHome: string;
  navDiseaseDetection: string;
  navCareGuide: string;
  navTaskPlanner: string;
  navFertilizerCalc: string;
  navWeather: string;
  navDiagnosisHistory: string;
  navFarmerResources: string;
  navScanLeafQuick: string;
  signIn: string;
  signOut: string;
  farmerProfile: string;

  heroWelcome: string;
  heroTagline: string;
  heroSubtext: string;
  heroGetStarted: string;
  heroLearnMore: string;
  mottoHealthyCrops: string;
  mottoBetterYields: string;
  mottoBrighterFuture: string;
  yieldGainBadge: string;
  yieldGainSub: string;
  aiConnectedFarm: string;
  accuracyMetric: string;
  datasetMetric: string;
  classesMetric: string;
  speedMetric: string;
  quickTestLabel: string;

  featureHeaderTitle: string;
  featureHeaderSub: string;
  cardDiseaseTitle: string;
  cardDiseaseBadge: string;
  cardDiseaseDesc: string;
  cardCareTitle: string;
  cardCareBadge: string;
  cardCareDesc: string;
  cardTaskTitle: string;
  cardTaskBadge: string;
  cardTaskDesc: string;
  cardFertilizerTitle: string;
  cardFertilizerBadge: string;
  cardFertilizerDesc: string;
  cardHistoryTitle: string;
  cardHistoryBadge: string;
  cardHistoryDesc: string;
  cardResourcesTitle: string;
  cardResourcesBadge: string;
  cardResourcesDesc: string;
  cardGo: string;

  smarterDecisionsTitle: string;
  smarterDecisionsSub: string;
  smarterDecisionsCta: string;
  engineActiveBadge: string;
  healthyCropsHighlight: string;
  betterYieldsHighlight: string;
  thrivingFarmersHighlight: string;
  latestFeaturesTitle: string;
  quickAccessTitle: string;
  viewAll: string;

  ourMissionTitle: string;
  ourMissionText: string;
  quoteText: string;
  freeForSmallholders: string;
  agronomistVerified: string;

  detectPageTitle: string;
  detectPageSub: string;
  plantVillageBadgeTitle: string;
  plantVillageSamplesBadge: string;
  plantVillageAccuracyBadge: string;
  plantVillageDescription: string;
  step1Title: string;
  step1Sub: string;
  targetCropLabel: string;
  dragDropTitle: string;
  dragDropSub: string;
  browseFiles: string;
  openCamera: string;
  sampleCatalogTitle: string;
  sampleCatalogSub: string;
  filterPlaceholder: string;
  analyzeButton: string;
  analyzingProgress: string;
  readyToAnalyzeHint: string;
  stepScan1: string;
  stepScan2: string;
  stepScan3: string;
  resultsTitle: string;
  modeSimpleGuide: string;
  modeAdvancedLab: string;
  accuracyBadge: string;
  statusHealthy: string;
  statusInfected: string;
  statusHealthyDesc: string;
  statusInfectedDesc: string;
  actionPlanTitle: string;
  step1PruneTitle: string;
  step2OrganicTitle: string;
  step3ChemicalTitle: string;
  sprayerTimingTitle: string;
  sprayerTimingDesc: string;
  saveDiagnosisBtn: string;
  savedToHistoryToast: string;
  downloadPdfBtn: string;
  printPrescriptionBtn: string;

  historyTitle: string;
  historySub: string;
  downloadFullLogPdf: string;
  downloadRecordPdf: string;
  viewReportBtn: string;
  downloadOfficialPdf: string;
  noRecordsTitle: string;
  newLeafScanBtn: string;

  selectLanguage: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brandName: 'HydraMind',
    assistantSubtitle: 'Smart Farming. Better Tomorrow.',
    proBadge: 'AI',
    smartFarmingBadge: 'AI-Powered Farming Companion',

    navHome: 'Home',
    navDiseaseDetection: 'Crop Disease Detection',
    navCareGuide: 'Crop Care Guide',
    navTaskPlanner: 'Farm Task Planner',
    navFertilizerCalc: 'Fertilizer Calculator',
    navWeather: 'Weather Forecast',
    navDiagnosisHistory: 'Diagnosis History',
    navFarmerResources: 'Farmer Resources',
    navScanLeafQuick: 'Scan Leaf',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    farmerProfile: 'Farm Profile Details',

    heroWelcome: 'Welcome to',
    heroTagline: 'AI Farmer Assistant',
    heroSubtext: 'Get instant crop disease detection, expert crop care guidance, plan your farm tasks and more — all in one simple, intelligent place.',
    heroGetStarted: 'Get Started',
    heroLearnMore: 'Learn More',
    mottoHealthyCrops: 'Healthy Crops',
    mottoBetterYields: 'Better Yields',
    mottoBrighterFuture: 'A Brighter Future',
    yieldGainBadge: '+28% Yield Gain',
    yieldGainSub: 'With early blight control',
    aiConnectedFarm: 'AI Connected Farm',
    accuracyMetric: 'Model Accuracy',
    datasetMetric: 'Leaf Dataset',
    classesMetric: 'Classes Covered',
    speedMetric: 'Instant Result',
    quickTestLabel: 'Quick Test:',

    featureHeaderTitle: 'Essential Farming Tools',
    featureHeaderSub: 'Select any module below to manage your fields, calculate treatments, and diagnose crop health.',
    cardDiseaseTitle: 'Crop Disease Detection',
    cardDiseaseBadge: 'AI Diagnosis',
    cardDiseaseDesc: 'Upload or drag leaf image to run instant PlantVillage AI analysis.',
    cardCareTitle: 'Crop Care Guide',
    cardCareBadge: 'Expert Tips',
    cardCareDesc: 'Learn about prevention, watering schedules, and soil health management.',
    cardTaskTitle: 'Farm Task Planner',
    cardTaskBadge: 'Field Ops',
    cardTaskDesc: 'Organize your daily chores, irrigation schedules, and reminder alerts.',
    cardFertilizerTitle: 'Fertilizer Calculator',
    cardFertilizerBadge: 'NPK Dosage',
    cardFertilizerDesc: 'Get crop-specific fertilizer recommendations and knapsack dosing.',
    cardHistoryTitle: 'Diagnosis History',
    cardHistoryBadge: 'Log Book',
    cardHistoryDesc: 'View your previous leaf scans, pathogen levels, and healing progress.',
    cardResourcesTitle: 'Farmer Resources',
    cardResourcesBadge: 'Knowledge Hub',
    cardResourcesDesc: 'Access hotlines, government schemes, soil lab links, and video guides.',
    cardGo: 'Go',

    smarterDecisionsTitle: 'Smarter Decisions for Healthier Crops',
    smarterDecisionsSub: 'Use HydroMind to get real-time leaf insights, clear 3-step action plans, and knapsack sprayer tips.',
    smarterDecisionsCta: 'Analyze Leaf Now',
    engineActiveBadge: 'AI Scanner Engine Active',
    healthyCropsHighlight: 'Healthy Crops',
    betterYieldsHighlight: 'Better Yields',
    thrivingFarmersHighlight: 'Thriving Farmers',
    latestFeaturesTitle: 'Latest Features',
    quickAccessTitle: 'Quick Access',
    viewAll: 'View All',

    ourMissionTitle: 'Our Mission',
    ourMissionText: 'To make useful farming information easier to access. HydroMind empowers local smallholders and commercial growers with AI-assisted leaf analysis, simple 3-step healing guides, and practical day-to-day crop management tools.',
    quoteText: '“Better information. Healthier crops. Stronger communities.”',
    freeForSmallholders: '100% Free for Smallholders',
    agronomistVerified: 'Agronomist Verified',

    detectPageTitle: 'Crop Disease Detection',
    detectPageSub: 'AI diagnosis trained on 54,305 Kaggle PlantVillage samples with results displayed directly below',
    plantVillageBadgeTitle: 'Kaggle PlantVillage Computer Vision Engine',
    plantVillageSamplesBadge: '54,305 Leaf Samples',
    plantVillageAccuracyBadge: '99.35% Test Accuracy',
    plantVillageDescription: 'Recognizes 38 ground-truth crop blights, rusts, mildews, and spots. Choose or upload a leaf photo, click Analyze, and review the full diagnosis and action plan right below.',
    step1Title: 'Select or Upload Leaf Photo',
    step1Sub: 'Upload from your phone/computer, take a photo with camera, or select a verified crop sample',
    targetCropLabel: 'Target Crop:',
    dragDropTitle: 'Drag & Drop Leaf Photo Here',
    dragDropSub: 'or click to open your device file manager',
    browseFiles: 'Browse Files',
    openCamera: 'Open Camera',
    sampleCatalogTitle: 'Or Pick From Verified PlantVillage Disease Samples:',
    sampleCatalogSub: 'samples',
    filterPlaceholder: 'Filter by disease (Blight, Rust, Spot, Scab)...',
    analyzeButton: '🔬 Analyze Leaf Image Now',
    analyzingProgress: 'Analyzing Leaf Image...',
    readyToAnalyzeHint: 'Results will display directly below ↓',
    stepScan1: 'Step 1/3: Reading foliar color & tissue biomarkers...',
    stepScan2: 'Step 2/3: Matching with 54,305 Kaggle PlantVillage leaf patterns...',
    stepScan3: 'Step 3/3: Formulating simplified farmer 3-step action plan...',
    resultsTitle: 'Diagnostic Results & Farmer Action Plan',
    modeSimpleGuide: '🌱 Simple Farmer Guide',
    modeAdvancedLab: '🔬 Lab & Kaggle Data',
    accuracyBadge: 'Accuracy',
    statusHealthy: 'No Disease Detected',
    statusInfected: 'Issue Detected',
    statusHealthyDesc: 'Your crop leaves are strong, green, and healthy. Continue regular field maintenance and watering.',
    statusInfectedDesc: 'Foliar infection identified by PlantVillage deep vision. Follow the 3 action steps below to arrest disease progression and protect crop harvest.',
    actionPlanTitle: 'Farmer Action Plan (What To Do Now)',
    step1PruneTitle: 'Step 1: Prune & Sanitize (Do This Today)',
    step2OrganicTitle: 'Step 2: Natural / Organic Spray',
    step3ChemicalTitle: 'Step 3: Chemical Control & Exact Dosage',
    sprayerTimingTitle: 'Knapsack Sprayer Calibration & Timing (16L Tank)',
    sprayerTimingDesc: 'Dilute 35–40 ml (or 35–40 g) per 16-liter knapsack sprayer. Spray between 6:00 AM – 9:00 AM or late in the evening. Avoid spraying in direct midday heat (>32°C) or if rain is expected within 4 hours. Wear gloves and protective mask.',
    saveDiagnosisBtn: 'Save Diagnosis to History',
    savedToHistoryToast: 'Saved to History!',
    downloadPdfBtn: 'Download Official PDF Report',
    printPrescriptionBtn: 'Print Prescription',

    historyTitle: 'Diagnosis History',
    historySub: 'Log of leaf scans, detected pathogens, and downloadable PDF reports',
    downloadFullLogPdf: 'Download Full Log (PDF)',
    downloadRecordPdf: 'PDF',
    viewReportBtn: 'View Details',
    downloadOfficialPdf: 'Download Official PDF Report',
    noRecordsTitle: 'No diagnosis records found.',
    newLeafScanBtn: 'New Leaf Scan',

    selectLanguage: 'Language',
  },

  hi: {
    brandName: 'हाइड्रामाइंड',
    assistantSubtitle: 'स्मार्ट कृषि। बेहतर कल।',
    proBadge: 'एआई',
    smartFarmingBadge: 'एआई-संचालित कृषि साथी',

    navHome: 'होम',
    navDiseaseDetection: 'फसल रोग पहचान',
    navCareGuide: 'फसल देखभाल',
    navTaskPlanner: 'कृषि कार्य योजना',
    navFertilizerCalc: 'उर्वरक कैलकुलेटर',
    navWeather: 'मौसम पूर्वानुमान',
    navDiagnosisHistory: 'रोग इतिहास',
    navFarmerResources: 'किसान सहायता केंद्र',
    navScanLeafQuick: 'पत्ती जांचें',
    signIn: 'लॉग इन करें',
    signOut: 'लॉग आउट',
    farmerProfile: 'किसान प्रोफाइल विवरण',

    heroWelcome: 'स्वागत है',
    heroTagline: 'एआई किसान सहायक',
    heroSubtext: 'फसल रोग की तुरंत पहचान, कृषि विशेषज्ञों की सलाह, दैनिक कार्यों की योजना और उर्वरक गणना — सब कुछ एक ही स्थान पर सरल हिंदी में।',
    heroGetStarted: 'अभी शुरू करें',
    heroLearnMore: 'अधिक जानें',
    mottoHealthyCrops: 'स्वस्थ फसलें',
    mottoBetterYields: 'अधिक पैदावार',
    mottoBrighterFuture: 'उज्ज्वल भविष्य',
    yieldGainBadge: '+28% अधिक उत्पादन',
    yieldGainSub: 'समय पर रोग नियंत्रण द्वारा',
    aiConnectedFarm: 'एआई स्मार्ट कृषि',
    accuracyMetric: 'सटीकता दर',
    datasetMetric: 'पत्ती डेटासेट',
    classesMetric: 'फसल किस्में',
    speedMetric: 'त्वरित परिणाम',
    quickTestLabel: 'तुरंत जांचें:',

    featureHeaderTitle: 'किसानों के लिए आवश्यक डिजिटल साधन',
    featureHeaderSub: 'अपनी फसल को रोगों से बचाने और सही खाद-दवा के लिए नीचे दिए गए विकल्प चुनें।',
    cardDiseaseTitle: 'फसल रोग पहचान',
    cardDiseaseBadge: 'एआई जांच',
    cardDiseaseDesc: 'पत्ती की तस्वीर अपलोड करें और कैगल प्लांटविलेज एआई से तुरंत रोग व दवा जानें।',
    cardCareTitle: 'फसल देखभाल गाइड',
    cardCareBadge: 'विशेषज्ञ सलाह',
    cardCareDesc: 'बीज बोने से लेकर कटाई तक, पानी, मिट्टी और कीट नियंत्रण की सम्पूर्ण जानकारी।',
    cardTaskTitle: 'कृषि कार्य नियोजक',
    cardTaskBadge: 'खेत प्रबंधन',
    cardTaskDesc: 'सिंचाई, निराई, दवा छिड़काव और खाद देने के कार्यों का समयबद्ध कैलेंडर बनाएं।',
    cardFertilizerTitle: 'उर्वरक कैलकुलेटर',
    cardFertilizerBadge: 'एनपीके मात्रा',
    cardFertilizerDesc: 'फसल और एकड़ के हिसाब से यूरिया, डीएपी और पोटाश का सटीक माप निकालें।',
    cardHistoryTitle: 'रोग निदान इतिहास',
    cardHistoryBadge: 'रिकॉर्ड पुस्तिका',
    cardHistoryDesc: 'अपनी पिछली जांचें देखें और सुधार की स्थिति की पीडीएफ रिपोर्ट डाउनलोड करें।',
    cardResourcesTitle: 'किसान सहायता केंद्र',
    cardResourcesBadge: 'सरकारी योजनाएं',
    cardResourcesDesc: 'किसान कॉल सेंटर (1800-180-1551), मंडी भाव और कृषि योजनाओं की जानकारी।',
    cardGo: 'खोलें',

    smarterDecisionsTitle: 'स्वस्थ फसल व बेहतर उपज के लिए सही फैसले',
    smarterDecisionsSub: 'हाइड्रोमाइंड से पत्तियों का त्वरित विश्लेषण, 3-चरणीय उपचार योजना और 16-लीटर स्प्रे पंप का सही माप प्राप्त करें।',
    smarterDecisionsCta: 'पत्ती का विश्लेषण करें',
    engineActiveBadge: 'एआई स्कैनर चालू है',
    healthyCropsHighlight: 'स्वस्थ फसलें',
    betterYieldsHighlight: 'अधिक पैदावार',
    thrivingFarmersHighlight: 'सशक्त किसान',
    latestFeaturesTitle: 'नवीनतम सुविधाएं',
    quickAccessTitle: 'त्वरित पहुंच',
    viewAll: 'सभी देखें',

    ourMissionTitle: 'हमारा उद्देश्य',
    ourMissionText: 'हर किसान तक आधुनिक कृषि विज्ञान और एआई तकनीक पहुंचाना। हाइड्रोमाइंड छोटे व बड़े सभी किसानों को फसल रोगों की पहचान और सही दवा का आसान मार्गदर्शन निशुल्क उपलब्ध कराता है।',
    quoteText: '“सटीक जानकारी। स्वस्थ फसलें। खुशहाल किसान परिवार।”',
    freeForSmallholders: 'छोटे किसानों के लिए 100% निशुल्क',
    agronomistVerified: 'कृषि वैज्ञानिकों द्वारा प्रमाणित',

    detectPageTitle: 'फसल रोग पहचान व उपचार',
    detectPageSub: '54,305 कैगल प्लांटविलेज नमूनों पर प्रशिक्षित एआई मॉडल — परिणाम ठीक नीचे देखें',
    plantVillageBadgeTitle: 'कैगल प्लांटविलेज कंप्यूटर विज़न तकनीक',
    plantVillageSamplesBadge: '54,305 पत्ती नमूने',
    plantVillageAccuracyBadge: '99.35% सटीकता',
    plantVillageDescription: '38 प्रमुख फसल रोगों (ब्लाइट, रतुआ, पत्ती धब्बा, पाउडरी मिल्ड्यू) की पहचान। फोटो चुनें, जांच बटन दबाएं और नीचे सम्पूर्ण उपचार देखें।',
    step1Title: 'चरण 1: पत्ती का फोटो चुनें या अपलोड करें',
    step1Sub: 'मोबाइल कैमरे से फोटो खींचें, गैलरी से चुनें या नीचे दिए गए नमूनों में से कोई एक चुनें',
    targetCropLabel: 'फसल का नाम:',
    dragDropTitle: 'पत्ती का फोटो यहाँ खींचें या क्लिक करें',
    dragDropSub: 'अपने फोन या कंप्यूटर से इमेज फाइल चुनें',
    browseFiles: 'फ़ाइल चुनें',
    openCamera: 'कैमरा खोलें',
    sampleCatalogTitle: 'या प्रमाणित नमूनों में से चुनें:',
    sampleCatalogSub: 'नमूने',
    filterPlaceholder: 'रोग खोजें (ब्लाइट, रस्ट, फफूंद, धब्बा)...',
    analyzeButton: '🔬 पत्ती की जांच करें (Analyze)',
    analyzingProgress: 'पत्ती की जांच चल रही है...',
    readyToAnalyzeHint: 'परिणाम ठीक नीचे दिखाई देंगे ↓',
    stepScan1: 'चरण 1/3: पत्ती के रंग और ऊतकों का विश्लेषण...',
    stepScan2: 'चरण 2/3: 54,305 नमूनों के साथ रोग का मिलान...',
    stepScan3: 'चरण 3/3: किसानों के लिए 3-चरणीय उपचार तैयार...',
    resultsTitle: 'रोग निदान व किसान कार्य योजना',
    modeSimpleGuide: '🌱 सरल किसान गाइड',
    modeAdvancedLab: '🔬 प्रयोगशाला व डेटा',
    accuracyBadge: 'सटीकता',
    statusHealthy: 'कोई रोग नहीं पाया गया (स्वस्थ)',
    statusInfected: 'रोग के लक्षण पाए गए',
    statusHealthyDesc: 'आपकी फसल की पत्तियां मजबूत, हरी और स्वस्थ हैं। नियमित सिंचाई और खाद जारी रखें।',
    statusInfectedDesc: 'पत्तियों पर फफूंद या बैक्टीरिया का प्रकोप देखा गया है। फसल को बचाने के लिए नीचे दिए गए 3 चरणों का पालन करें।',
    actionPlanTitle: 'किसान कार्य योजना (आज क्या करें)',
    step1PruneTitle: 'चरण 1: छंटाई व सफाई (आज ही करें)',
    step2OrganicTitle: 'चरण 2: प्राकृतिक / नीम तेल का छिड़काव',
    step3ChemicalTitle: 'चरण 3: रासायनिक दवा व सटीक मात्रा',
    sprayerTimingTitle: '16-लीटर स्प्रेयर पंप का माप और समय',
    sprayerTimingDesc: 'एक 16-लीटर नैपसैक पंप में 35-40 मिलीलीटर (या 35-40 ग्राम) दवा मिलाएं। छिड़काव सुबह 6 से 9 बजे के बीच या शाम को करें। तेज धूप या 4 घंटे के भीतर बारिश की संभावना हो तो छिड़काव न करें।',
    saveDiagnosisBtn: 'इतिहास में सुरक्षित करें',
    savedToHistoryToast: 'इतिहास में सुरक्षित किया गया!',
    downloadPdfBtn: 'आधिकारिक पीडीएफ रिपोर्ट डाउनलोड करें',
    printPrescriptionBtn: 'पर्चा प्रिंट करें',

    historyTitle: 'रोग निदान इतिहास',
    historySub: 'पिछली जांचों, पाए गए रोगों और उपचार का लेखा-जोखा (पीडीएफ डाउनलोड उपलब्ध)',
    downloadFullLogPdf: 'संपूर्ण रिकॉर्ड पीडीएफ डाउनलोड करें',
    downloadRecordPdf: 'पीडीएफ',
    viewReportBtn: 'विवरण देखें',
    downloadOfficialPdf: 'आधिकारिक रिपोर्ट डाउनलोड करें',
    noRecordsTitle: 'अभी तक कोई रिकॉर्ड नहीं मिला।',
    newLeafScanBtn: 'नया पत्ता जांचें',

    selectLanguage: 'भाषा',
  },

  mr: {
    brandName: 'हायड्रामाइंड',
    assistantSubtitle: 'स्मार्ट शेती। समृद्ध उद्या।',
    proBadge: 'एआय',
    smartFarmingBadge: 'एआय-सक्षम शेती साथी',

    navHome: 'मुख्यपृष्ठ',
    navDiseaseDetection: 'पीक रोग निदान',
    navCareGuide: 'पीक काळजी मार्गदर्शक',
    navTaskPlanner: 'शेती कामे नियोजक',
    navFertilizerCalc: 'खत कॅल्क्युलेटर',
    navWeather: 'हवामान अंदाज',
    navDiagnosisHistory: 'तपासणी इतिहास',
    navFarmerResources: 'शेतकरी मदत केंद्र',
    navScanLeafQuick: 'पान तपासा',
    signIn: 'लॉग इन करा',
    signOut: 'लॉग आउट',
    farmerProfile: 'शेतकरी प्रोफाइल तपशील',

    heroWelcome: 'स्वागत आहे',
    heroTagline: 'एआय शेतकरी सहाय्यक',
    heroSubtext: 'पिकांवरील रोगांची त्वरित तपासणी, तज्ज्ञ कृषी सल्ला, दैनंदिन शेतीकामांचे नियोजन आणि खतांचे अचूक प्रमाण — सर्व काही एकाच ठिकाणी शुद्ध मराठीत.',
    heroGetStarted: 'आता सुरू करा',
    heroLearnMore: 'अधिक माहिती',
    mottoHealthyCrops: 'निरोगी पिके',
    mottoBetterYields: 'भरघोस उत्पादन',
    mottoBrighterFuture: 'उज्ज्वल भविष्य',
    yieldGainBadge: '+२८% अधिक उत्पादन',
    yieldGainSub: 'वेळेवर कीड-रोग नियंत्रणाने',
    aiConnectedFarm: 'एआय स्मार्ट शेती',
    accuracyMetric: 'मॉडेल अचूकता',
    datasetMetric: 'पानांचे नमुने',
    classesMetric: 'पीक प्रकार',
    speedMetric: 'झटपट निकाल',
    quickTestLabel: 'त्वरित चाचणी:',

    featureHeaderTitle: 'शेतकऱ्यांसाठी अत्यावश्यक डिजिटल साधने',
    featureHeaderSub: 'आपल्या शेताचे व्यवस्थापन करण्यासाठी आणि पिकांवरील रोग ओळखण्यासाठी खालील पर्याय निवडा.',
    cardDiseaseTitle: 'पीक रोग निदान',
    cardDiseaseBadge: 'एआय तपासणी',
    cardDiseaseDesc: 'पानाचा फोटो अपलोड करा आणि ५४,३०५ नमुन्यांवर आधारित एआय तंत्रज्ञानाने रोग ओळखा.',
    cardCareTitle: 'पीक काळजी मार्गदर्शक',
    cardCareBadge: 'तज्ज्ञ सल्ला',
    cardCareDesc: 'पाणी व्यवस्थापन, कीड नियंत्रण आणि जमिनीची सुपीकता वाढवण्याची संपूर्ण माहिती.',
    cardTaskTitle: 'शेती कामे नियोजक',
    cardTaskBadge: 'शेत व्यवस्थापन',
    cardTaskDesc: 'खुरपणी, खते देणे, फवारणी आणि मशागतीचे दैनंदिन कामे नोंदवून ठेवा.',
    cardFertilizerTitle: 'खत कॅल्क्युलेटर',
    cardFertilizerBadge: 'एनपीके मात्रा',
    cardFertilizerDesc: 'पिकानुसार आणि एकराप्रमाणे युरिया, डीएपी व पोटॅशचे अचूक प्रमाण काढा.',
    cardHistoryTitle: 'तपासणी इतिहास',
    cardHistoryBadge: 'नोंदवही',
    cardHistoryDesc: 'पूर्वी केलेल्या सर्व रोग तपासण्यांची माहिती पहा व अधिकृत पीडीएफ अहवाल डाउनलोड करा.',
    cardResourcesTitle: 'शेतकरी मदत केंद्र',
    cardResourcesBadge: 'माहिती कक्ष',
    cardResourcesDesc: 'किसान कॉल सेंटर (1800-180-1551), बाजारभाव आणि शासकीय योजनांची माहिती.',
    cardGo: 'उघडा',

    smarterDecisionsTitle: 'निरोगी पिके व भरघोस उत्पन्नासाठी योग्य निर्णय',
    smarterDecisionsSub: 'हायड्रोमाइंडच्या साहाय्याने पानांची अचूक तपासणी, ३-टप्प्यांची उपचार योजना आणि १६-लिटर फवारणी पंपाचे प्रमाण मिळवा.',
    smarterDecisionsCta: 'पानाचे विश्लेषण करा',
    engineActiveBadge: 'एआय स्कॅनर सुरू आहे',
    healthyCropsHighlight: 'निरोगी पिके',
    betterYieldsHighlight: 'भरघोस उत्पादन',
    thrivingFarmersHighlight: 'समृद्ध शेतकरी',
    latestFeaturesTitle: 'नवीन वैशिष्ट्ये',
    quickAccessTitle: 'जलद प्रवेश',
    viewAll: 'सर्व पहा',

    ourMissionTitle: 'आमचे ध्येय',
    ourMissionText: 'अत्याधुनिक कृषी तंत्रज्ञान आणि एआय प्रत्येक शेतकऱ्यापर्यंत पोहोचवणे. हायड्रोमाइंड सर्व अल्पभूधारक व प्रगतीशील शेतकऱ्यांना पिकांवरील रोगांची ओळख व योग्य औषधोपचार मोफत उपलब्ध करून देते.',
    quoteText: '“अचूक माहिती. निरोगी पिके. समृद्ध शेतकरी समाज.”',
    freeForSmallholders: 'अल्पभूधारक शेतकऱ्यांसाठी १००% मोफत',
    agronomistVerified: 'कृषी तज्ज्ञांकडून प्रमाणित',

    detectPageTitle: 'पीक रोग निदान व उपचार',
    detectPageSub: '५४,३०५ पानांच्या नमुन्यांवर प्रशिक्षित कॉम्प्युटर व्हिजन — निकाल खाली पहा',
    plantVillageBadgeTitle: 'कॅगल प्लांटव्हिलेज कॉम्प्युटर व्हिजन इंजिन',
    plantVillageSamplesBadge: '५४,३०५ पानांचे नमुने',
    plantVillageAccuracyBadge: '९९.३५% अचूकता',
    plantVillageDescription: '३८ प्रमुख पिकांवरील रोगांची (करपा, तांबेरा, भुरी, ठिपके) अचूक ओळख. पानाचा फोटो निवडा, विश्लेषण करा आणि खालील उपाययोजना पहा.',
    step1Title: 'टप्पा १: पानाचा फोटो निवडा किंवा कॅमेऱ्याने काढा',
    step1Sub: 'मोबाईलवरून फोटो अपलोड करा किंवा खाली दिलेल्या प्रमाणित नमुन्यांमधून निवडा',
    targetCropLabel: 'पीक निवडा:',
    dragDropTitle: 'पानाचा फोटो येथे ड्रॅग करा किंवा क्लिक करा',
    dragDropSub: 'आपल्या फोन किंवा कॉम्प्युटरमधील फोटो फाइल निवडा',
    browseFiles: 'फाइल निवडा',
    openCamera: 'कॅमेरा उघडा',
    sampleCatalogTitle: 'किंवा प्रमाणित नमुन्यांमधून निवडा:',
    sampleCatalogSub: 'नमुने',
    filterPlaceholder: 'रोग शोधा (करपा, तांबेरा, भुरी, डाऊनी)...',
    analyzeButton: '🔬 पानाचे विश्लेषण करा (Analyze)',
    analyzingProgress: 'पानाची तपासणी सुरू आहे...',
    readyToAnalyzeHint: 'निकाल खाली लगेच दिसतील ↓',
    stepScan1: 'टप्पा १/३: पानाचा रंग आणि ऊतींची तपासणी...',
    stepScan2: 'टप्पा २/३: ५४,३०५ नमुन्यांशी जुळवणी करत आहे...',
    stepScan3: 'टप्पा ३/३: शेतकऱ्यांसाठी ३-टप्प्यांचा कृती आराखडा...',
    resultsTitle: 'रोग निदान व शेतकरी कृती आराखडा',
    modeSimpleGuide: '🌱 सोपा शेतकरी मार्गदर्शक',
    modeAdvancedLab: '🔬 लॅब व डेटा माहिती',
    accuracyBadge: 'अचूकता',
    statusHealthy: 'कोणताही रोग नाही (पीक निरोगी आहे)',
    statusInfected: 'रोगाची लक्षणे आढळली',
    statusHealthyDesc: 'आपल्या पिकाची पाने सशक्त, हिरवीगार आणि निरोगी आहेत. नियमित पाणी व खत व्यवस्थापन चालू ठेवा.',
    statusInfectedDesc: 'पानांवर बुरशीजन्य किंवा जिवाणूजन्य रोगाची लागण झाली आहे. पीक वाचवण्यासाठी खालील ३ टप्प्यांचे पालन करा.',
    actionPlanTitle: 'शेतकरी कृती आराखडा (आज काय करावे)',
    step1PruneTitle: 'टप्पा १: छाटणी व स्वच्छता (आजच करा)',
    step2OrganicTitle: 'टप्पा २: सेंद्रिय / कडुनिंब अर्क फवारणी',
    step3ChemicalTitle: 'टप्पा ३: रासायनिक बुरशीनाशक व पंपाचे प्रमाण',
    sprayerTimingTitle: '१६-लिटर फवारणी पंपाचे प्रमाण व वेळ',
    sprayerTimingDesc: 'एका १६-लिटर नॅपसॅक पंपासाठी ३५-४० मिली (किंवा ३५-४० ग्रॅम) औषध वापरावे. फवारणी सकाळी ६ ते ९ वाजेदरम्यान किंवा संध्याकाळी करावी. दुपारच्या कडक उन्हात किंवा ४ तासांत पाऊस येण्याची शक्यता असल्यास फवारणी टाळावी.',
    saveDiagnosisBtn: 'इतिहासात जतन करा',
    savedToHistoryToast: 'इतिहासात जतन केले!',
    downloadPdfBtn: 'अधिकृत पीडीएफ अहवाल डाउनलोड करा',
    printPrescriptionBtn: 'प्रिस्क्रिप्शन प्रिंट करा',

    historyTitle: 'तपासणी इतिहास',
    historySub: 'पूर्वी केलेल्या रोग तपासण्या आणि डाउनलोड करता येणारे पीडीएफ अहवाल',
    downloadFullLogPdf: 'संपूर्ण नोंदवही पीडीएफ डाउनलोड करा',
    downloadRecordPdf: 'पीडीएफ',
    viewReportBtn: 'सविस्तर पहा',
    downloadOfficialPdf: 'अधिकृत अहवाल डाउनलोड करा',
    noRecordsTitle: 'अजून एकही तपासणी नोंद नाही.',
    newLeafScanBtn: 'नवीन पान तपासा',

    selectLanguage: 'भाषा',
  },
};
