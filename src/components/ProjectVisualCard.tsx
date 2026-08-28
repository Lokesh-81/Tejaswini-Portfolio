import React from 'react';
import { 
  Film, 
  Tv, 
  BarChart3, 
  Compass,
  ArrowRight,
  FileText,
  Video,
  Code2,
  ListOrdered,
  Camera,
  Layers,
  Clock,
  Car,
  Cpu
} from 'lucide-react';

interface ProjectVisualCardProps {
  projectId: string;
  title: string;
  category?: string;
  className?: string;
}

export const ProjectVisualCard: React.FC<ProjectVisualCardProps> = ({
  projectId,
  title,
  category = 'Data Science',
  className = ''
}) => {
  const normalizedTitle = title.toLowerCase();

  // 1. Netflix Data Analysis Visual (Dataset EDA: Movies vs TV Shows, Release Year Trend, Genres)
  if (projectId === 'proj-1' || projectId === 'proj-netflix' || normalizedTitle.includes('netflix')) {
    return (
      <div className={`relative w-full h-full min-h-[300px] bg-[#141211] text-[#E8E2D9] rounded-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#2D2825] shadow-inner select-none ${className}`}>
        {/* Background Grid Accent */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C4A482 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Ambient Warm Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9A7B61]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2D2825] pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C4A482]" />
            <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#FAF8F5] uppercase">
              EXPLORATORY DATA ANALYSIS // NETFLIX_CATALOG.PY
            </span>
          </div>
          <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded bg-[#201D1A] text-[#C4A482] border border-[#3A332E]">
            N = 8,807 TITLES
          </span>
        </div>

        {/* Analytical Visualization Body */}
        <div className="relative z-10 my-4 space-y-4">
          
          {/* Top Row: Movies vs TV Shows Proportion */}
          <div className="space-y-2 p-3.5 rounded-xl bg-[#1C1816] border border-[#2D2825]">
            <div className="flex items-center justify-between text-[11px] font-mono-code text-[#B8AEA3]">
              <span className="flex items-center gap-1.5 font-medium text-white">
                <Film className="w-3.5 h-3.5 text-[#C4A482]" />
                Movies: 6,131 (69.6%)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-white">
                <Tv className="w-3.5 h-3.5 text-[#A38A75]" />
                TV Shows: 2,676 (30.4%)
              </span>
            </div>
            
            {/* Proportion Bar */}
            <div className="w-full h-2.5 rounded-full bg-[#26211E] overflow-hidden flex">
              <div className="h-full bg-[#C4A482] rounded-l-full" style={{ width: '69.6%' }} title="Movies: 69.6%" />
              <div className="h-full bg-[#52443B] rounded-r-full" style={{ width: '30.4%' }} title="TV Shows: 30.4%" />
            </div>
          </div>

          {/* Middle Row: Content Trend Histogram & Top Categories */}
          <div className="grid grid-cols-12 gap-3 items-center">
            
            {/* Histogram: Content Added by Release Period */}
            <div className="col-span-12 sm:col-span-7 p-3 rounded-xl bg-[#1C1816] border border-[#2D2825] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono-code text-[#8A8177]">
                <span>TITLES ADDED OVER TIME (2012 – 2021)</span>
                <span className="text-[#C4A482]">EXPANSION PHASE</span>
              </div>
              
              {/* Histogram bars */}
              <div className="h-14 w-full flex items-end gap-1.5 pt-1">
                {[
                  { yr: '12', val: 12 },
                  { yr: '14', val: 24 },
                  { yr: '16', val: 42 },
                  { yr: '17', val: 65 },
                  { yr: '18', val: 82 },
                  { yr: '19', val: 100 },
                  { yr: '20', val: 94 },
                  { yr: '21', val: 78 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-[#3A332E] hover:bg-[#C4A482] transition-colors rounded-t-xs"
                      style={{ height: `${item.val}%` }}
                    />
                    <span className="text-[8.5px] font-mono-code text-[#6B6258]">'{item.yr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Genres & Lead Countries */}
            <div className="col-span-12 sm:col-span-5 grid grid-cols-1 gap-2">
              <div className="p-2.5 rounded-xl bg-[#1C1816] border border-[#2D2825]">
                <div className="text-[9.5px] font-mono-code text-[#8A8177]">TOP GENRES BY FREQUENCY</div>
                <div className="text-xs font-mono-code text-white mt-1 space-y-0.5">
                  <div className="flex justify-between"><span>1. International & Dramas</span><span className="text-[#C4A482]">36.1%</span></div>
                  <div className="flex justify-between"><span>2. Comedies</span><span className="text-[#C4A482]">19.0%</span></div>
                  <div className="flex justify-between"><span>3. Action & Documentaries</span><span className="text-[#C4A482]">21.4%</span></div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#1C1816] border border-[#2D2825] flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-mono-code text-[#8A8177]">TOP PRODUCING COUNTRIES</div>
                  <div className="text-xs font-medium text-white">United States, India, UK</div>
                </div>
                <span className="text-[9.5px] font-mono-code px-2 py-0.5 rounded bg-[#2D2825] text-[#C4A482]">
                  TV-MA (36%)
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Meta Chips */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#2D2825] text-[10.5px] font-mono-code text-[#8A8177]">
          <span className="flex items-center gap-1.5 text-[#D4C8B8]">
            <BarChart3 className="w-3.5 h-3.5 text-[#C4A482]" />
            Python · Pandas · Matplotlib · Seaborn
          </span>
          <span className="text-[#C4A482]">Exploratory Data Analysis</span>
        </div>
      </div>
    );
  }

  // 2. Uber Data Analysis Visual (Ride & Trip Demand, Hourly Distributions, Peak Hours)
  if (projectId === 'proj-2' || projectId === 'proj-uber' || normalizedTitle.includes('uber')) {
    return (
      <div className={`relative w-full h-full min-h-[300px] bg-[#121417] text-[#E0E6ED] rounded-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#222A35] shadow-inner select-none ${className}`}>
        {/* Subtle Spatial Coordinate Grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#8EA3BF 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Cool Slate Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#4A6B82]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#222A35] pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8EA3BF]" />
            <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#FAF8F5] uppercase">
              TIME-SERIES EDA // UBER_RIDE_DEMAND.PY
            </span>
          </div>
          <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded bg-[#1C232E] text-[#8EA3BF] border border-[#2D3A4B]">
            HOURLY & SPATIAL PATTERNS
          </span>
        </div>

        {/* Main Analytics Visual Center */}
        <div className="relative z-10 my-4 space-y-3.5">
          
          {/* 24-Hour Trip Volume Curve */}
          <div className="p-3.5 rounded-xl bg-[#181F29] border border-[#243040] space-y-2">
            <div className="flex items-center justify-between text-[10.5px] font-mono-code text-[#8EA3BF]">
              <span className="flex items-center gap-1.5 font-medium text-white">
                <Clock className="w-3.5 h-3.5 text-[#5C8AB5]" />
                Hourly Trip Demand Distribution (24-Hour Cycle)
              </span>
              <span className="text-[#8EA3BF] font-semibold">PEAK: 17:30 – 19:00</span>
            </div>

            {/* Simulated 24hr Curve with SVG */}
            <div className="h-16 w-full flex items-end">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="uberDemandGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5C8AB5" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#5C8AB5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <path
                  d="M 0 34 Q 15 37 25 32 T 35 15 T 50 25 T 65 26 T 75 7 T 88 18 T 100 28 L 100 40 L 0 40 Z"
                  fill="url(#uberDemandGrad)"
                />
                {/* Stroke line */}
                <path
                  d="M 0 34 Q 15 37 25 32 T 35 15 T 50 25 T 65 26 T 75 7 T 88 18 T 100 28"
                  fill="none"
                  stroke="#8EA3BF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Time labels below chart */}
            <div className="flex justify-between text-[8.5px] font-mono-code text-[#6C7B8F] pt-0.5">
              <span>00:00 (Night)</span>
              <span>08:30 (Morning Commute)</span>
              <span>14:00 (Midday)</span>
              <span>17:30 (Evening Peak)</span>
              <span>23:00 (Late)</span>
            </div>
          </div>

          {/* Spatial Breakdown & Day-of-Week Patterns */}
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 sm:col-span-6 p-2.5 rounded-xl bg-[#181F29] border border-[#243040] space-y-1.5">
              <div className="text-[9.5px] font-mono-code text-[#6C7B8F]">PICKUP DENSITY BY ZONE</div>
              <div className="space-y-1 text-[10px] font-mono-code">
                <div className="flex justify-between text-[#8EA3BF]"><span>Midtown & Downtown</span><span className="text-white">48%</span></div>
                <div className="w-full h-1 bg-[#243040] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5C8AB5]" style={{ width: '48%' }} />
                </div>
                <div className="flex justify-between text-[#8EA3BF]"><span>Airport Corridors</span><span className="text-white">28%</span></div>
                <div className="w-full h-1 bg-[#243040] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5C8AB5]" style={{ width: '28%' }} />
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 p-2.5 rounded-xl bg-[#181F29] border border-[#243040] flex flex-col justify-between">
              <div className="text-[9.5px] font-mono-code text-[#6C7B8F]">WEEKLY PEAK PATTERN</div>
              <div className="text-xs font-serif text-white mt-1">
                Fridays & Saturdays exhibit extended evening ride volume.
              </div>
              <div className="text-[9.5px] font-mono-code text-[#5C8AB5] mt-1">
                Rush hour surge: 2.6x baseline demand
              </div>
            </div>
          </div>

        </div>

        {/* Footer Meta Chips */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#222A35] text-[10.5px] font-mono-code text-[#6C7B8F]">
          <span className="flex items-center gap-1.5 text-[#B8C8D9]">
            <Compass className="w-3.5 h-3.5 text-[#5C8AB5]" />
            Spatial-Temporal Aggregation & Peak Analysis
          </span>
          <span className="text-[#8EA3BF]">Python · Seaborn · NumPy</span>
        </div>
      </div>
    );
  }

  // 3. YouTube Summarizer NLP Pipeline Visual (Video → Transcript → NLP Processing → Key Points)
  if (projectId === 'proj-3' || projectId === 'proj-youtube' || normalizedTitle.includes('youtube') || normalizedTitle.includes('summarizer')) {
    return (
      <div className={`relative w-full h-full min-h-[300px] bg-[#161214] text-[#E8E0E3] rounded-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#30242A] shadow-inner select-none ${className}`}>
        {/* Background Texture */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C4829E 1px, transparent 1px)`,
            backgroundSize: '22px 22px'
          }}
        />

        {/* Ambient Rose Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9A6178]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#30242A] pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C4829E]" />
            <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#FAF8F5] uppercase">
              NLP PIPELINE // YOUTUBE_SUMMARIZER
            </span>
          </div>
          <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded bg-[#241A20] text-[#D49BB2] border border-[#3D2833]">
            TEXT SUMMARIZATION
          </span>
        </div>

        {/* Visual NLP Pipeline: 4 Stages (Video -> Transcript -> NLP -> Key Points) */}
        <div className="relative z-10 my-4 space-y-3">
          
          {/* Step 1 to Step 4 Pipeline Sequence Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono-code">
            
            {/* Step 1: Video Input */}
            <div className="p-2.5 rounded-xl bg-[#20171D] border border-[#33222C] flex flex-col items-center justify-between space-y-1">
              <div className="text-[#A88B97] font-semibold flex items-center gap-1">
                <Video className="w-3 h-3 text-[#C4829E]" />
                <span>1. VIDEO INPUT</span>
              </div>
              <div className="text-[9px] text-[#E0D2D7] truncate max-w-full">YouTube URL / Video</div>
              <div className="text-[8.5px] text-[#8C6D7B]">Audio Stream</div>
            </div>

            {/* Step 2: Transcript API */}
            <div className="p-2.5 rounded-xl bg-[#20171D] border border-[#33222C] flex flex-col items-center justify-between space-y-1">
              <div className="text-[#A88B97] font-semibold flex items-center gap-1">
                <FileText className="w-3 h-3 text-[#C4829E]" />
                <span>2. TRANSCRIPT</span>
              </div>
              <div className="text-[9px] text-[#E0D2D7] truncate max-w-full">Timestamped Captions</div>
              <div className="text-[8.5px] text-[#8C6D7B]">youtube-transcript-api</div>
            </div>

            {/* Step 3: NLP Processing */}
            <div className="p-2.5 rounded-xl bg-[#20171D] border border-[#33222C] flex flex-col items-center justify-between space-y-1">
              <div className="text-[#A88B97] font-semibold flex items-center gap-1">
                <Code2 className="w-3 h-3 text-[#C4829E]" />
                <span>3. NLP MODEL</span>
              </div>
              <div className="text-[9px] text-[#E0D2D7] truncate max-w-full">Tokenization & LLM</div>
              <div className="text-[8.5px] text-[#8C6D7B]">Transformers / Gemini</div>
            </div>

            {/* Step 4: Structured Summary */}
            <div className="p-2.5 rounded-xl bg-[#291B24] border border-[#482837] flex flex-col items-center justify-between space-y-1">
              <div className="text-[#D49BB2] font-semibold flex items-center gap-1">
                <ListOrdered className="w-3 h-3 text-[#C4829E]" />
                <span>4. SUMMARY</span>
              </div>
              <div className="text-[9px] text-[#FAF8F5] font-medium truncate max-w-full">Executive Takeaways</div>
              <div className="text-[8.5px] text-[#D49BB2]">Bulleted Insights</div>
            </div>

          </div>

          {/* Pipeline Transformation Example Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1">
            
            {/* Raw Transcript Block */}
            <div className="sm:col-span-5 p-3 rounded-xl bg-[#20171D] border border-[#33222C] space-y-1 text-[10.5px] font-mono-code text-[#8A717E]">
              <div className="text-[9.5px] text-[#A88B97] uppercase font-semibold">RAW TRANSCRIPT SEGMENT</div>
              <p className="line-clamp-2 text-[#C4B2BA]">
                "In today's lecture we'll examine gradient descent optimization, learning rate schedules, and cross-entropy loss functions..."
              </p>
            </div>

            {/* Flow Indicator */}
            <div className="hidden sm:flex sm:col-span-2 items-center justify-center text-[#A88B97]">
              <ArrowRight className="w-5 h-5 text-[#C4829E]" />
            </div>

            {/* Extracted Structured Summary */}
            <div className="sm:col-span-5 p-3 rounded-xl bg-[#241920] border border-[#3E2532] space-y-1 text-[11px] font-serif text-[#EBE0E5]">
              <div className="text-[9.5px] font-mono-code text-[#D49BB2] uppercase font-semibold">EXTRACTED KEY TAKEAWAYS</div>
              <ul className="space-y-0.5 list-disc list-inside text-xs text-[#E0D2D7]">
                <li className="truncate">Core optimization methods and loss functions</li>
                <li className="truncate">Adaptive learning rate scheduling strategies</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer Meta Chips */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#30242A] text-[10.5px] font-mono-code text-[#9C7F8C]">
          <span className="flex items-center gap-1.5 text-[#D9C4CC]">
            <FileText className="w-3.5 h-3.5 text-[#C4829E]" />
            Python · YouTube Transcript API · Hugging Face · Gemini API
          </span>
          <span className="text-[#C4829E]">NLP / GenAI Pipeline</span>
        </div>
      </div>
    );
  }

  // 4. Smart Traffic Signaling System Visual (Camera Input → Vehicle Detection → Traffic Density → Signal Decision)
  if (projectId === 'proj-4' || projectId === 'proj-traffic' || normalizedTitle.includes('traffic') || normalizedTitle.includes('signaling')) {
    return (
      <div className={`relative w-full h-full min-h-[300px] bg-[#121614] text-[#E0E8E3] rounded-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#222E26] shadow-inner select-none ${className}`}>
        {/* Intersection Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#68A37A 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Emerald Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#447A55]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#222E26] pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#68A37A]" />
            <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#FAF8F5] uppercase">
              CV & IOT PIPELINE // SMART_TRAFFIC_SIGNAL_CONTROL
            </span>
          </div>
          <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded bg-[#1A261F] text-[#7EBF92] border border-[#2B4032]">
            DENSITY-BASED TIMING
          </span>
        </div>

        {/* Main 4-Stage Computer Vision & Traffic Pipeline */}
        <div className="relative z-10 my-4 space-y-3">
          
          {/* 4 Pipeline Stages (Camera -> Detection -> Density -> Signal Decision) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono-code">
            
            {/* Step 1: Camera Input */}
            <div className="p-2.5 rounded-xl bg-[#16211B] border border-[#26382C] flex flex-col items-center justify-between space-y-1">
              <div className="text-[#8EAB96] font-semibold flex items-center gap-1">
                <Camera className="w-3 h-3 text-[#7EBF92]" />
                <span>1. CAMERA FEED</span>
              </div>
              <div className="text-[9px] text-[#E0E8E3] truncate max-w-full">Intersection Video</div>
              <div className="text-[8.5px] text-[#6B8572]">Optical Stream</div>
            </div>

            {/* Step 2: Vehicle Detection */}
            <div className="p-2.5 rounded-xl bg-[#16211B] border border-[#26382C] flex flex-col items-center justify-between space-y-1">
              <div className="text-[#8EAB96] font-semibold flex items-center gap-1">
                <Car className="w-3 h-3 text-[#7EBF92]" />
                <span>2. VEHICLE DETECTION</span>
              </div>
              <div className="text-[9px] text-[#E0E8E3] truncate max-w-full">Bounding Boxes</div>
              <div className="text-[8.5px] text-[#6B8572]">OpenCV Processing</div>
            </div>

            {/* Step 3: Traffic Density */}
            <div className="p-2.5 rounded-xl bg-[#16211B] border border-[#26382C] flex flex-col items-center justify-between space-y-1">
              <div className="text-[#8EAB96] font-semibold flex items-center gap-1">
                <BarChart3 className="w-3 h-3 text-[#7EBF92]" />
                <span>3. LANE DENSITY</span>
              </div>
              <div className="text-[9px] text-[#E0E8E3] truncate max-w-full">Vehicle Count / Lane</div>
              <div className="text-[8.5px] text-[#6B8572]">Queue Length Index</div>
            </div>

            {/* Step 4: Signal Decision */}
            <div className="p-2.5 rounded-xl bg-[#1C2C22] border border-[#344D3C] flex flex-col items-center justify-between space-y-1">
              <div className="text-[#7EBF92] font-semibold flex items-center gap-1">
                <Cpu className="w-3 h-3 text-[#7EBF92]" />
                <span>4. SIGNAL TIMING</span>
              </div>
              <div className="text-[9px] text-white font-medium truncate max-w-full">Dynamic Green Cycle</div>
              <div className="text-[8.5px] text-[#7EBF92]">Adaptive Timers</div>
            </div>

          </div>

          {/* Lane Density & Signal Allocation Breakdown */}
          <div className="grid grid-cols-12 gap-3 pt-1">
            
            {/* Lane Density States */}
            <div className="col-span-12 sm:col-span-8 p-3 rounded-xl bg-[#16211B] border border-[#26382C] space-y-2">
              <div className="text-[9.5px] font-mono-code text-[#8EAB96] uppercase font-semibold">
                LANE DENSITY MEASUREMENT & DYNAMIC TIMER ALLOCATION
              </div>
              
              <div className="space-y-1.5 text-[10.5px] font-mono-code">
                {/* Lane A */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[#B0C7B7]">Northbound Lane (High Density): 42 Vehicles</span>
                  </div>
                  <span className="text-emerald-400 font-bold">GREEN (45s)</span>
                </div>
                
                {/* Lane B */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[#B0C7B7]">Eastbound Lane (Moderate): 18 Vehicles</span>
                  </div>
                  <span className="text-amber-400 font-bold">NEXT (20s)</span>
                </div>

                {/* Lane C */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="text-[#B0C7B7]">Westbound Lane (Low Density): 4 Vehicles</span>
                  </div>
                  <span className="text-rose-400 font-bold">HOLD RED</span>
                </div>
              </div>
            </div>

            {/* Traffic Light Illustration Box */}
            <div className="col-span-12 sm:col-span-4 p-3 rounded-xl bg-[#16211B] border border-[#26382C] flex items-center justify-center gap-3">
              {/* Traffic Light Body */}
              <div className="w-8 py-2 px-1.5 rounded-lg bg-[#0E1210] border border-[#26382C] flex flex-col items-center gap-1.5 shadow-inner">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-900 border border-rose-800" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-900 border border-amber-800" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] border border-emerald-300 animate-pulse" />
              </div>
              <div className="text-left text-[10px] font-mono-code text-[#8EAB96]">
                <div className="text-white font-medium">ADAPTIVE CYCLE</div>
                <div>Allocates green time based on live queue depth</div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Meta Chips */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#222E26] text-[10.5px] font-mono-code text-[#73947C]">
          <span className="flex items-center gap-1.5 text-[#C4D9CA]">
            <Cpu className="w-3.5 h-3.5 text-[#7EBF92]" />
            Python · OpenCV · Computer Vision · IoT Algorithms
          </span>
          <span className="text-[#7EBF92]">Adaptive Traffic Control</span>
        </div>
      </div>
    );
  }

  // 5. Default Fallback for Any Custom/New Project
  return (
    <div className={`relative w-full h-full min-h-[280px] bg-[#1E1B18] text-[#EBE4DC] rounded-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#36302B] shadow-inner select-none ${className}`}>
      {/* Background Accent */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#C4A482 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 flex items-center justify-between border-b border-[#36302B] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C4A482]" />
          <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#FAF8F5] uppercase">
            CASE STUDY // {category.toUpperCase()}
          </span>
        </div>
        <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded bg-[#2A2420] text-[#C4A482] border border-[#3E352F]">
          ANALYTICAL MODEL
        </span>
      </div>

      <div className="relative z-10 my-6 space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif text-white font-normal">{title}</h3>
        <p className="text-xs sm:text-sm text-[#B8AEA3] line-clamp-2">
          Exploratory analysis, statistical modeling, and structured data visualization.
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#36302B] text-[10.5px] font-mono-code text-[#8A8177]">
        <span className="flex items-center gap-1.5 text-[#C4A482]">
          <Layers className="w-3.5 h-3.5 text-[#C4A482]" />
          Tejaswini Pamula
        </span>
        <span className="text-[#FAF8F5]">VERIFIED DATASET</span>
      </div>
    </div>
  );
};

