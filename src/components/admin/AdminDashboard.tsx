import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { StudioHeader } from './StudioHeader';
import { StudioLandingHome } from './StudioLandingHome';
import { HeroStudio } from './HeroStudio';
import { AboutEduStudio } from './AboutEduStudio';
import { ProjectsStudio } from './ProjectsStudio';
import { ExperienceStudio } from './ExperienceStudio';
import { SkillsStudio } from './SkillsStudio';
import { CertificationsStudio } from './CertificationsStudio';
import { AchievementsStudio } from './AchievementsStudio';
import { ResumeStudio } from './ResumeStudio';
import { MediaStudio } from './MediaStudio';
import { MessagesStudio } from './MessagesStudio';
import { ContactStudio } from './ContactStudio';
import { SeoStudio } from './SeoStudio';
import { RolesStudio } from './RolesStudio';
import { Lock, ArrowLeft, Loader2, KeyRound, Mail, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { currentUser, isAdminLoggedIn, isAuthenticated, currentUserRole, isAuthLoading, login, authError: contextAuthError } = usePortfolio();
  const isAuth = !!currentUser && isAdminLoggedIn;

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Login form state
  const [emailInput, setEmailInput] = useState<string>('tejaswinitejp@gmail.com');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [localAuthError, setLocalAuthError] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalAuthError(null);
    setIsSubmitting(true);
    try {
      const res = await login(emailInput.trim(), passwordInput.trim());
      if (!res.success) {
        setLocalAuthError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setLocalAuthError(err?.message || 'Authentication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not authenticated, render the warm editorial Studio Login screen
  if (!isAuth) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201D1A]/70 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#E2D9CC] shadow-[0_25px_70px_rgba(36,33,30,0.25)] text-center space-y-7">
          
          <button
            onClick={onClose}
            className="absolute top-6 left-6 p-2 rounded-full bg-white hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC] transition-colors cursor-pointer shadow-2xs"
            title="Return to live portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center space-y-3 pt-2">
            <div className="w-14 h-14 rounded-2xl bg-[#201D1A] flex items-center justify-center text-[#E2D9CC] shadow-xs">
              <Lock className="w-6 h-6 text-[#C4A482]" />
            </div>
            <div className="text-2xl font-serif text-[#201D1A] font-medium tracking-tight">
              PORTFOLIO STUDIO
            </div>
            <p className="text-xs text-[#7A7268] font-mono-code">
              Administrator Authentication & Content Studio
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#7A7268] font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#9A7B61]" />
                <span>ADMINISTRATOR EMAIL</span>
              </label>
              <input
                type="email"
                required
                placeholder="tejaswinitejp@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none placeholder-[#9C948A]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono-code text-[#7A7268] font-semibold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#9A7B61]" />
                  <span>PASSWORD</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter administrator password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white border border-[#E2D9CC] text-sm text-[#201D1A] focus:border-[#201D1A] focus:outline-none placeholder-[#9C948A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9C948A] hover:text-[#201D1A] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {(localAuthError || contextAuthError) && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono-code">
                {localAuthError || contextAuthError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-[#201D1A] hover:bg-[#34302C] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C4A482]" />
                  <span>Authenticating with Firebase...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C4A482]" />
                  <span>Authenticate & Enter Studio</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-[#EAE4DB] text-center">
            <button
              onClick={onClose}
              className="text-xs font-mono-code text-[#7A7268] hover:text-[#201D1A] cursor-pointer"
            >
              ← Cancel and Return to Live Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Studio Workspace once Authenticated
  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] text-[#201D1A] overflow-y-auto flex flex-col font-sans">
      
      {/* Studio Header Bar */}
      <StudioHeader
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClose={onClose}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main Studio Views Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-20">
        {(currentTab === 'home' || currentTab === 'overview') && (
          <StudioLandingHome
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLiveSite={onClose}
            onCreateProject={() => {
              setCurrentTab('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'hero' && <HeroStudio />}
        {currentTab === 'about' && <AboutEduStudio />}
        {currentTab === 'projects' && <ProjectsStudio />}
        {currentTab === 'experience' && <ExperienceStudio />}
        {currentTab === 'skills' && <SkillsStudio />}
        {currentTab === 'certifications' && <CertificationsStudio />}
        {currentTab === 'achievements' && <AchievementsStudio />}
        {currentTab === 'resume' && <ResumeStudio />}
        {currentTab === 'media' && <MediaStudio />}
        {currentTab === 'messages' && <MessagesStudio />}
        {currentTab === 'contact' && <ContactStudio />}
        {currentTab === 'seo' && <SeoStudio />}
        {currentTab === 'roles' && <RolesStudio />}
      </main>

    </div>
  );
};
