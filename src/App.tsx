import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { AnalyticsShowcase } from './components/AnalyticsShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Preloader } from './components/Preloader';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Ambient3DEnvironment } from './components/Ambient3DEnvironment';

function MainApp() {
  const { selectedProjectModal, setSelectedProjectModal, isResumeModalOpen, setIsResumeModalOpen } = usePortfolio();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#24211E] flex flex-col font-sans selection:bg-[#9A7B61]/20 selection:text-[#201D1A] relative overflow-x-hidden">
      
      {/* Full-Screen Cinematic Preloader */}
      {!preloaderFinished && (
        <Preloader onComplete={() => setPreloaderFinished(true)} />
      )}

      {/* Precision Scroll Progress & Interactive Cursor */}
      <ScrollProgress />
      <CustomCursor />

      {/* Animated Subtle Editorial Background & Full-Screen 3D Ambient Environment */}
      <AnimatedBackground />
      <Ambient3DEnvironment />

      {/* Glass Navbar with Smart Hide/Show on Scroll */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <AnalyticsShowcase />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      {/* Glass Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Project Case Study Reader Modal */}
      <ProjectModal
        project={selectedProjectModal}
        onClose={() => setSelectedProjectModal(null)}
      />

      {/* Official Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Admin Dashboard Modal */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainApp />
    </PortfolioProvider>
  );
}
