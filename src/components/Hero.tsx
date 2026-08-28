import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowDown, FileText, Mail, ArrowUpRight } from 'lucide-react';
import { HeroImageFrame } from './HeroImageFrame';

export const Hero: React.FC = () => {
  const { data, setIsResumeModalOpen } = usePortfolio();
  const heroData = data.hero;
  const heroImgUrl = heroData.heroImage || data.personalInfo.profilePhoto;
  const showHeroImg = heroData.showHeroImage !== false && !!heroImgUrl;
  const placement = heroData.heroImagePlacement || 'side-right';
  const shape = heroData.heroImageShape || 'archival';

  // 1. Placement: Side-Right (Editorial Split Layout)
  if (showHeroImg && placement === 'side-right') {
    return (
      <section
        id="hero"
        className="relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-10 sm:pb-14 overflow-hidden z-10"
      >
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Text Content (Left Column) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Status & Identity Badge */}
            <div
              id="hero-status-pill"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#E2D9CC] text-[11px] font-mono-code text-[#7A7268] mb-6 shadow-2xs backdrop-blur-md transition-all hover:border-[#C4A482]"
            >
              <span className="w-2 h-2 rounded-full bg-[#9A7B61] animate-pulse" />
              <span className="text-[#3A352F] tracking-widest uppercase font-medium">
                TEJASWINI PAMULA // FIELD JOURNAL
              </span>
              <span className="text-[#D6C9B8]">/</span>
              <span className="text-[#9A7B61] font-semibold">SVECW 2025</span>
            </div>

            {/* Expressive Editorial Headline */}
            <h1
              id="hero-main-title"
              className="display-hero tracking-tight font-serif text-[#201D1A] mb-5 leading-[0.98] font-normal"
            >
              {heroData.heading || (
                <>Looking for the <span className="italic font-normal text-[#9A7B61]">human pulse</span> inside eight thousand rows of noise.</>
              )}
            </h1>

            {/* Narrative Statement */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-[#524B43] leading-relaxed mb-5 font-normal"
            >
              {heroData.subheading || (
                <>I’m <strong className="text-[#201D1A] font-medium font-serif text-lg">{data.personalInfo.name}</strong> — a Data Science & AI Engineer from Rajahmundry. I explore the quiet statistical signals behind large systems, crafting exploratory visual models, predictive pipelines, and cognitive AI workflows.</>
              )}
            </p>

            {/* Handwritten Marginalia Quote */}
            <div className="font-handwriting text-xl sm:text-2xl text-[#9A7B61] mb-8 transform -rotate-1 select-none">
              ~ raw data → signal → pattern → insight → impact ~
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
              <a
                href="#projects"
                id="hero-explore-cta"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-[0_8px_24px_rgba(32,29,26,0.12)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{heroData.primaryCtaText || 'Examine Case Files'}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-[#C4A482]" />
              </a>

              <button
                id="hero-resume-cta"
                onClick={() => setIsResumeModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium text-[#201D1A] bg-[#FAF8F5] hover:bg-white border border-[#E2D9CC] shadow-2xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#9A7B61]" />
                <span>{heroData.secondaryCtaText || 'Curriculum Vitae'}</span>
              </button>

              <a
                href={`mailto:${data.personalInfo.email}`}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-mono-code text-[#7A7268] hover:text-[#201D1A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#9A7B61]" />
                <span>Direct Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Hero Feature Image (Right Column) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end max-w-sm sm:max-w-md mx-auto w-full">
            <HeroImageFrame
              imageUrl={heroImgUrl}
              shape={shape}
              name={data.personalInfo.name}
              className="w-full"
            />
          </div>

        </div>
      </section>
    );
  }

  // 2. Default & Alternate Placements: Centered layouts (center-top, center-bottom, badge-corner, or no image)
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-10 sm:pb-12 overflow-hidden z-10"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Placement: Center-Top (Portrait above Headline) */}
        {showHeroImg && placement === 'center-top' && (
          <div className="mb-6">
            <HeroImageFrame
              imageUrl={heroImgUrl}
              shape={shape === 'archival' ? 'circle' : shape}
              name={data.personalInfo.name}
            />
          </div>
        )}

        {/* Status & Identity Badge */}
        <div
          id="hero-status-pill"
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#E2D9CC] text-[11px] font-mono-code text-[#7A7268] mb-6 shadow-2xs backdrop-blur-md transition-all hover:border-[#C4A482]"
        >
          <span className="w-2 h-2 rounded-full bg-[#9A7B61] animate-pulse" />
          <span className="text-[#3A352F] tracking-widest uppercase font-medium">
            TEJASWINI PAMULA // FIELD JOURNAL
          </span>
          <span className="text-[#D6C9B8]">/</span>
          <span className="text-[#9A7B61] font-semibold">SVECW 2025</span>
        </div>

        {/* Expressive Editorial Headline */}
        <h1
          id="hero-main-title"
          className="display-hero tracking-tight font-serif text-[#201D1A] max-w-3xl mx-auto mb-5 leading-[0.96] font-normal"
        >
          {heroData.heading || (
            <>Looking for the <span className="italic font-normal text-[#9A7B61]">human pulse</span> inside eight thousand rows of noise.</>
          )}
        </h1>

        {/* Narrative Statement */}
        <p
          id="hero-description"
          className="text-base sm:text-lg lg:text-xl text-[#524B43] max-w-2xl mx-auto leading-relaxed mb-5 font-normal"
        >
          {heroData.subheading || (
            <>I’m <strong className="text-[#201D1A] font-medium font-serif text-lg sm:text-xl">{data.personalInfo.name}</strong> — a Data Science & AI Engineer from Rajahmundry. I explore the quiet statistical signals behind large systems, crafting exploratory visual models, predictive pipelines, and cognitive AI workflows.</>
          )}
        </p>

        {/* Handwritten Marginalia Quote */}
        <div className="font-handwriting text-xl sm:text-2xl text-[#9A7B61] mb-8 transform -rotate-1 select-none">
          ~ raw data → signal → pattern → insight → impact ~
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <a
            href="#projects"
            id="hero-explore-cta"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-[0_8px_24px_rgba(32,29,26,0.12)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{heroData.primaryCtaText || 'Examine Case Files'}</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-[#C4A482]" />
          </a>

          <button
            id="hero-resume-cta"
            onClick={() => setIsResumeModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium text-[#201D1A] bg-[#FAF8F5] hover:bg-white border border-[#E2D9CC] shadow-2xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#9A7B61]" />
            <span>{heroData.secondaryCtaText || 'Curriculum Vitae'}</span>
          </button>

          <a
            href={`mailto:${data.personalInfo.email}`}
            className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-mono-code text-[#7A7268] hover:text-[#201D1A] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#9A7B61]" />
            <span>Direct Inquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Placement: Center-Bottom (Banner below CTA) */}
        {showHeroImg && placement === 'center-bottom' && (
          <div className="mt-12 w-full max-w-xl mx-auto">
            <HeroImageFrame
              imageUrl={heroImgUrl}
              shape={shape}
              name={data.personalInfo.name}
            />
          </div>
        )}

      </div>
    </section>
  );
};

