export type Language = 'en' | 'hi' | 'mr';

export type NavTab =
  | 'home'
  | 'disease-detection'
  | 'care-guide'
  | 'task-planner'
  | 'fertilizer-calc'
  | 'diagnosis-history'
  | 'farmer-resources'
  | 'weather-forecast'
  | 'sign-in';

export interface AgroWeatherData {
  locationName: string;
  stateOrCountry: string;
  latitude: number;
  longitude: number;
  current: {
    temp: number;
    apparentTemp: number;
    humidity: number;
    weatherCode: number;
    weatherDescription: string;
    precipitation: number;
    windSpeed: number;
    windDirection: number;
    soilTemp: number;
  };
  daily: {
    date: string;
    dayName: string;
    weatherCode: number;
    description: string;
    maxTemp: number;
    minTemp: number;
    rainProbability: number;
    precipitationSum: number;
  }[];
  hourly: {
    time: string;
    temp: number;
    rainProbability: number;
    windSpeed: number;
    weatherCode: number;
  }[];
  advisory: {
    sprayCondition: 'Optimal' | 'Caution' | 'Unfavorable';
    sprayMessage: string;
    irrigationAdvisory: string;
    diseaseRisk: 'Low' | 'Moderate' | 'High';
    diseaseRiskMessage: string;
    harvestingAdvice: string;
  };
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  farmName: string;
  landArea: number;
  areaUnit: 'Acres' | 'Hectares';
  state: string;
  district: string;
  primaryCrops: string[];
  soilType: string;
  avatarUrl?: string;
  joinedDate: string;
  lastLoginAt?: string;
  rememberMe?: boolean;
  token?: string;
}

export interface PlantVillageClass {
  classId: string;
  rawLabel: string; // e.g. "Tomato___Early_blight"
  crop: string;
  disease: string;
  scientificPathogen: string;
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  confidence: number;
  kaggleSamplesCount: number;
  kaggleAccuracy: number;
  imageUrl: string;
  symptoms: string[];
  organicTreatment: string;
  chemicalTreatment: string;
  prevention: string;
  topProbabilities: { label: string; prob: number }[];
  crop_hi?: string;
  crop_mr?: string;
  disease_hi?: string;
  disease_mr?: string;
  symptoms_hi?: string[];
  symptoms_mr?: string[];
  organicTreatment_hi?: string;
  organicTreatment_mr?: string;
  chemicalTreatment_hi?: string;
  chemicalTreatment_mr?: string;
  prevention_hi?: string;
  prevention_mr?: string;
}

export interface DiagnosisRecord {
  id: string;
  crop: string;
  disease: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Healthy';
  date: string;
  time: string;
  imageUrl: string;
  symptoms: string[];
  organicTreatment: string;
  chemicalTreatment: string;
  prevention: string;
  plantVillageClass?: string;
  kaggleVerified?: boolean;
  crop_hi?: string;
  crop_mr?: string;
  disease_hi?: string;
  disease_mr?: string;
  symptoms_hi?: string[];
  symptoms_mr?: string[];
  organicTreatment_hi?: string;
  organicTreatment_mr?: string;
  chemicalTreatment_hi?: string;
  chemicalTreatment_mr?: string;
  prevention_hi?: string;
  prevention_mr?: string;
}

export interface CropGuideItem {
  id: string;
  name: string;
  scientificName: string;
  category: 'Cereals' | 'Vegetables' | 'Cash Crops' | 'Pulses' | 'Fruits';
  season: string;
  optimalTemp: string;
  soilPh: string;
  waterNeed: 'Low' | 'Medium' | 'High';
  sunlight: string;
  harvestDuration: string;
  image: string;
  description: string;
  stages: {
    stage: string;
    action: string;
    fertilizer: string;
  }[];
  keyPests: string[];
}

export interface FarmTask {
  id: string;
  title: string;
  crop: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Irrigation' | 'Fertilizer' | 'Pest Control' | 'Harvesting' | 'Sowing' | 'Weeding';
  completed: boolean;
  notes?: string;
}

export interface MandiPrice {
  commodity: string;
  variety: string;
  market: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface FarmerScheme {
  id: string;
  name: string;
  description: string;
  benefit: string;
  category: string;
  link: string;
}
