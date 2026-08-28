import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  ExternalLink, 
  RefreshCw, 
  SlidersHorizontal,
  LogOut
} from 'lucide-react';

interface StudioHeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onClose: () => void;
  onSearch: (q: string) => void;
  searchQuery: string;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  currentTab,
  onSelectTab,
  onClose,
}) => {
  const { syncStatus, saveToCloud, logout } = usePortfolio();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const tabs = [
    { id: 'home', label: '00 Overview' },
    { id: 'hero', label: '01 Hero' },
    { id: 'about', label: '02 About' },
    { id: 'projects', label: '03 Projects' },
    { id: 'experience', label: '04 Experience' },
    { id: 'skills', label: '05 Skills' },
    { id: 'certifications', label: '06 Certs' },
    { id: 'achievements', label: '07 Honors' },
    { id: 'resume', label: '08 Resume' },
    { id: 'media', label: '09 Media' },
    { id: 'messages', label: '10 Inbox' },
    { id: 'contact', label: '11 Contact' },
    { id: 'seo', label: '12 SEO' },
    { id: 'roles', label: '13 Team' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E0D5] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left Brand / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-[#201D1A] flex items-center justify-center text-[#E2D9CC] shadow-2xs">
            <SlidersHorizontal className="w-4 h-4 text-[#C4A482]" />
          </div>
          <div>
            <div className="text-xs font-serif text-[#201D1A] font-medium tracking-tight flex items-center gap-1.5">
              <span>PORTFOLIO STUDIO</span>
              <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-[#F4EFE6] text-[#7C5E47] border border-[#E7E0D5]">PRO</span>
            </div>
            <div className="text-[10px] font-mono-code text-[#7A7268]">
              {currentTab === 'home' ? 'Workspace Overview' : `Studio / ${currentTab.toUpperCase()}`}
            </div>
          </div>
        </button>
      </div>

      {/* Center Nav Pills (Desktop) */}
      <div className="hidden xl:flex items-center gap-1 bg-[#F4EFE6] p-1 rounded-full border border-[#E7E0D5] overflow-x-auto max-w-xl">
        {tabs.slice(0, 7).map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              currentTab === tab.id
                ? 'bg-[#201D1A] text-white font-medium shadow-2xs'
                : 'text-[#6B645C] hover:text-[#201D1A] hover:bg-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
        {tabs.length > 7 && (
          <select
            value={tabs.slice(7).some(t => t.id === currentTab) ? currentTab : ''}
            onChange={(e) => e.target.value && onSelectTab(e.target.value)}
            className="px-2.5 py-1 rounded-full text-xs text-[#6B645C] bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="" disabled className="bg-white">More...</option>
            {tabs.slice(7).map((tab) => (
              <option key={tab.id} value={tab.id} className="bg-white text-[#201D1A]">
                {tab.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Firestore Sync Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E2D9CC] text-[11px] font-mono-code shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#9A7B61] animate-pulse" />
          <span className="text-[#6B645C]">
            {syncStatus === 'syncing' ? 'Syncing...' : 'Firestore Live'}
          </span>
        </div>

        {/* Cloud Save Action */}
        <button
          onClick={() => saveToCloud()}
          title="Save & Sync to Firestore"
          className="p-2 rounded-xl bg-white hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC] transition-colors cursor-pointer shadow-2xs"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* View Live Portfolio */}
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-all cursor-pointer"
        >
          <span>Live Portfolio</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#C4A482]" />
        </button>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          title="Sign Out of Studio"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-600" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
};

