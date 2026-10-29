import { DiagnosisRecord, CropGuideItem, FarmTask, MandiPrice, FarmerScheme } from '../types';

export const INITIAL_DIAGNOSES: DiagnosisRecord[] = [
  {
    id: 'diag-1',
    crop: 'Tomato',
    disease: 'Early Blight (Alternaria solani)',
    confidence: 96.4,
    severity: 'Moderate',
    date: '2026-10-25',
    time: '09:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2364c?w=600&auto=format&fit=crop&q=80',
    symptoms: [
      'Concentric dark brown rings on lower leaves',
      'Yellow chlorotic halo around leaf spots',
      'Premature defoliation starting from bottom canopy'
    ],
    organicTreatment: 'Spray 5% Neem oil emulsion or Trichoderma viride biological spray every 7 days. Remove affected lower leaves.',
    chemicalTreatment: 'Apply Mancozeb 75 WP @ 2.5g/L or Chlorothalonil 75 WP @ 2g/L of water at 10-day intervals.',
    prevention: 'Avoid overhead sprinkler irrigation, practice 3-year crop rotation with non-solanaceous crops, and apply mulch to prevent soil splash.'
  },
  {
    id: 'diag-2',
    crop: 'Rice (Paddy)',
    disease: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
    confidence: 94.8,
    severity: 'Severe',
    date: '2026-10-22',
    time: '11:15 AM',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&auto=format&fit=crop&q=80',
    symptoms: [
      'Water-soaked lesions on leaf margins turning yellow-white',
      'Wavy lesion margins along leaf veins',
      'Milky bacterial exudate droplets in early morning'
    ],
    organicTreatment: 'Spray Pseudomonas fluorescens @ 10g/L. Drain excess field water for 2-3 days to reduce field humidity.',
    chemicalTreatment: 'Spray Streptocycline 1g + Copper Oxychloride 25g in 10 liters of water.',
    prevention: 'Use certified blight-resistant seeds, avoid excess nitrogen fertilizer application, and maintain good field drainage.'
  },
  {
    id: 'diag-3',
    crop: 'Potato',
    disease: 'Late Blight (Phytophthora infestans)',
    confidence: 98.2,
    severity: 'Severe',
    date: '2026-10-18',
    time: '03:45 PM',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    symptoms: [
      'Irregular water-soaked brown/black spots on leaf tips and margins',
      'White fungal cottony growth under leaves during high humidity',
      'Rapid wilting and stem necrosis'
    ],
    organicTreatment: 'Copper sulfate spray with hydrated lime (Bordeaux mixture 1%) on initial sighting. Destroy heavily infected foliage.',
    chemicalTreatment: 'Curative spray with Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L of water.',
    prevention: 'Plant certified disease-free seed tubers, avoid overhead watering, and ensure wide row spacing for air circulation.'
  },
  {
    id: 'diag-4',
    crop: 'Wheat',
    disease: 'Healthy Crop (No Disease Detected)',
    confidence: 99.1,
    severity: 'Healthy',
    date: '2026-10-15',
    time: '08:10 AM',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    symptoms: ['Leaves show vibrant uniform green coloration', 'Strong turgid leaf stems', 'No fungal pustules or necrotic lesions'],
    organicTreatment: 'Continue standard organic foliar nutrition (Panchagavya or seaweed extract) during tillering stage.',
    chemicalTreatment: 'No chemical intervention required.',
    prevention: 'Maintain balanced N-P-K regime and scout for yellow rust during early morning damp weather.'
  }
];

