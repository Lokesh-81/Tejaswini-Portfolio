import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Check, Layout, Move, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export const HeroStudio: React.FC = () => {
  const { data, updateHero } = usePortfolio();
  const [formData, setFormData] = useState(data.hero);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHero(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            01 / HERO STATEMENT & VISUAL STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Hero Statement & Visual Layout
          </h2>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-[#C4A482]" />}
          <span>{savedSuccess ? 'Hero Updated!' : 'Save Statement & Layout'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-[#E7E0D5] space-y-8 shadow-2xs">
        
        {/* 1. Hero Visual Engine Notice & Placement Controls */}
        <div className="space-y-5 pb-6 border-b border-[#E7E0D5]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif text-[#201D1A] font-medium flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#9A7B61]" />
              <span>Generative Abstract Data & Signal Visual</span>
            </h3>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-mono-code">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Bundled Vector & CSS Engine</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB] space-y-2">
            <p className="text-xs text-[#524B43] leading-relaxed">
              The hero section is rendered with an abstract statistical signal and telemetry card engineered with responsive CSS/SVG. It requires zero cloud storage uploads and is always guaranteed to load reliably in production.
            </p>
          </div>

          {/* Placement Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268] flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-[#9A7B61]" />
                <span>VISUAL PLACEMENT / POSITION</span>
              </label>
              <select
                value={formData.heroImagePlacement || 'side-right'}
                onChange={(e) => setFormData({ ...formData, heroImagePlacement: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              >
                <option value="side-right">Editorial Split (Visual on Right, Text on Left)</option>
                <option value="center-top">Top Centered (Visual above Headline)</option>
                <option value="center-bottom">Bottom Centered (Visual below CTA)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268] flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-[#9A7B61]" />
                <span>VISUAL AESTHETIC THEME</span>
              </label>
              <div className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#6B645C]">
                Tactile Archival Matrix (Live Vector Telemetry)
              </div>
            </div>
          </div>
        </div>

        {/* 2. Hero Headline and Subtitle */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono-code text-[#7A7268]">MAIN HERO HEADLINE *</label>
          <input
            type="text"
            required
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] font-medium focus:border-[#201D1A] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono-code text-[#7A7268]">HERO SUBTITLE / ELEVATOR PITCH *</label>
          <textarea
            rows={3}
            required
            value={formData.subheading}
            onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] leading-relaxed focus:border-[#201D1A] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#7A7268]">PRIMARY CTA BUTTON TEXT</label>
            <input
              type="text"
              value={formData.primaryCtaText}
              onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#7A7268]">SECONDARY CTA BUTTON TEXT</label>
            <input
              type="text"
              value={formData.secondaryCtaText}
              onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>
        </div>
      </form>

    </div>
  );
};
