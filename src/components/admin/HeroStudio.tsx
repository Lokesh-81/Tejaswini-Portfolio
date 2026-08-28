import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Check, Layout, Move, Sparkles } from 'lucide-react';
import { UniversalImageUploader } from './UniversalImageUploader';

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
            01 / HERO STATEMENT & IMAGE STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Hero Statement & Featured Image
          </h2>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-[#C4A482]" />}
          <span>{savedSuccess ? 'Hero Updated!' : 'Save Statement & Image'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-[#E7E0D5] space-y-8 shadow-2xs">
        
        {/* 1. Hero Image Customization Section */}
        <div className="space-y-5 pb-6 border-b border-[#E7E0D5]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif text-[#201D1A] font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9A7B61]" />
              <span>Hero Portrait / Feature Graphic</span>
            </h3>
            
            <label className="flex items-center gap-2 text-xs font-mono-code text-[#6B645C] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showHeroImage !== false}
                onChange={(e) => setFormData({ ...formData, showHeroImage: e.target.checked })}
                className="rounded border-[#E2D9CC] text-[#9A7B61] focus:ring-[#9A7B61]"
              />
              <span>Display Image in Hero</span>
            </label>
          </div>

          <UniversalImageUploader
            label="Hero Featured Image / Portrait"
            value={formData.heroImage || ''}
            onChange={(url) => setFormData({ ...formData, heroImage: url })}
            sectionName="Hero Section"
            helperText="Drag & drop from your device, paste a Google Drive link, select from library, or paste any image URL."
          />

          {/* Placement and Shape Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268] flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-[#9A7B61]" />
                <span>IMAGE PLACEMENT / POSITION</span>
              </label>
              <select
                value={formData.heroImagePlacement || 'side-right'}
                onChange={(e) => setFormData({ ...formData, heroImagePlacement: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              >
                <option value="side-right">Editorial Split (Image on Right, Text on Left)</option>
                <option value="center-top">Top Centered (Portrait above Headline)</option>
                <option value="center-bottom">Bottom Centered (Feature Banner below CTA)</option>
                <option value="badge-corner">Corner Floating Badge (Upper Right Ambient)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268] flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-[#9A7B61]" />
                <span>IMAGE FRAME STYLING</span>
              </label>
              <select
                value={formData.heroImageShape || 'archival'}
                onChange={(e) => setFormData({ ...formData, heroImageShape: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              >
                <option value="archival">Tactile Archival (Layered backing paper with stamp)</option>
                <option value="circle">Circular Avatar (Editorial ring border)</option>
                <option value="rounded">Modern Rounded (Soft curvature border)</option>
                <option value="pill">Pill / Stadium Contour</option>
              </select>
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