export const SAMPLE_SCAN_PRESETS = [
  {
    name: 'Tomato Early Blight',
    crop: 'Tomato',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2364c?w=600&auto=format&fit=crop&q=80',
    disease: 'Early Blight (Alternaria solani)',
    confidence: 96.8,
    severity: 'Moderate' as const,
    symptoms: ['Target-board dark lesions', 'Yellow halo surrounding leaf spots', 'Defoliation of lower leaves'],
    organicTreatment: 'Neem seed kernel extract (NSKE 5%) spray every 8 days.',
    chemicalTreatment: 'Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L.',
    prevention: 'Drip irrigation, staking plants off moist ground, and 3-year crop rotation.'
  },
  {
    name: 'Rice Leaf Blast',
    crop: 'Rice',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&auto=format&fit=crop&q=80',
    disease: 'Rice Blast (Magnaporthe oryzae)',
    confidence: 95.2,
    severity: 'Severe' as const,
    symptoms: ['Diamond / spindle shaped lesions with greyish center', 'Brown reddish margin', 'Neck rot during heading stage'],
    organicTreatment: 'Pseudomonas fluorescens seed treatment and foliar spray.',
    chemicalTreatment: 'Tricyclazole 75% WP @ 0.6g/L of water.',
    prevention: 'Avoid excessive nitrogenous fertilizer application; use resistant varieties.'
  },
  {
    name: 'Cotton Leaf Curl Virus',
    crop: 'Cotton',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=80',
    disease: 'Cotton Leaf Curl Virus (CLCuV)',
    confidence: 93.6,
    severity: 'Severe' as const,
    symptoms: ['Upward or downward leaf curling', 'Thickening of leaf veins', 'Enation (small leaf-like growths) underneath'],
    organicTreatment: 'Yellow sticky traps (15/acre) to trap whitefly vectors. Spray neem oil 1500 ppm @ 5ml/L.',
    chemicalTreatment: 'Spray Diafenthiuron 50% WP @ 1.2g/L or Spiromesifen 22.9% SC @ 1ml/L to control whitefly vector.',
    prevention: 'Eradicate weed hosts like Abutilon indicum from field borders.'
  },
  {
    name: 'Healthy Maize / Corn',
    crop: 'Maize',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    disease: 'Healthy Leaf Canopy',
    confidence: 99.4,
    severity: 'Healthy' as const,
    symptoms: ['Vigorous green leaves', 'Clean smooth leaf margins', 'Zero pest infestation or fungal spots'],
    organicTreatment: 'Foliar application of liquid bio-fertilizers during knee-high stage.',
    chemicalTreatment: 'No chemical treatment required.',
    prevention: 'Apply recommended top-dressing nitrogen before tasseling.'
  }
];

