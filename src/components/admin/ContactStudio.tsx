import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Check, Sparkles } from 'lucide-react';

export const ContactStudio: React.FC = () => {
  const { data, updatePersonalInfo } = usePortfolio();
  const [personalInfo, setPersonalInfo] = useState(data.personalInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePersonalInfo(personalInfo);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            09 / CONTACT & CHANNELS STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Contact Information & Channels
          </h2>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-[#C4A482]" />}
          <span>{savedSuccess ? 'Contact Channels Updated!' : 'Save Channels'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-[#E7E0D5] space-y-6 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">PRIMARY EMAIL ADDRESS *</label>
            <input
              type="email"
              required
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">PHONE NUMBER / WHATSAPP</label>
            <input
              type="text"
              value={personalInfo.phone || ''}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono-code text-[#6B645C]">LOCATION (City, Country)</label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-[#E7E0D5] space-y-4">
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase">PROFESSIONAL & SOCIAL NETWORKS</div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">LINKEDIN URL</label>
              <input
                type="url"
                value={personalInfo.linkedin || ''}
                onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">GITHUB PROFILE URL</label>
              <input
                type="url"
                value={personalInfo.github || ''}
                onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">INSTAGRAM / TWITTER URL</label>
              <input
                type="url"
                value={personalInfo.instagram || ''}
                onChange={(e) => setPersonalInfo({ ...personalInfo, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>

    </div>
  );
};

