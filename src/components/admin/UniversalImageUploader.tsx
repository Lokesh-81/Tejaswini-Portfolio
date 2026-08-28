import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Upload, 
  HardDrive, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  X, 
  Check, 
  Layers, 
  FolderSearch,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface UniversalImageUploaderProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  sectionName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'any';
  helperText?: string;
}

export const UniversalImageUploader: React.FC<UniversalImageUploaderProps> = ({
  label,
  value,
  onChange,
  sectionName = 'General Studio Assets',
  aspectRatio = 'any',
  helperText
}) => {
  const { data, uploadFileToStorage } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'upload' | 'gdrive' | 'url' | 'library'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [gdriveInput, setGdriveInput] = useState('');
  const [directUrlInput, setDirectUrlInput] = useState(value || '');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert Google Drive share link into direct embedding URL if necessary
  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return '';
    const trimmed = url.trim();
    
    // Pattern 1: https://drive.google.com/file/d/FILE_ID/view...
    const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }

    // Pattern 2: https://drive.google.com/open?id=FILE_ID or uc?id=FILE_ID
    const queryIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (queryIdMatch && queryIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${queryIdMatch[1]}`;
    }

    return trimmed;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/') && !file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG, GIF).');
      return;
    }

    setIsUploading(true);
    try {
      const uploadedItem = await uploadFileToStorage(file, sectionName);
      if (uploadedItem && uploadedItem.url) {
        onChange(uploadedItem.url);
        setDirectUrlInput(uploadedItem.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyGdrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdriveInput) return;
    const directUrl = convertGoogleDriveUrl(gdriveInput);
    onChange(directUrl);
    setDirectUrlInput(directUrl);
    setGdriveInput('');
  };

  const handleApplyDirectUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directUrlInput) return;
    onChange(directUrlInput.trim());
  };

  return (
    <div className="space-y-2.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC]">
      {/* Label and Current Image Status */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono-code text-[#7A7268] font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#9A7B61]" />
          <span>{label}</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={() => { onChange(''); setDirectUrlInput(''); }}
            className="text-[11px] font-mono-code text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {helperText && (
        <p className="text-[11px] text-[#8C847A] leading-relaxed">
          {helperText}
        </p>
      )}

      {/* Preview Box & Quick Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start pt-1">
        
        {/* Visual Preview */}
        <div className="sm:col-span-4 aspect-video relative rounded-xl overflow-hidden bg-white border border-[#E2D9CC] flex items-center justify-center shadow-2xs group">
          {value ? (
            <>
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#201D1A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/90 text-[#201D1A] text-xs flex items-center gap-1 shadow-xs"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="text-[10px] font-mono-code">View Full</span>
                </a>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-3 text-[#9C948A]">
              <ImageIcon className="w-6 h-6 stroke-[1.5] mb-1" />
              <span className="text-[10.5px] font-mono-code">No Image Assigned</span>
            </div>
          )}
        </div>

        {/* Input Methods Tabs */}
        <div className="sm:col-span-8 space-y-2.5">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-[#E7E0D5]">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono-code flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-[#201D1A] text-white font-medium shadow-2xs'
                  : 'text-[#6B645C] hover:text-[#201D1A]'
              }`}
            >
              <Upload className="w-3 h-3" />
              <span>Device Drop</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gdrive')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono-code flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'gdrive'
                  ? 'bg-[#201D1A] text-white font-medium shadow-2xs'
                  : 'text-[#6B645C] hover:text-[#201D1A]'
              }`}
            >
              <HardDrive className="w-3 h-3" />
              <span>Google Drive</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono-code flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-[#201D1A] text-white font-medium shadow-2xs'
                  : 'text-[#6B645C] hover:text-[#201D1A]'
              }`}
            >
              <FolderSearch className="w-3 h-3" />
              <span>Media Library</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono-code flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-[#201D1A] text-white font-medium shadow-2xs'
                  : 'text-[#6B645C] hover:text-[#201D1A]'
              }`}
            >
              <LinkIcon className="w-3 h-3" />
              <span>URL</span>
            </button>
          </div>

          {/* Tab 1: Drag & Drop from Device */}
          {activeTab === 'upload' && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-[#9A7B61] bg-[#F4EFE6]'
                  : 'border-[#D5C9B8] hover:border-[#9A7B61] bg-white'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
              <div className="flex items-center justify-center gap-2 text-xs font-mono-code text-[#6B645C]">
                <Upload className="w-3.5 h-3.5 text-[#9A7B61]" />
                <span>{isUploading ? 'Uploading & saving...' : 'Click or Drag & Drop image file from device'}</span>
              </div>
              <span className="text-[10px] text-[#9C948A] block mt-1">PNG, JPG, WebP, SVG</span>
            </div>
          )}

          {/* Tab 2: Google Drive Embed */}
          {activeTab === 'gdrive' && (
            <form onSubmit={handleApplyGdrive} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste Google Drive shareable link (Anyone with link can view)..."
                  value={gdriveInput}
                  onChange={(e) => setGdriveInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A] placeholder-[#9C948A] focus:border-[#201D1A] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#201D1A] text-white text-xs font-medium hover:bg-[#34302C] transition-colors cursor-pointer"
                >
                  Import
                </button>
              </div>
              <div className="text-[10.5px] font-mono-code text-[#9C948A]">
                💡 Tip: Ensure Drive file sharing is set to "Anyone with the link can view". It converts to direct image stream automatically.
              </div>
            </form>
          )}

          {/* Tab 3: Select from existing Media Library */}
          {activeTab === 'library' && (
            <div className="space-y-2">
              <div className="max-h-36 overflow-y-auto grid grid-cols-4 gap-2 p-2 rounded-xl bg-white border border-[#E2D9CC]">
                {data.mediaLibrary
                  .filter((m) => m.type !== 'pdf')
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onChange(item.url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer group ${
                        value === item.url
                          ? 'border-[#9A7B61] ring-2 ring-[#9A7B61]'
                          : 'border-[#E7E0D5] hover:border-[#9A7B61]'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {value === item.url && (
                        <div className="absolute inset-0 bg-[#9A7B61]/40 flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tab 4: Direct Web URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleApplyDirectUrl} className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or https://..."
                value={directUrlInput}
                onChange={(e) => setDirectUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A] placeholder-[#9C948A] focus:border-[#201D1A] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#201D1A] text-white text-xs font-medium hover:bg-[#34302C] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
