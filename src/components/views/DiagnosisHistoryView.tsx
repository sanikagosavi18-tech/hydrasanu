import React, { useState } from 'react';
import {
  History,
  Search,
  ScanSearch,
  Trash2,
  ArrowLeft,
  Calendar,
  Sparkles,
  ExternalLink,
  X,
  FileDown,
  FileText,
  CheckCircle2,
  Download,
  AlertCircle
} from 'lucide-react';
import { DiagnosisRecord, UserAccount, Language } from '../../types';
import { exportDiagnosisPdf, exportAllDiagnosesPdf } from '../../services/pdfExportService';
import { TRANSLATIONS } from '../../locales/translations';

interface DiagnosisHistoryViewProps {
  history: DiagnosisRecord[];
  onDeleteRecord: (id: string) => void;
  onNewScan: () => void;
  onBack: () => void;
  currentUser?: UserAccount | null;
  language: Language;
}

export const DiagnosisHistoryView: React.FC<DiagnosisHistoryViewProps> = ({
  history,
  onDeleteRecord,
  onNewScan,
  onBack,
  currentUser,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<DiagnosisRecord | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState<boolean>(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const crops = ['All', ...Array.from(new Set(history.map((h) => h.crop)))];

  const filteredHistory = history.filter((record) => {
    const matchesCrop = selectedCrop === 'All' || record.crop === selectedCrop;
    const matchesSearch =
      record.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.crop.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  const handleExportSingle = async (e: React.MouseEvent, record: DiagnosisRecord) => {
    e.stopPropagation();
    try {
      setDownloadingId(record.id);
      await exportDiagnosisPdf(record, currentUser);
      setDownloadNotification(`${t.downloadRecordPdf}: ${record.crop} - ${record.disease.split('(')[0].trim()}`);
      setTimeout(() => setDownloadNotification(null), 4000);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleExportAll = async () => {
    if (history.length === 0) return;
    try {
      setIsDownloadingAll(true);
      await exportAllDiagnosesPdf(filteredHistory.length > 0 ? filteredHistory : history, currentUser);
      setDownloadNotification(`${t.downloadFullLogPdf} (${filteredHistory.length || history.length} records).`);
      setTimeout(() => setDownloadNotification(null), 4000);
    } catch (err) {
      console.error('Batch PDF export error:', err);
      alert('Failed to generate full PDF log. Please try again.');
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300 font-sans">
      {/* Toast Notification */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b5c46] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400/30 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{downloadNotification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-emerald-100 dark:border-slate-800">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5c46] dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'डैशबोर्ड पर वापस' : language === 'mr' ? 'डॅशबोर्डवर परत' : 'Back to Dashboard'}</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 flex items-center justify-center shadow-xs">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {t.historyTitle}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.historySub}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Export PDF & New Scan */}
        <div className="flex items-center gap-3 flex-wrap">
          {history.length > 0 && (
            <button
              onClick={handleExportAll}
              disabled={isDownloadingAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[#0f766e] dark:text-teal-300 border-2 border-[#0f766e] dark:border-teal-500 text-xs font-bold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
              title="Download all past diagnosis reports as a single structured PDF file"
            >
              <FileDown className="w-4 h-4" />
              <span>{isDownloadingAll ? 'Generating...' : t.downloadFullLogPdf}</span>
            </button>
          )}

          <button
            onClick={onNewScan}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ScanSearch className="w-4 h-4" />
            <span>{t.newLeafScanBtn}</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {crops.map((cropName) => (
            <button
              key={cropName}
              onClick={() => setSelectedCrop(cropName)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCrop === cropName
                  ? 'bg-[#0f766e] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-teal-50'
              }`}
            >
              {cropName === 'All' ? (language === 'hi' ? 'सभी फसलें' : language === 'mr' ? 'सर्व पिके' : 'All') : cropName}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'पिछली जांच खोजें...' : language === 'mr' ? 'मागील नोंदी शोधा...' : 'Search past scans...'}
            className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
          />
        </div>
      </div>

      {/* History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHistory.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 text-slate-400">
            <History className="w-12 h-12 mx-auto mb-3 opacity-40 text-teal-600" />
            <p className="text-sm font-semibold">{t.noRecordsTitle}</p>
            <button
              onClick={onNewScan}
              className="mt-4 px-5 py-2 rounded-full bg-[#0f766e] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer hover:bg-[#115e59]"
            >
              <ScanSearch className="w-4 h-4" />
              <span>{t.newLeafScanBtn}</span>
            </button>
          </div>
        ) : (
          filteredHistory.map((rec) => (
            <div
              key={rec.id}
              onClick={() => setSelectedRecord(rec)}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-teal-100/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={rec.imageUrl}
                  alt={rec.crop}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-teal-400" />
                  <span>{rec.date}</span>
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs ${
                      rec.severity === 'Severe'
                        ? 'bg-rose-500 text-white'
                        : rec.severity === 'Moderate'
                        ? 'bg-amber-500 text-white'
                        : rec.severity === 'Healthy'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {rec.severity}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
                      {rec.crop}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-teal-500" />
                      <span>{rec.confidence}%</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {rec.disease}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {rec.organicTreatment}
                  </p>
                </div>

                {/* Footer with View Details and Instant PDF Download */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 flex items-center gap-1">
                    <span>{t.viewReportBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Direct PDF Download Button */}
                    <button
                      onClick={(e) => handleExportSingle(e, rec)}
                      disabled={downloadingId === rec.id}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/60 text-[#0f766e] dark:text-teal-300 text-[11px] font-bold flex items-center gap-1 border border-teal-200/80 dark:border-teal-800 transition-colors"
                      title="Download PDF report for this scan"
                    >
                      <Download className="w-3 h-3" />
                      <span>{downloadingId === rec.id ? '...' : t.downloadRecordPdf}</span>
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRecord(rec.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Diagnosis Details Modal with Direct PDF Export */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
                  Crop: {selectedRecord.crop} · {selectedRecord.date} {selectedRecord.time}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {selectedRecord.disease}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800 relative">
              <img
                src={selectedRecord.imageUrl}
                alt={selectedRecord.disease}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                {selectedRecord.confidence}% {t.accuracyBadge}
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  {language === 'hi' ? 'देखे गए लक्षण:' : language === 'mr' ? 'आढळलेली लक्षणे:' : 'Observed Symptoms:'}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                  {selectedRecord.symptoms.map((sym, sIdx) => (
                    <li key={sIdx}>{sym}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-[#0b5c46] dark:text-emerald-300 block mb-1">
                  {t.step2OrganicTitle}:
                </span>
                <p className="text-slate-700 dark:text-slate-300">{selectedRecord.organicTreatment}</p>
              </div>

              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  {t.step3ChemicalTitle}:
                </span>
                <p className="text-slate-700 dark:text-slate-300">{selectedRecord.chemicalTreatment}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {language === 'hi' ? 'भविष्य में रोकथाम:' : language === 'mr' ? 'दीर्घकालीन प्रतिबंधात्मक उपाय:' : 'Field Prevention:'}
                </span>
                <p className="text-slate-600 dark:text-slate-400">{selectedRecord.prevention}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              {/* PDF Download Button in Modal */}
              <button
                type="button"
                onClick={(e) => handleExportSingle(e, selectedRecord)}
                disabled={downloadingId === selectedRecord.id}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0b5c46] to-[#0f766e] hover:from-[#084534] hover:to-[#0d5f59] text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>
                  {downloadingId === selectedRecord.id ? 'Exporting...' : t.downloadOfficialPdf}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 cursor-pointer"
              >
                {language === 'hi' ? 'बंद करें' : language === 'mr' ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
