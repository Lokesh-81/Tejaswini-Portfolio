import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { LayoutDashboard, ArrowUp, Sparkles, SlidersHorizontal } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { data } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E7E0D5] relative z-10 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Large Name / Editorial Brand Composition */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#E7E0D5]">
          <div>
            <div className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#201D1A] tracking-tight font-normal">
              {data.personalInfo.name}
            </div>
            <p className="text-xs sm:text-sm text-[#7A7268] font-mono-code mt-3">
              Data Analyst • Machine Learning & AI Architect • SVECW Graduate (7.43 CGPA)
            </p>
          </div>

          <div className="flex items-center gap-3.5">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white border border-[#E2D9CC] text-[#6B645C] hover:text-[#201D1A] hover:bg-[#FAF8F5] transition-colors cursor-pointer shadow-2xs"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-[#201D1A] bg-white hover:bg-[#FAF8F5] border border-[#E2D9CC] transition-colors shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#9A7B61]" />
              <span>Studio Portal</span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Editorial Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#9C948A]">
          <div>
            © {currentYear} {data.personalInfo.name}. A collection of signals, told slowly.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#about" className="hover:text-[#201D1A] transition-colors">Field Journal</a>
            <a href="#projects" className="hover:text-[#201D1A] transition-colors">Case Files</a>
            <a href="#skills" className="hover:text-[#201D1A] transition-colors">Constellation</a>
            <a href="#experience" className="hover:text-[#201D1A] transition-colors">Signal Trail</a>
            <a href="#analytics" className="hover:text-[#201D1A] transition-colors">Laboratory</a>
            <a href="#certifications" className="hover:text-[#201D1A] transition-colors">Archive</a>
            <a href="#contact" className="hover:text-[#201D1A] transition-colors">Transmission</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
