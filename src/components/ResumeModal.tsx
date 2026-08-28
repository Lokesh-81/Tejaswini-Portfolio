import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Download, GraduationCap, Briefcase } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  if (!isOpen) return null;

  const { personalInfo, education, experience, skillCategories } = data;

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
          aria-label="Close resume modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5] pr-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-medium">
              {personalInfo.name} — Curriculum Vitae
            </h2>
            <p className="text-xs font-mono-code text-[#7C5E47] mt-1 font-medium">
              {personalInfo.title} • {personalInfo.location}
            </p>
          </div>

          <a
            href={personalInfo.resumeUrl || '/Tejaswini_Pamula_Resume.pdf'}
            download="Tejaswini_Pamula_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF</span>
          </a>
        </div>

        {/* Resume Content Sections */}
        <div className="space-y-8">
          
          {/* Executive Summary */}
          <div className="p-6 rounded-2xl bg-white/80 border border-[#E7E0D5] space-y-2">
            <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider font-semibold">EXECUTIVE PROFILE</div>
            <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">{personalInfo.shortBio}</p>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider font-semibold">
              <Briefcase className="w-4 h-4" />
              <span>EXPERIENCE / INTERNSHIPS</span>
            </div>

            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="p-5 rounded-2xl bg-white/80 border border-[#E7E0D5] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-serif text-[#201D1A] font-medium">{exp.role} — <span className="text-[#7C5E47]">{exp.company}</span></h4>
                    <span className="text-xs font-mono-code text-[#9C948A]">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#6B645C]">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#9A7B61] mt-0.5">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION</span>
            </div>

            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="p-5 rounded-2xl bg-white/80 border border-[#E7E0D5] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="text-base font-serif text-[#201D1A] font-medium">{edu.degree} in {edu.field}</h4>
                      <p className="text-xs text-[#6B645C]">{edu.institution}</p>
                    </div>
                    <span className="text-xs font-mono-code text-[#201D1A] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#E2D9CC] font-semibold">{edu.cgpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Matrix Summary */}
          <div className="space-y-4">
            <div className="text-xs font-mono-code text-[#7A7268] uppercase font-semibold">TECHNICAL SKILLS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillCategories.map((cat) => (
                <div key={cat.categoryName} className="p-4 rounded-xl bg-white/70 border border-[#EAE4DB]">
                  <div className="text-xs font-serif text-[#201D1A] font-medium mb-1.5">{cat.categoryName}</div>
                  <div className="text-xs text-[#6B645C] flex flex-wrap gap-1 font-mono-code">
                    {cat.skills.map(s => s.name).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#E7E0D5] flex items-center justify-between">
          <span className="text-xs font-mono-code text-[#9C948A]">Contact: {personalInfo.email} • {personalInfo.phone}</span>
          <button onClick={onClose} className="text-xs font-medium text-[#7A7268] hover:text-[#201D1A] px-4 py-2 cursor-pointer">Close</button>
        </div>

      </div>
    </div>
  );
};

