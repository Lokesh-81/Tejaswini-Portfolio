import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, File, Image as ImageIcon } from 'lucide-react';

interface FileUploadZoneProps {
  accept?: string;
  label?: string;
  sublabel?: string;
  maxSizeMB?: number;
  onFileLoaded: (fileData: { name: string; url: string; size: string; type: 'pdf' | 'image' | 'icon' | 'document' }) => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  accept = '.pdf,.doc,.docx,.png,.jpg,.jpeg,.svg,.csv,.txt',
  label = 'Drag and drop your document or image here',
  sublabel = 'Supports PDF, Word, PNG, JPG, CSV (up to 15MB)',
  maxSizeMB = 15,
  onFileLoaded
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = (file: File) => {
    setErrorMsg('');
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMsg(`File exceeds maximum size limit of ${maxSizeMB}MB.`);
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const sizeStr = formatFileSize(file.size);

      let docType: 'pdf' | 'image' | 'icon' | 'document' = 'document';
      if (file.type.includes('pdf')) {
        docType = 'pdf';
      } else if (file.type.includes('image')) {
        docType = 'image';
      }

      setFileInfo({ name: file.name, size: sizeStr });
      setLoading(false);

      onFileLoaded({
        name: file.name,
        url: dataUrl,
        size: sizeStr,
        type: docType
      });
    };

    reader.onerror = () => {
      setLoading(false);
      setErrorMsg('Failed to read file from PC.');
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer p-8 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-3 ${
          isDragging
            ? 'border-blue-600 bg-blue-50/80 scale-[1.01] shadow-lg'
            : 'border-slate-300 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
          {loading ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <UploadCloud className="w-6 h-6" />
          )}
        </div>

        <div>
          <p className="text-xs font-bold text-slate-800">{label}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">{sublabel}</p>
          <button
            type="button"
            className="mt-3 px-4 py-1.5 bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
          >
            <span>Browse Files from PC</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {fileInfo && !errorMsg && (
        <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs font-bold">
          <div className="flex items-center gap-2 truncate">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{fileInfo.name}</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              {fileInfo.size}
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono text-emerald-700 shrink-0">Loaded</span>
        </div>
      )}
    </div>
  );
};
