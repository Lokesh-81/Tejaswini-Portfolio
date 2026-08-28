import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem } from '../../types';
import { 
  Plus, 
  Trash2, 
  Copy, 
  Edit3, 
  MoveUp, 
  MoveDown,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';

export const ProjectsStudio: React.FC = () => {
  const { data, addProject, updateProject, deleteProject, duplicateProject, reorderProjects } = usePortfolio();
  
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const defaultNewProject: Omit<ProjectItem, 'id'> = {
    title: '',
    subtitle: '',
    description: '',
    heroImage: '',
    overview: '',
    problem: '',
    solution: '',
    technologies: ['Python', 'Pandas', 'Machine Learning'],
    businessValue: '',
    results: ['Extracted actionable business insights from dataset.'],
    featured: true,
    category: 'Data Analytics',
    githubUrl: '',
    liveDemoUrl: ''
  };

  const [formData, setFormData] = useState<Omit<ProjectItem, 'id'>>(defaultNewProject);
  const [techInput, setTechInput] = useState('');
  const [resultInput, setResultInput] = useState('');

  const handleStartEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setIsCreatingNew(false);
    setFormData({
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      heroImage: project.heroImage || '',
      overview: project.overview || '',
      problem: project.problem || '',
      solution: project.solution || '',
      technologies: project.technologies || [],
      businessValue: project.businessValue || '',
      results: project.results || [],
      featured: project.featured ?? true,
      category: project.category || 'Data Analytics',
      githubUrl: project.githubUrl || '',
      liveDemoUrl: project.liveDemoUrl || ''
    });
    setTechInput((project.technologies || []).join(', '));
    setResultInput((project.results || []).join('\n'));
  };

  const handleStartNew = () => {
    setEditingProject(null);
    setIsCreatingNew(true);
    setFormData(defaultNewProject);
    setTechInput('Python, Pandas, Machine Learning');
    setResultInput('Extracted actionable business insights from dataset.');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const resultsArray = resultInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const projectPayload = {
      ...formData,
      technologies: techArray,
      results: resultsArray
    };

    if (editingProject) {
      await updateProject(editingProject.id, projectPayload);
      setEditingProject(null);
    } else {
      await addProject(projectPayload);
      setIsCreatingNew(false);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.projects.length) return;
    
    const items = [...data.projects];
    const [moved] = items.splice(index, 1);
    items.splice(newIndex, 0, moved);
    
    const reorderedIds = items.map((p) => p.id);
    reorderProjects(reorderedIds);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            02 / CASE STUDIES & RESEARCH REPOSITORY
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Project Dossiers & Inquiries
          </h2>
        </div>

        <button
          onClick={handleStartNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C4A482]" />
          <span>New Case Study</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {(isCreatingNew || editingProject) && (
        <div className="p-8 rounded-3xl bg-white border border-[#C4A482] shadow-[0_15px_35px_rgba(36,33,30,0.08)] space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D5]">
            <h3 className="text-lg font-serif text-[#201D1A] font-medium">
              {editingProject ? `Edit: ${editingProject.title}` : 'Create New Case Study'}
            </h3>
            <button
              onClick={() => { setEditingProject(null); setIsCreatingNew(false); }}
              className="text-xs text-[#6B645C] hover:text-[#201D1A] px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E2D9CC]"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">PROJECT TITLE *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Netflix Global Catalog Analysis"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">CATEGORY *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                >
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="NLP / GenAI">NLP / GenAI</option>
                  <option value="IoT & AI">IoT & AI</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268]">SUBTITLE / TAGLINE</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Content Trends & Viewer Behavioral Insights"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            {/* Visual Component Notice */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB] flex items-center justify-between text-xs text-[#524B43]">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#9A7B61]" />
                <span>Visual Card: Rendered natively via code-based telemetry card</span>
              </div>
              <span className="text-[11px] font-mono-code text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Zero Cloud Storage Required
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268]">SHORT DESCRIPTION</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Summary displayed on project cards..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">PROBLEM STATEMENT</label>
                <textarea
                  rows={3}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="What business/data challenge was solved?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">SOLUTION ARCHITECTURE</label>
                <textarea
                  rows={3}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="How was the model/pipeline designed?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268]">BUSINESS IMPACT VALUE</label>
              <input
                type="text"
                value={formData.businessValue}
                onChange={(e) => setFormData({ ...formData, businessValue: e.target.value })}
                placeholder="e.g. Reduces wait times by 22% through predictive dispatching..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268]">TECH STACK (Comma Separated)</label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Python, Pandas, Seaborn, Machine Learning"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268]">KEY RESULTS (One per line)</label>
              <textarea
                rows={3}
                value={resultInput}
                onChange={(e) => setResultInput(e.target.value)}
                placeholder="Analyzed dataset to extract trends&#10;Visualized insights with dashboards"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">GITHUB REPOSITORY URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/tejaswinipamula/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-[#7A7268]">LIVE DEMO / NOTEBOOK URL</label>
                <input
                  type="url"
                  value={formData.liveDemoUrl}
                  onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E0D5]">
              <button
                type="button"
                onClick={() => { setEditingProject(null); setIsCreatingNew(false); }}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-[#6B645C] hover:text-[#201D1A] bg-[#FAF8F5] border border-[#E2D9CC]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs"
              >
                {editingProject ? 'Save Changes' : 'Publish Case Study'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {data.projects.map((project, index) => (
          <div
            key={project.id}
            className="p-6 rounded-3xl bg-white/80 border border-[#E7E0D5] hover:border-[#C4A482] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#181615] flex items-center justify-center text-[#C4A482] flex-shrink-0 border border-[#38312B]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-serif text-[#201D1A] font-medium">{project.title}</h4>
                  {project.featured && (
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#FAF8F5] text-[#7C5E47] border border-[#E2D9CC]">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B645C] line-clamp-1 mt-0.5">{project.subtitle}</p>
                <div className="text-[11px] font-mono-code text-[#9A7B61] mt-1">{project.category}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => handleMove(index, 'up')}
                disabled={index === 0}
                className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC] disabled:opacity-30 cursor-pointer"
                title="Move up"
              >
                <MoveUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMove(index, 'down')}
                disabled={index === data.projects.length - 1}
                className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC] disabled:opacity-30 cursor-pointer"
                title="Move down"
              >
                <MoveDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => duplicateProject(project.id)}
                className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC] cursor-pointer"
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStartEdit(project)}
                className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#7C5E47] hover:text-[#201D1A] border border-[#E2D9CC] cursor-pointer"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteProject(project.id)}
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
