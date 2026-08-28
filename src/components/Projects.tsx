import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { ArrowUpRight, Github, FolderGit2, Sparkles, Database, HelpCircle, Lightbulb, Wrench, Search, Eye, FileText, Layers } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

interface InvestigationMeta {
  caseId: string;
  tagline: string;
  datasetScope: string;
  inquiryQuestion: string;
  discoveredInsight: string;
  instruments: string[];
}

const investigationsData: Record<string, InvestigationMeta> = {
  'proj-1': {
    caseId: 'INV-01 // NETFLIX CATALOG',
    tagline: 'Finding patterns in what the world watches after dark.',
    datasetScope: '8,807 global titles · 6,131 movies · 2,676 TV series (1925–2021)',
    inquiryQuestion: 'How does global platform expansion reshape the balance between cinematic feature films and episodic serials?',
    discoveredInsight: 'Dramas represent 36.1% of all additions, with July and December exhibiting 2.4x higher seasonal release surges.',
    instruments: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'EDA Profiling']
  },
  'proj-2': {
    caseId: 'INV-02 // UBER URBAN MOBILITY',
    tagline: 'Reading the spatial rhythm of a city in motion.',
    datasetScope: 'Multi-borough trip records indexed by timestamp, pickup coordinates, and surge multipliers',
    inquiryQuestion: 'Where and when do driver dispatch mismatches trigger extreme price surges and passenger abandonment?',
    discoveredInsight: 'Evening rush at 17:00 hits a 2.6x demand spike; predictive fleet relocation cuts wait times by 22%.',
    instruments: ['Python', 'Spatial-Temporal Clustering', 'Seaborn', 'Time-Series Aggregation']
  },
  'proj-3': {
    caseId: 'INV-03 // COGNITIVE NLP SUMMARIZER',
    tagline: 'Distilling hours of spoken monologue into pure semantic signal.',
    datasetScope: 'Continuous unstructured transcript tokens from video lectures, keynotes, and podcasts',
    inquiryQuestion: 'Can multimodal transformers accurately extract structured executive takeaways from 2-hour lectures in seconds?',
    discoveredInsight: 'Abstractive chunking preserves 94% of core thesis points while reducing content consumption time by 75%.',
    instruments: ['Python', 'Hugging Face Transformers', 'Gemini AI', 'YouTube Transcript API']
  },
  'proj-4': {
    caseId: 'INV-04 // ADAPTIVE TRAFFIC SIGNALING',
    tagline: 'Replacing rigid fixed timers with responsive urban intelligence.',
    datasetScope: 'Real-time intersection optical frames and vehicle density bounding contours',
    inquiryQuestion: 'How do dynamic green-light calculations alleviate junction idling and create emergency corridors?',
    discoveredInsight: 'Adaptive density signaling reduces congestion by 35% and grants instant priority to emergency responders.',
    instruments: ['Python', 'OpenCV', 'Computer Vision', 'IoT Density Algorithms']
  }
};

