import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, LineChart, Line } from 'recharts';
import { Activity, Radio, Sliders, Sparkles, Database, Layers, Eye, RefreshCw, BarChart3, TrendingUp, Cpu } from 'lucide-react';

const netflixCatalogData = [
  { genre: 'Dramas', count: 3180, share: '36.1%', productionIndex: 94 },
  { genre: 'Comedies', count: 1670, share: '19.0%', productionIndex: 82 },
  { genre: 'Action & Adv', count: 1020, share: '11.6%', productionIndex: 76 },
  { genre: 'Documentaries', count: 860, share: '9.8%', productionIndex: 68 },
  { genre: 'Sci-Fi & Thriller', count: 740, share: '8.4%', productionIndex: 61 },
  { genre: 'Children & Family', count: 640, share: '7.3%', productionIndex: 54 },
  { genre: 'International & Indie', count: 697, share: '7.8%', productionIndex: 72 },
];

const uberTemporalData = [
  { time: '00:00', trips: 180, surge: 1.0, waitTime: 4.2 },
  { time: '03:00', trips: 110, surge: 1.0, waitTime: 5.1 },
  { time: '06:00', trips: 340, surge: 1.2, waitTime: 4.8 },
  { time: '08:30', trips: 890, surge: 2.1, waitTime: 8.5 },
  { time: '11:00', trips: 520, surge: 1.3, waitTime: 4.0 },
  { time: '14:00', trips: 440, surge: 1.1, waitTime: 3.8 },
  { time: '17:30', trips: 1060, surge: 2.6, waitTime: 9.4 },
  { time: '20:00', trips: 820, surge: 1.9, waitTime: 6.2 },
  { time: '23:00', trips: 460, surge: 1.4, waitTime: 4.5 },
];

const nlpCompressionData = [
  { durationMins: 15, rawTokens: 3200, summaryTokens: 380, reviewSecs: 45 },
  { durationMins: 30, rawTokens: 6400, summaryTokens: 720, reviewSecs: 90 },
  { durationMins: 60, rawTokens: 12800, summaryTokens: 1250, reviewSecs: 160 },
  { durationMins: 90, rawTokens: 19200, summaryTokens: 1800, reviewSecs: 230 },
  { durationMins: 120, rawTokens: 25600, summaryTokens: 2350, reviewSecs: 300 },
];

