import React from 'react';
import { ProjectItem } from '../types';
import { X, Github, ExternalLink, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#201D1A]/60 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] border border-[#E2D9CC] shadow-[0_25px_70px_rgba(36,33,30,0.25)] text-[#201D1A] p-6 sm:p-10 space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC] transition-colors z-20 cursor-pointer shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EFE6] text-[#7C5E47] border border-[#E7E0D5] text-xs font-mono-code">
            <div className="w-1.5 h-1.5 rounded-full bg-[#9A7B61]" />
            <span>{project.category}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-[#201D1A] font-medium tracking-tight">
            {project.title}
          </h2>

          <p className="text-sm sm:text-base font-medium text-[#7C5E47]">
            {project.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#F0EBE1] border border-[#E2D9CC] shadow-xs">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A]/30 via-transparent to-transparent opacity-50" />
        </div>

        {/* Overview & Problem / Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/80 border border-[#E7E0D5] space-y-2">
            <h4 className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider font-semibold">01 / PROBLEM STATEMENT</h4>
            <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">{project.problem || project.description}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 border border-[#E7E0D5] space-y-2">
            <h4 className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider font-semibold">02 / SOLUTION ARCHITECTURE</h4>
            <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">{project.solution || project.overview}</p>
          </div>
        </div>

        {/* Business Value & Key Results */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white/80 border border-[#E7E0D5] space-y-4">
          <h4 className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider font-semibold">03 / BUSINESS IMPACT & KEY OUTCOMES</h4>
          {project.businessValue && (
            <p className="text-sm font-serif italic text-[#201D1A]">{project.businessValue}</p>
          )}

          {project.results && project.results.length > 0 && (
            <ul className="space-y-2 pt-3 border-t border-[#EFE9DF]">
              {project.results.map((res, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#6B645C]">
                  <CheckCircle2 className="w-4 h-4 text-[#9A7B61] mt-0.5 flex-shrink-0" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <div className="text-xs font-mono-code text-[#7A7268] uppercase font-semibold">TECHNOLOGIES & PIPELINES USED</div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono-code bg-white text-[#4A443D] border border-[#E2D9CC]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E7E0D5]">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-[#201D1A] bg-white hover:bg-[#F4EFE6] border border-[#E2D9CC] transition-colors shadow-2xs"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] transition-colors shadow-xs"
              >
                <span>Live Interactive Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C4A482]" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-medium text-[#7A7268] hover:text-[#201D1A] cursor-pointer"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};