export const Projects: React.FC = () => {
  const { data, setSelectedProjectModal } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Data Analytics', 'NLP / GenAI', 'IoT & AI'];

  const filteredProjects = activeFilter === 'All'
    ? data.projects
    : data.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24 pb-8 border-b border-[#E7E0D5]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-3">
              <Search className="w-3.5 h-3.5" />
              <span>THE CASE FILES // INQUIRIES & INVESTIGATIONS</span>
            </div>
            <h2 className="display-section text-[#201D1A] font-serif font-normal tracking-tight">
              Selected Works & Discoveries
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-full border border-[#E2D9CC] shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#201D1A] text-white font-medium shadow-xs'
                    : 'text-[#6B645C] hover:text-[#201D1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Investigative Dossiers with Restrained Editorial Variations */}
        <div className="space-y-32">
          {filteredProjects.map((project, index) => {
            const meta = investigationsData[project.id] || {
              caseId: `INV-${String(index + 1).padStart(2, '0')} // ${project.title.toUpperCase()}`,
              tagline: project.subtitle,
              datasetScope: project.overview || 'Exploratory dataset records',
              inquiryQuestion: project.problem || project.description,
              discoveredInsight: project.businessValue || 'High-impact predictive insight extracted from model.',
              instruments: project.technologies
            };

            const isAlternate = index % 2 === 1;

            return (
              <TiltCard3D
                key={project.id}
                id={`investigation-case-${project.id}`}
                maxAngle={7}
                scaleOnHover={1.015}
                glareOpacity={0.2}
              >
                <article
                  className="group relative rounded-3xl bg-white/95 border border-[#E7E0D5] hover:border-[#C4A482] p-8 sm:p-12 lg:p-14 shadow-[0_6px_32px_rgba(36,33,30,0.03)] hover:shadow-[0_24px_54px_rgba(36,33,30,0.08)] transition-all duration-500 overflow-hidden"
                >
                  {/* Case Badge & Top Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EAE4DB]">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[#FAF8F5] text-[#201D1A] border border-[#E2D9CC] font-semibold">
                        {meta.caseId}
                      </span>
                      <span className="text-xs font-mono-code text-[#9A7B61] font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    
                    <div className="text-[11px] font-mono-code text-[#9C948A] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B61]" />
                      <span>CASE FILE // COMPLETE</span>
                    </div>
                  </div>

                  {/* Main Asymmetric Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Dominant Editorial Image Canvas with 3D Pop */}
                    <div className={`lg:col-span-6 relative ${isAlternate ? 'lg:order-2' : 'lg:order-1'}`} style={{ transform: 'translateZ(30px)' }}>
                      <div
                        onClick={() => setSelectedProjectModal(project)}
                        className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#F0EBE1] border border-[#E2D9CC] group-hover:border-[#C4A482] transition-all cursor-pointer shadow-sm group-hover:shadow-md"
                      >
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 filter contrast-[1.02]"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Gentle Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A]/50 via-transparent to-transparent opacity-75" />

                        {/* Interactive Inspect Hover Banner */}
                        <div className="absolute inset-0 bg-[#201D1A]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="px-5 py-2.5 rounded-full bg-white text-[#201D1A] text-xs font-medium shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5 text-[#9A7B61]" />
                            <span>Open Research Dossier</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Investigation Story Breakdown (Dataset, Question, Tools, Insight) */}
                    <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 ${isAlternate ? 'lg:order-1' : 'lg:order-2'}`} style={{ transform: 'translateZ(15px)' }}>
                      
                      {/* Poetic Title & Headline */}
                      <div>
                        <h3 className="text-3xl sm:text-4xl font-serif text-[#201D1A] font-normal leading-[1.08] group-hover:text-[#9A7B61] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base font-serif italic text-[#7C5E47] mt-1.5">
                          "{meta.tagline}"
                        </p>
                      </div>

                      {/* The 4 Core Investigative Pillars */}
                      <div className="space-y-3.5 pt-1 text-xs">
                        
                        {/* Dataset Scope */}
                        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB] space-y-1">
                          <div className="text-[10.5px] font-mono-code text-[#9A7B61] uppercase font-semibold flex items-center gap-1.5">
                            <Database className="w-3 h-3" />
                            <span>DATASET SCOPE</span>
                          </div>
                          <p className="text-[#4A443D] leading-relaxed font-mono-code text-[11.5px]">
                            {meta.datasetScope}
                          </p>
                        </div>

                        {/* The Question */}
                        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB] space-y-1">
                          <div className="text-[10.5px] font-mono-code text-[#9A7B61] uppercase font-semibold flex items-center gap-1.5">
                            <HelpCircle className="w-3 h-3" />
                            <span>THE INQUIRY</span>
                          </div>
                          <p className="text-[#4A443D] leading-relaxed">
                            {meta.inquiryQuestion}
                          </p>
                        </div>

                        {/* The Insight */}
                        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB] space-y-1">
                          <div className="text-[10.5px] font-mono-code text-[#7C5E47] uppercase font-semibold flex items-center gap-1.5">
                            <Lightbulb className="w-3 h-3 text-[#9A7B61]" />
                            <span>THE DISCOVERED PATTERN & IMPACT</span>
                          </div>
                          <p className="font-serif italic text-sm text-[#201D1A] leading-relaxed">
                            "{meta.discoveredInsight}"
                          </p>
                        </div>

                      </div>

                      {/* Instruments & Action Triggers */}
                      <div className="space-y-4 pt-2 border-t border-[#EFE9DF]">
                        <div className="flex flex-wrap gap-1.5">
                          {meta.instruments.map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono-code bg-[#FAF8F5] text-[#4A443D] border border-[#E2D9CC]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          <button
                            onClick={() => setSelectedProjectModal(project)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-xs transition-all cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#C4A482]" />
                            <span>Examine Full Case File</span>
                          </button>

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 rounded-full text-[#6B645C] hover:text-[#201D1A] bg-[#FAF8F5] hover:bg-white border border-[#E2D9CC] transition-colors"
                              title="Inspect Code Repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </article>
              </TiltCard3D>
            );
          })}
        </div>

      </div>
    </section>
  );
};
