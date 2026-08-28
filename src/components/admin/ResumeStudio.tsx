import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  FileText, 
  Download, 
  Eye, 
  Upload, 
  Check, 
  HardDrive, 
  ExternalLink, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ResumeStudio: React.FC = () => {
  const { data, updatePersonalInfo, uploadFileToStorage, addMediaItem, setIsResumeModalOpen } = usePortfolio();

  const [isUploading, setIsUploading] = useState(false);
  const [directUrl, setDirectUrl] = useState(data.personalInfo.resumeUrl || '/Tejaswini_Pamula_Resume.pdf');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeResumeMedia = data.mediaLibrary.find(
    (m) => m.type === 'pdf' || m.name.toLowerCase().includes('resume') || m.url === data.personalInfo.resumeUrl
  );

  const activeFileName = activeResumeMedia?.name || 'Tejaswini_Pamula_Resume.pdf';
  const activeFileSize = activeResumeMedia?.size || '240 KB';
  const activeFileDate = activeResumeMedia?.uploadedAt || '2026-08-15';

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Please select a valid PDF document.');
      return;
    }

    setIsUploading(true);
    try {
      const uploadedItem = await uploadFileToStorage(file, 'Resume → Official Document');
      if (uploadedItem && uploadedItem.url) {
        setDirectUrl(uploadedItem.url);
        await updatePersonalInfo({ resumeUrl: uploadedItem.url });
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Resume upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDirectUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directUrl.trim()) return;
    await updatePersonalInfo({ resumeUrl: directUrl.trim() });
    
    // Also record in media library if not present
    await addMediaItem(
      'Tejaswini_Pamula_Resume.pdf',
      directUrl.trim(),
      'pdf',
      '240 KB',
      'Resume Section',
      'Tejaswini Pamula Official Resume'
    );

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            13 / CURRICULUM VITAE & DOCUMENTS STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Resume & Official Credentials
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsResumeModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Eye className="w-4 h-4 text-[#C4A482]" />
          <span>Launch Interactive Reader</span>
        </button>
      </div>

      {/* Active Live Document Card */}
      <div className="p-8 rounded-3xl bg-white border border-[#E7E0D5] shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider">
            ACTIVE LIVE RESUME DOCUMENT
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active on Public Portfolio
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC]">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
              <FileText className="w-7 h-7" />
            </div>

            <div className="min-w-0 space-y-1">
              <div className="text-sm font-serif text-[#201D1A] font-medium truncate">
                {activeFileName}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A7268] font-mono-code">
                <span>PDF Document</span>
                <span>•</span>
                <span>{activeFileSize}</span>
                <span>•</span>
                <span>Synced: {activeFileDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={data.personalInfo.resumeUrl || '/Tejaswini_Pamula_Resume.pdf'}
              download="Tejaswini_Pamula_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-[#201D1A] bg-white hover:bg-[#F4EFE6] border border-[#E2D9CC] transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#9A7B61]" />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Upload New PDF / Storage Dropzone */}
        <div className="space-y-4 pt-4 border-t border-[#E7E0D5]">
          <div className="text-xs font-mono-code text-[#6B645C] uppercase">
            REPLACE RESUME FILE (FIREBASE STORAGE)
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            accept=".pdf,application/pdf"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#D6C9B8] hover:border-[#9A7B61] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-[#FAF8F5] hover:bg-[#F4EFE6] space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61] mx-auto shadow-2xs">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-serif text-[#201D1A] font-medium">
                {isUploading ? 'Uploading to Firebase Storage...' : 'Click to Upload New PDF Resume'}
              </div>
              <p className="text-xs text-[#7A7268] mt-1">
                Uploads directly to Cloud Storage and updates the Hero, Navigation, and CV Modal links.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Link or External Storage URL */}
        <form onSubmit={handleSaveDirectUrl} className="space-y-3 pt-4 border-t border-[#E7E0D5]">
          <label className="text-xs font-mono-code text-[#6B645C] uppercase">
            CUSTOM RESUME URL (GOOGLE DRIVE / CLOUD STORAGE / CDN)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={directUrl}
              onChange={(e) => setDirectUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer shrink-0"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-[#C4A482]" />}
              <span>{savedSuccess ? 'Updated' : 'Set Live'}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
