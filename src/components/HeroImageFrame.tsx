import React from 'react';

interface HeroImageFrameProps {
  imageUrl: string;
  shape?: 'circle' | 'rounded' | 'archival' | 'pill';
  name?: string;
  className?: string;
}

export const HeroImageFrame: React.FC<HeroImageFrameProps> = ({
  imageUrl,
  shape = 'archival',
  name = 'Tejaswini Pamula',
  className = ''
}) => {
  if (!imageUrl) return null;

  if (shape === 'circle') {
    return (
      <div className={`relative group inline-block ${className}`}>
        <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-1.5 bg-[#FAF8F5] border border-[#E2D9CC] shadow-[0_12px_36px_rgba(36,33,30,0.1)] transition-transform duration-500 group-hover:scale-103">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover filter contrast-[1.02]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="absolute bottom-1 right-2 px-2.5 py-0.5 rounded-full bg-[#201D1A] text-[10px] font-mono-code text-[#E2D9CC] shadow-xs">
          TP // IST
        </div>
      </div>
    );
  }

  if (shape === 'pill') {
    return (
      <div className={`relative group inline-block ${className}`}>
        <div className="w-40 h-56 sm:w-48 sm:h-64 rounded-full p-1.5 bg-[#FAF8F5] border border-[#E2D9CC] shadow-[0_12px_36px_rgba(36,33,30,0.1)] transition-transform duration-500 group-hover:scale-103">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover filter contrast-[1.02]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    );
  }

  if (shape === 'rounded') {
    return (
      <div className={`relative group ${className}`}>
        <div className="relative rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#E2D9CC] aspect-[4/5] shadow-[0_12px_40px_rgba(36,33,30,0.08)]">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103 filter contrast-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A]/70 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <div className="text-sm font-serif text-white font-medium">{name}</div>
            <div className="text-[10px] text-[#EAE4DB] font-mono-code">AI & Data Science Engineer</div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Tactile Archival with Layered Paper Backing and Stamp
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-2 rounded-3xl bg-[#EAE3D6]/70 transform -rotate-2 transition-transform group-hover:-rotate-3 duration-500 pointer-events-none" />
      <div className="relative rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#E2D9CC] aspect-[4/5] shadow-[0_15px_45px_rgba(36,33,30,0.1)]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103 filter contrast-[1.02]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A]/75 via-transparent to-transparent opacity-90" />
        
        {/* Paper Corner Stamp */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E2D9CC] text-[9.5px] font-mono-code text-[#201D1A] shadow-2xs">
          HERO REF // TP-2026
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-left">
          <div className="text-base font-serif text-white font-medium">{name}</div>
          <div className="text-[10.5px] text-[#EAE4DB] font-mono-code mt-0.5">Data Science & AI Engineer</div>
        </div>
      </div>
    </div>
  );
};
