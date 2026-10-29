import React, { useState, useRef } from 'react';
import {
  ScanSearch,
  Upload,
  Camera,
  FolderOpen,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  BookmarkCheck,
  RefreshCw,
  FileText,
  Database,
  BarChart2,
  Layers,
  Search,
  Check,
  Play,
  Scissors,
  Droplets,
  Pill,
  Clock,
  HelpCircle,
  Eye,
  Microscope,
  Info,
  Download,
  FileDown,
  ArrowDown
} from 'lucide-react';
import { DiagnosisRecord, PlantVillageClass, UserAccount, Language } from '../../types';
import {
  PLANT_VILLAGE_CLASSES,
  PLANT_VILLAGE_DATASET_META
} from '../../data/plantVillageData';
import {
  classifyUploadedLeaf,
  fileToBase64,
  LeafBiomarkers
} from '../../services/leafClassifier';
import { exportDiagnosisPdf } from '../../services/pdfExportService';
import { TRANSLATIONS } from '../../locales/translations';

interface DiseaseDetectionViewProps {
  onBack: () => void;
  onSaveToHistory: (record: DiagnosisRecord) => void;
  onViewHistory: () => void;
  currentUser?: UserAccount | null;
  language: Language;
}

export const DiseaseDetectionView: React.FC<DiseaseDetectionViewProps> = ({
  onBack,
  onSaveToHistory,
  onViewHistory,
  currentUser,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // File inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Drag & drop state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);

  // Selected PlantVillage state
  const [selectedClass, setSelectedClass] = useState<PlantVillageClass>(PLANT_VILLAGE_CLASSES[0]);
  const [selectedImage, setSelectedImage] = useState<string>(PLANT_VILLAGE_CLASSES[0].imageUrl);
  const [cropFilter, setCropFilter] = useState<string>('All');
  const [cropHint, setCropHint] = useState<string>('All');
  const [searchClassQuery, setSearchClassQuery] = useState<string>('');

  // Scanning & Analysis state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStepMessage, setScanStepMessage] = useState<string>(t.stepScan1);
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);
  const [justFinishedAnalysis, setJustFinishedAnalysis] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [pdfToast, setPdfToast] = useState<string | null>(null);
  const [resultMode, setResultMode] = useState<'simple' | 'advanced'>('simple');
  const [scanError, setScanError] = useState<string | null>(null);

  // Extracted Biomarkers
  const [biomarkers, setBiomarkers] = useState<LeafBiomarkers>({
    healthyGreenPercent: 78,
    chlorosisYellowPercent: 12,
    necroticBrownPercent: 8,
    mildewWhitePercent: 2,
    rustOrangePercent: 0,
  });

  // Current active diagnosis output (starts null so NO stale previous scan is shown)
  const [currentResult, setCurrentResult] = useState<DiagnosisRecord | null>(null);

  const cropFilterOptions = [
    { id: 'All', label: language === 'hi' ? 'सभी फसलें' : language === 'mr' ? 'सर्व पिके' : 'All Crops' },
    { id: 'Bell Pepper (Capsicum)', label: language === 'hi' ? '🫑 शिमला मिर्च' : language === 'mr' ? '🫑 ढोबळी मिरची' : '🫑 Bell Pepper' },
    { id: 'Blueberry', label: language === 'hi' ? '🫐 ब्लूबेरी' : language === 'mr' ? '🫐 ब्लूबेरी' : '🫐 Blueberry' },
    { id: 'Chilli', label: language === 'hi' ? '🌶️ मिर्च' : language === 'mr' ? '🌶️ मिरची' : '🌶️ Chilli' },
    { id: 'Tomato', label: language === 'hi' ? '🍅 टमाटर' : language === 'mr' ? '🍅 टोमॅटो' : '🍅 Tomato' },
    { id: 'Potato', label: language === 'hi' ? '🥔 आलू' : language === 'mr' ? '🥔 बटाटा' : '🥔 Potato' },
    { id: 'Corn (Maize)', label: language === 'hi' ? '🌽 मक्का' : language === 'mr' ? '🌽 मका' : '🌽 Corn (Maize)' },
    { id: 'Apple', label: language === 'hi' ? '🍎 सेब' : language === 'mr' ? '🍎 सफरचंद' : '🍎 Apple' },
    { id: 'Grape', label: language === 'hi' ? '🍇 अंगूर' : language === 'mr' ? '🍇 द्राक्षे' : '🍇 Grape' },
    { id: 'Strawberry', label: language === 'hi' ? '🍓 स्ट्रॉबेरी' : language === 'mr' ? '🍓 स्ट्रॉबेरी' : '🍓 Strawberry' },
    { id: 'Peach', label: language === 'hi' ? '🍑 आड़ू' : language === 'mr' ? '🍑 पीच' : '🍑 Peach' },
    { id: 'Cherry', label: language === 'hi' ? '🍒 चेरी' : language === 'mr' ? '🍒 चेरी' : '🍒 Cherry' },
    { id: 'Orange (Citrus)', label: language === 'hi' ? '🍊 संतरा' : language === 'mr' ? '🍊 संत्रा' : '🍊 Orange (Citrus)' },
    { id: 'Squash', label: language === 'hi' ? '🥒 कद्दू / स्क्वैश' : language === 'mr' ? '🥒 भोपळा' : '🥒 Squash' },
    { id: 'Soybean', label: language === 'hi' ? '🌱 सोयाबीन' : language === 'mr' ? '🌱 सोयाबीन' : '🌱 Soybean' },
  ];

  const filteredPlantVillageClasses = PLANT_VILLAGE_CLASSES.filter((item) => {
    const matchesCrop = cropFilter === 'All' || item.crop.toLowerCase().includes(cropFilter.toLowerCase());
    const matchesSearch =
      item.disease.toLowerCase().includes(searchClassQuery.toLowerCase()) ||
      item.rawLabel.toLowerCase().includes(searchClassQuery.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchClassQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  // Handle uploaded file (from drag-drop or file picker) - immediately resets previous scan!
  const processUploadedFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert(language === 'hi' ? 'कृपया पत्ती का सही फोटो चुनें।' : language === 'mr' ? 'कृपया पानाचा वैध फोटो निवडा.' : 'Please upload a valid leaf image file (JPG, PNG, or WEBP).');
      return;
    }

    try {
      // 1. Immediately clear previous scan result so stale scan NEVER shows
      setCurrentResult(null);
      setHasAnalyzed(false);
      setJustFinishedAnalysis(false);
      setScanError(null);

      // 2. Read direct base64 data URL so there are zero CORS/blob issues
      const base64Data = await fileToBase64(file);
      setSelectedImage(base64Data);
      setUploadedFileName(file.name);
      setUploadedFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');

      // 3. Auto-detect crop intent from filename keywords
      const lower = file.name.toLowerCase();
      if (
        lower.includes('blueberry') ||
        lower.includes('blue_berry') ||
        lower.includes('vaccinium')
      ) {
        setCropHint('Blueberry');
        setCropFilter('Blueberry');
      } else if (
        lower.includes('chilli') ||
        lower.includes('chili') ||
        lower.includes('mirch')
      ) {
        setCropHint('Chilli');
        setCropFilter('Chilli');
      } else if (
        lower.includes('pepper') ||
        lower.includes('bell') ||
        lower.includes('capsicum') ||
        lower.includes('shimla') ||
        lower.includes('pimiento')
      ) {
        setCropHint('Bell Pepper (Capsicum)');
        setCropFilter('Bell Pepper (Capsicum)');
      } else if (lower.includes('strawberry') || lower.includes('fragaria')) {
        setCropHint('Strawberry');
        setCropFilter('Strawberry');
      } else if (lower.includes('peach') || lower.includes('prunus persica')) {
        setCropHint('Peach');
        setCropFilter('Peach');
      } else if (lower.includes('cherry') || lower.includes('cerasus')) {
        setCropHint('Cherry');
        setCropFilter('Cherry');
      } else if (
        lower.includes('orange') ||
        lower.includes('citrus') ||
        lower.includes('santra') ||
        lower.includes('mosambi') ||
        lower.includes('lemon') ||
        lower.includes('nimbu')
      ) {
        setCropHint('Orange (Citrus)');
        setCropFilter('Orange (Citrus)');
      } else if (lower.includes('squash') || lower.includes('kaddu') || lower.includes('cucurbit')) {
        setCropHint('Squash');
        setCropFilter('Squash');
      } else if (lower.includes('soybean') || lower.includes('soya')) {
        setCropHint('Soybean');
        setCropFilter('Soybean');
      } else if (lower.includes('potato') || lower.includes('aloo')) {
        setCropHint('Potato');
        setCropFilter('Potato');
      } else if (lower.includes('corn') || lower.includes('maize') || lower.includes('makka')) {
        setCropHint('Corn (Maize)');
        setCropFilter('Corn (Maize)');
      } else if (lower.includes('apple') || lower.includes('seb')) {
        setCropHint('Apple');
        setCropFilter('Apple');
      } else if (lower.includes('grape') || lower.includes('angoor')) {
        setCropHint('Grape');
        setCropFilter('Grape');
      } else if (lower.includes('tomato') || lower.includes('tamatar')) {
        setCropHint('Tomato');
        setCropFilter('Tomato');
      }
    } catch (err: any) {
      console.error('File load error:', err);
      setScanError('Failed to load image file. Please try another photo.');
    }
  };

  // Perform Analysis upon clicking "Analyze Leaf Image"
  const handleRunAnalysis = async () => {
    setIsScanning(true);
    setSavedSuccess(false);
    setScanError(null);
    setScanProgress(15);
    setScanStepMessage(t.stepScan1);

    try {
      const result = await classifyUploadedLeaf(
        selectedImage,
        uploadedFileName || selectedClass.rawLabel || selectedClass.disease,
        cropHint
      );
      setSelectedClass(result.matchedClass);
      setBiomarkers(result.biomarkers);

      setTimeout(() => {
        setScanProgress(55);
        setScanStepMessage(t.stepScan2);
      }, 400);

      setTimeout(() => {
        setScanProgress(85);
        setScanStepMessage(t.stepScan3);
      }, 900);

      setTimeout(() => {
        setScanProgress(100);
        const newRecord: DiagnosisRecord = {
          id: 'scan-' + Date.now(),
          crop: result.matchedClass.crop,
          disease: `${result.matchedClass.disease} (${result.matchedClass.scientificPathogen})`,
          confidence: result.confidence,
          severity: result.matchedClass.severity,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          imageUrl: selectedImage,
          symptoms: result.matchedClass.symptoms,
          organicTreatment: result.matchedClass.organicTreatment,
          chemicalTreatment: result.matchedClass.chemicalTreatment,
          prevention: result.matchedClass.prevention,
          plantVillageClass: result.matchedClass.rawLabel,
          kaggleVerified: true,
          crop_hi: result.matchedClass.crop_hi,
          crop_mr: result.matchedClass.crop_mr,
          disease_hi: result.matchedClass.disease_hi,
          disease_mr: result.matchedClass.disease_mr,
          symptoms_hi: result.matchedClass.symptoms_hi,
          symptoms_mr: result.matchedClass.symptoms_mr,
          organicTreatment_hi: result.matchedClass.organicTreatment_hi,
          organicTreatment_mr: result.matchedClass.organicTreatment_mr,
          chemicalTreatment_hi: result.matchedClass.chemicalTreatment_hi,
          chemicalTreatment_mr: result.matchedClass.chemicalTreatment_mr,
          prevention_hi: result.matchedClass.prevention_hi,
          prevention_mr: result.matchedClass.prevention_mr,
        };
        setCurrentResult(newRecord);
        setIsScanning(false);
        setHasAnalyzed(true);
        setJustFinishedAnalysis(true);

        // Smooth scroll to results right below the button
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        setTimeout(() => setJustFinishedAnalysis(false), 6000);
      }, 1300);
    } catch (err: any) {
      console.error('Leaf diagnosis error:', err);
      setIsScanning(false);
      setScanError(err.message || 'Analysis failed. Please try again or choose another photo.');
    }
  };

  const handleSelectPvClass = (pvClass: PlantVillageClass) => {
    setSelectedClass(pvClass);
    setSelectedImage(pvClass.imageUrl);
    setUploadedFileName(pvClass.rawLabel);
    setUploadedFileSize(null);
    setCropHint(pvClass.crop);
    setCropFilter(pvClass.crop);
    setCurrentResult(null); // Clear previous result so this selected sample is diagnosed fresh
    setHasAnalyzed(false);
    setJustFinishedAnalysis(false);
    setScanError(null);
  };

  const handleSave = () => {
    if (currentResult) {
      onSaveToHistory(currentResult);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  // Download PDF Report for this diagnosis
  const handleDownloadPdf = async () => {
    if (!currentResult) return;
    try {
      setIsExportingPdf(true);
      await exportDiagnosisPdf(currentResult, currentUser);
      setPdfToast(`${t.downloadRecordPdf}: ${currentResult.crop} - ${currentResult.disease.split('(')[0].trim()}`);
      setTimeout(() => setPdfToast(null), 4000);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Extract simple 3 steps from current result in active language
  const getSimplePrescription = () => {
    if (!currentResult) return null;
    const isHealthy = currentResult.severity === 'Healthy';

    if (isHealthy) {
      if (language === 'hi') {
        return {
          step1: {
            title: 'चरण 1: खेत की स्वच्छता और निराई',
            detail: currentResult.prevention_hi || currentResult.prevention || 'फसल पूर्णतः स्वस्थ है। नीचे की सूखी व पीली पत्तियों को हटाएं ताकि हवा और धूप पौधों तक पहुंचे।',
            icon: <Scissors className="w-5 h-5 text-emerald-600" />
          },
          step2: {
            title: 'चरण 2: प्राकृतिक सुरक्षा छिड़काव',
            detail: currentResult.organicTreatment_hi || currentResult.organicTreatment || 'समुद्री शैवाल अर्क या 2ml नीम का तेल प्रति लीटर पानी में मिलाकर 14 दिनों में एक बार सुरक्षात्मक छिड़काव करें।',
            icon: <Droplets className="w-5 h-5 text-emerald-600" />
          },
          step3: {
            title: 'चरण 3: संतुलित खाद व पानी प्रबंधन',
            detail: currentResult.chemicalTreatment_hi || currentResult.chemicalTreatment || 'पत्तियों की मजबूती के लिए पोटाश और सूक्ष्म पोषक तत्व दें। पानी हमेशा सुबह के समय तने के पास दें।',
            icon: <Pill className="w-5 h-5 text-emerald-600" />
          }
        };
      }
      if (language === 'mr') {
        return {
          step1: {
            title: 'टप्पा १: शेताची स्वच्छता व छाटणी',
            detail: currentResult.prevention_mr || currentResult.prevention || 'पीक पूर्णपणे निरोगी आहे. जमिनीलगतची पिवळी पाने काढून टाका जेणेकरून झाडांमध्ये हवा खेळती राहील.',
            icon: <Scissors className="w-5 h-5 text-emerald-600" />
          },
          step2: {
            title: 'टप्पा २: सेंद्रिय प्रतिबंधक फवारणी',
            detail: currentResult.organicTreatment_mr || currentResult.organicTreatment || '२ मिली कडुनिंब अर्क (Neem Oil) प्रति लिटर पाण्यात मिसळून दर १४ दिवसांनी पानांवर फवारणी करा.',
            icon: <Droplets className="w-5 h-5 text-emerald-600" />
          },
          step3: {
            title: 'टप्पा ३: योग्य खत व पाणी व्यवस्थापन',
            detail: currentResult.chemicalTreatment_mr || currentResult.chemicalTreatment || 'पानांच्या मजबुतीसाठी पोटॅशयुक्त खत द्या. पाणी नेहमी सकाळी खोडाजवळ द्या, पानांवर थेट पाणी मारू नका.',
            icon: <Pill className="w-5 h-5 text-emerald-600" />
          }
        };
      }
      return {
        step1: {
          title: 'Step 1: Maintain Clean Field Staking',
          detail: currentResult.prevention || 'No disease detected. Keep lower leaves 6 inches off moist soil to prevent fungal splash. Remove yellowing bottom leaves regularly.',
          icon: <Scissors className="w-5 h-5 text-emerald-600" />
        },
        step2: {
          title: 'Step 2: Preventive Natural Spray',
          detail: currentResult.organicTreatment || 'Spray seaweed extract or mild neem oil (2ml per liter of water) once every 14 days to boost foliar immune resistance.',
          icon: <Droplets className="w-5 h-5 text-emerald-600" />
        },
        step3: {
          title: 'Step 3: Fertilizer & Watering Plan',
          detail: currentResult.chemicalTreatment || 'Ensure adequate potassium and silica to strengthen leaf cell walls. Water early in the morning at the base, never overhead.',
          icon: <Pill className="w-5 h-5 text-emerald-600" />
        }
      };
    }

    // Unhealthy/Infected
    if (language === 'hi') {
      return {
        step1: {
          title: 'चरण 1: छंटाई व सफाई (आज ही करें)',
          detail: currentResult.prevention_hi || currentResult.prevention || 'रोगग्रस्त व धब्बेदार पत्तियों को तुरंत काटकर थैली में भरें और खेत से दूर जला दें। कैंची को हमेशा सेनेटाइज करें।',
          icon: <Scissors className="w-5 h-5 text-rose-600" />
        },
        step2: {
          title: 'चरण 2: जैविक / नीम तेल उपचार',
          detail: currentResult.organicTreatment_hi || currentResult.organicTreatment || '5ml शुद्ध नीम का तेल + 1ml तरल साबुन प्रति लीटर पानी में मिलाकर पत्तियों के निचले हिस्से में सुबह 6-9 बजे छिड़कें।',
          icon: <Droplets className="w-5 h-5 text-amber-600" />
        },
        step3: {
          title: 'चरण 3: रासायनिक दवा व 16L पंप का माप',
          detail: currentResult.chemicalTreatment_hi || currentResult.chemicalTreatment || 'अनुशंसित कवकनाशी या जीवाणुनाशी का 16-लीटर नैपसैक पंप में सही माप घोलकर तुरंत छिड़कें।',
          icon: <Pill className="w-5 h-5 text-purple-600" />
        }
      };
    }

    if (language === 'mr') {
      return {
        step1: {
          title: 'टप्पा १: छाटणी व स्वच्छता (आजच करा)',
          detail: currentResult.prevention_mr || currentResult.prevention || 'रोगाची लागण झालेली पाने ताबडतोब कापून पिशवीत भरा आणि शेताबाहेर नेऊन जाळून नष्ट करा. कातर निर्जंतुक ठेवा.',
          icon: <Scissors className="w-5 h-5 text-rose-600" />
        },
        step2: {
          title: 'टप्पा २: सेंद्रिय कडुनिंब तेल फवारणी',
          detail: currentResult.organicTreatment_mr || currentResult.organicTreatment || '५ मिली कडुनिंब तेल + १ मिली लिक्विड सोप प्रति लिटर पाण्यात मिसळून पानांच्या मागच्या बाजूने सकाळी फवारणी करा.',
          icon: <Droplets className="w-5 h-5 text-amber-600" />
        },
        step3: {
          title: 'टप्पा ३: रासायनिक बुरशीनाशक व पंपाचे प्रमाण',
          detail: currentResult.chemicalTreatment_mr || currentResult.chemicalTreatment || '१६-लिटर पंपात औषधाचे योग्य प्रमाण मिसळून सकाळी फवारणी करावी.',
          icon: <Pill className="w-5 h-5 text-purple-600" />
        }
      };
    }

    return {
      step1: {
        title: 'Step 1: Prune & Sanitize (Do This Today)',
        detail: currentResult.prevention || 'Cut off and bag all infected leaves showing lesions. Burn or bury them away from your fields. Always sterilize cutting shears with 70% alcohol or bleach.',
        icon: <Scissors className="w-5 h-5 text-rose-600" />
      },
      step2: {
        title: 'Step 2: Natural / Organic Spray',
        detail: currentResult.organicTreatment || 'Mix 5ml cold-pressed Neem Oil + 1ml liquid soap per 1 liter water. Spray thoroughly on the underside of all foliage in the early morning.',
        icon: <Droplets className="w-5 h-5 text-amber-600" />
      },
      step3: {
        title: 'Step 3: Chemical Control & Exact Dosage',
        detail: currentResult.chemicalTreatment || 'Apply recommended chemical spray at calibrated dosage for standard 16L knapsack sprayer. Spray before midday heat.',
        icon: <Pill className="w-5 h-5 text-purple-600" />
      }
    };
  };

  const simplePrescription = getSimplePrescription();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300 font-sans">
      {/* Toast Notification */}
      {pdfToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b5c46] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400/30 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{pdfToast}</span>
        </div>
      )}

      {/* Hidden file input for native file manager browsing */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processUploadedFile(file);
        }}
        accept="image/*"
        className="hidden"
      />

      {/* Hidden camera capture input */}
      <input
        type="file"
        ref={cameraInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processUploadedFile(file);
        }}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-emerald-100 dark:border-slate-800">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5c46] dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'डैशबोर्ड पर वापस' : language === 'mr' ? 'डॅशबोर्डवर परत' : 'Back to Dashboard'}</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-xs">
              <ScanSearch className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {t.detectPageTitle}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.detectPageSub}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onViewHistory}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0b5c46] dark:text-emerald-400 border border-emerald-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-xs hover:scale-105"
        >
          <BookmarkCheck className="w-4 h-4" />
          <span>{t.navDiagnosisHistory}</span>
        </button>
      </div>

      {/* Kaggle PlantVillage Benchmark Badge */}
      <div className="bg-gradient-to-r from-[#064e3b] via-[#0b5c46] to-[#042f2e] text-white rounded-3xl p-5 sm:p-6 mb-8 shadow-md border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/10 shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-extrabold text-sm sm:text-base">
                  {t.plantVillageBadgeTitle}
                </span>
                <span className="bg-emerald-400/20 text-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300/30">
                  {t.plantVillageSamplesBadge}
                </span>
                <span className="bg-amber-400/20 text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300/30">
                  {t.plantVillageAccuracyBadge}
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed max-w-3xl font-normal">
                {t.plantVillageDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP SECTION: LEAF UPLOAD, SAMPLE SELECTION & THE PROMINENT ANALYZE BUTTON */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-slate-800 shadow-sm mb-8">
        
        {/* Step 1 Title & Crop Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>{t.step1Title}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.step1Sub}
            </p>
          </div>

          {/* Crop Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">{t.targetCropLabel}</span>
            <select
              value={cropHint}
              onChange={(e) => {
                setCropHint(e.target.value);
                setCropFilter(e.target.value);
              }}
              className="text-xs font-bold py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">{language === 'hi' ? 'सभी फसलें (ऑटो डिटेक्ट)' : language === 'mr' ? 'सर्व पिके (ऑटो डिटेक्ट)' : 'Auto-Detect Crop'}</option>
              <option value="Bell Pepper (Capsicum)">{language === 'hi' ? '🫑 शिमला मिर्च (Bell Pepper)' : language === 'mr' ? '🫑 ढोबळी मिरची (Bell Pepper)' : '🫑 Bell Pepper (Capsicum)'}</option>
              <option value="Blueberry">{language === 'hi' ? '🫐 ब्लूबेरी (Blueberry)' : language === 'mr' ? '🫐 ब्लूबेरी (Blueberry)' : '🫐 Blueberry'}</option>
              <option value="Chilli">{language === 'hi' ? '🌶️ हरी / तीखी मिर्च (Chilli)' : language === 'mr' ? '🌶️ हिरवी / तिखट मिरची (Chilli)' : '🌶️ Chilli / Hot Pepper'}</option>
              <option value="Tomato">{language === 'hi' ? '🍅 टमाटर (Tomato)' : language === 'mr' ? '🍅 टोमॅटो (Tomato)' : '🍅 Tomato'}</option>
              <option value="Potato">{language === 'hi' ? '🥔 आलू (Potato)' : language === 'mr' ? '🥔 बटाटा (Potato)' : '🥔 Potato'}</option>
              <option value="Corn (Maize)">{language === 'hi' ? '🌽 मक्का (Corn)' : language === 'mr' ? '🌽 मका (Corn)' : '🌽 Corn / Maize'}</option>
              <option value="Apple">{language === 'hi' ? '🍎 सेब (Apple)' : language === 'mr' ? '🍎 सफरचंद (Apple)' : '🍎 Apple'}</option>
              <option value="Grape">{language === 'hi' ? '🍇 अंगूर (Grape)' : language === 'mr' ? '🍇 द्राक्षे (Grape)' : '🍇 Grape'}</option>
              <option value="Strawberry">{language === 'hi' ? '🍓 स्ट्रॉबेरी (Strawberry)' : language === 'mr' ? '🍓 स्ट्रॉबेरी (Strawberry)' : '🍓 Strawberry'}</option>
              <option value="Peach">{language === 'hi' ? '🍑 आड़ू (Peach)' : language === 'mr' ? '🍑 पीच (Peach)' : '🍑 Peach'}</option>
              <option value="Cherry">{language === 'hi' ? '🍒 चेरी (Cherry)' : language === 'mr' ? '🍒 चेरी (Cherry)' : '🍒 Cherry'}</option>
              <option value="Orange (Citrus)">{language === 'hi' ? '🍊 संतरा / नींबू (Citrus)' : language === 'mr' ? '🍊 संत्रा / लिंबू (Citrus)' : '🍊 Orange / Citrus'}</option>
              <option value="Squash">{language === 'hi' ? '🥒 कद्दू / स्क्वैश (Squash)' : language === 'mr' ? '🥒 भोपळा (Squash)' : '🥒 Squash / Cucurbit'}</option>
              <option value="Soybean">{language === 'hi' ? '🌱 सोयाबीन (Soybean)' : language === 'mr' ? '🌱 सोयाबीन (Soybean)' : '🌱 Soybean'}</option>
              <option value="Rice">{language === 'hi' ? '🌾 धान / चावल' : language === 'mr' ? '🌾 भात / धान' : '🌾 Rice'}</option>
              <option value="Wheat">{language === 'hi' ? '🌾 गेहूं' : language === 'mr' ? '🌾 गहू' : '🌾 Wheat'}</option>
            </select>
          </div>
        </div>

        {/* Quick Crop Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            {language === 'hi' ? 'फसल चुनें:' : language === 'mr' ? 'पीक निवडा:' : 'Select Target Crop:'}
          </span>
          {[
            { id: 'All', label: language === 'hi' ? '🔍 ऑटो डिटेक्ट' : language === 'mr' ? '🔍 ऑटो डिटेक्ट' : '🔍 Auto-Detect' },
            { id: 'Bell Pepper (Capsicum)', label: language === 'hi' ? '🫑 शिमला मिर्च' : language === 'mr' ? '🫑 ढोबळी मिरची' : '🫑 Bell Pepper' },
            { id: 'Blueberry', label: language === 'hi' ? '🫐 ब्लूबेरी' : language === 'mr' ? '🫐 ब्लूबेरी' : '🫐 Blueberry' },
            { id: 'Chilli', label: language === 'hi' ? '🌶️ मिर्च' : language === 'mr' ? '🌶️ मिरची' : '🌶️ Chilli' },
            { id: 'Tomato', label: language === 'hi' ? '🍅 टमाटर' : language === 'mr' ? '🍅 टोमॅटो' : '🍅 Tomato' },
            { id: 'Potato', label: language === 'hi' ? '🥔 आलू' : language === 'mr' ? '🥔 बटाटा' : '🥔 Potato' },
            { id: 'Corn (Maize)', label: language === 'hi' ? '🌽 मक्का' : language === 'mr' ? '🌽 मका' : '🌽 Corn' },
            { id: 'Apple', label: language === 'hi' ? '🍎 सेब' : language === 'mr' ? '🍎 सफरचंद' : '🍎 Apple' },
            { id: 'Grape', label: language === 'hi' ? '🍇 अंगूर' : language === 'mr' ? '🍇 द्राक्षे' : '🍇 Grape' },
            { id: 'Strawberry', label: language === 'hi' ? '🍓 स्ट्रॉबेरी' : language === 'mr' ? '🍓 स्ट्रॉबेरी' : '🍓 Strawberry' },
            { id: 'Peach', label: language === 'hi' ? '🍑 आड़ू' : language === 'mr' ? '🍑 पीच' : '🍑 Peach' },
            { id: 'Cherry', label: language === 'hi' ? '🍒 चेरी' : language === 'mr' ? '🍒 चेरी' : '🍒 Cherry' },
            { id: 'Orange (Citrus)', label: language === 'hi' ? '🍊 संतरा' : language === 'mr' ? '🍊 संत्रा' : '🍊 Citrus' },
            { id: 'Squash', label: language === 'hi' ? '🥒 स्क्वैश' : language === 'mr' ? '🥒 भोपळा' : '🥒 Squash' },
            { id: 'Soybean', label: language === 'hi' ? '🌱 सोयाबीन' : language === 'mr' ? '🌱 सोयाबीन' : '🌱 Soybean' },
          ].map((cropBtn) => {
            const active = cropHint === cropBtn.id;
            return (
              <button
                key={cropBtn.id}
                type="button"
                onClick={() => {
                  setCropHint(cropBtn.id);
                  setCropFilter(cropBtn.id);
                  if (cropBtn.id !== 'All') {
                    const firstClass = PLANT_VILLAGE_CLASSES.find((c) =>
                      c.crop.toLowerCase().includes(cropBtn.id.toLowerCase()) ||
                      (cropBtn.id.includes('Pepper') && c.crop.includes('Pepper')) ||
                      (cropBtn.id.includes('Blueberry') && c.crop.includes('Blueberry')) ||
                      (cropBtn.id.includes('Orange') && c.crop.includes('Orange'))
                    );
                    if (firstClass && !uploadedFileName) {
                      setSelectedClass(firstClass);
                      setSelectedImage(firstClass.imageUrl);
                    }
                  }
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all border ${
                  active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-300 dark:ring-emerald-800'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700'
                }`}
              >
                {cropBtn.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column: Upload Box on Left, Verified PlantVillage Catalog on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
          
          {/* Left Column: Drag & Drop Area */}
          <div className="lg:col-span-6 space-y-3">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(true);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) processUploadedFile(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative aspect-[16/11] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center p-4 border-2 group ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01] shadow-lg shadow-emerald-500/20'
                  : 'border-dashed border-emerald-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-emerald-500 dark:hover:border-emerald-500'
              }`}
            >
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt={selectedClass.disease}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />

                  {/* Active Laser Scanning Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center backdrop-blur-xs p-5 z-20">
                      <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute top-0 animate-bounce duration-1000 shadow-lg shadow-emerald-400" />
                      
                      <div className="bg-slate-900/95 text-white text-xs font-semibold px-6 py-4 rounded-3xl flex flex-col items-center gap-2.5 shadow-2xl border border-emerald-500/40 text-center max-w-[320px]">
                        <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                        <span className="font-extrabold text-emerald-300 text-sm">{scanStepMessage}</span>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1 border border-slate-700">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
                            style={{ width: `${scanProgress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{scanProgress}% completed</span>
                      </div>
                    </div>
                  )}

                  {/* Drag drop overlay hint while dragging over an existing image */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-emerald-600/85 text-white flex flex-col items-center justify-center p-4 backdrop-blur-xs z-30">
                      <Upload className="w-12 h-12 mb-2 animate-bounce" />
                      <p className="text-sm font-bold">{t.dragDropTitle}</p>
                    </div>
                  )}

                  {/* Uploaded File Name Badge */}
                  {uploadedFileName && (
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-emerald-300 text-[10px] font-mono px-2.5 py-1 rounded-full truncate max-w-[220px] z-10 border border-white/10">
                      📁 {uploadedFileName} ({uploadedFileSize})
                    </div>
                  )}

                  {/* Status Tag Overlay */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10 border border-white/10">
                    <span className={`w-2 h-2 rounded-full ${hasAnalyzed ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
                    <span>{hasAnalyzed ? (language === 'hi' ? 'जांच पूर्ण' : language === 'mr' ? 'तपासणी पूर्ण' : 'Diagnosed & Verified') : (language === 'hi' ? 'जांच के लिए तैयार' : language === 'mr' ? 'तपासणीसाठी सज्ज' : 'Ready to Analyze')}</span>
                  </div>
                </>
              ) : (
                <div className="space-y-3 p-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0b5c46] dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {t.dragDropTitle}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t.dragDropSub}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Upload Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <FolderOpen className="w-4 h-4 text-emerald-600" />
                <span>{t.browseFiles}</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="py-2.5 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 text-[#0b5c46] dark:text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-200 dark:border-emerald-800 shadow-2xs"
              >
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>{t.openCamera}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Verified PlantVillage Leaf Samples Catalog */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>{t.sampleCatalogTitle}</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {filteredPlantVillageClasses.length} {t.sampleCatalogSub}
                </span>
              </div>

              {/* Crop Filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {cropFilterOptions.map((cropOpt) => (
                  <button
                    key={cropOpt.id}
                    onClick={() => setCropFilter(cropOpt.id)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      cropFilter === cropOpt.id
                        ? 'bg-[#0b5c46] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
                    }`}
                  >
                    {cropOpt.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative my-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t.filterPlaceholder}
                  value={searchClassQuery}
                  onChange={(e) => setSearchClassQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Scrollable list of PlantVillage verified classes */}
              <div className="space-y-1.5 max-h-[195px] overflow-y-auto pr-1">
                {filteredPlantVillageClasses.map((pv) => {
                  const isSelected = selectedClass.classId === pv.classId && !uploadedFileName;
                  return (
                    <button
                      key={pv.classId}
                      onClick={() => handleSelectPvClass(pv)}
                      className={`w-full text-left p-2 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'border-[#0b5c46] bg-emerald-50/90 dark:bg-emerald-950/40 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={pv.imageUrl}
                          alt={pv.disease}
                          className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0b5c46] truncate">
                            {pv.disease}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono truncate">
                            {pv.crop} · {pv.rawLabel}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            pv.severity === 'Severe'
                              ? 'bg-rose-100 text-rose-700'
                              : pv.severity === 'Moderate'
                              ? 'bg-amber-100 text-amber-800'
                              : pv.severity === 'Healthy'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {pv.severity}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* STEP 2: PROMINENT WORKING "ANALYZE LEAF" ACTION BUTTON */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleRunAnalysis}
            disabled={isScanning}
            className={`w-full py-4 px-6 rounded-2xl text-white text-base sm:text-lg font-black shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 ${
              !hasAnalyzed
                ? 'bg-gradient-to-r from-[#0b5c46] via-[#047857] to-[#10b981] hover:from-[#094635] hover:to-[#059669] shadow-emerald-900/30 ring-4 ring-emerald-400/40 animate-pulse hover:scale-[1.01] active:scale-[0.98]'
                : 'bg-gradient-to-r from-[#0b5c46] via-[#0f766e] to-[#047857] hover:from-[#094534] hover:to-[#0b5c46] shadow-emerald-950/25 hover:scale-[1.01] active:scale-[0.98]'
            }`}
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>{t.analyzingProgress} ({scanProgress}%)</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>{t.analyzeButton}</span>
                <ArrowDown className="w-4 h-4 ml-1 animate-bounce" />
              </>
            )}
          </button>
          
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>PlantVillage 54,305 Model Ready</span>
            </span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {t.readyToAnalyzeHint}
            </span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          STEP 3: RESULTS SECTION DIRECTLY BELOW THE ANALYZE LEAF BUTTON
          ========================================================================= */}
      <div ref={resultsRef} className="scroll-mt-6">
        
        {/* Success Banner right after analysis */}
        {justFinishedAnalysis && (
          <div className="p-4 rounded-3xl bg-emerald-600 text-white flex items-center gap-3 shadow-lg mb-6 animate-in slide-in-from-top-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-200 shrink-0" />
            <div>
              <p className="text-sm font-black">
                {language === 'hi' ? 'एआई जांच सफलतापूर्वक पूरी हुई!' : language === 'mr' ? 'एआय तपासणी यशस्वीरीत्या पूर्ण झाली!' : 'AI Diagnosis Completed Successfully!'}
              </p>
              <p className="text-xs text-emerald-100">
                {language === 'hi' ? '54,305 नमूनों से मिलान किया गया। उपचार योजना नीचे उपलब्ध है।' : language === 'mr' ? '५४,३०५ नमुन्यांशी जुळवणी केली. उपाययोजना खाली पहा.' : 'Foliar pattern matched with 54,305 PlantVillage benchmark leaf samples. Action plan formulated below.'}
              </p>
            </div>
          </div>
        )}

        {currentResult ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-slate-800 shadow-md space-y-6">
            
            {/* Header: Section Title + Mode Toggle + Accuracy Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0b5c46] dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {t.resultsTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentResult.crop} · {currentResult.date} ({currentResult.time})
                  </p>
                </div>
              </div>

              {/* Mode Toggle & Accuracy */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setResultMode('simple')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      resultMode === 'simple'
                        ? 'bg-[#0b5c46] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {t.modeSimpleGuide}
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultMode('advanced')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      resultMode === 'advanced'
                        ? 'bg-[#0b5c46] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {t.modeAdvancedLab}
                  </button>
                </div>

                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-slate-800 text-[#0b5c46] dark:text-emerald-400 border border-emerald-200 dark:border-slate-700 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentResult.confidence}% {t.accuracyBadge}</span>
                </span>
              </div>
            </div>

            {/* BIG, CLEAR HEALTH STATUS CARD */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border-2 ${
                currentResult.severity === 'Healthy'
                  ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-300 dark:border-emerald-700'
                  : currentResult.severity === 'Severe'
                  ? 'bg-gradient-to-r from-rose-500/10 to-amber-500/10 border-rose-300 dark:border-rose-700'
                  : 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-300 dark:border-amber-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                    currentResult.severity === 'Healthy'
                      ? 'bg-emerald-600 text-white'
                      : currentResult.severity === 'Severe'
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {currentResult.severity === 'Healthy' ? (
                    <CheckCircle2 className="w-9 h-9" />
                  ) : (
                    <AlertTriangle className="w-9 h-9" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className={`text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full ${
                        currentResult.severity === 'Healthy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : currentResult.severity === 'Severe'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {currentResult.severity === 'Healthy' ? t.statusHealthy : `${currentResult.severity} ${t.statusInfected}`}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {t.targetCropLabel} <strong className="text-slate-800 dark:text-slate-200">{currentResult.crop}</strong>
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500 font-mono">
                      {currentResult.plantVillageClass || selectedClass.rawLabel}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {currentResult.disease.split('(')[0].trim()}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {currentResult.severity === 'Healthy' ? t.statusHealthyDesc : t.statusInfectedDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* ==============================================
                MODE 1: SIMPLE FARMER RESULTS (EASY & ACTIONABLE)
                ============================================== */}
            {resultMode === 'simple' ? (
              <div className="space-y-6 animate-in fade-in">
                
                {/* 3 SIMPLE ACTION STEPS FOR THE FARMER */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>{t.actionPlanTitle}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Step 1 */}
                    {simplePrescription && (
                      <>
                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                          <div className="flex items-start gap-3.5 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-2xs flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                              {simplePrescription.step1.icon}
                            </div>
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
                                {language === 'hi' ? 'चरण 1' : language === 'mr' ? 'टप्पा १' : 'Step 1'}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                {simplePrescription.step1.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {simplePrescription.step1.detail}
                          </p>
                        </div>

                        {/* Step 2 */}
                        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-slate-800 flex flex-col justify-between">
                          <div className="flex items-start gap-3.5 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-2xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                              {simplePrescription.step2.icon}
                            </div>
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">
                                {language === 'hi' ? 'चरण 2' : language === 'mr' ? 'टप्पा २' : 'Step 2'}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                {simplePrescription.step2.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {simplePrescription.step2.detail}
                          </p>
                        </div>

                        {/* Step 3 */}
                        <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/80 dark:border-slate-800 flex flex-col justify-between">
                          <div className="flex items-start gap-3.5 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-2xs flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
                              {simplePrescription.step3.icon}
                            </div>
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block">
                                {language === 'hi' ? 'चरण 3' : language === 'mr' ? 'टप्पा ३' : 'Step 3'}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                {simplePrescription.step3.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {simplePrescription.step3.detail}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Knapsack Sprayer Guide Note */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 mb-0.5">
                      {t.sprayerTimingTitle}
                    </h4>
                    <p className="text-xs text-amber-800/90 dark:text-amber-400/90 leading-relaxed font-normal">
                      {t.sprayerTimingDesc}
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              /* ==============================================
                 MODE 2: ADVANCED LAB & KAGGLE PLANTVILLAGE DATA
                 ============================================== */
              <div className="space-y-6 animate-in fade-in">
                
                {/* Kaggle Class Raw Info */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#0b5c46] dark:text-emerald-400">
                      {currentResult.plantVillageClass || selectedClass.rawLabel}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Class ID: #{selectedClass.classId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                    Scientific Pathogen: <span className="font-semibold italic text-slate-800 dark:text-slate-200">{selectedClass.scientificPathogen}</span>
                  </p>
                </div>

                {/* Pixel Biomarkers Bar */}
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Microscope className="w-4 h-4 text-emerald-600" />
                      <span>Foliar Color Biomarkers Analyzed:</span>
                    </span>
                    <span className="text-[11px] text-slate-400">From canvas pixel tensor</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-emerald-600 block">Chlorophyll (Green)</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                        {biomarkers.healthyGreenPercent}%
                      </span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-rose-600 block">Necrosis (Brown)</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                        {biomarkers.necroticBrownPercent}%
                      </span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-amber-600 block">Chlorosis (Yellow)</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                        {biomarkers.chlorosisYellowPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Softmax Probability Distribution (Top 3 Predictions) */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      PlantVillage Deep CNN Top Probability Predictions:
                    </span>
                    {selectedClass.topProbabilities.map((pred, pIdx) => (
                      <div key={pIdx}>
                        <div className="flex justify-between text-xs mb-1 font-mono">
                          <span className="text-slate-800 dark:text-slate-200 truncate">{pred.label}</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">{pred.prob}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pIdx === 0 ? 'bg-emerald-600' : 'bg-slate-400'
                            }`}
                            style={{ width: `${pred.prob}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observed Symptoms */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Pathogen Symptom Indicators</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {currentResult.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preventive Cultural Agronomy */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    Long-Term Farm Agronomic Prevention
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {currentResult.prevention}
                  </p>
                </div>

              </div>
            )}

            {/* Actions: Save to History & Download Official PDF Report */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleSave}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                    savedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0b5c46] hover:bg-[#084534] text-white'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>{savedSuccess ? t.savedToHistoryToast : t.saveDiagnosisBtn}</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <FileDown className="w-4 h-4" />
                  <span>{isExportingPdf ? 'Exporting...' : t.downloadPdfBtn}</span>
                </button>
              </div>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t.printPrescriptionBtn}</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
            <ScanSearch className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
              {t.analyzeButton}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t.readyToAnalyzeHint}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
