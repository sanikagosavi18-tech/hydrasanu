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
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
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
You are an expert agricultural plant pathologist and the official vision classifier for the Kaggle PlantVillage Dataset (54,305 curated leaf images, 38 classes across 14 crops).

Your task is to examine the provided crop/leaf image carefully and produce an accurate, detailed diagnosis.

IMAGE CLASSIFICATION RULES:
1. Examine the visual leaf morphology:
   - Bell Pepper / Capsicum (Capsicum annuum): Simple, smooth unbroken entire edges, glossy/waxy surface, ovate to elliptical shape, distinct central vein.
   - Tomato (Solanum lycopersicum): Odd-pinnately compound leaves, deeply toothed/serrated, lobed leaflets with fine glandular hairs.
   - Potato (Solanum tuberosum): Compound leaves with 3-4 pairs of ovate-oblong leaflets and smaller intercalary leaflets.
   - Corn / Maize (Zea mays): Long strap-like linear leaves with parallel veins.
   - Grape: Broad leaves with 3-5 distinct palmate lobes and coarse teeth.
   - Apple: Oval leaves with fine serrations.
   - Other crops (Rice, Wheat, Strawberry, Peach, Cherry, Squash, Orange, Citrus, Soybean, Cotton, Chilli).

2. User Crop Hint: "${preferredCropHint}". Filename: "${fileName}".
   - If the user hint is NOT "All", strongly factor it in. If hint is "Bell Pepper (Capsicum)" or if filename mentions pepper/capsicum/mirch, and the leaf looks like capsicum, classify as Bell Pepper!
   - If user hint is "All", rely 100% on visual features of the leaf in the image.

3. Determine whether the leaf is:
   - "Healthy" (vibrant green, no necrotic lesions, no yellowing halos, no powdery mildew)
   - "Diseased" (identify specific pathogen: e.g., Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Spot, Common Rust, Powdery Mildew, Black Rot, etc.)

4. Provide actionable treatment:
   - Organic / biological remedy (neem oil, Bacillus subtilis, Trichoderma, compost tea).
   - Chemical spray recommendation with exact dosage calibrated for a standard 16-Liter knapsack sprayer.
   - Prevention and cultural sanitation.

5. Also provide Hindi and Marathi translations for the crop, disease, symptoms, and treatments so Indian farmers can read them directly.

Respond STRICTLY in valid JSON (no markdown formatting, no code block backticks) matching this exact schema:
{
  "rawLabel": "e.g. Pepper,_bell___Bacterial_spot or Pepper,_bell___healthy or Tomato___Early_blight",
  "crop": "Bell Pepper (Capsicum) or Tomato or Potato or Corn (Maize) or Apple or Grape or other",
  "disease": "e.g. Bacterial Spot or Early Blight or Healthy Pepper Leaf",
  "scientificPathogen": "Pathogen Latin name and type (e.g. Xanthomonas campestris pv. vesicatoria (Bacterial) or None (Optimal Plant Health))",
  "severity": "Healthy" | "Mild" | "Moderate" | "Severe",
  "confidence": 98.4,
  "symptoms": ["Specific visual symptom 1 seen on this leaf", "Symptom 2", "Symptom 3"],
  "organicTreatment": "Detailed actionable biological / organic spray remedy",
  "chemicalTreatment": "Prescribed chemical dosage calibrated for standard 16L knapsack sprayer (e.g. Copper Hydroxide 53.8 DF @ 32g per 16L tank)",
  "prevention": "Practical field sanitation and irrigation advice",
  "topProbabilities": [
    { "label": "Primary class", "prob": 98.4 },
    { "label": "Alternative class 1", "prob": 1.2 },
    { "label": "Alternative class 2", "prob": 0.4 }
  ],
  "crop_hi": "हिंदी में फसल का नाम",
  "disease_hi": "हिंदी में बीमारी का नाम",
  "symptoms_hi": ["हिंदी में लक्षण 1", "लक्षण 2", "लक्षण 3"],
  "organicTreatment_hi": "हिंदी में जैविक उपचार",
  "chemicalTreatment_hi": "हिंदी में 16 लीटर नैपसैक पंप के लिए रासायनिक दवा व माप",
  "prevention_hi": "हिंदी में बचाव व रोकथाम",
  "crop_mr": "मराठीत पिकाचे नाव",
  "disease_mr": "मराठीत रोगाचे नाव",
  "symptoms_mr": ["मराठीत लक्षणे 1", "लक्षणे 2", "लक्षणे 3"],
  "organicTreatment_mr": "मराठीत सेंद्रिय उपाय",
  "chemicalTreatment_mr": "मराठीत १६ लिटर पंपासाठी रासायनिक औषध व प्रमाण",
  "prevention_mr": "मराठीत प्रतिबंधात्मक काळजी"
}
`;

    // Try gemini-3.1-flash-lite first, fallback to gemini-3.8-flash
    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
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

// Multi-turn Gemini Chatbot Endpoint for Farmers
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message string is required' });
    }

    const systemInstruction = `You are HydraMind AgriBot, an expert agronomic AI assistant for smart farming.
Your mission is to support farmers with:
1. Plant health, crop disease symptoms, and pest management.
2. Safe dosage calibration for 16-liter knapsack sprayers, organic bio-pesticides (neem, trichoderma), and certified chemical fungicides/insecticides.
3. Agro-weather adjustments, irrigation schedules, and soil health (NPK).
4. Market prices, government schemes (PM-Kisan, Fasal Bima), and farm tasks.
Language: Answer directly in ${language === 'hi' ? 'Hindi (हिंदी)' : language === 'mr' ? 'Marathi (मराठी)' : 'English'}.
Keep responses helpful, practical, actionable, and structured with bullet points.`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg && msg.text) {
          contents.push({
            role: msg.role === 'model' || msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.text }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I am ready to help with your farm questions.';
    return res.json({ success: true, reply });
  } catch (err: any) {
    console.error('Gemini chat error:', err);
    return res.status(500).json({ error: err?.message || 'Chat service error' });
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
