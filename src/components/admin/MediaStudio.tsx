import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaItem } from '../../types';
import { 
  Upload, 
  FileText, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Search, 
  HardDrive,
  Plus,
  AlertCircle,
  X,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export const MediaStudio: React.FC = () => {
  const { data, uploadFileToStorage, deleteMediaItem, addMediaItem } = usePortfolio();
  
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(data.mediaLibrary[0] || null);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'pdf' | 'icon'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatusText, setUploadStatusText] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDriveInput, setShowDriveInput] = useState(false);
  const [driveUrl, setDriveUrl] = useState('');
  const [driveName, setDriveName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef<number>(0);

  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return '';
    const trimmed = url.trim();
    const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
    const queryIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (queryIdMatch && queryIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${queryIdMatch[1]}`;
    }
    return trimmed;
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (isUploading) return;

    setUploadError(null);
    setUploadSuccess(null);
    setIsUploading(true);
    setUploadProgress(0);

    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.pdf'];
    let lastUploaded: MediaItem | null = null;
    let uploadedCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileNameLower = file.name.toLowerCase();
        const hasValidExtension = validExtensions.some(ext => fileNameLower.endsWith(ext));

        if (!hasValidExtension && !file.type.startsWith('image/') && file.type !== 'application/pdf') {
          throw new Error(`Unsupported file "${file.name}". Please select PNG, JPG, WebP, SVG, GIF, or PDF.`);
        }

        setUploadStatusText(`Uploading ${file.name} (${i + 1}/${files.length})...`);
        
        const newMedia = await uploadFileToStorage(
          file, 
          'General Studio Assets',
          (percent) => setUploadProgress(percent)
        );

        lastUploaded = newMedia;
        uploadedCount++;
      }

      if (lastUploaded) {
        setSelectedItem(lastUploaded);
      }
      setUploadSuccess(`Successfully uploaded and saved ${uploadedCount} file${uploadedCount > 1 ? 's' : ''} to Firebase Storage.`);
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (err: any) {
      console.error('File upload error:', err);
      setUploadError(err?.message || 'Failed to upload file to Firebase Storage. Please check permissions and retry.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStatusText('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      setIsDragOver(false);
      dragCounterRef.current = 0;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    dragCounterRef.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleAddDriveAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveUrl) return;
    const directUrl = convertGoogleDriveUrl(driveUrl);
    const assetName = driveName.trim() || `Drive Asset ${data.mediaLibrary.length + 1}`;
    await addMediaItem(
      assetName,
      directUrl,
      'image',
      'Drive Stream',
      'Google Drive Imported',
      assetName,
      'Linked from Google Drive'
    );
    setDriveUrl('');
    setDriveName('');
    setShowDriveInput(false);
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredMedia = data.mediaLibrary.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.usedInSection && item.usedInSection.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            05 / MEDIA ASSET HUB
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Visual Assets & Documents
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDriveInput(!showDriveInput)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium text-[#201D1A] bg-white hover:bg-[#FAF8F5] border border-[#E2D9CC] shadow-2xs transition-colors cursor-pointer"
          >
            <HardDrive className="w-4 h-4 text-[#9A7B61]" />
            <span>Link Google Drive</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#C4A482]" />
            <span>{isUploading ? 'Uploading...' : 'Upload Device Image'}</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.svg"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Optional Google Drive Direct Ingestion Drawer */}
      {showDriveInput && (
        <form onSubmit={handleAddDriveAsset} className="p-6 rounded-3xl bg-white border border-[#9A7B61] shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-serif text-[#201D1A] font-medium flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#9A7B61]" />
              <span>Import Media from Google Drive</span>
            </h4>
            <button
              type="button"
              onClick={() => setShowDriveInput(false)}
              className="text-xs font-mono-code text-[#9C948A] hover:text-[#201D1A]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-[#7A7268]">ASSET NAME / LABEL</label>
              <input
                type="text"
                placeholder="e.g. Hero Architecture Portrait"
                value={driveName}
                onChange={(e) => setDriveName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code text-[#7A7268]">GOOGLE DRIVE LINK *</label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/..."
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#201D1A] text-white text-xs font-medium hover:bg-[#34302C] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Library</span>
            </button>
          </div>
        </form>
      )}

      {/* Error and Success Feedback Alerts */}
      {uploadError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold font-mono-code uppercase">Upload Failed</p>
              <p className="mt-0.5 text-rose-700">{uploadError}</p>
            </div>
          </div>
          <button
            onClick={() => setUploadError(null)}
            className="text-rose-600 hover:text-rose-900 p-1 rounded-lg hover:bg-rose-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {uploadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <p className="font-medium">{uploadSuccess}</p>
          </div>
          <button
            onClick={() => setUploadSuccess(null)}
            className="text-emerald-600 hover:text-emerald-900 p-1 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!isUploading) {
            fileInputRef.current?.click();
          }
        }}
        className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer group shadow-2xs ${
          isDragOver
            ? 'border-[#9A7B61] bg-[#F4EFE6] scale-[1.01]'
            : 'border-[#D5C9B8] hover:border-[#9A7B61] bg-white/60 hover:bg-white'
        } ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#7C5E47] mx-auto mb-3 group-hover:scale-105 transition-transform">
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#9A7B61]" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>
        
        {isUploading ? (
          <div className="space-y-3 max-w-sm mx-auto">
            <h4 className="text-sm font-serif text-[#201D1A] font-medium">{uploadStatusText || 'Uploading to Firebase Storage...'}</h4>
            <div className="w-full h-2 bg-[#E7E0D5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#201D1A] transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-[11px] font-mono-code text-[#7A7268]">{uploadProgress}% complete</p>
          </div>
        ) : (
          <>
            <h4 className="text-sm font-serif text-[#201D1A] font-medium mb-1">
              {isDragOver ? 'Drop files here to upload' : 'Drag and drop images, PDFs, or banners'}
            </h4>
            <p className="text-xs text-[#6B645C]">
              Supports PNG, JPG, WebP, SVG, and PDF. Directly persisted to Firebase Storage.
            </p>
          </>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['all', 'image', 'pdf', 'icon'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer uppercase ${
                filterType === t
                  ? 'bg-[#201D1A] text-white font-medium shadow-xs'
                  : 'text-[#6B645C] hover:text-[#201D1A] bg-white border border-[#E2D9CC]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9C948A]" />
          <input
            type="text"
            placeholder="Search media by name or section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#E2D9CC] text-xs text-[#201D1A] placeholder-[#9C948A] focus:border-[#201D1A] focus:outline-none"
          />
        </div>
      </div>

      {/* Media Grid & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Assets Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredMedia.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative rounded-2xl overflow-hidden bg-white border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#9A7B61] shadow-md ring-1 ring-[#9A7B61]'
                    : 'border-[#E7E0D5] hover:border-[#C4A482]'
                }`}
              >
                {/* Media Preview Thumbnail */}
                <div className="relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden flex items-center justify-center">
                  {item.type === 'pdf' ? (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <FileText className="w-10 h-10 text-[#9A7B61] mb-1" />
                      <span className="text-[10px] font-mono-code text-[#6B645C]">PDF DOC</span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono-code text-white">
                    {item.size}
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-3 border-t border-[#E7E0D5] bg-[#FCFBF9]">
                  <div className="text-xs font-serif text-[#201D1A] font-medium truncate">{item.name}</div>
                  <div className="text-[10px] font-mono-code text-[#9C948A] truncate mt-0.5">
                    {item.usedInSection || 'General'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Media Inspector Drawer */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E7E0D5] space-y-6 sticky top-24 shadow-2xs">
          {selectedItem ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D5]">
                <div className="text-xs font-mono-code text-[#9A7B61] uppercase">ASSET INSPECTOR</div>
                <button
                  onClick={() => deleteMediaItem(selectedItem.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Asset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Large Preview */}
              <div className="aspect-video rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] overflow-hidden flex items-center justify-center">
                {selectedItem.type === 'pdf' ? (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <FileText className="w-12 h-12 text-[#9A7B61] mb-2" />
                    <span className="text-xs font-mono-code text-[#201D1A]">{selectedItem.name}</span>
                  </div>
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[11px] font-mono-code text-[#9C948A]">ASSET NAME</div>
                  <div className="text-sm font-serif text-[#201D1A] font-medium truncate">{selectedItem.name}</div>
                </div>

                <div>
                  <div className="text-[11px] font-mono-code text-[#9C948A]">USED IN SECTION</div>
                  <div className="text-xs font-mono-code text-[#7C5E47]">{selectedItem.usedInSection}</div>
                </div>

                <div>
                  <div className="text-[11px] font-mono-code text-[#9C948A]">FILE SIZE & DATE</div>
                  <div className="text-xs text-[#6B645C] font-mono-code">
                    {selectedItem.size} • Uploaded {selectedItem.uploadedAt}
                  </div>
                </div>

                {selectedItem.description && (
                  <div>
                    <div className="text-[11px] font-mono-code text-[#9C948A]">DESCRIPTION</div>
                    <div className="text-xs text-[#6B645C]">{selectedItem.description}</div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E7E0D5] flex items-center gap-2">
                <button
                  onClick={() => handleCopyUrl(selectedItem.url, selectedItem.id)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  {copiedId === selectedItem.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C4A482]" />}
                  <span>{copiedId === selectedItem.id ? 'URL Copied!' : 'Copy Asset URL'}</span>
                </button>

                <a
                  href={selectedItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC]"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[#9C948A] text-xs font-mono-code">
              Select an asset from the grid to inspect details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

