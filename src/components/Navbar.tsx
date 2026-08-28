import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileText, ArrowUpRight, Menu, X, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { data, setIsResumeModalOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'analytics', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'The Field Journal', href: '#about', id: 'about' },
    { label: 'Case Files', href: '#projects', id: 'projects' },
    { label: 'Constellation', href: '#skills', id: 'skills' },
    { label: 'Signal Trail', href: '#experience', id: 'experience' },
    { label: 'Laboratory', href: '#analytics', id: 'analytics' },
    { label: 'Archive', href: '#certifications', id: 'certifications' },
    { label: 'Transmission', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3 sm:py-4 px-4 sm:px-8 flex justify-center">
      <nav
        id="main-navbar"
        className={`w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E7E0D5] shadow-[0_12px_32px_rgba(36,33,30,0.06)]'
            : 'bg-[#FAF8F5]/75 backdrop-blur-md border border-[#EAE4DB]/80'
        }`}
      >
        {/* Brand Story Signature */}
        <a
          href="#hero"
          id="nav-brand"
          className="group flex items-center gap-2.5 text-left transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-[#9A7B61] animate-pulse" />
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg font-medium tracking-tight text-[#201D1A] group-hover:text-[#9A7B61] transition-colors leading-none">
              {data.personalInfo.name}
            </span>
            <span className="text-[9.5px] font-mono-code text-[#7A7268] tracking-wider uppercase mt-0.5">
              Data, Signals & Patterns
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#F0EBE1]/75 px-3 py-1 rounded-full border border-[#E2D9CC]/60">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              id={`nav-link-${item.id}`}
              className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-white text-[#201D1A] shadow-2xs font-semibold'
                  : 'text-[#6B645C] hover:text-[#201D1A] hover:bg-white/50'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Resume CTA */}
          <button
            id="nav-resume-btn"
            onClick={() => setIsResumeModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4A443D] hover:text-[#201D1A] bg-white/80 hover:bg-white border border-[#E2D9CC] transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#9A7B61]" />
            <span>Curriculum Vitae</span>
          </button>

          {/* Studio Entry Button */}
          <button
            id="nav-studio-btn"
            onClick={onOpenAdmin}
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-[0_4px_16px_rgba(32,29,26,0.18)] transition-all duration-300 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C4A482] group-hover:rotate-45 transition-transform duration-300" />
            <span>Studio</span>
            <ArrowUpRight className="w-3 h-3 text-[#C4A482] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#4A443D] hover:text-[#201D1A] bg-white/80 border border-[#E2D9CC] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-[#FAF8F5]/98 backdrop-blur-2xl border border-[#E7E0D5] rounded-3xl p-6 shadow-2xl space-y-4 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-xs font-medium text-[#4A443D] hover:text-[#201D1A] bg-white/70 border border-[#EAE4DB] hover:bg-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E7E0D5] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsResumeModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-medium text-[#201D1A] bg-white border border-[#E2D9CC] shadow-2xs"
            >
              <FileText className="w-4 h-4 text-[#9A7B61]" />
              View Curriculum Vitae
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-medium text-white bg-[#201D1A]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C4A482]" />
              Access Studio Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
