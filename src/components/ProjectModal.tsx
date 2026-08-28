import React from 'react';
import { ProjectItem } from '../types';
import { X, Github, ExternalLink, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ProjectVisualCard } from './ProjectVisualCard';

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

        {/* Project Analytical Visual Card Component */}
        <div className="relative rounded-2xl overflow-hidden shadow-xs">
          <ProjectVisualCard
            projectId={project.id}
            title={project.title}
            category={project.category}
          />
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

        {/* Key Measurable Outcomes */}
        {project.results && project.results.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider font-semibold">
              03 / MEASURABLE IMPACT & RESULTS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.results.map((res, i) => (
                <div key={i} className="flex items-start gap-2.5 p-4 rounded-xl bg-white border border-[#E7E0D5]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#4A443D]">{res}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies / Tools Matrix */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider font-semibold">
            04 / INSTRUMENTS & PIPELINES
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <span 
                key={idx}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono-code bg-[#FAF8F5] text-[#201D1A] border border-[#E2D9CC]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-[#E7E0D5]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-[#201D1A] bg-white hover:bg-[#F4EFE6] border border-[#E2D9CC] shadow-2xs transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9A7B61]" />
            </a>
          )}

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#C4A482]" />
              <span>Live Application</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