export const AnalyticsShowcase: React.FC = () => {
  const [activeSignalMode, setActiveSignalMode] = useState<'netflix' | 'uber' | 'nlp'>('netflix');
  const [surgeMultiplier, setSurgeMultiplier] = useState<number>(1.0);

  // Dynamic calculation for interactive Uber surge simulation
  const computedUberData = uberTemporalData.map((d) => ({
    ...d,
    simulatedTrips: Math.round(d.trips * surgeMultiplier),
    simulatedSurge: Number((d.surge * (0.8 + surgeMultiplier * 0.2)).toFixed(1)),
  }));

  return (
    <section id="analytics" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#E7E0D5]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>THE LIVING LABORATORY // OBSERVABLE DATA CANVAS</span>
            </div>
            <h2 className="display-section text-[#201D1A] font-serif font-normal tracking-tight">
              An Artistic Canvas of Live Signals
            </h2>
          </div>

          {/* Laboratory Signal Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-full border border-[#E2D9CC] shadow-2xs">
            <button
              onClick={() => setActiveSignalMode('netflix')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                activeSignalMode === 'netflix'
                  ? 'bg-[#201D1A] text-white font-medium shadow-xs'
                  : 'text-[#7A7268] hover:text-[#201D1A]'
              }`}
            >
              01 // Netflix Catalog
            </button>
            <button
              onClick={() => setActiveSignalMode('uber')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                activeSignalMode === 'uber'
                  ? 'bg-[#201D1A] text-white font-medium shadow-xs'
                  : 'text-[#7A7268] hover:text-[#201D1A]'
              }`}
            >
              02 // Uber Surge Wave
            </button>
            <button
              onClick={() => setActiveSignalMode('nlp')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                activeSignalMode === 'nlp'
                  ? 'bg-[#201D1A] text-white font-medium shadow-xs'
                  : 'text-[#7A7268] hover:text-[#201D1A]'
              }`}
            >
              03 // NLP Token Density
            </button>
          </div>
        </div>

        {/* The Artistic Data Canvas */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/95 border border-[#E7E0D5] shadow-[0_15px_45px_rgba(36,33,30,0.04)] space-y-10">
          
          {/* NETFLIX MODE */}
          {activeSignalMode === 'netflix' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono-code text-[#9A7B61] uppercase tracking-wider">
                    DATASET // 8,807 TITLES (1925 – 2021)
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-medium mt-0.5">
                    Global Catalog Genre & Production Proportions
                  </h3>
                  <p className="text-xs text-[#7A7268] font-mono-code mt-1">
                    Python EDA Pipeline with Pandas, Matplotlib & Seaborn.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono-code text-[#201D1A] bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#E2D9CC] self-start sm:self-auto shadow-2xs">
                  <BarChart3 className="w-4 h-4 text-[#9A7B61]" />
                  <span>Dramas lead at 36.1% share</span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-72 sm:h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={netflixCatalogData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="genre" stroke="#9C948A" fontSize={11} tickLine={false} />
                    <YAxis stroke="#9C948A" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#FAF8F5', borderColor: '#E2D9CC', borderRadius: '14px', fontSize: '12px', color: '#201D1A', boxShadow: '0 8px 24px rgba(36,33,30,0.08)' }}
                      itemStyle={{ color: '#9A7B61' }}
                    />
                    <Bar dataKey="count" fill="#9A7B61" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 3 Core Editorial Findings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#EFE9DF]">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">CATALOG COMPOSITION</div>
                  <div className="text-xl font-serif font-medium text-[#201D1A] mt-1">70% Movies / 30% Series</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">Historical global additions ratio</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">PEAK RELEASE MONTHS</div>
                  <div className="text-xl font-serif font-medium text-[#7C5E47] mt-1">July & December</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">2.4x higher seasonal debut volume</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">COMMERCIAL INSIGHT</div>
                  <div className="text-xl font-serif font-medium text-[#201D1A] mt-1">+24% Regional Licensing</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">Recommended international allocation</div>
                </div>
              </div>
            </div>
          )}

          {/* UBER MODE */}
          {activeSignalMode === 'uber' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono-code text-[#9A7B61] uppercase tracking-wider">
                    DATASET // TEMPORAL RIDE CLUSTERS & SURGE VECTORS
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-medium mt-0.5">
                    Hourly Demand Waves & Rush-Hour Peaks
                  </h3>
                  <p className="text-xs text-[#7A7268] font-mono-code mt-1">
                    Spatial-temporal aggregation isolating driver allocation bottlenecks.
                  </p>
                </div>

                {/* Interactive Slider for Dynamic Simulation */}
                <div className="flex items-center gap-3 bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#E2D9CC] shadow-2xs self-start sm:self-auto">
                  <Sliders className="w-3.5 h-3.5 text-[#9A7B61]" />
                  <span className="text-xs font-mono-code text-[#4A443D]">Simulate Demand:</span>
                  <input
                    type="range"
                    min="0.6"
                    max="1.8"
                    step="0.1"
                    value={surgeMultiplier}
                    onChange={(e) => setSurgeMultiplier(parseFloat(e.target.value))}
                    className="w-24 accent-[#9A7B61] cursor-pointer"
                  />
                  <span className="text-xs font-mono-code font-semibold text-[#9A7B61]">
                    {surgeMultiplier}x
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-72 sm:h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={computedUberData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="uberWarmGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9A7B61" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#9A7B61" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#9C948A" fontSize={11} tickLine={false} />
                    <YAxis stroke="#9C948A" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#FAF8F5', borderColor: '#E2D9CC', borderRadius: '14px', fontSize: '12px', color: '#201D1A', boxShadow: '0 8px 24px rgba(36,33,30,0.08)' }}
                      itemStyle={{ color: '#9A7B61' }}
                    />
                    <Area type="monotone" dataKey="simulatedTrips" name="Simulated Hourly Trips" stroke="#9A7B61" strokeWidth={2.5} fillOpacity={1} fill="url(#uberWarmGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* 3 Core Analytical Findings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#EFE9DF]">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">MORNING COMMUTE SURGE</div>
                  <div className="text-xl font-serif font-medium text-[#201D1A] mt-1">08:00 – 09:30 AM</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">890 trips / hr base density</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">EVENING PEAK MULTIPLIER</div>
                  <div className="text-xl font-serif font-medium text-[#7C5E47] mt-1">05:30 PM (2.6x Surge)</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">1,060 trips / hr high-congestion index</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">DISPATCH REDUCTION IMPACT</div>
                  <div className="text-xl font-serif font-medium text-[#201D1A] mt-1">-22% Passenger Wait Time</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">Via predictive vehicle positioning</div>
                </div>
              </div>
            </div>
          )}

          {/* NLP MODE */}
          {activeSignalMode === 'nlp' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono-code text-[#9A7B61] uppercase tracking-wider">
                    DATASET // YOUTUBE TRANSCRIPT TOKEN EXTRACTION
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-medium mt-0.5">
                    Transcript Token Density vs. Synthesis Time
                  </h3>
                  <p className="text-xs text-[#7A7268] font-mono-code mt-1">
                    Hugging Face Transformers & Multimodal Gemini API Pipeline.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono-code text-[#201D1A] bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#E2D9CC] self-start sm:self-auto shadow-2xs">
                  <Cpu className="w-4 h-4 text-[#9A7B61]" />
                  <span>Compression Ratio: 91.2%</span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-72 sm:h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nlpCompressionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="durationMins" tickFormatter={(v) => `${v} min video`} stroke="#9C948A" fontSize={11} tickLine={false} />
                    <YAxis stroke="#9C948A" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#FAF8F5', borderColor: '#E2D9CC', borderRadius: '14px', fontSize: '12px', color: '#201D1A', boxShadow: '0 8px 24px rgba(36,33,30,0.08)' }}
                      itemStyle={{ color: '#9A7B61' }}
                    />
                    <Bar dataKey="rawTokens" name="Raw Transcript Tokens" fill="#D6C9B8" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="summaryTokens" name="Synthesized Summary Tokens" fill="#9A7B61" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 3 Core NLP Findings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#EFE9DF]">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">AVERAGE TIME SAVINGS</div>
                  <div className="text-xl font-serif font-medium text-[#201D1A] mt-1">75% Review Compression</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">Extracts takeaways in under 8s</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">SEMANTIC FIDELITY</div>
                  <div className="text-xl font-serif font-medium text-[#7C5E47] mt-1">94.8% Key Thesis Retention</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">Validated against human notes</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
                  <div className="text-[10.5px] font-mono-code text-[#9C948A]">DEPLOYED ARCHITECTURE</div>
                  <div className="text-xl font-serif font-medium text-[#201D1A] mt-1">FastAPI + Gemini LLM</div>
                  <div className="text-xs text-[#7A7268] mt-0.5">End-to-end transcript synthesis</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
