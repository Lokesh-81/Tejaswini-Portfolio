import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExperienceItem } from '../../types';
import { Plus, Trash2, Edit3, Copy } from 'lucide-react';

export const ExperienceStudio: React.FC = () => {
  const { data, addExperience, updateExperience, deleteExperience, duplicateExperience } = usePortfolio();

  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const defaultNew: Omit<ExperienceItem, 'id'> = {
    role: '',
    company: '',
    location: 'India',
    period: '2025 – Present',
    responsibilities: ['Developed and deployed machine learning pipelines.'],
    techStack: ['Python', 'SQL', 'Machine Learning'],
    featured: true
  };

  const [formData, setFormData] = useState<Omit<ExperienceItem, 'id'>>(defaultNew);
  const [respInput, setRespInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const handleStartCreate = () => {
    setFormData(defaultNew);
    setRespInput(defaultNew.responsibilities.join('\n'));
    setTechInput(defaultNew.techStack.join(', '));
    setEditingItem(null);
    setIsCreatingNew(true);
  };

  const handleStartEdit = (exp: ExperienceItem) => {
    setEditingItem(exp);
    setFormData({
      role: exp.role,
      company: exp.company,
      location: exp.location,
      period: exp.period,
      responsibilities: exp.responsibilities,
      techStack: exp.techStack,
      featured: exp.featured
    });
    setRespInput(exp.responsibilities.join('\n'));
    setTechInput(exp.techStack.join(', '));
    setIsCreatingNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      responsibilities: respInput.split('\n').map(r => r.trim()).filter(Boolean),
      techStack: techInput.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingItem) {
      await updateExperience(editingItem.id, payload);
    } else {
      await addExperience(payload);
    }

    setEditingItem(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            03 / PROFESSIONAL TIMELINE STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Work Experience & Internships
          </h2>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C4A482]" />
          <span>New Experience Entry</span>
        </button>
      </div>

      {/* Editor Modal */}
      {(isCreatingNew || editingItem) && (
        <div className="p-8 rounded-3xl bg-white border border-[#C4A482] shadow-[0_15px_35px_rgba(36,33,30,0.08)] space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D5]">
            <h3 className="text-lg font-serif text-[#201D1A] font-medium">
              {editingItem ? `Edit: ${editingItem.role}` : 'Add Experience Entry'}
            </h3>
            <button
              onClick={() => { setEditingItem(null); setIsCreatingNew(false); }}
              className="text-xs text-[#6B645C] hover:text-[#201D1A] px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E2D9CC]"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">ROLE / POSITION *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Data Science Intern"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">COMPANY / ORGANIZATION *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. RP2, Bangalore"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">PERIOD / DURATION *</label>
                <input
                  type="text"
                  required
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="e.g. Aug 2025 – Present"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">LOCATION</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bangalore, India"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268]">KEY RESPONSIBILITIES (One per line)</label>
              <textarea
                rows={4}
                value={respInput}
                onChange={(e) => setRespInput(e.target.value)}
                placeholder="Developed ML models&#10;Collaborated with engineering team"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268]">TECH STACK (Comma Separated)</label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Python, SQL, NLP, Machine Learning"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E0D5]">
              <button
                type="button"
                onClick={() => { setEditingItem(null); setIsCreatingNew(false); }}
                className="px-5 py-2 rounded-xl text-xs font-medium text-[#6B645C] hover:text-[#201D1A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {data.experience.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-3xl bg-white/80 border border-[#E7E0D5] hover:border-[#C4A482] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-serif text-[#201D1A] font-medium">{exp.role}</h4>
                <span className="text-xs font-serif text-[#7C5E47]">@ {exp.company}</span>
              </div>
              <div className="text-xs font-mono-code text-[#9C948A] mt-1">{exp.period} • {exp.location}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => duplicateExperience(exp.id)}
                className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC] cursor-pointer"
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStartEdit(exp)}
                className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#7C5E47] hover:text-[#201D1A] border border-[#E2D9CC] cursor-pointer"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteExperience(exp.id)}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