export const CROP_GUIDES: CropGuideItem[] = [
  {
    id: 'crop-tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetables',
    season: 'Rabi & Kharif (Aug-Oct, Dec-Feb)',
    optimalTemp: '20°C - 28°C',
    soilPh: '6.0 - 7.0 (Well-drained sandy loam)',
    waterNeed: 'Medium',
    sunlight: '6-8 hours direct sunlight',
    harvestDuration: '65 - 85 days from transplant',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
    description: 'Tomatoes are warm-season vegetables that thrive in well-drained, nutrient-rich soils. Consistent moisture prevents blossom-end rot and fruit cracking.',
    stages: [
      { stage: 'Nursery (0-25 days)', action: 'Raise seedlings in raised beds with vermicompost', fertilizer: 'Trichoderma enriched FYM' },
      { stage: 'Transplanting (25-30 days)', action: 'Dip roots in biofertilizer slurry; space 60x45cm', fertilizer: 'DAP 50kg + MOP 30kg/acre basal' },
      { stage: 'Vegetative & Staking (30-50 days)', action: 'Stake plants with bamboo sticks, prune suckers', fertilizer: 'Urea 35kg/acre side dressing' },
      { stage: 'Flowering & Fruiting (50-85 days)', action: 'Keep moisture uniform, apply micronutrient spray', fertilizer: '13-0-45 (Potassium Nitrate) foliar spray' }
    ],
    keyPests: ['Fruit Borer (Helicoverpa armigera)', 'Whitefly', 'Tuta absoluta', 'Early Blight']
  },
  {
    id: 'crop-rice',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    category: 'Cereals',
    season: 'Kharif (June-Nov) & Rabi (Nov-April)',
    optimalTemp: '22°C - 32°C',
    soilPh: '5.5 - 6.5 (Clay or clayey loam)',
    waterNeed: 'High',
    sunlight: '7-9 hours open sunlight',
    harvestDuration: '110 - 145 days',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&auto=format&fit=crop&q=80',
    description: 'Rice is the premier staple food crop, requiring standing water during vegetative and tillering stages followed by controlled drainage before harvest.',
    stages: [
      { stage: 'Puddling & Transplanting', action: 'Transplant 2-3 seedlings/hill at 20x15cm spacing', fertilizer: 'Basal: 50kg DAP + 25kg MOP + 10kg Zinc Sulphate/acre' },
      { stage: 'Active Tillering (20-25 DAT)', action: 'Maintain 2-3 cm standing water, light weeding', fertilizer: 'Top dress 35kg Urea' },
      { stage: 'Panicle Initiation (45-50 DAT)', action: 'Inspect for stem borer and leaf folder', fertilizer: 'Top dress 30kg Urea + 15kg MOP' },
      { stage: 'Grain Filling & Ripening', action: 'Withhold irrigation 10-14 days before harvest', fertilizer: 'Foliar spray 00:52:34 (MKP) 1kg/acre' }
    ],
    keyPests: ['Yellow Stem Borer', 'Brown Plant Hopper (BPH)', 'Rice Blast', 'Sheath Blight']
  },
  {
    id: 'crop-wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Cereals',
    season: 'Rabi (Nov-Dec sowing, March-April harvest)',
    optimalTemp: '15°C - 24°C (Cool climate during early growth)',
    soilPh: '6.0 - 7.5 (Well-drained loam to clay loam)',
    waterNeed: 'Medium',
    sunlight: '6-8 hours full sunlight',
    harvestDuration: '110 - 130 days',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    description: 'Wheat is the premier Rabi cereal, requiring cool temperatures during tillering and warm sunny weather during ripening. Critical irrigation at CRI stage is vital.',
    stages: [
      { stage: 'Crown Root Initiation (20-25 DAS)', action: 'Most crucial 1st irrigation; weeding', fertilizer: 'Top dress 40kg Urea/acre' },
      { stage: 'Tillering & Jointing (40-45 DAS)', action: '2nd irrigation, scout for aphids and weeds', fertilizer: 'Top dress 30kg Urea/acre' },
      { stage: 'Booting & Flowering (70-75 DAS)', action: '3rd irrigation, check for yellow rust', fertilizer: 'Foliar spray Zinc + Boron micronutrients' },
      { stage: 'Milking & Dough (90-105 DAS)', action: 'Avoid heavy irrigation during windy days to prevent lodging', fertilizer: '13-0-45 foliar spray 1%' }
    ],
    keyPests: ['Aphids (Sitobion avenae)', 'Yellow / Brown Rust', 'Loose Smut', 'Termites']
  },
  {
    id: 'crop-cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Cash Crops',
    season: 'Kharif (May-June sowing)',
    optimalTemp: '21°C - 35°C',
    soilPh: '6.5 - 8.0 (Deep black cotton vertisols)',
    waterNeed: 'Medium',
    sunlight: '8+ hours full bright sun',
    harvestDuration: '150 - 180 days',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=80',
    description: 'Cotton is the "White Gold", requiring deep fertile soil, warm climate, and vigilant integrated pest management against sucking pests and bollworms.',
    stages: [
      { stage: 'Sowing & Germination (0-15 DAS)', action: 'Treat seeds with Imidacloprid; space 90x60cm', fertilizer: 'Basal DAP 50kg + MOP 25kg/acre' },
      { stage: 'Squaring (40-50 DAS)', action: 'Monitor for thrips, jassids, and whiteflies', fertilizer: 'Urea 35kg + Magnesium Sulphate 10kg/acre' },
      { stage: 'Peak Flowering & Boll Formation', action: 'Install pheromone traps for pink bollworm', fertilizer: 'Foliar 19:19:19 @ 1kg/acre + Boron 200g' },
      { stage: 'Boll Bursting & Picking', action: 'Pick clean dry cotton bolls in morning hours', fertilizer: 'Foliar Potassium Nitrate 2% spray' }
    ],
    keyPests: ['Pink Bollworm', 'Whitefly', 'Jassids', 'Cotton Leaf Curl Virus']
  },
  {
    id: 'crop-corn',
    name: 'Maize / Corn',
    scientificName: 'Zea mays',
    category: 'Cereals',
    season: 'Kharif, Rabi & Spring',
    optimalTemp: '21°C - 30°C',
    soilPh: '6.5 - 7.5',
    waterNeed: 'Medium',
    sunlight: '8 hours direct sun',
    harvestDuration: '90 - 110 days',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    description: 'Maize is a high-yielding C4 crop known as the Queen of Cereals. It responds remarkably to balanced nitrogen and adequate moisture at tasseling.',
    stages: [
      { stage: 'Knee-high Stage (25-30 DAS)', action: 'First earthing up and inter-cultivation', fertilizer: 'Top dress 40kg Urea/acre' },
      { stage: 'Tasseling & Silking (50-60 DAS)', action: 'Ensure uninterrupted soil moisture; monitor fall armyworm', fertilizer: 'Top dress 30kg Urea + 15kg MOP' },
      { stage: 'Grain Filling (70-85 DAS)', action: 'Protect cobs from birds and moisture stress', fertilizer: 'Foliar 0:0:50 spray' }
    ],
    keyPests: ['Fall Armyworm (Spodoptera frugiperda)', 'Stem Borer', 'Maydis Leaf Blight']
  },
  {
    id: 'crop-potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetables',
    season: 'Rabi (Oct-Nov planting)',
    optimalTemp: '16°C - 22°C (Tuberization requires cool nights)',
    soilPh: '5.2 - 6.5 (Loose sandy loam)',
    waterNeed: 'Medium',
    sunlight: '6-8 hours',
    harvestDuration: '80 - 105 days',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    description: 'Potatoes require well-pulverized, loose soil with abundant organic matter. Earthing up is essential to prevent greening of developing tubers.',
    stages: [
      { stage: 'Sprouting & Emergence (15-20 DAP)', action: 'Light irrigation in furrows', fertilizer: 'Basal: NPK 10:26:26 @ 100kg/acre' },
      { stage: 'Earthing Up (30-35 DAP)', action: 'Mound loose soil around stems to protect tubers', fertilizer: 'Top dress Urea 45kg/acre' },
      { stage: 'Tuber Bulking (50-70 DAP)', action: 'Scout daily for late blight lesions on lower leaves', fertilizer: 'Foliar Calcium Nitrate + Boron' }
    ],
    keyPests: ['Potato Tuber Moth', 'Aphids', 'Late Blight', 'Common Scab']
  }
];

