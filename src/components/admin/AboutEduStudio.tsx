import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Check, Sparkles, UserCheck } from 'lucide-react';

export const AboutEduStudio: React.FC = () => {
  const { data, updatePersonalInfo, addEducation, deleteEducation } = usePortfolio();

  const [personalInfo, setPersonalInfo] = useState(data.personalInfo);
  const [newDegree, setNewDegree] = useState({ degree: '', field: '', institution: '', period: '', cgpa: '' });
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveBio = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePersonalInfo(personalInfo);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDegree.degree || !newDegree.institution) return;
    await addEducation({
      ...newDegree,
      highlights: ['Specialized coursework & hands-on practical project labs']
    });
    setNewDegree({ degree: '', field: '', institution: '', period: '', cgpa: '' });
    setShowAddEdu(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            08 / BIOGRAPHY & EDUCATION STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Editorial Biography & Narrative
          </h2>
        </div>

        <button
          onClick={handleSaveBio}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-[#C4A482]" />}
          <span>{savedSuccess ? 'Changes Saved to Cloud!' : 'Save Biography to Cloud'}</span>
        </button>
      </div>

      {/* Narrative & Profile Editor Form */}
      <form onSubmit={handleSaveBio} className="p-8 rounded-3xl bg-white border border-[#E7E0D5] space-y-6 shadow-2xs">
        <h3 className="text-lg font-serif text-[#201D1A] font-medium pb-3 border-b border-[#E7E0D5]">
          Personal Profile & Narrative
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">FULL NAME *</label>
            <input
              type="text"
              required
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">PROFESSIONAL TITLE *</label>
            <input
              type="text"
              required
              value={personalInfo.title}
              onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>
        </div>

        {/* Visual Notice */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB] flex items-center justify-between text-xs text-[#524B43]">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#9A7B61]" />
            <span>Profile Visual: Rendered natively via code-based archival identity card</span>
          </div>
          <span className="text-[11px] font-mono-code text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Vector Component
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">LOCATION</label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">HERO TAGLINE</label>
            <input
              type="text"
              value={personalInfo.tagline}
              onChange={(e) => setPersonalInfo({ ...personalInfo, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono-code text-[#6B645C]">SHORT BIO (Hero & Overview)</label>
          <textarea
            rows={3}
            value={personalInfo.shortBio}
            onChange={(e) => setPersonalInfo({ ...personalInfo, shortBio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono-code text-[#6B645C]">FULL EDITORIAL BIO</label>
          <textarea
            rows={4}
            value={personalInfo.fullBio}
            onChange={(e) => setPersonalInfo({ ...personalInfo, fullBio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
          />
        </div>
      </form>

      {/* Education Manager */}
      <div className="p-8 rounded-3xl bg-white border border-[#E7E0D5] space-y-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D5]">
          <h3 className="text-lg font-serif text-[#201D1A] font-medium">
            Academic Foundation & Degrees
          </h3>
          <button
            onClick={() => setShowAddEdu(!showAddEdu)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#C4A482]" />
            <span>Add Degree</span>
          </button>
        </div>

        {showAddEdu && (
          <form onSubmit={handleAddEdu} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#C4A482] space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono-code text-[#6B645C] block mb-1">DEGREE *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech in Artificial Intelligence & Data Science"
                  value={newDegree.degree}
                  onChange={(e) => setNewDegree({ ...newDegree, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A]"
                />
              </div>
              <div>
                <label className="text-xs font-mono-code text-[#6B645C] block mb-1">INSTITUTION *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shri Vishnu Engineering College for Women"
                  value={newDegree.institution}
                  onChange={(e) => setNewDegree({ ...newDegree, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono-code text-[#6B645C] block mb-1">PERIOD</label>
                <input
                  type="text"
                  placeholder="e.g. 2021 – 2025"
                  value={newDegree.period}
                  onChange={(e) => setNewDegree({ ...newDegree, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A]"
                />
              </div>
              <div>
                <label className="text-xs font-mono-code text-[#6B645C] block mb-1">FIELD OF STUDY</label>
                <input
                  type="text"
                  placeholder="e.g. AI & Data Science"
                  value={newDegree.field}
                  onChange={(e) => setNewDegree({ ...newDegree, field: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A]"
                />
              </div>
              <div>
                <label className="text-xs font-mono-code text-[#6B645C] block mb-1">CGPA / SCORE</label>
                <input
                  type="text"
                  placeholder="e.g. 8.77 / 10.0"
                  value={newDegree.cgpa}
                  onChange={(e) => setNewDegree({ ...newDegree, cgpa: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D9CC] text-xs text-[#201D1A]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddEdu(false)}
                className="px-4 py-1.5 text-xs text-[#6B645C] hover:text-[#201D1A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C]"
              >
                Save Degree
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {data.education.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="text-sm font-serif text-[#201D1A] font-medium">{edu.degree}</div>
                <div className="text-xs text-[#6B645C] mt-0.5">{edu.institution} • {edu.period}</div>
                <div className="text-[11px] font-mono-code text-[#9A7B61] mt-1">CGPA: {edu.cgpa}</div>
              </div>

              <button
                onClick={() => deleteEducation(edu.id)}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer self-end sm:self-auto"
                title="Delete Degree"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
