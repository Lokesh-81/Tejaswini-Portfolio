import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaItem } from '../../types';
import { 
  FileText, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Search, 
  HardDrive,
  Plus,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const MediaStudio: React.FC = () => {
  const { data, deleteMediaItem, addMediaItem } = usePortfolio();
  
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(data.mediaLibrary[0] || null);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'pdf' | 'icon'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDriveInput, setShowDriveInput] = useState(false);
  const [driveUrl, setDriveUrl] = useState('');
  const [driveName, setDriveName] = useState('');

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

  const handleAddDriveAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveUrl.trim()) return;

    const directPreviewUrl = convertGoogleDriveUrl(driveUrl.trim());
    const assetName = driveName.trim() || 'Imported Asset';

    await addMediaItem(
      assetName,
      directPreviewUrl,
      directPreviewUrl.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
      'Remote Stream',
      'Linked Asset',
      assetName
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
            05 / MEDIA ASSET & REPOSITORY HUB
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Visual Assets & Documents
          </h2>
        </div>

        <button
          onClick={() => setShowDriveInput(!showDriveInput)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium text-[#201D1A] bg-white hover:bg-[#FAF8F5] border border-[#E2D9CC] shadow-2xs transition-colors cursor-pointer"
        >
          <HardDrive className="w-4 h-4 text-[#9A7B61]" />
          <span>{showDriveInput ? 'Hide Drive Input' : 'Link External Asset URL'}</span>
        </button>
      </div>

      {/* Google Drive / CDN Import Form */}
      {showDriveInput && (
        <form onSubmit={handleAddDriveAsset} className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#C4A482] shadow-2xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-serif text-[#201D1A] font-medium flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#9A7B61]" />
              <span>Link URL or Google Drive Asset</span>
            </h4>
            <span className="text-[11px] font-mono-code text-[#7A7268]">Instant Public Link Sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-[#7A7268]">ASSET NAME / LABEL</label>
              <input
                type="text"
                placeholder="e.g. Research Diagram"
                value={driveName}
                onChange={(e) => setDriveName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-[#7A7268]">DIRECT URL</label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowDriveInput(false)}
              className="px-4 py-2 rounded-xl text-xs text-[#6B645C] hover:text-[#201D1A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C4A482]" />
              <span>Link Asset</span>
            </button>
          </div>
        </form>
      )}

      {/* Built-in Visual Engine Information Notice */}
      <div className="p-6 rounded-3xl bg-white border border-[#E7E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-serif text-[#201D1A] font-medium">
              Portfolio Assets Rendered via Responsive Vector/CSS Components
            </div>
            <p className="text-xs text-[#6B645C] mt-0.5">
              Case study graphics and hero telemetry are bundled into code. No external cloud storage uploads needed.
            </p>
          </div>
        </div>
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
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <FileText className="w-12 h-12 text-[#9A7B61] mb-2" />
                    <span className="text-xs font-mono-code text-[#6B645C]">PDF Document</span>
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

              {/* Metadata Details */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono-code text-[#9C948A] block">FILENAME</span>
                  <span className="font-medium text-[#201D1A] break-all">{selectedItem.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-code text-[#9C948A] block">SECTION ASSIGNMENT</span>
                  <span className="text-[#6B645C]">{selectedItem.usedInSection || 'Unassigned'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#E7E0D5]">
                <button
                  onClick={() => handleCopyUrl(selectedItem.url, selectedItem.id)}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-[#201D1A] bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#E2D9CC] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedId === selectedItem.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>URL Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#9A7B61]" />
                      <span>Copy Direct Asset URL</span>
                    </>
                  )}
                </button>

                <a
                  href={selectedItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-[#6B645C] hover:text-[#201D1A] hover:bg-[#FAF8F5] flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in New Tab</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-[#9C948A] font-mono-code">
              Select an asset from the repository to view details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
