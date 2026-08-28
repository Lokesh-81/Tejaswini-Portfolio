import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  ArrowUpRight, 
  FolderKanban, 
  Briefcase, 
  Terminal, 
  Image as ImageIcon, 
  Mail, 
  Award, 
  User, 
  Phone, 
  Search, 
  ShieldCheck, 
  ExternalLink,
  Plus,
  Compass,
  FileText
} from 'lucide-react';

interface StudioLandingHomeProps {
  onSelectTab: (tab: string) => void;
  onOpenLiveSite: () => void;
  onCreateProject: () => void;
}

export const StudioLandingHome: React.FC<StudioLandingHomeProps> = ({
  onSelectTab,
  onOpenLiveSite,
  onCreateProject,
}) => {
  const { data } = usePortfolio();

  const unreadMessagesCount = data.contactMessages.filter(m => !m.isRead).length;

  const workspaceSections = [
    {
      number: '01',
      id: 'hero',
      title: 'Hero, Portrait & Layout',
      desc: 'Shape first impression, headline, featured portrait/graphic, and frame position.',
      badge: `${data.hero.heading.slice(0, 22)}...`,
      icon: Compass,
      actionText: 'Edit Hero & Photo'
    },
    {
      number: '02',
      id: 'projects',
      title: 'Projects & Case Studies',
      desc: 'Editorial showcases, dataset metrics, problem-solution stories, and live demo links.',
      badge: `${data.projects.length} Case Studies Published`,
      icon: FolderKanban,
      actionText: 'Manage Projects'
    },
    {
      number: '03',
      id: 'experience',
      title: 'Professional Timeline',
      desc: 'Curate your career journey, internship roles, company achievements, and tech stacks.',
      badge: `${data.experience.length} Roles Active`,
      icon: Briefcase,
      actionText: 'Edit Timeline'
    },
    {
      number: '04',
      id: 'skills',
      title: 'Technical Matrix',
      desc: 'Manage technical competencies, categories, algorithms, and proficiency levels.',
      badge: `${data.skillCategories.reduce((acc, c) => acc + c.skills.length, 0)} Skills Indexed`,
      icon: Terminal,
      actionText: 'Manage Matrix'
    },
    {
      number: '05',
      id: 'media',
      title: 'Media & Asset Hub',
      desc: 'Editorial visual assets and document hub. Upload hero graphics, PDFs, and certificates.',
      badge: `${data.mediaLibrary.length} Cloud Assets`,
      icon: ImageIcon,
      actionText: 'Open Asset Library'
    },
    {
      number: '06',
      id: 'messages',
      title: 'Visitor Messages & Inquiries',
      desc: 'Direct communication center for recruiter inquiries and collaboration notes.',
      badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} Unread Messages` : `${data.contactMessages.length} Messages`,
      icon: Mail,
      actionText: 'Open Mailbox'
    },
    {
      number: '07',
      id: 'certifications',
      title: 'Certifications Archive',
      desc: 'Verified academic and professional credentials with verification links.',
      badge: `${data.certifications.length} Credentials`,
      icon: Award,
      actionText: 'Curate Archive'
    },
    {
      number: '08',
      id: 'achievements',
      title: 'Recognitions & Leadership',
      desc: 'Publish leadership appointments, academic awards, research honors, and societal service.',
      badge: `${data.achievements.length} Accolades Recorded`,
      icon: Award,
      actionText: 'Manage Accolades'
    },
    {
      number: '09',
      id: 'resume',
      title: 'Resume & Documents',
      desc: 'Manage official PDF curriculum vitae links and launch interactive CV reader.',
      badge: 'PDF Synced',
      icon: FileText,
      actionText: 'Manage Resume'
    },
    {
      number: '10',
      id: 'about',
      title: 'Editorial Bio & Education',
      desc: 'Craft your narrative, SVECW degree highlights, portrait, and research accomplishments.',
      badge: `${data.education.length} Degrees • ${data.personalInfo.name}`,
      icon: User,
      actionText: 'Edit Biography'
    },
    {
      number: '11',
      id: 'contact',
      title: 'Contact & Direct Channels',
      desc: 'Configure email, phone, LinkedIn, GitHub, and message delivery settings.',
      badge: data.personalInfo.email,
      icon: Phone,
      actionText: 'Configure Contact'
    },
    {
      number: '12',
      id: 'seo',
      title: 'Search & Social Presence',
      desc: 'Live Google search snippet, Twitter/X cards, OpenGraph previews, and keywords.',
      badge: 'Google & Social Optimized',
      icon: Search,
      actionText: 'Optimize Presence'
    },
    {
      number: '13',
      id: 'roles',
      title: 'Team, Access & Cloud State',
      desc: 'Firebase Firestore connection status, password management, and studio collaborators.',
      badge: `${data.userRoles.length} Team Members`,
      icon: ShieldCheck,
      actionText: 'Manage Team'
    }
  ];

  return (
    <div className="space-y-20 pb-28">
      
      {/* Editorial Landing Hero */}
      <section className="relative pt-12 pb-10 px-4 sm:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2D9CC] text-xs font-mono-code text-[#7C5E47] mb-8 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#9A7B61] animate-pulse" />
          <span>FIREBASE FIRESTORE SYNC ACTIVE</span>
          <span className="text-[#C4A482]">|</span>
          <span className="text-[#6B645C]">Tejaswini Pamula Portfolio</span>
        </div>

        {/* Big Studio Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#201D1A] tracking-tight font-normal leading-tight mb-6">
          PORTFOLIO STUDIO
        </h1>

        <p className="text-lg sm:text-xl text-[#6B645C] font-serif italic max-w-2xl mx-auto leading-relaxed mb-10">
          "Your digital presence, curated with editorial precision."
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenLiveSite}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Open Live Portfolio</span>
            <ExternalLink className="w-4 h-4 text-[#C4A482]" />
          </button>

          <button
            onClick={onCreateProject}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium text-[#201D1A] hover:text-black bg-white hover:bg-[#F4EFE6] border border-[#E2D9CC] transition-all transform hover:-translate-y-0.5 shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#9A7B61]" />
            <span>New Case Study</span>
          </button>
        </div>

        {/* Visual Device Frame Live Composition */}
        <div className="w-full max-w-4xl rounded-3xl bg-white/90 border border-[#E7E0D5] p-4 sm:p-6 shadow-[0_20px_50px_rgba(36,33,30,0.06)] text-left relative overflow-hidden group">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DB] mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D4A373]/80" />
              <div className="w-3 h-3 rounded-full bg-[#CCD5AE]/80" />
              <div className="w-3 h-3 rounded-full bg-[#E9D8A6]/80" />
              <span className="text-xs font-mono-code text-[#9C948A] ml-2">https://tejaswini-pamula.ai/portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code text-[#7C5E47] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#E2D9CC]">
                LIVE PREVIEW
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
              <div className="text-[11px] font-mono-code text-[#9C948A]">CURRENT HERO HEADLINE</div>
              <div className="text-sm font-serif text-[#201D1A] font-medium mt-1 line-clamp-2">{data.hero.heading}</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
              <div className="text-[11px] font-mono-code text-[#9C948A]">FEATURED CASE STUDY</div>
              <div className="text-sm font-serif text-[#7C5E47] font-medium mt-1 line-clamp-2">{data.projects[0]?.title || 'Netflix Data Analysis'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DB]">
              <div className="text-[11px] font-mono-code text-[#9C948A]">ACTIVE ROLE</div>
              <div className="text-sm font-serif text-[#201D1A] font-medium mt-1 line-clamp-2">{data.experience[0]?.role || 'Data Science Intern'}</div>
            </div>
          </div>
        </div>

      </section>

      {/* Large Editorial Workspace Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Workspace Chapter Title */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E0D5] mb-12">
          <div>
            <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-1">
              STUDIO PORTALS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
              Your Workspace Modules
            </h2>
          </div>
          <div className="text-xs font-mono-code text-[#9C948A]">
            {workspaceSections.length} Interactive Modules
          </div>
        </div>

        {/* Large Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaceSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => onSelectTab(sec.id)}
                className="group relative p-8 rounded-3xl bg-white/80 border border-[#E7E0D5] hover:border-[#C4A482] hover:bg-white transition-all duration-300 shadow-xs hover:shadow-[0_15px_35px_rgba(36,33,30,0.06)] flex flex-col justify-between cursor-pointer space-y-6 transform hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono-code text-[#C4A482] group-hover:text-[#9A7B61] transition-colors">
                      {sec.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-serif text-[#201D1A] font-medium group-hover:text-[#9A7B61] transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-[#6B645C] leading-relaxed mt-2">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                {/* Footer with Badge & Action Trigger */}
                <div className="pt-4 border-t border-[#EFE9DF] flex items-center justify-between text-xs">
                  <span className="font-mono-code text-[#9C948A] truncate max-w-[150px]">
                    {sec.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-[#7C5E47] group-hover:text-[#201D1A]">
                    <span>{sec.actionText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#9A7B61]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};

