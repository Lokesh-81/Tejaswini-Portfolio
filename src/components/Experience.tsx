import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Compass, Briefcase, MapPin, Award, ArrowRight, Radio, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface MilestoneData {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  premise: string;
  deliverables: string[];
  technologies: string[];
  impactMetric: string;
}

const milestones: MilestoneData[] = [
  {
    id: 'exp-1',
    year: '2025 – Present',
    period: 'Aug 2025 – Present',
    role: 'Data Science Intern',
    company: 'RP2',
    location: 'Bangalore, India',
    premise: 'Production deployment of Machine Learning models, Deep Learning architectures, and Generative AI pipelines.',
    deliverables: [
      'Developed and deployed predictive Machine Learning models for commercial operational forecasting.',
      'Constructed Natural Language Processing (NLP) tokenization loops and multimodal AI modules.',
      'Collaborated with cross-functional analytics teams to translate unstructured datasets into executive decisions.'
    ],
    technologies: ['Python', 'Generative AI', 'NLP', 'Machine Learning', 'Deep Learning', 'Business Analytics'],
    impactMetric: 'Streamlined data interpretation latency and deployed scalable ML inference pipelines.'
  },
  {
    id: 'exp-2',
    year: '2024',
    period: 'Jul 2024 – Sep 2024',
    role: 'Data Science Intern',
    company: '1 Stop',
    location: 'India',
    premise: 'Exploratory data pipelines, feature engineering, and statistical modeling across high-variance datasets.',
    deliverables: [
      'Executed thorough data profiling, missing value imputations, and outlier detection routines.',
      'Built supervised classification models and evaluated ROC-AUC curves for predictive accuracy.',
      'Visualized multi-dimensional distributions using Matplotlib and Seaborn dashboards.'
    ],
    technologies: ['Python', 'EDA', 'Data Cleaning', 'Data Visualization', 'Machine Learning', 'Deep Learning'],
    impactMetric: 'Delivered cleaned feature sets and boosted model validation baseline accuracy.'
  },
  {
    id: 'exp-3',
    year: '2023',
    period: 'Jun 2023 – Aug 2023',
    role: 'Data Science Intern',
    company: 'SkillHacc',
    location: 'India',
    premise: 'Predictive analytics, statistical regression modeling, and dataset preprocessing.',
    deliverables: [
      'Engineered machine learning pipelines for predictive time-series and correlation analysis.',
      'Formulated statistical hypotheses to evaluate feature importance across tabular datasets.',
      'Presented findings and visual summaries to engineering mentors.'
    ],
    technologies: ['Predictive Analytics', 'Machine Learning', 'Data Preprocessing', 'Statistical Modeling', 'Python'],
    impactMetric: 'Extracted key predictive factors and accelerated model training velocity.'
  },
  {
    id: 'edu-foundation',
    year: '2021 – 2025',
    period: 'B.Tech in Computer Science',
    role: 'Computer Science Scholar & Lead Coordinator',
    company: 'SVECW Bhimavaram',
    location: 'Andhra Pradesh, India',
    premise: 'Rigorous algorithmic foundation, statistics, database management, and eco-sustainability leadership.',
    deliverables: [
      'Maintained a 7.43 CGPA across advanced computing, algorithms, probability, and database architectures.',
      'Spearheaded sustainability campaigns and technical workshops as Lead Eco-Friendly Association Coordinator.',
      'Conducted peer learning sessions on Python, SQL, and practical machine learning fundamentals.'
    ],
    technologies: ['Data Structures', 'Algorithms', 'SQL', 'DBMS', 'Leadership', 'Sustainability'],
    impactMetric: '7.43 CGPA · 500+ student community impact · National workshop organizer.'
  }
];

