import React from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Award, 
  Brain, 
  Code, 
  Database,
  Compass
} from 'lucide-react';

interface AboutProfileCardProps {
  name: string;
  title: string;
  location: string;
  className?: string;
}

export const AboutProfileCard: React.FC<AboutProfileCardProps> = ({
  name,
  title,
  location,
  className = ''
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Layered Tactile Archival Paper Backing */}
      <div className="absolute -inset-2.5 rounded-3xl bg-[#E8E1D2]/80 transform -rotate-1 transition-transform group-hover:-rotate-2 duration-500 pointer-events-none" />
      
      {/* Main Archival Canvas Card */}
      <div className="relative rounded-3xl overflow-hidden bg-[#181615] border border-[#2D2825] shadow-[0_16px_45px_rgba(32,29,26,0.18)] p-6 sm:p-7 flex flex-col justify-between aspect-[4/5] min-h-[380px] text-[#FAF8F5] select-none">
        
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-12 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C4A482 1px, transparent 1px)`,
            backgroundSize: '22px 22px'
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9A7B61]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Identification Stamp */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2E2926] pb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C4A482]" />
            <span className="text-[11px] font-mono-code tracking-widest text-[#E2D9CC] uppercase font-semibold">
              ACADEMIC PROFILE // CSE
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#241F1D] border border-[#38312B] text-[9.5px] font-mono-code text-[#C4A482]">
            SVECW ’25
          </span>
        </div>

        {/* Central Visual Telemetry */}
        <div className="relative z-10 my-auto space-y-4 py-2">
          
          {/* Stylized Identity Emblem */}
          <div className="flex flex-col items-center justify-center text-center py-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2D2622] to-[#1C1816] border border-[#3D332D] shadow-inner flex items-center justify-center text-[#C4A482] mb-3 group-hover:scale-105 transition-transform duration-500">
              <span className="font-serif text-3xl font-normal text-white">TP</span>
            </div>
            <h3 className="text-2xl font-serif text-white font-normal">{name}</h3>
            <p className="text-xs font-mono-code text-[#C4A482] mt-1">{title}</p>
            <div className="flex items-center gap-1.5 text-xs text-[#9C948A] mt-1.5 font-mono-code">
              <MapPin className="w-3.5 h-3.5 text-[#C4A482]" />
              <span>{location}</span>
            </div>
          </div>

          {/* Quick Domain Matrix */}
          <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono-code">
            <div className="p-2 rounded-xl bg-[#201D1A]/90 border border-[#332C27]">
              <div className="text-[#8A8177]">UNDERGRAD CGPA</div>
              <div className="text-white font-bold text-xs mt-0.5">7.43 / 10.0</div>
            </div>
            <div className="p-2 rounded-xl bg-[#201D1A]/90 border border-[#332C27]">
              <div className="text-[#8A8177]">SPECIALIZATION</div>
              <div className="text-white font-bold text-xs mt-0.5">AI & Data Science</div>
            </div>
          </div>

        </div>

        {/* Bottom Signature Section */}
        <div className="relative z-10 pt-3.5 border-t border-[#2E2926] flex items-center justify-between text-[10.5px] font-mono-code text-[#8A8177]">
          <span className="text-[#D4C8B8]">Bhimavaram & Rajahmundry, IN</span>
          <span className="text-[#C4A482]">DATA SCIENTIST</span>
        </div>

      </div>
    </div>
  );
};
