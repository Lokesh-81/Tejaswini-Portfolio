import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Check, Sparkles } from 'lucide-react';

export const SkillsStudio: React.FC = () => {
  const { data, updateSkills } = usePortfolio();
  
  const [categories, setCategories] = useState(data.skillCategories);
  const [newCatName, setNewCatName] = useState('');
  const [newSkillNames, setNewSkillNames] = useState<{ [cat: string]: string }>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const updated = [...categories, { categoryName: newCatName.trim(), skills: [] }];
    setCategories(updated);
    setNewCatName('');
  };

  const handleDeleteCategory = (catIndex: number) => {
    const updated = categories.filter((_, i) => i !== catIndex);
    setCategories(updated);
  };

  const handleAddSkill = (catIndex: number) => {
    const catName = categories[catIndex].categoryName;
    const skillName = newSkillNames[catName]?.trim();
    if (!skillName) return;

    const updated = [...categories];
    updated[catIndex].skills.push({ name: skillName, level: 'Expert' });
    setCategories(updated);
    setNewSkillNames({ ...newSkillNames, [catName]: '' });
  };

  const handleDeleteSkill = (catIndex: number, skillIndex: number) => {
    const updated = [...categories];
    updated[catIndex].skills.splice(skillIndex, 1);
    setCategories(updated);
  };

  const handleSaveToCloud = async () => {
    await updateSkills(categories);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            04 / TECHNICAL MATRIX STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Skills & Frameworks Matrix
          </h2>
        </div>

        <button
          onClick={handleSaveToCloud}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-[#C4A482]" />}
          <span>{savedSuccess ? 'Changes Saved to Cloud!' : 'Save Matrix to Cloud'}</span>
        </button>
      </div>

      {/* Add Category Input */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E7E0D5] shadow-2xs">
        <input
          type="text"
          placeholder="New Skill Category (e.g. Cloud & DevOps, Computer Vision)..."
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
        />
        <button
          onClick={handleAddCategory}
          className="px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4 text-[#C4A482]" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, catIdx) => (
          <div
            key={cat.categoryName}
            className="p-6 rounded-3xl bg-white/90 border border-[#E7E0D5] space-y-4 shadow-2xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D5]">
              <h3 className="text-base font-serif text-[#201D1A] font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9A7B61]" />
                {cat.categoryName}
              </h3>
              <button
                onClick={() => handleDeleteCategory(catIdx)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Skills Chips */}
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={skill.name}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono-code bg-[#FAF8F5] text-[#4A423A] border border-[#E2D9CC] flex items-center gap-2 group"
                >
                  <span>{skill.name}</span>
                  <button
                    onClick={() => handleDeleteSkill(catIdx, sIdx)}
                    className="text-[#9C948A] hover:text-rose-600 cursor-pointer"
                    title="Remove skill"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add Skill inside category */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#E7E0D5]">
              <input
                type="text"
                placeholder={`Add skill to ${cat.categoryName}...`}
                value={newSkillNames[cat.categoryName] || ''}
                onChange={(e) => setNewSkillNames({ ...newSkillNames, [cat.categoryName]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(catIdx)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] placeholder-[#9C948A] focus:border-[#201D1A] focus:outline-none"
              />
              <button
                onClick={() => handleAddSkill(catIdx)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#7C5E47] bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#E2D9CC] cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