export const INITIAL_TASKS: FarmTask[] = [
  {
    id: 'task-1',
    title: 'Spray Neem oil emulsion on Sector 2 (Tomato plot)',
    crop: 'Tomato',
    dueDate: '2026-10-27',
    priority: 'High',
    category: 'Pest Control',
    completed: false,
    notes: 'Mix 5ml/L with mild soap water. Focus on underside of leaves.'
  },
  {
    id: 'task-2',
    title: 'First CRI Stage irrigation for Wheat field (Plot A-4)',
    crop: 'Wheat',
    dueDate: '2026-10-28',
    priority: 'High',
    category: 'Irrigation',
    completed: false,
    notes: '21 days after sowing. Ensure level water distribution.'
  },
  {
    id: 'task-3',
    title: 'Top dress Urea (45kg/acre) on Maize during knee-high stage',
    crop: 'Maize',
    dueDate: '2026-10-29',
    priority: 'Medium',
    category: 'Fertilizer',
    completed: false,
    notes: 'Apply in moist soil along plant rows, avoid touching foliage.'
  },
  {
    id: 'task-4',
    title: 'Install 5 Pheromone Traps for Pink Bollworm in Cotton',
    crop: 'Cotton',
    dueDate: '2026-10-30',
    priority: 'Medium',
    category: 'Pest Control',
    completed: true,
    notes: 'Position traps 1 foot above crop canopy level.'
  },
  {
    id: 'task-5',
    title: 'Harvest matured Paddy crop in Sector 1 before weekend rain',
    crop: 'Rice',
    dueDate: '2026-10-26',
    priority: 'High',
    category: 'Harvesting',
    completed: true,
    notes: 'Moisture content should be around 20-22%.'
  }
];

