export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  cgpa: string;
  highlights?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  techStack: string[];
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  businessValue: string;
  results: string[];
  githubUrl: string;
  liveDemoUrl: string;
  featured: boolean;
  category: 'Data Analytics' | 'Machine Learning' | 'NLP / GenAI' | 'IoT & AI' | string;
}

export interface SkillItem {
  name: string;
  level?: 'Expert' | 'Advanced' | 'Intermediate';
  icon?: string;
}

export interface SkillCategory {
  categoryName: string;
  skills: SkillItem[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  verificationLink: string;
  imageUrl?: string;
  credentialId?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Leadership' | 'Research' | 'Workshops' | 'Environmental' | string;
  organization?: string;
  description: string;
  year: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'icon';
  size: string;
  uploadedAt: string;
  usedInSection?: string;
  altText?: string;
  description?: string;
}

export interface UserRole {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage?: string;
  googleAnalyticsId?: string;
  clarityId?: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    email: string;
    secondaryEmail?: string;
    phone: string;
    linkedin: string;
    github: string;
    instagram?: string;
    tagline: string;
    shortBio: string;
    fullBio: string;
    profilePhoto: string;
    resumeUrl: string;
  };
  hero: {
    heading: string;
    subheading: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    heroImage?: string;
    heroImagePlacement?: 'center-top' | 'center-bottom' | 'side-right' | 'badge-corner' | 'ambient-float';
    heroImageShape?: 'circle' | 'rounded' | 'archival' | 'pill';
    showHeroImage?: boolean;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  contactMessages: ContactMessage[];
  mediaLibrary: MediaItem[];
  seoSettings: SeoSettings;
  seo?: SeoSettings;
  userRoles: UserRole[];
}