export const Experience: React.FC = () => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('exp-1');

  const selectedMilestone = milestones.find((m) => m.id === selectedMilestoneId) || milestones[0];

  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 pb-8 border-b border-[#E7E0D5]">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>THE SIGNAL TRAIL // CHRONOLOGY OF APPLIED PRACTICE</span>
          </div>
          <h2 className="display-section text-[#201D1A] font-serif font-normal tracking-tight">
            A Journey Traced Across Time
          </h2>
        </div>

        {/* The Flowing Signal Path & Interactive Milestones */}
        <div className="space-y-12">
          
          {/* Signal Trail Navigation Ribbon (Flowing SVG Path) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#E7E0D5] shadow-[0_8px_30px_rgba(36,33,30,0.03)] relative overflow-hidden">
            <div className="text-[10.5px] font-mono-code text-[#9C948A] uppercase mb-6 flex items-center justify-between">
              <span>FLOWING TIMELINE // SELECT MILESTONE BEACON</span>
              <span className="text-[#9A7B61] font-semibold">STATUS: 4 SIGNAL NODES RECORDED</span>
            </div>

            {/* Visual Wave Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {milestones.map((m, idx) => {
                const isSelected = selectedMilestoneId === m.id;

                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMilestoneId(m.id)}
                    className={`p-5 rounded-2xl text-left transition-all duration-300 relative cursor-pointer border ${
                      isSelected
                        ? 'bg-[#201D1A] text-white border-[#201D1A] shadow-[0_12px_28px_rgba(32,29,26,0.18)] transform -translate-y-1'
                        : 'bg-[#FAF8F5] text-[#4A443D] border-[#E2D9CC] hover:border-[#9A7B61] hover:bg-white'
                    }`}
                  >
                    {/* Node Bead Indicator */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[11px] font-mono-code ${isSelected ? 'text-[#C4A482]' : 'text-[#9A7B61]'}`}>
                        STAGE 0{idx + 1}
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected ? 'bg-[#C4A482] animate-pulse' : 'bg-[#D6C9B8]'
                        }`}
                      />
                    </div>

                    <div className={`text-xl font-serif font-medium ${isSelected ? 'text-white' : 'text-[#201D1A]'}`}>
                      {m.year}
                    </div>

                    <div className={`text-xs font-medium mt-1 truncate ${isSelected ? 'text-[#EAE4DB]' : 'text-[#7C5E47]'}`}>
                      {m.company}
                    </div>

                    <div className={`text-[11px] mt-0.5 truncate ${isSelected ? 'text-[#B8AEA2]' : 'text-[#7A7268]'}`}>
                      {m.role}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Milestone Archival Dispatch Frame */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white/95 border border-[#E7E0D5] shadow-[0_15px_45px_rgba(36,33,30,0.04)] space-y-8 animate-in fade-in duration-300">
            
            {/* Header / Meta */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#EAE4DB]">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] font-semibold uppercase mb-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>SIGNAL LOG // {selectedMilestone.period}</span>
                </div>
                <h3 className="text-3xl font-serif text-[#201D1A] font-medium">
                  {selectedMilestone.role}
                </h3>
                <div className="flex items-center gap-2 text-sm font-medium text-[#7C5E47] mt-1">
                  <span>{selectedMilestone.company}</span>
                  <span className="text-[#D6C9B8]">•</span>
                  <span className="text-xs font-normal text-[#6B645C] flex items-center gap-1 font-mono-code">
                    <MapPin className="w-3.5 h-3.5 text-[#9A7B61]" />
                    {selectedMilestone.location}
                  </span>
                </div>
              </div>

              {/* Impact Metric Ribbon */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] max-w-sm">
                <div className="text-[10.5px] font-mono-code text-[#9A7B61] uppercase font-semibold">
                  TANGIBLE VALUE DELIVERED
                </div>
                <div className="text-xs font-serif italic text-[#201D1A] mt-1 leading-relaxed">
                  "{selectedMilestone.impactMetric}"
                </div>
              </div>
            </div>

            {/* Analytical Premise & Focus */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono-code text-[#9C948A] uppercase tracking-wider">
                CORE INVESTIGATIVE SCOPE
              </div>
              <p className="text-base text-[#4A443D] leading-relaxed font-serif">
                {selectedMilestone.premise}
              </p>
            </div>

            {/* Deliverables / Applied Exploration */}
            <div className="space-y-3 pt-2">
              <div className="text-[11px] font-mono-code text-[#4A443D] uppercase font-semibold">
                APPLIED DISPATCHES & CONTRIBUTIONS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {selectedMilestone.deliverables.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB] space-y-1 text-xs text-[#4A443D] leading-relaxed">
                    <div className="text-[#9A7B61] font-mono-code font-bold">0{idx + 1}</div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Applied Tech Stack */}
            <div className="space-y-2 pt-4 border-t border-[#EFE9DF]">
              <div className="text-[10.5px] font-mono-code text-[#9C948A] uppercase font-semibold">
                APPLIED STACK & METHODS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedMilestone.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono-code bg-[#FAF8F5] text-[#4A443D] border border-[#E2D9CC]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
