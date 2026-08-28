import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Award, MapPin, Feather, FileSpreadsheet, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, education, achievements } = data;

  return (
    <section id="about" className="pt-10 sm:pt-14 pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 pb-6 border-b border-[#E7E0D5]">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>FIELD JOURNAL // OBSERVATIONS & CONTEXT</span>
          </div>
          <h2 className="display-section text-[#201D1A] font-serif font-normal tracking-tight">
            The Human Behind the Hypotheses
          </h2>
        </div>

        {/* Asymmetric Field Journal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Tactile Archival Portrait & Layered Study Notes */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Layered Archival Portrait Card */}
            <div className="relative group">
              {/* Backing paper depth layer */}
              <div className="absolute -inset-2 rounded-3xl bg-[#EAE3D6]/70 transform -rotate-1 transition-transform group-hover:-rotate-2 duration-500 pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#E2D9CC] aspect-[4/5] shadow-[0_12px_40px_rgba(36,33,30,0.06)]">
                <img
                  src={personalInfo.profilePhoto}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103 filter contrast-[1.02]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A]/80 via-transparent to-transparent opacity-90" />
                
                {/* Paper Corner Stamp */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E2D9CC] text-[10px] font-mono-code text-[#201D1A] shadow-2xs">
                  ARCHIVE REF // TP-2026
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-2xl font-serif text-white font-medium">{personalInfo.name}</div>
                  <div className="text-xs text-[#EAE4DB] font-mono-code mt-0.5">{personalInfo.title}</div>
                  <div className="flex items-center gap-1.5 text-xs text-[#D6C9B8] mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C4A482]" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Handwritten Marginalia Note */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB] relative shadow-2xs">
              <div className="font-handwriting text-2xl text-[#9A7B61] leading-relaxed">
                "The outliers are never just noise — they are where the real human story begins."
              </div>
              <div className="text-[10px] font-mono-code text-[#9C948A] mt-2 uppercase tracking-wider">
                — Marginalia from exploratory notebook
              </div>
            </div>

            {/* Core Analytical Principles */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/90 border border-[#E7E0D5] shadow-2xs space-y-4">
              <div className="text-[11px] font-mono-code text-[#9A7B61] font-semibold tracking-wider uppercase flex items-center gap-2">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>FOUR PILLARS OF MY PRACTICE</span>
              </div>
              
              <div className="space-y-3 text-xs text-[#4A443D]">
                <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#EFE9DF]">
                  <span className="text-[#9A7B61] font-mono-code font-bold mt-0.5">01</span>
                  <div>
                    <strong className="text-[#201D1A] block mb-0.5">Context Precedes Computation:</strong>
                    <span>Raw rows are meaningless without understanding the human behavior that generated them.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#EFE9DF]">
                  <span className="text-[#9A7B61] font-mono-code font-bold mt-0.5">02</span>
                  <div>
                    <strong className="text-[#201D1A] block mb-0.5">Exploratory Visual Rigor:</strong>
                    <span>Extensive visual data profiling before training complex algorithmic architectures.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#EFE9DF]">
                  <span className="text-[#9A7B61] font-mono-code font-bold mt-0.5">03</span>
                  <div>
                    <strong className="text-[#201D1A] block mb-0.5">Cognitive AI Synthesis:</strong>
                    <span>Coupling classical statistics with generative transformers for real-time extraction.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-[#9A7B61] font-mono-code font-bold mt-0.5">04</span>
                  <div>
                    <strong className="text-[#201D1A] block mb-0.5">Actionable Decision Impact:</strong>
                    <span>Delivering insights that optimize fleet dispatches, content catalogs, and traffic flow.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Prose & Academic Record */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Story Bio */}
            <div className="space-y-6 text-[#4A443D] leading-relaxed">
              <p className="text-xl sm:text-2xl font-serif italic text-[#201D1A] leading-snug">
                "{personalInfo.tagline}"
              </p>
              
              <p className="text-[#6B645C] text-sm sm:text-base leading-relaxed drop-cap">
                {personalInfo.shortBio}
              </p>
              
              <p className="text-[#6B645C] text-sm sm:text-base leading-relaxed">
                {personalInfo.fullBio}
              </p>
            </div>

            {/* Academic Foundation Dossier */}
            <div className="pt-8 border-t border-[#E7E0D5]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-6 font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION // SVECW BHIMAVARAM</span>
              </div>

              {education.map((edu) => (
                <div key={edu.id} className="p-7 rounded-3xl bg-white/85 border border-[#E7E0D5] shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xl font-serif text-[#201D1A] font-medium">{edu.degree}</h4>
                      <p className="text-xs font-medium text-[#7C5E47] font-mono-code mt-0.5">{edu.field}</p>
                    </div>
                    <div className="sm:text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-code bg-[#FAF8F5] text-[#201D1A] border border-[#E2D9CC] font-semibold">
                        {edu.cgpa}
                      </span>
                      <div className="text-[11px] text-[#9C948A] font-mono-code mt-1">{edu.period}</div>
                    </div>
                  </div>

                  <div className="text-xs text-[#6B645C] font-medium">{edu.institution}</div>

                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="space-y-2 text-xs text-[#6B645C] pt-3 border-t border-[#EFE9DF]">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[#9A7B61] mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Leadership & Research Observations */}
            {achievements && achievements.length > 0 && (
              <div className="pt-8 border-t border-[#E7E0D5]">
                <div className="flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-6 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>RESEARCH INITIATIVES & CAMPUS LEADERSHIP</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((ach) => (
                    <div key={ach.id} className="p-5 rounded-2xl bg-white/80 border border-[#EAE4DB] hover:border-[#C4A482] transition-colors">
                      <div className="flex items-center justify-between text-[11px] font-mono-code text-[#9A7B61] mb-1.5 font-medium">
                        <span>{ach.category}</span>
                        <span className="text-[#9C948A]">{ach.year}</span>
                      </div>
                      <h5 className="text-sm font-serif font-medium text-[#201D1A] mb-1">{ach.title}</h5>
                      <p className="text-xs text-[#6B645C] leading-relaxed">{ach.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
