import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// The AI Studio & Cloud Run reverse proxy (Nginx) listens on 8080 and forwards traffic to 3000.
// We must bind to port 3000.
const port = process.env.PORT && process.env.PORT !== '8080' ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// CORS headers for all requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/classify-leaf', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', fileName = '', preferredCropHint = 'All' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' });
    }

    // Clean base64 prefix if present
    const base64Data = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    const prompt = `
You are a world-class plant pathologist and botanical taxonomist specializing in agricultural crop diagnosis and the Kaggle PlantVillage Dataset (54,305 curated images across 38 crop-disease classes and 14+ species).

Examine this plant leaf image carefully and identify BOTH the exact plant species and its phytopathological health status with high diagnostic precision.

CRITICAL BOTANICAL IDENTIFICATION RULES:
You MUST examine visual leaf morphology to correctly distinguish the plant species:

1. **Bell Pepper / Capsicum (Capsicum annuum)**:
   - Morphology: Simple, alternate leaves, ovate to lanceolate-elliptical with **COMPLETELY SMOOTH, UNBROKEN ENTIRE MARGINS** (never serrated, never lobed, never compound).
   - Prominent central midrib; pinnate secondary lateral veins curve gently upward toward the apex without reaching the margin. Glossy/waxy dark green upper surface with slender petiole.
   - Classes:
     * "Pepper,_bell___Bacterial_spot": Small (1-3mm) circular to angular dark brown/black water-soaked lesions with chlorotic yellow halos. Lesions may tear or cause premature leaf drop.
     * "Pepper,_bell___healthy": Rich uniform green, pointed tip, smooth entire margin, zero lesions.

2. **Blueberry (Vaccinium corymbosum / Vaccinium spp.)**:
   - Morphology: Small to medium-sized simple leaves (3–7 cm long), alternate arrangement, ovate-elliptic shape, smooth or very finely ciliolate/serrulate margins, short reddish-green petiole.
   - Upper surface is glossy, waxy blue-green; underside is distinctly paler with fine reticulate network venation. (Often associated with woody twigs or ericaceous shrub foliage).
   - Classes:
     * "Blueberry___healthy": Clean, unblemished, waxy dark-green/blue-green blueberry leaves.
     * "Blueberry___Anthracnose" or "Blueberry___Rust" (if necrotic spotting is present).

3. **Tomato (Solanum lycopersicum)**:
   - Morphology: **ODD-PINNATELY COMPOUND LEAVES** with 5 to 9 deeply lobed and coarsely toothed/serrated leaflets. Distinct glandular hairs (trichomes) on stems emitting a pungent herbal scent.
   - Classes: Tomato Early blight, Late blight, Bacterial spot, Leaf Mold, Septoria spot, Spider mites, Target Spot, Yellow Leaf Curl, Mosaic virus, Healthy.

4. **Potato (Solanum tuberosum)**:
   - Morphology: **COMPOUND PINNATE LEAVES** with 3–4 pairs of ovate-oblong lateral leaflets and smaller intercalary leaflets along the rachis. Leaflets have wavy margins.
   - Classes: Potato Early blight (target rings), Potato Late blight (water-soaked dark blotches with white mildew underneath), Potato healthy.

5. **Strawberry (Fragaria × ananassa)**:
   - Morphology: **TRIFOLIATE COMPOUND LEAVES** (always exactly 3 leaflets), obovate shape, with **COARSELY TOOTHED/SERRATED MARGINS** and hairy long petioles.
   - Classes: "Strawberry___Leaf_scorch" (purple/red spots with dark centers), "Strawberry___healthy".

6. **Grape (Vitis vinifera)**:
   - Morphology: **LARGE, BROAD, PALMATELY 3- TO 5-LOBED LEAVES** with coarse, sharp jagged teeth, cordate (heart-shaped) petiole sinus, and vine tendrils.
   - Classes: Grape Black rot, Esca (Black Measles / tiger-stripe chlorosis), Leaf blight, Grape healthy.

7. **Apple (Malus domestica)**:
   - Morphology: Simple oval to broadly elliptical leaves with **FINE, SHARP SERRATIONS** along the entire margin and downy underside on young foliage.
   - Classes: Apple scab (olive-green velvety lesions), Black rot (frogeye leaf spot), Cedar apple rust, Apple healthy.

8. **Cherry (Prunus avium / cerasus)**:
   - Morphology: Ovate leaves with sharp double-serrated margins and **TWO CHARACTERISTIC RED GLANDS** at the petiole apex just beneath the blade.
   - Classes: Cherry Powdery mildew, Cherry healthy.

9. **Peach (Prunus persica)**:
   - Morphology: **LONG, SLENDER, LANCEOLATE (WILLOW-LIKE) LEAVES** with fine glandular serrations along margins, tapered drooping tip.
   - Classes: Peach Bacterial spot, Peach healthy.

10. **Corn / Maize (Zea mays)**:
    - Morphology: Long, linear strap-like monocot leaves with parallel veins, central white midrib, and clasping leaf collar.
    - Classes: Common rust (cinnamon-brown powdery pustules), Northern leaf blight (long cigar-shaped lesions), Gray leaf spot, Corn healthy.

11. **Orange / Citrus (Citrus sinensis / aurantifolia)**:
    - Morphology: Leathery evergreen ovate leaves with **DISTINCTLY WINGED PETIOLES** and translucent citrus oil glands.
    - Classes: Orange Haunglongbing (Citrus greening - blotchy mottle chlorosis), Citrus Canker, Citrus healthy.

12. **Soybean (Glycine max)**:
    - Morphology: **TRIFOLIATE LEAVES** with oval leaflets covered in fine silky hairs (pubescence).
    - Classes: Soybean healthy.

13. **Squash (Cucurbita spp.)**:
    - Morphology: **VERY LARGE, TRIANGULAR OR PALMATELY 5-LOBED ROUGH PRICKLY LEAVES**.
    - Classes: Squash Powdery mildew (white talcum-powder patches), Squash healthy.

14. **Raspberry (Rubus idaeus)**:
    - Morphology: Compound leaves with 3 or 5 toothed leaflets and **DISTINCTLY WHITE/SILVERY FUZZY UNDERSIDE**.
    - Classes: Raspberry healthy.

15. **Chilli / Hot Pepper (Capsicum frutescens)**:
    - Morphology: Smaller, narrower lanceolate leaves with smooth entire margins, acute tip, white flowers.

USER CONTEXT & CLUES:
- User Preferred Crop Hint: "${preferredCropHint}"
- Filename: "${fileName}"
- If the hint or filename explicitly states "Blueberry", "Bell Pepper", "Tomato", etc., check whether the leaf visually aligns with that species and classify with high fidelity!
- If the hint is "All", rely on visual features: check leaf shape, margin (smooth entire vs serrated vs lobed vs compound), venation, petiole, and lesions.

OUTPUT REQUIREMENTS:
Respond STRICTLY in valid JSON (no markdown formatting, no code block backticks) matching this exact schema:
{
  "rawLabel": "Standard PlantVillage label (e.g. Pepper,_bell___Bacterial_spot or Pepper,_bell___healthy or Blueberry___healthy or Tomato___Early_blight)",
  "crop": "Exact Crop Name (e.g. Bell Pepper (Capsicum) or Blueberry or Tomato or Potato or Corn (Maize) or Apple or Grape or Strawberry or Peach or Cherry or Orange or Soybean or Squash or Chilli)",
  "disease": "Specific Disease Name or 'Healthy Plant Foliage' if clean",
  "scientificPathogen": "Latin pathogen name & type (e.g. Xanthomonas campestris pv. vesicatoria (Bacterial) or None (Optimal Plant Health))",
  "severity": "Healthy" | "Mild" | "Moderate" | "Severe",
  "confidence": 98.5,
  "symptoms": [
    "Precise visual symptom 1 seen on this specimen",
    "Precise visual symptom 2",
    "Precise visual symptom 3"
  ],
  "organicTreatment": "Actionable organic/biological remedy (e.g. Neem oil, Bacillus subtilis, Trichoderma, Bordeaux mixture)",
  "chemicalTreatment": "Prescribed chemical dosage calibrated for standard 16-Liter knapsack sprayer (e.g. Copper Hydroxide 53.8 DF @ 32g per 16L tank)",
  "prevention": "Field sanitation, drip irrigation vs overhead, crop rotation, and spacing guidelines",
  "topProbabilities": [
    { "label": "Primary predicted class", "prob": 98.5 },
    { "label": "Alternative differential 1", "prob": 1.1 },
    { "label": "Alternative differential 2", "prob": 0.4 }
  ],
  "crop_hi": "हिंदी में फसल का नाम (उदा. शिमला मिर्च / ब्लूबेरी / टमाटर)",
  "disease_hi": "हिंदी में रोग का नाम",
  "symptoms_hi": ["हिंदी में लक्षण 1", "लक्षण 2", "लक्षण 3"],
  "organicTreatment_hi": "हिंदी में जैविक व प्राकृतिक उपचार",
  "chemicalTreatment_hi": "हिंदी में 16 लीटर नैपसैक स्प्रेयर के लिए रासायनिक दवा व सटीक माप",
  "prevention_hi": "हिंदी में बचाव व रोकथाम के उपाय",
  "crop_mr": "मराठीत पिकाचे नाव (उदा. ढोबळी मिरची / ब्लूबेरी / टोमॅटो)",
  "disease_mr": "मराठीत रोगाचे नाव",
  "symptoms_mr": ["मराठीत लक्षणे 1", "लक्षणे 2", "लक्षणे 3"],
  "organicTreatment_mr": "मराठीत सेंद्रिय उपाय",
  "chemicalTreatment_mr": "मराठीत १६ लिटर पंपासाठी रासायनिक औषध व प्रमाण",
  "prevention_mr": "मराठीत प्रतिबंधात्मक उपाय"
}
`;

    // Prioritize gemini-3.8-flash for state-of-the-art vision and plant taxonomy
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let lastError: any = null;
    let jsonResult: any = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType || 'image/jpeg',
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text?.trim() || '{}';
        // Clean markdown backticks if any
        const cleanedText = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        jsonResult = JSON.parse(cleanedText);
        break; // Successfully got result
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} call failed, trying next candidate if available:`, err?.message || err);
      }
    }

    if (!jsonResult) {
      throw lastError || new Error('All vision models failed to respond');
    }

    return res.json({ success: true, diagnosis: jsonResult });
  } catch (err: any) {
    console.error('Gemini leaf classification error:', err);
    return res.status(500).json({ error: err.message || 'Failed to classify leaf' });
  }
});



// Mount Vite or serve static
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`HydroMind server running on http://0.0.0.0:${port}`);
});
