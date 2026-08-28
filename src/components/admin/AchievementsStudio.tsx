import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AchievementItem } from '../../types';
import { Trophy, Plus, Trash2, Edit3, Copy, Award, Star, Check, Sparkles } from 'lucide-react';

export const AchievementsStudio: React.FC = () => {
  const { data, addAchievement, updateAchievement, deleteAchievement, duplicateAchievement } = usePortfolio();

  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const defaultNew: Omit<AchievementItem, 'id'> = {
    title: '',
    category: 'Leadership',
    organization: '',
    description: '',
    year: '2025'
  };

  const [formData, setFormData] = useState<Omit<AchievementItem, 'id'>>(defaultNew);

  const handleStartCreate = () => {
    setFormData(defaultNew);
    setEditingItem(null);
    setIsCreatingNew(true);
  };

  const handleStartEdit = (item: AchievementItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      organization: item.organization || '',
      description: item.description,
      year: item.year
    });
    setIsCreatingNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      await updateAchievement(editingItem.id, formData);
    } else {
      await addAchievement(formData);
    }
    setEditingItem(null);
    setIsCreatingNew(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteAchievement(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            12 / RECOGNITIONS & LEADERSHIP STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Accolades, Honors & Leadership
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono-code text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Saved to Cloud</span>
            </span>
          )}
          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C4A482]" />
            <span>Add Recognition</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Inline Form */}
      {(isCreatingNew || editingItem) && (
        <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-[#E7E0D5] shadow-lg space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D5]">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#9A7B61]" />
              <h3 className="text-lg font-serif text-[#201D1A] font-medium">
                {editingItem ? `Edit: ${editingItem.title}` : 'Add New Accolade or Honor'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => { setEditingItem(null); setIsCreatingNew(false); }}
              className="text-xs font-mono-code text-[#9C948A] hover:text-[#201D1A] cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono-code text-[#6B645C]">TITLE / MILESTONE NAME *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Eco-Friendly Association Coordinator or AI Research Lead"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">CATEGORY *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none cursor-pointer"
              >
                <option value="Leadership">Leadership & Service</option>
                <option value="Research">Research & Innovation</option>
                <option value="Workshops">Workshops & Speaking</option>
                <option value="Environmental">Environmental & Community</option>
                <option value="Academic">Academic Excellence</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">YEAR / PERIOD *</label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g. 2024 – 2025"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono-code text-[#6B645C]">ORGANIZATION / INSTITUTION</label>
              <input
                type="text"
                value={formData.organization || ''}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Shri Vishnu Engineering College for Women"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono-code text-[#6B645C]">DESCRIPTION & IMPACT *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Summarize key leadership achievements, student mobilization, research outcomes..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E7E0D5]">
            <button
              type="button"
              onClick={() => { setEditingItem(null); setIsCreatingNew(false); }}
              className="px-5 py-2 rounded-full text-xs font-medium text-[#6B645C] hover:bg-[#FAF8F5] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{editingItem ? 'Save Milestone' : 'Publish Recognition'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Accolades List */}
      <div className="space-y-4">
        <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider">
          LIVE RECOGNITIONS ({data.achievements.length})
        </div>

        {data.achievements.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-[#E7E0D5] text-center space-y-3">
            <Trophy className="w-8 h-8 text-[#9A7B61] mx-auto" />
            <div className="text-base font-serif text-[#201D1A]">No recognitions recorded yet</div>
            <p className="text-xs text-[#6B645C] max-w-sm mx-auto">
              Click &quot;Add Recognition&quot; above to publish honors, leadership roles, or research milestones.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.achievements.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-[#E7E0D5] hover:border-[#C4A482] shadow-2xs transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61]">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#7C5E47] border border-[#E7E0D5]">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono-code text-[#9C948A]">{item.year}</span>
                  </div>

                  <div>
                    <h4 className="text-base font-serif text-[#201D1A] font-medium leading-snug">
                      {item.title}
                    </h4>
                    {item.organization && (
                      <div className="text-xs font-mono-code text-[#7C5E47] mt-0.5">
                        {item.organization}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[#6B645C] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE9DF] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-[#9C948A]">
                    <Star className="w-3.5 h-3.5 text-[#9A7B61]" />
                    <span>Live Milestone</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => duplicateAchievement(item.id)}
                      className="p-2 rounded-xl text-[#7A7268] hover:text-[#201D1A] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="p-2 rounded-xl text-[#7A7268] hover:text-[#201D1A] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
