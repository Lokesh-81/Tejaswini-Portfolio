import React from 'react';
import { 
  BarChart2, 
  Binary, 
  Cpu, 
  Layers, 
  TrendingUp, 
  Terminal, 
  Workflow, 
  Database,
  Radio,
  FileCode,
  GraduationCap
} from 'lucide-react';

interface HeroAbstractVisualProps {
  name?: string;
  className?: string;
}

export const HeroAbstractVisual: React.FC<HeroAbstractVisualProps> = ({
  name = 'Tejaswini Pamula',
  className = ''
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Layered Tactile Archival Paper Backing */}
      <div className="absolute -inset-2.5 rounded-3xl bg-[#E8E1D2]/80 transform -rotate-2 transition-transform group-hover:-rotate-3 duration-500 pointer-events-none" />
      
      {/* Main Container */}
      <div className="relative rounded-3xl overflow-hidden bg-[#181615] border border-[#2D2825] shadow-[0_20px_50px_rgba(32,29,26,0.2)] p-6 sm:p-7 flex flex-col justify-between aspect-[4/5] min-h-[380px] sm:min-h-[420px] text-[#FAF8F5] select-none">
        
        {/* Subtle Ambient Grid Background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #C4A482 1px, transparent 1px), linear-gradient(to bottom, #C4A482 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#9A7B61]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6B503D]/25 rounded-full blur-2xl pointer-events-none" />

        {/* 1. Top Bar: Identity & Verified Domain */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2E2926] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C4A482]" />
            <span className="text-[11px] font-mono-code tracking-widest text-[#E0D7CC] uppercase font-semibold">
              DATA SCIENCE & AI PORTFOLIO
            </span>
          </div>

          <div className="px-2.5 py-0.5 rounded-full bg-[#241F1D] border border-[#38312B] text-[9.5px] font-mono-code text-[#C4A482]">
            SVECW · 2025
          </div>
        </div>

        {/* 2. Central Abstract Data Visual: Matrices, Nodes, Signal Curves */}
        <div className="relative z-10 my-auto space-y-4 py-2">
          
          {/* Signal Stream / Distribution Frame */}
          <div className="p-3.5 rounded-2xl bg-[#201D1A]/90 border border-[#332C27] backdrop-blur-md space-y-2.5 shadow-md">
            <div className="flex items-center justify-between text-[10.5px] font-mono-code text-[#A3998D]">
              <span className="flex items-center gap-1.5 text-[#E0D7CC]">
                <TrendingUp className="w-3.5 h-3.5 text-[#C4A482]" />
                Exploratory Data & Model Convergence
              </span>
              <span className="text-[#C4A482] font-mono-code text-[10px]">MULTIVARIATE EDA</span>
            </div>

            {/* Generative Signal Curve SVG */}
            <div className="h-16 w-full flex items-end">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 60">
                <defs>
                  <linearGradient id="heroSignalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C4A482" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#C4A482" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 50 Q 25 15 50 35 T 100 10 T 150 40 T 200 18 L 200 60 L 0 60 Z"
                  fill="url(#heroSignalGrad)"
                />
                <path
                  d="M 0 50 Q 25 15 50 35 T 100 10 T 150 40 T 200 18"
                  fill="none"
                  stroke="#C4A482"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Visual points */}
                <circle cx="50" cy="35" r="3" fill="#FAF8F5" stroke="#9A7B61" strokeWidth="2" />
                <circle cx="100" cy="10" r="3" fill="#FAF8F5" stroke="#9A7B61" strokeWidth="2" />
                <circle cx="150" cy="40" r="3" fill="#FAF8F5" stroke="#9A7B61" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex justify-between text-[9.5px] font-mono-code text-[#8A8177] border-t border-[#2E2824] pt-2">
              <span>EXPLORATION & WRANGLING</span>
              <span>STATISTICAL MODELING</span>
              <span className="text-[#C4A482]">INSIGHT GENERATION</span>
            </div>
          </div>

          {/* 3 Core Analytical Pillars */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono-code">
            <div className="p-2.5 rounded-xl bg-[#201D1A]/90 border border-[#332C27]">
              <Database className="w-3.5 h-3.5 text-[#C4A482] mx-auto mb-1" />
              <div className="text-white font-medium">Data Analytics</div>
              <div className="text-[9px] text-[#8A8177]">Pandas & SQL</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#201D1A]/90 border border-[#332C27]">
              <Workflow className="w-3.5 h-3.5 text-[#C4A482] mx-auto mb-1" />
              <div className="text-white font-medium">Machine Learning</div>
              <div className="text-[9px] text-[#8A8177]">NLP & LLMs</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#201D1A]/90 border border-[#332C27]">
              <Cpu className="w-3.5 h-3.5 text-[#C4A482] mx-auto mb-1" />
              <div className="text-white font-medium">Computer Vision</div>
              <div className="text-[9px] text-[#8A8177]">OpenCV & IoT</div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Signature Stamp */}
        <div className="relative z-10 pt-4 border-t border-[#2E2926] flex items-center justify-between">
          <div>
            <div className="text-sm font-serif text-white font-medium">{name}</div>
            <div className="text-[10.5px] text-[#A3998D] font-mono-code mt-0.5">
              B.Tech Computer Science · SVECW 2025
            </div>
          </div>

          <div className="w-9 h-9 rounded-xl bg-[#241F1D] border border-[#38312B] flex items-center justify-center text-[#C4A482] shadow-xs">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
};
