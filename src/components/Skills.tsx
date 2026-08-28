import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Feather, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SkillGroup {
  category: string;
  categoryNumber: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced';
    proficiency: string;
    details: string;
    tools: string[];
    associatedProjects: string[];
  }[];
}

const skillCategoriesData: SkillGroup[] = [
  {
    category: 'Exploratory Analytics & Statistical Methods',
    categoryNumber: '01',
    description: 'Transforming raw noisy rows into validated behavioral hypotheses through deep profiling, statistical distribution tests, and anomaly isolation.',
    skills: [
      {
        name: 'Pandas & NumPy Ecosystem',
        level: 'Expert',
        proficiency: '98%',
        details: 'Vectorized dataset wrangling, multi-index aggregation, temporal resampling, and missing value imputation.',
        tools: ['Pandas', 'NumPy', 'SciPy', 'Jupyter'],
        associatedProjects: ['Netflix EDA', 'Uber Demand Analysis']
      },
      {
        name: 'Exploratory Data Analysis (EDA)',
        level: 'Expert',
        proficiency: '96%',
        details: 'Hypothesis testing, skewness correction, variance inflation factor (VIF) analysis, and correlation matrix evaluation.',
        tools: ['Univariate/Bivariate EDA', 'Outlier Isolation', 'Box-Cox Transforms'],
        associatedProjects: ['Netflix Catalog EDA', 'Uber Demand Hotspots']
      },
      {
        name: 'Data Cleaning & Preprocessing Pipelines',
        level: 'Expert',
        proficiency: '95%',
        details: 'Handling schema inconsistencies, duplicate record reconciliation, and building robust feature engineering workflows.',
        tools: ['Data Wrangling', 'One-Hot Encoding', 'StandardScaler'],
        associatedProjects: ['Smart Traffic Modeling', 'RP2 Analytics']
      }
    ]
  },
  {
    category: 'Machine Learning & Predictive Modeling',
    categoryNumber: '02',
    description: 'Designing and evaluating supervised regression, clustering topologies, and computer vision classification pipelines.',
    skills: [
      {
        name: 'Scikit-learn Algorithms',
        level: 'Expert',
        proficiency: '95%',
        details: 'Random Forests, Gradient Boosting (XGBoost/LightGBM), K-Means clustering, and cross-validation grids.',
        tools: ['Scikit-Learn', 'XGBoost', 'Cross-Validation', 'GridSearchCV'],
        associatedProjects: ['Uber Spatial Demand Hotspots', 'RP2 ML Pipeline']
      },
      {
        name: 'Deep Learning & Computer Vision',
        level: 'Advanced',
        proficiency: '90%',
        details: 'Convolutional Neural Networks (CNNs) for real-time traffic density estimation and sequence classification.',
        tools: ['TensorFlow', 'PyTorch', 'OpenCV', 'CNN Architectures'],
        associatedProjects: ['Smart Traffic Signaling', 'Computer Vision Lab']
      },
      {
        name: 'Model Evaluation & Optimization',
        level: 'Expert',
        proficiency: '94%',
        details: 'Precision-Recall AUC curves, confusion matrices, RMSE/MAE minimization, and hyperparameter tuning.',
        tools: ['ROC-AUC', 'F1-Score', 'SHAP Interpretability', 'Confusion Matrix'],
        associatedProjects: ['Uber Demand Analysis', '1 Stop ML Certification']
      }
    ]
  },
  {
    category: 'Cognitive AI & Language Synthesis',
    categoryNumber: '03',
    description: 'Coupling classical statistical models with modern foundation models for abstractive distillation and semantic search.',
    skills: [
      {
        name: 'Generative AI & LLM Integrations',
        level: 'Advanced',
        proficiency: '92%',
        details: 'Leveraging Gemini API and open foundation models for multimodal comprehension, transcription, and contextual extraction.',
        tools: ['Gemini 2.5/Flash API', 'Prompt Engineering', 'Structured JSON Outputs'],
        associatedProjects: ['YouTube Video Summarizer', 'AI Research 2025']
      },
      {
        name: 'Natural Language Processing & Transformers',
        level: 'Advanced',
        proficiency: '89%',
        details: 'Hugging Face pipelines, tokenization, semantic embeddings, and abstractive text summarization algorithms.',
        tools: ['Hugging Face', 'NLTK', 'Transformers', 'Sentence Embeddings'],
        associatedProjects: ['YouTube Summarizer', 'Transcript Distillation']
      },
      {
        name: 'RAG & Vector Knowledge Workflows',
        level: 'Advanced',
        proficiency: '88%',
        details: 'Document chunking strategies, vector similarity retrieval, and building grounded question-answering systems.',
        tools: ['Vector Search', 'Cosine Similarity', 'Chunking Strategies', 'Grounding'],
        associatedProjects: ['AI Research Lab', 'Knowledge Assistant']
      }
    ]
  },
  {
    category: 'Data Architecture & Visual Synthesis',
    categoryNumber: '04',
    description: 'Transforming mathematical outputs into executive dashboards, spatial mappings, and relational database queries.',
    skills: [
      {
        name: 'SQL & Relational Databases',
        level: 'Expert',
        proficiency: '96%',
        details: 'Complex multi-table joins, subqueries, window functions, indexing strategies, and PostgreSQL schema design.',
        tools: ['PostgreSQL', 'MySQL', 'Window Functions', 'Query Optimization'],
        associatedProjects: ['Netflix EDA', 'Uber Spatial Analysis']
      },
      {
        name: 'Statistical Visualizations & Storytelling',
        level: 'Expert',
        proficiency: '95%',
        details: 'Custom high-density statistical charts, heatmaps, faceted multi-plot grids, and publication-ready graphics.',
        tools: ['Seaborn', 'Matplotlib', 'Plotly', 'Editorial Color Palettes'],
        associatedProjects: ['Netflix Content Insights', 'Uber Rush-Hour Visuals']
      },
      {
        name: 'Business Intelligence & Dashboards',
        level: 'Advanced',
        proficiency: '90%',
        details: 'Executive KPI reporting, interactive filters, drill-down analytics, and stakeholder data narratives.',
        tools: ['Power BI', 'DAX Formulas', 'Tableau', 'Executive Reporting'],
        associatedProjects: ['RP2 Analytics Dashboard', 'SVECW Research Metrics']
      }
    ]
  }
];

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories = ['All', 'Exploratory Analytics', 'Machine Learning', 'Cognitive AI', 'Architecture & Visuals'];

  const filteredGroups = activeTab === 'All'
    ? skillCategoriesData
    : skillCategoriesData.filter((group) => {
        if (activeTab === 'Exploratory Analytics') return group.categoryNumber === '01';
        if (activeTab === 'Machine Learning') return group.categoryNumber === '02';
        if (activeTab === 'Cognitive AI') return group.categoryNumber === '03';
        if (activeTab === 'Architecture & Visuals') return group.categoryNumber === '04';
        return true;
      });

  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#E7E0D5]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-3">
              <Feather className="w-3.5 h-3.5" />
              <span>THE METHODS // SYSTEMATIC CAPABILITIES</span>
            </div>
            <h2 className="display-section text-[#201D1A] font-serif font-normal tracking-tight">
              An Editorial Matrix of Competencies
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-[#FAF8F5] p-1.5 rounded-full border border-[#E2D9CC] shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#201D1A] text-white font-medium shadow-xs'
                    : 'text-[#6B645C] hover:text-[#201D1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Typographic Skills Matrix Layout */}
        <div className="space-y-12">
          {filteredGroups.map((group) => (
            <div
              key={group.categoryNumber}
              className="p-8 sm:p-10 rounded-3xl bg-white/90 border border-[#E7E0D5] shadow-[0_8px_30px_rgba(36,33,30,0.03)] space-y-8"
            >
              {/* Category Subheader */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-6 border-b border-[#EAE4DB]">
                <div className="flex items-center gap-3">
                  <span className="font-mono-code text-sm font-semibold text-[#9A7B61] px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E2D9CC]">
                    {group.categoryNumber}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#201D1A] font-medium">
                    {group.category}
                  </h3>
                </div>
                <p className="text-xs text-[#6B645C] max-w-md font-sans leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Skills Row Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {group.skills.map((skill) => {
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#FAF8F5] border-[#9A7B61] shadow-sm ring-1 ring-[#9A7B61]/30'
                          : 'bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] border-[#EAE4DB] hover:border-[#C4A482]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#9A7B61] font-semibold">
                            {skill.level} Proficiency
                          </span>
                          <span className="text-xs font-mono-code text-[#4A443D] font-medium">
                            {skill.proficiency}
                          </span>
                        </div>

                        <h4 className="text-base font-serif font-medium text-[#201D1A]">
                          {skill.name}
                        </h4>

                        <p className="text-xs text-[#6B645C] leading-relaxed">
                          {skill.details}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#EFE9DF] space-y-3">
                        {/* Tool tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {skill.tools.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[10.5px] font-mono-code bg-white text-[#4A443D] border border-[#E2D9CC]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Associated Projects */}
                        <div className="flex items-center justify-between text-[10.5px] font-mono-code text-[#9C948A] pt-1">
                          <span>Case studies:</span>
                          <span className="text-[#201D1A] font-medium">
                            {skill.associatedProjects.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Verification Guarantee Stamp */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#6B645C]">
          <div className="flex items-center gap-2 text-[#201D1A]">
            <CheckCircle2 className="w-4 h-4 text-[#9A7B61]" />
            <span className="font-medium">Rigorous Academic & Industrial Testing:</span>
            <span className="text-[#7A7268]">All technical proficiencies verified across 4+ end-to-end case files.</span>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 text-[#9A7B61] hover:text-[#201D1A] font-medium transition-colors"
          >
            <span>Review Project Evidence</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