export const MANDI_PRICES: MandiPrice[] = [
  {
    commodity: 'Wheat (Gehun)',
    variety: 'Sharbati / Lokwan',
    market: 'Indore Mandi',
    state: 'Madhya Pradesh',
    minPrice: 2450,
    maxPrice: 2850,
    modalPrice: 2680,
    unit: '₹ / Quintal',
    trend: 'up'
  },
  {
    commodity: 'Paddy (Dhan)',
    variety: 'Basmati 1121',
    market: 'Karnal Mandi',
    state: 'Haryana',
    minPrice: 3800,
    maxPrice: 4250,
    modalPrice: 4100,
    unit: '₹ / Quintal',
    trend: 'stable'
  },
  {
    commodity: 'Cotton (Kapas)',
    variety: 'Medium Staple',
    market: 'Rajkot Mandi',
    state: 'Gujarat',
    minPrice: 6900,
    maxPrice: 7450,
    modalPrice: 7200,
    unit: '₹ / Quintal',
    trend: 'up'
  },
  {
    commodity: 'Tomato (Tamatar)',
    variety: 'Hybrid Red',
    market: 'Nashik APMC',
    state: 'Maharashtra',
    minPrice: 1200,
    maxPrice: 1800,
    modalPrice: 1550,
    unit: '₹ / Quintal',
    trend: 'down'
  },
  {
    commodity: 'Potato (Aloo)',
    variety: 'Jyoti / Pukhraj',
    market: 'Agra Mandi',
    state: 'Uttar Pradesh',
    minPrice: 1100,
    maxPrice: 1450,
    modalPrice: 1320,
    unit: '₹ / Quintal',
    trend: 'stable'
  },
  {
    commodity: 'Soybean',
    variety: 'Yellow',
    market: 'Ujjain Mandi',
    state: 'Madhya Pradesh',
    minPrice: 4300,
    maxPrice: 4720,
    modalPrice: 4580,
    unit: '₹ / Quintal',
    trend: 'up'
  }
];

export const FARMER_SCHEMES: FarmerScheme[] = [
  {
    id: 'scheme-1',
    name: 'PM-KISAN Samman Nidhi',
    description: 'Income support of ₹6,000 per year in three equal installments to all landholding farmers families across India.',
    benefit: '₹6,000 / year direct bank transfer (DBT)',
    category: 'Direct Income Support',
    link: 'https://pmkisan.gov.in'
  },
  {
    id: 'scheme-2',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Comprehensive crop insurance covering non-preventable natural risks from pre-sowing to post-harvest stages.',
    benefit: 'Only 1.5% to 2% premium for Kharif/Rabi crops',
    category: 'Crop Insurance',
    link: 'https://pmfby.gov.in'
  },
  {
    id: 'scheme-3',
    name: 'PM-KUSUM Solar Pump Scheme',
    description: 'Subsidies up to 60% for standalone solar-powered agriculture pumps and solarization of grid-connected tubewells.',
    benefit: 'Up to 60% government capital subsidy',
    category: 'Solar Energy & Irrigation',
    link: 'https://pmkusum.mnre.gov.in'
  },
  {
    id: 'scheme-4',
    name: 'Soil Health Card Scheme',
    description: 'Free soil testing every 2 years providing customized nutrient recommendations (macro, micro and secondary nutrients).',
    benefit: 'Free complete 12-parameter soil report',
    category: 'Soil Nutrition',
    link: 'https://soilhealth.dac.gov.in'
  }
];
