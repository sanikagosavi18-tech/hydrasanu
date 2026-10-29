/**
 * PDF Export Service using jsPDF
 * Creates high-fidelity, printable PDF pathology reports for farmers.
 */

import { jsPDF } from 'jspdf';
import { DiagnosisRecord, UserAccount } from '../types';

/**
 * Clean text helper to avoid non-ASCII characters that jsPDF default fonts might not render.
 */
function sanitizeText(str: string): string {
  if (!str) return '';
  return str
    .replace(/[^\x00-\x7F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Export a single detailed disease diagnosis report as a downloadable PDF.
 */
export async function exportDiagnosisPdf(
  record: DiagnosisRecord,
  user?: UserAccount | null
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  // 1. Header Banner Background (HydroMind Emerald Green #0b5c46)
  doc.setFillColor(11, 92, 70); // #0b5c46
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand Name & Tagline
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('HydroMind AI - Crop Health Diagnostic Report', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 240, 225);
  doc.text(
    'Kaggle PlantVillage Benchmark CV Engine | Computer Vision Foliar Pathology',
    margin,
    18
  );
  doc.text(
    `Report Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | Report ID: ${record.id}`,
    margin,
    23
  );

  y = 34;

  // 2. Farmer & Field Info Box
  doc.setFillColor(245, 250, 247);
  doc.setDrawColor(200, 235, 220);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setTextColor(11, 92, 70);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('FARMER & FIELD DOSSIER', margin + 4, y + 6);

  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);

  const farmerName = user ? `${user.name} (${user.farmName})` : 'Registered Farmer';
  const farmLocation = user ? `${user.district}, ${user.state}` : 'Local Agro Cluster';
  const farmLand = user ? `${user.landArea} ${user.areaUnit} · Soil: ${user.soilType}` : 'Agricultural Field';

  doc.text(`Farmer: ${sanitizeText(farmerName)}`, margin + 4, y + 12);
  doc.text(`Location: ${sanitizeText(farmLocation)}`, margin + 4, y + 17);
  doc.text(`Land Profile: ${sanitizeText(farmLand)}`, margin + 95, y + 12);
  doc.text(`Diagnostic Date: ${record.date} at ${record.time || '10:00 AM'}`, margin + 95, y + 17);

  y += 28;

  // 3. Primary Diagnosis Summary Box
  const isHealthy = record.severity === 'Healthy';
  const isSevere = record.severity === 'Severe';
  
  if (isHealthy) {
    doc.setFillColor(235, 250, 240);
    doc.setDrawColor(52, 199, 89);
  } else if (isSevere) {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
  } else {
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(245, 158, 11);
  }
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(isHealthy ? 20 : isSevere ? 180 : 160, isHealthy ? 120 : 30, isHealthy ? 60 : 30);
  doc.text(`DIAGNOSTIC VERDICT: ${sanitizeText(record.disease).toUpperCase()}`, margin + 4, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text(`Target Crop: ${sanitizeText(record.crop)}`, margin + 4, y + 14);
  doc.text(`PlantVillage Model Confidence: ${record.confidence}%`, margin + 4, y + 20);

  doc.text(`Pathology Severity: ${record.severity.toUpperCase()}`, margin + 95, y + 14);
  doc.text(`Standard Dataset Class: ${sanitizeText(record.plantVillageClass || record.crop + '___' + record.disease)}`, margin + 95, y + 20);

  y += 32;

  // 4. Observed Foliar Symptoms Section
  doc.setFillColor(240, 243, 246);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. OBSERVED PATHOLOGICAL SYMPTOMS & BIOMARKERS', margin + 3, y + 4.5);
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);

  if (record.symptoms && record.symptoms.length > 0) {
    record.symptoms.forEach((sym) => {
      const wrapped = doc.splitTextToSize(`- ${sanitizeText(sym)}`, contentWidth - 6);
      doc.text(wrapped, margin + 4, y);
      y += wrapped.length * 4.2;
    });
  } else {
    doc.text('- Foliage exhibits typical visual indicators characteristic of this pathology.', margin + 4, y);
    y += 5;
  }

  y += 3;

  // 5. 3-Step Simple Treatment Protocol
  doc.setFillColor(240, 243, 246);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('2. ACTIONABLE 3-STEP FARMER TREATMENT PROTOCOL', margin + 3, y + 4.5);
  y += 9;

  // Step A: Cultural & Sanitation
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(11, 92, 70);
  doc.text('Step 1: Immediate Field Sanitation & Pruning', margin + 3, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  const pruneText = isHealthy
    ? 'Foliage is healthy. Maintain regular staking, weed removal, and aeration.'
    : 'Sterilize pruning shears with 70% alcohol or bleach. Prune severely infected lower leaves, bag immediately, and burn off-site to stop airborne spore spread.';
  const wrappedPrune = doc.splitTextToSize(pruneText, contentWidth - 6);
  doc.text(wrappedPrune, margin + 4, y);
  y += wrappedPrune.length * 4.2 + 2;

  // Step B: Organic Remedy
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(217, 119, 6); // amber/brown
  doc.text('Step 2: Natural / Organic Bio-Fungicide Treatment', margin + 3, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  const organicText = record.organicTreatment || 'Apply cold-pressed Neem Oil (5ml/L) or Copper soap bio-fungicide in early morning.';
  const wrappedOrganic = doc.splitTextToSize(sanitizeText(organicText), contentWidth - 6);
  doc.text(wrappedOrganic, margin + 4, y);
  y += wrappedOrganic.length * 4.2 + 2;

  // Step C: Chemical Control & Dosage
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(126, 34, 206); // purple
  doc.text('Step 3: Chemical Control & Knapsack Sprayer Dosage', margin + 3, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  const chemicalText = record.chemicalTreatment || 'Apply appropriate contact or systemic fungicide as recommended by the local agriculture department.';
  const wrappedChemical = doc.splitTextToSize(sanitizeText(chemicalText), contentWidth - 6);
  doc.text(wrappedChemical, margin + 4, y);
  y += wrappedChemical.length * 4.2 + 3;

  // Knapsack Sprayer Guide Note Box
  doc.setFillColor(243, 232, 255);
  doc.setDrawColor(216, 180, 254);
  doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(107, 33, 168);
  doc.text('KNAPSACK SPRAYER CALIBRATION TIP (16-LITER TANK):', margin + 3, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('Dilute 35-40 ml (or 30-40 g) per 16L knapsack sprayer. Spray during calm early morning hours (6-9 AM).', margin + 3, y + 9);
  doc.text('Never spray when rain is forecast within 4 hours or during midday intense heat (>32 C).', margin + 3, y + 12.5);

  y += 20;

  // 6. Prevention & Crop Rotation Guidance
  doc.setFillColor(240, 243, 246);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. FIELD HYGIENE & LONG-TERM PREVENTATIVE MANAGEMENT', margin + 3, y + 4.5);
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  const prevText = record.prevention || 'Ensure proper plant spacing, avoid overhead sprinkler wetting, and practice 3-year crop rotation with non-host species.';
  const wrappedPrev = doc.splitTextToSize(sanitizeText(prevText), contentWidth - 6);
  doc.text(wrappedPrev, margin + 4, y);
  y += wrappedPrev.length * 4.2 + 6;

  // 7. Footer & Stamp
  const footerY = pageHeight - 18;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text(
    'Notice: HydroMind AI diagnostic outputs provide advisory guidance based on deep learning foliar analysis. Consult your local agriculture extension officer before applying scheduled chemicals.',
    margin,
    footerY + 2,
    { maxWidth: contentWidth }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 92, 70);
  doc.text('HydroMind AI Farmer Assistant | Kisan Helpline: 1800-180-1551', margin, footerY + 11);
  doc.text(`Page 1 of 1`, pageWidth - margin - 18, footerY + 11);

  // Trigger browser download
  const cleanCrop = record.crop.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanDisease = record.disease.split('(')[0].trim().replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `HydroMind_Diagnosis_${cleanCrop}_${cleanDisease}_${record.date}.pdf`;
  doc.save(fileName);
}

/**
 * Export full past diagnosis history as a comprehensive multi-record PDF report.
 */
export async function exportAllDiagnosesPdf(
  records: DiagnosisRecord[],
  user?: UserAccount | null
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  // Top Header Banner
  doc.setFillColor(11, 92, 70);
  doc.rect(0, 0, pageWidth, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('HydroMind AI - Complete Field Diagnosis History', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 240, 225);
  doc.text(
    `Cumulative Pathology Log | Total Records: ${records.length} | Exported: ${new Date().toLocaleDateString()}`,
    margin,
    18
  );

  y = 33;

  // Farmer Meta Box
  doc.setFillColor(245, 250, 247);
  doc.setDrawColor(200, 235, 220);
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

  doc.setTextColor(11, 92, 70);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('FARM SUMMARY', margin + 4, y + 5);

  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const farmerName = user ? `${user.name} (${user.farmName})` : 'Registered Farmer';
  const farmLocation = user ? `${user.district}, ${user.state} · ${user.landArea} ${user.areaUnit}` : 'Agro Field';
  doc.text(`Farmer: ${sanitizeText(farmerName)}`, margin + 4, y + 10.5);
  doc.text(`Location: ${sanitizeText(farmLocation)}`, margin + 95, y + 10.5);

  y += 22;

  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('DATE', margin + 3, y + 4.8);
  doc.text('CROP', margin + 25, y + 4.8);
  doc.text('DIAGNOSED DISEASE / PATHOGEN', margin + 50, y + 4.8);
  doc.text('CONFIDENCE', margin + 120, y + 4.8);
  doc.text('SEVERITY', margin + 150, y + 4.8);

  y += 7;

  // Table Rows
  records.forEach((rec, idx) => {
    // Check if new page is needed
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 16;
      // Repeat Header on new page
      doc.setFillColor(15, 23, 42);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('DATE', margin + 3, y + 4.8);
      doc.text('CROP', margin + 25, y + 4.8);
      doc.text('DIAGNOSED DISEASE / PATHOGEN', margin + 50, y + 4.8);
      doc.text('CONFIDENCE', margin + 120, y + 4.8);
      doc.text('SEVERITY', margin + 150, y + 4.8);
      y += 7;
    }

    const rowBg = idx % 2 === 0 ? 255 : 248;
    doc.setFillColor(rowBg, rowBg, rowBg);
    doc.rect(margin, y, contentWidth, 12, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.line(margin, y + 12, margin + contentWidth, y + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(60, 60, 60);
    doc.text(`${rec.date}`, margin + 3, y + 6);
    doc.text(`${rec.time || ''}`, margin + 3, y + 10);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(sanitizeText(rec.crop), margin + 25, y + 7.5);

    doc.setFont('helvetica', 'normal');
    const cleanDisease = sanitizeText(rec.disease);
    const shortDisease = cleanDisease.length > 38 ? cleanDisease.substring(0, 36) + '...' : cleanDisease;
    doc.text(shortDisease, margin + 50, y + 5.5);

    const cleanTreatment = sanitizeText(rec.chemicalTreatment || rec.organicTreatment || '');
    const shortTreatment = cleanTreatment.length > 46 ? cleanTreatment.substring(0, 44) + '...' : cleanTreatment;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(6.5);
    doc.text(`Rx: ${shortTreatment}`, margin + 50, y + 9.5);

    doc.setFontSize(7.5);
    doc.setTextColor(11, 92, 70);
    doc.text(`${rec.confidence}%`, margin + 120, y + 7.5);

    // Severity color
    if (rec.severity === 'Severe') doc.setTextColor(220, 38, 38);
    else if (rec.severity === 'Moderate') doc.setTextColor(217, 119, 6);
    else if (rec.severity === 'Healthy') doc.setTextColor(22, 163, 74);
    else doc.setTextColor(37, 99, 235);

    doc.setFont('helvetica', 'bold');
    doc.text(rec.severity.toUpperCase(), margin + 150, y + 7.5);

    y += 12;
  });

  // Footer
  const footerY = pageHeight - 14;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text(
    'HydroMind AI - Complete Field Health Diagnostic Log | Powered by PlantVillage Dataset (54,305 Samples)',
    margin,
    footerY + 3
  );

  doc.save(`HydroMind_Full_Diagnosis_History_${new Date().toISOString().split('T')[0]}.pdf`);
}
