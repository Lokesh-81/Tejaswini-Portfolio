import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Share2, Check, Sparkles, Globe } from 'lucide-react';

export const SeoStudio: React.FC = () => {
  const { data, updateSeo } = usePortfolio();
  const [formData, setFormData] = useState(data.seoSettings || data.seo || {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
    googleAnalyticsId: '',
    clarityId: ''
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSeo(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            12 / SEO & SOCIAL PRESENCE STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Search Engine & Social Cards
          </h2>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-[#C4A482]" />}
          <span>{savedSuccess ? 'SEO Metadata Updated!' : 'Save SEO Configuration'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 p-8 rounded-3xl bg-white border border-[#E7E0D5] space-y-4 shadow-2xs">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">PAGE TITLE (&lt;title&gt;) *</label>
            <input
              type="text"
              required
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">META DESCRIPTION *</label>
            <textarea
              rows={3}
              required
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">SEO KEYWORDS (Comma Separated)</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="Data Analyst, Machine Learning, Python, SQL..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">OPEN GRAPH (OG) SOCIAL SHARE IMAGE</label>
            <input
              type="url"
              value={formData.ogImage}
              onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E7E0D5]">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">GOOGLE ANALYTICS 4 ID</label>
              <input
                type="text"
                value={formData.googleAnalyticsId || ''}
                onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">MS CLARITY ID</label>
              <input
                type="text"
                value={formData.clarityId || ''}
                onChange={(e) => setFormData({ ...formData, clarityId: e.target.value })}
                placeholder="CLR-XXXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
          </div>
        </form>

        {/* Live Visual Previews */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Google Search Live Preview */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7E0D5] space-y-3 shadow-2xs">
            <div className="text-[11px] font-mono-code text-[#9A7B61] flex items-center gap-1.5 uppercase">
              <Globe className="w-3.5 h-3.5" />
              <span>LIVE SEARCH ENGINE SNIPPET</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] space-y-1">
              <div className="text-xs text-[#6B645C] truncate">https://tejaswini-pamula.ai</div>
              <div className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer truncate">
                {formData.metaTitle}
              </div>
              <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                {formData.metaDescription}
              </div>
            </div>
          </div>

          {/* Social Share Card Preview */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7E0D5] space-y-3 shadow-2xs">
            <div className="text-[11px] font-mono-code text-[#9A7B61] flex items-center gap-1.5 uppercase">
              <Share2 className="w-3.5 h-3.5" />
              <span>OPEN GRAPH SOCIAL CARD PREVIEW</span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E2D9CC]">
              <div className="aspect-[1.91/1] overflow-hidden bg-[#F0EAE1]">
                <img
                  src={formData.ogImage}
                  alt="OG Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-white border-t border-[#E7E0D5] space-y-1">
                <div className="text-[10px] font-mono-code text-[#9C948A] uppercase">TEJASWINI-PAMULA.PORTFOLIO</div>
                <div className="text-xs font-serif text-[#201D1A] font-medium truncate">{formData.metaTitle}</div>
                <div className="text-[11px] text-[#6B645C] line-clamp-1">{formData.metaDescription}</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

