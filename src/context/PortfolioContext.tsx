import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PortfolioData,
  ProjectItem,
  ExperienceItem,
  CertificationItem,
  AchievementItem,
  ContactMessage,
  UserRole,
  EducationItem,
  MediaItem,
  SeoSettings
} from '../types';
import { initialPortfolioData } from '../data/initialData';
import {
  db,
  auth,
  storage,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fbSignOut,
  onAuthStateChanged,
  fbUpdatePassword,
  getIdTokenResult,
  User
} from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';

const LOCAL_STORAGE_KEY = 'tejaswini_portfolio_data_v4';
const FIRESTORE_DOC_ID = 'main';

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';

interface PortfolioContextType {
  data: PortfolioData;
  currentUser: User | null;
  isAdminLoggedIn: boolean;
  isAuthenticated: boolean;
  currentUserRole: 'Admin' | 'Editor' | 'Viewer' | null;
  authError: string | null;
  isAuthLoading: boolean;
  selectedProjectModal: ProjectItem | null;
  setSelectedProjectModal: (project: ProjectItem | null) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  syncStatus: SyncStatus;
  lastSyncedAt: Date | null;

  // Actions
  updateHero: (hero: Partial<PortfolioData['hero']>) => Promise<boolean>;
  updatePersonalInfo: (info: Partial<PortfolioData['personalInfo']>) => Promise<boolean>;
  
  // Education
  addEducation: (edu: Omit<EducationItem, 'id'>) => Promise<boolean>;
  updateEducation: (id: string, edu: Partial<EducationItem>) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;

  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => Promise<boolean>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  duplicateProject: (id: string) => Promise<boolean>;
  reorderProjects: (projects: ProjectItem[]) => Promise<boolean>;

  // Experience
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => Promise<boolean>;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;
  duplicateExperience: (id: string) => Promise<boolean>;
  reorderExperience: (experience: ExperienceItem[]) => Promise<boolean>;

  // Skills
  updateSkills: (categories: PortfolioData['skillCategories']) => Promise<boolean>;

  // Certifications
  addCertification: (cert: Omit<CertificationItem, 'id'>) => Promise<boolean>;
  updateCertification: (id: string, cert: Partial<CertificationItem>) => Promise<boolean>;
  deleteCertification: (id: string) => Promise<boolean>;
  duplicateCertification: (id: string) => Promise<boolean>;

  // Achievements
  addAchievement: (ach: Omit<AchievementItem, 'id'>) => Promise<boolean>;
  updateAchievement: (id: string, ach: Partial<AchievementItem>) => Promise<boolean>;
  deleteAchievement: (id: string) => Promise<boolean>;
  duplicateAchievement: (id: string) => Promise<boolean>;

  // Messages
  submitMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<boolean>;
  markMessageAsRead: (id: string) => Promise<boolean>;
  markMessageAsUnread: (id: string) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  exportMessagesCSV: () => void;

  // Auth & Roles
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  changeAdminPassword: (oldPassword?: string, newPassword?: string) => Promise<boolean>;
  updateAdminPassword: (newPassword: string) => Promise<boolean>;
  addUserRole: (emailOrRole: string | Omit<UserRole, 'id'>, optionalRole?: 'Admin' | 'Editor' | 'Viewer') => Promise<boolean>;
  updateUserRole: (id: string, updates: Partial<UserRole>) => Promise<boolean>;
  deleteUserRole: (id: string) => Promise<boolean>;
  removeUserRole: (idOrEmail: string) => Promise<boolean>;

  // Media
  addMediaItem: (
    name: string,
    url: string,
    type: 'image' | 'pdf' | 'icon',
    size?: string,
    usedInSection?: string,
    altText?: string,
    description?: string
  ) => Promise<boolean>;
  uploadFileToStorage: (file: File, sectionName?: string) => Promise<MediaItem>;
  updateMediaItem: (id: string, updates: Partial<MediaItem>) => Promise<boolean>;
  deleteMediaItem: (id: string) => Promise<boolean>;

  // SEO
  updateSeoSettings: (seo: Partial<SeoSettings>) => Promise<boolean>;
  updateSeo: (seo: Partial<SeoSettings>) => Promise<boolean>;

  // Manual cloud save & Reset
  saveToCloud: (overrideData?: PortfolioData) => Promise<boolean>;
  resetData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialPortfolioData,
          ...parsed,
          personalInfo: {
            ...initialPortfolioData.personalInfo,
            ...(parsed.personalInfo || {}),
            email: parsed.personalInfo?.email || initialPortfolioData.personalInfo.email,
            secondaryEmail: parsed.personalInfo?.secondaryEmail || initialPortfolioData.personalInfo.secondaryEmail,
            resumeUrl: parsed.personalInfo?.resumeUrl || '/Tejaswini_Pamula_Resume.pdf',
          },
          seoSettings: {
            ...initialPortfolioData.seoSettings,
            ...(parsed.seoSettings || parsed.seo || {})
          }
        };
      }
    } catch (err) {
      console.error('Failed to load local cache:', err);
    }
    return initialPortfolioData;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<'Admin' | 'Editor' | 'Viewer' | null>(null);

  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(new Date());

  // Listen to Firebase Auth state changes and resolve admin authorization
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // 1. Check custom claims on the Firebase ID token
          const tokenResult = await getIdTokenResult(user);
          if (tokenResult.claims.admin === true || tokenResult.claims.role === 'admin') {
            setCurrentUserRole('Admin');
            setIsAuthLoading(false);
            return;
          }

          // 2. Check if user exists in Firestore /admins or /admin_users collection
          const adminDoc = await getDoc(doc(db, 'admin_users', user.uid));
          if (adminDoc.exists()) {
            const role = adminDoc.data()?.role;
            if (role === 'Admin' || role === 'Editor' || role === 'Viewer') {
              setCurrentUserRole(role);
              setIsAuthLoading(false);
              return;
            }
          }

          // 3. Check collaborators in portfolio state
          const emailLower = (user.email || '').toLowerCase();
          const matchedRole = (data.userRoles || []).find(
            (r) => r.email.toLowerCase() === emailLower
          );
          if (matchedRole) {
            setCurrentUserRole(matchedRole.role);
          } else {
            // Check if primary portfolio owner account
            const isOwnerAccount = 
              emailLower === 'tejaswinitejp@gmail.com' ||
              emailLower === 'tejaswiniteja793@gmail.com' ||
              emailLower === 'admin@tejaswini.ai';
            setCurrentUserRole(isOwnerAccount ? 'Admin' : null);
          }
        } catch (err) {
          console.warn('Authorization role resolution note:', err);
          const emailLower = (user.email || '').toLowerCase();
          const isOwnerAccount = 
            emailLower === 'tejaswinitejp@gmail.com' ||
            emailLower === 'tejaswiniteja793@gmail.com' ||
            emailLower === 'admin@tejaswini.ai';
          setCurrentUserRole(isOwnerAccount ? 'Admin' : null);
        }
      } else {
        setCurrentUserRole(null);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, [data.userRoles]);

  const isAdminLoggedIn = !!currentUser && (currentUserRole === 'Admin' || currentUserRole === 'Editor');
  const isAuthenticated = !!currentUser;

  // Real-time synchronization with Firestore
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const portfolioRef = doc(db, 'portfolio', FIRESTORE_DOC_ID);
      unsubscribe = onSnapshot(
        portfolioRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const cloudData = snapshot.data() as Partial<PortfolioData>;
            setData((prev) => {
              const merged: PortfolioData = {
                ...prev,
                ...cloudData,
                personalInfo: {
                  ...prev.personalInfo,
                  ...(cloudData.personalInfo || {}),
                  resumeUrl: cloudData.personalInfo?.resumeUrl || prev.personalInfo.resumeUrl || '/Tejaswini_Pamula_Resume.pdf'
                },
                hero: {
                  ...prev.hero,
                  ...(cloudData.hero || {})
                },
                education: cloudData.education || prev.education,
                experience: cloudData.experience || prev.experience,
                projects: cloudData.projects || prev.projects,
                skillCategories: cloudData.skillCategories || prev.skillCategories,
                certifications: cloudData.certifications || prev.certifications,
                achievements: cloudData.achievements || prev.achievements,
                contactMessages: cloudData.contactMessages || prev.contactMessages,
                mediaLibrary: cloudData.mediaLibrary || prev.mediaLibrary,
                seoSettings: {
                  ...prev.seoSettings,
                  ...(cloudData.seoSettings || (cloudData as any).seo || {})
                },
                userRoles: cloudData.userRoles || prev.userRoles
              };
              return merged;
            });
            setSyncStatus('synced');
            setLastSyncedAt(new Date());
          } else {
            // First time seed only if authenticated admin
            if (auth.currentUser) {
              setDoc(portfolioRef, initialPortfolioData, { merge: true }).catch((err) => {
                handleFirestoreError(err, OperationType.WRITE, `portfolio/${FIRESTORE_DOC_ID}`);
              });
            }
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, `portfolio/${FIRESTORE_DOC_ID}`);
          setSyncStatus('offline');
        }
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `portfolio/${FIRESTORE_DOC_ID}`);
      setSyncStatus('offline');
    }

    return () => unsubscribe();
  }, []);

  // Update local cache on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to update local cache:', err);
    }
  }, [data]);

  // Synchronize payload to Firestore helper
  const syncToFirestore = useCallback(async (newData: PortfolioData): Promise<boolean> => {
    setData(newData);
    setSyncStatus('syncing');
    try {
      const portfolioRef = doc(db, 'portfolio', FIRESTORE_DOC_ID);
      await setDoc(portfolioRef, newData, { merge: true });
      setSyncStatus('synced');
      setLastSyncedAt(new Date());
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `portfolio/${FIRESTORE_DOC_ID}`);
      setSyncStatus('error');
      return false;
    }
  }, []);

  const saveToCloud = async (overrideData?: PortfolioData) => {
    const target = overrideData || data;
    return await syncToFirestore(target);
  };

  // Hero Section
  const updateHero = async (heroUpdates: Partial<PortfolioData['hero']>) => {
    const updated: PortfolioData = {
      ...data,
      hero: { ...data.hero, ...heroUpdates }
    };
    return await syncToFirestore(updated);
  };

  // Personal Info Section
  const updatePersonalInfo = async (infoUpdates: Partial<PortfolioData['personalInfo']>) => {
    const updated: PortfolioData = {
      ...data,
      personalInfo: { ...data.personalInfo, ...infoUpdates }
    };
    return await syncToFirestore(updated);
  };

  // Education Section
  const addEducation = async (eduData: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = {
      ...eduData,
      id: `edu-${Date.now()}`
    };
    const updated: PortfolioData = {
      ...data,
      education: [newEdu, ...data.education]
    };
    return await syncToFirestore(updated);
  };

  const updateEducation = async (id: string, updates: Partial<EducationItem>) => {
    const updated: PortfolioData = {
      ...data,
      education: data.education.map((e) => (e.id === id ? { ...e, ...updates } : e))
    };
    return await syncToFirestore(updated);
  };

  const deleteEducation = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      education: data.education.filter((e) => e.id !== id)
    };
    return await syncToFirestore(updated);
  };

  // Projects Section
  const addProject = async (projectData: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...projectData,
      id: `proj-${Date.now()}`
    };
    const updated: PortfolioData = {
      ...data,
      projects: [newProj, ...data.projects]
    };
    return await syncToFirestore(updated);
  };

  const updateProject = async (id: string, updates: Partial<ProjectItem>) => {
    const updated: PortfolioData = {
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
    };
    return await syncToFirestore(updated);
  };

  const deleteProject = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      projects: data.projects.filter((p) => p.id !== id)
    };
    return await syncToFirestore(updated);
  };

  const duplicateProject = async (id: string) => {
    const proj = data.projects.find((p) => p.id === id);
    if (!proj) return false;
    const duplicated: ProjectItem = {
      ...proj,
      id: `proj-${Date.now()}`,
      title: `${proj.title} (Copy)`
    };
    const updated: PortfolioData = {
      ...data,
      projects: [duplicated, ...data.projects]
    };
    return await syncToFirestore(updated);
  };

  const reorderProjects = async (newProjects: ProjectItem[]) => {
    const updated: PortfolioData = {
      ...data,
      projects: newProjects
    };
    return await syncToFirestore(updated);
  };

  // Experience Section
  const addExperience = async (expData: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...expData,
      id: `exp-${Date.now()}`
    };
    const updated: PortfolioData = {
      ...data,
      experience: [newExp, ...data.experience]
    };
    return await syncToFirestore(updated);
  };

  const updateExperience = async (id: string, updates: Partial<ExperienceItem>) => {
    const updated: PortfolioData = {
      ...data,
      experience: data.experience.map((e) => (e.id === id ? { ...e, ...updates } : e))
    };
    return await syncToFirestore(updated);
  };

  const deleteExperience = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      experience: data.experience.filter((e) => e.id !== id)
    };
    return await syncToFirestore(updated);
  };

  const duplicateExperience = async (id: string) => {
    const exp = data.experience.find((e) => e.id === id);
    if (!exp) return false;
    const duplicated: ExperienceItem = {
      ...exp,
      id: `exp-${Date.now()}`,
      role: `${exp.role} (Copy)`
    };
    const updated: PortfolioData = {
      ...data,
      experience: [duplicated, ...data.experience]
    };
    return await syncToFirestore(updated);
  };

  const reorderExperience = async (newExp: ExperienceItem[]) => {
    const updated: PortfolioData = {
      ...data,
      experience: newExp
    };
    return await syncToFirestore(updated);
  };

  // Skills Section
  const updateSkills = async (newCategories: PortfolioData['skillCategories']) => {
    const updated: PortfolioData = {
      ...data,
      skillCategories: newCategories
    };
    return await syncToFirestore(updated);
  };

  // Certifications Section
  const addCertification = async (certData: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = {
      ...certData,
      id: `cert-${Date.now()}`
    };
    const updated: PortfolioData = {
      ...data,
      certifications: [newCert, ...data.certifications]
    };
    return await syncToFirestore(updated);
  };

  const updateCertification = async (id: string, updates: Partial<CertificationItem>) => {
    const updated: PortfolioData = {
      ...data,
      certifications: data.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c))
    };
    return await syncToFirestore(updated);
  };

  const deleteCertification = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id)
    };
    return await syncToFirestore(updated);
  };

  const duplicateCertification = async (id: string) => {
    const cert = data.certifications.find((c) => c.id === id);
    if (!cert) return false;
    const duplicated: CertificationItem = {
      ...cert,
      id: `cert-${Date.now()}`,
      title: `${cert.title} (Copy)`
    };
    const updated: PortfolioData = {
      ...data,
      certifications: [duplicated, ...data.certifications]
    };
    return await syncToFirestore(updated);
  };

  // Achievements Section
  const addAchievement = async (achData: Omit<AchievementItem, 'id'>) => {
    const newAch: AchievementItem = {
      ...achData,
      id: `ach-${Date.now()}`
    };
    const updated: PortfolioData = {
      ...data,
      achievements: [newAch, ...data.achievements]
    };
    return await syncToFirestore(updated);
  };

  const updateAchievement = async (id: string, updates: Partial<AchievementItem>) => {
    const updated: PortfolioData = {
      ...data,
      achievements: data.achievements.map((a) => (a.id === id ? { ...a, ...updates } : a))
    };
    return await syncToFirestore(updated);
  };

  const deleteAchievement = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      achievements: data.achievements.filter((a) => a.id !== id)
    };
    return await syncToFirestore(updated);
  };

  const duplicateAchievement = async (id: string) => {
    const ach = data.achievements.find((a) => a.id === id);
    if (!ach) return false;
    const duplicated: AchievementItem = {
      ...ach,
      id: `ach-${Date.now()}`,
      title: `${ach.title} (Copy)`
    };
    const updated: PortfolioData = {
      ...data,
      achievements: [duplicated, ...data.achievements]
    };
    return await syncToFirestore(updated);
  };

  // Messages Section
  const submitMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isRead: false
    };

    // 1. Write directly to /messages/{messageId} collection allowed by Firestore rules for visitors
    try {
      const msgDocRef = doc(collection(db, 'messages'), newMsg.id);
      await setDoc(msgDocRef, {
        id: newMsg.id,
        name: newMsg.name,
        email: newMsg.email,
        subject: newMsg.subject,
        message: newMsg.message,
        timestamp: newMsg.timestamp,
        isRead: false
      });
    } catch (err) {
      console.warn('Visitor message collection creation note:', err);
    }

    const updated: PortfolioData = {
      ...data,
      contactMessages: [newMsg, ...data.contactMessages]
    };

    // If authenticated admin, sync the master doc too; otherwise update state and local cache
    if (auth.currentUser) {
      return await syncToFirestore(updated);
    } else {
      setData(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return true;
    }
  };

  const markMessageAsRead = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      contactMessages: data.contactMessages.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    };
    return await syncToFirestore(updated);
  };

  const markMessageAsUnread = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      contactMessages: data.contactMessages.map((m) => (m.id === id ? { ...m, isRead: false } : m))
    };
    return await syncToFirestore(updated);
  };

  const deleteMessage = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      contactMessages: data.contactMessages.filter((m) => m.id !== id)
    };
    return await syncToFirestore(updated);
  };

  const exportMessagesCSV = () => {
    if (!data.contactMessages.length) return;
    const headers = 'ID,Name,Email,Subject,Message,Date,ReadStatus\n';
    const rows = data.contactMessages
      .map(
        (m) =>
          `"${m.id}","${(m.name || '').replace(/"/g, '""')}","${(m.email || '').replace(/"/g, '""')}","${(m.subject || '').replace(/"/g, '""')}","${(m.message || '').replace(/"/g, '""')}","${m.timestamp}","${m.isRead ? 'Read' : 'Unread'}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_messages_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  // Secure Authentication Flow (Standard Firebase Auth with Admin Authorization)
  const login = async (emailInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);
    const email = emailInput.trim();
    const password = passwordInput.trim();

    if (!email || !password) {
      const err = 'Please provide both email and password.';
      setAuthError(err);
      return { success: false, error: err };
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      if (userCred.user) {
        // Resolve role authorization
        let isAuthorized = false;
        try {
          const tokenResult = await getIdTokenResult(userCred.user);
          if (tokenResult.claims.admin === true || tokenResult.claims.role === 'admin') {
            isAuthorized = true;
            setCurrentUserRole('Admin');
          }
        } catch {}

        if (!isAuthorized) {
          const emailLower = (userCred.user.email || '').toLowerCase();
          const isOwner = 
            emailLower === 'tejaswinitejp@gmail.com' ||
            emailLower === 'tejaswiniteja793@gmail.com' ||
            emailLower === 'admin@tejaswini.ai';
          const isCollaborator = (data.userRoles || []).some(
            r => r.email.toLowerCase() === emailLower && (r.role === 'Admin' || r.role === 'Editor')
          );

          if (isOwner || isCollaborator) {
            isAuthorized = true;
            if (isOwner) setCurrentUserRole('Admin');
          }
        }

        if (!isAuthorized) {
          // Check Firestore admin_users doc
          try {
            const adminDoc = await getDoc(doc(db, 'admin_users', userCred.user.uid));
            if (adminDoc.exists() && (adminDoc.data()?.role === 'Admin' || adminDoc.data()?.role === 'Editor')) {
              isAuthorized = true;
              setCurrentUserRole(adminDoc.data()?.role);
            }
          } catch {}
        }

        if (!isAuthorized) {
          await fbSignOut(auth);
          setCurrentUser(null);
          setCurrentUserRole(null);
          const err = 'Access Denied: This authenticated account does not have administrator privileges for Portfolio Studio.';
          setAuthError(err);
          return { success: false, error: err };
        }

        setCurrentUser(userCred.user);
        return { success: true };
      }
      return { success: false, error: 'Authentication failed.' };
    } catch (err: any) {
      console.warn('Firebase login error:', err?.code, err?.message);
      let errorMsg = 'Invalid email or password. Please verify your credentials.';
      
      // If user not found and it's the verified portfolio owner, offer account registration in Firebase Auth
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/invalid-credential') {
        const isOwnerEmail = 
          email.toLowerCase() === 'tejaswinitejp@gmail.com' ||
          email.toLowerCase() === 'tejaswiniteja793@gmail.com' ||
          email.toLowerCase() === 'admin@tejaswini.ai' ||
          (data.userRoles || []).some(r => r.email.toLowerCase() === email.toLowerCase());

        if (isOwnerEmail) {
          try {
            const newCred = await createUserWithEmailAndPassword(auth, email, password);
            if (newCred.user) {
              setCurrentUser(newCred.user);
              setCurrentUserRole('Admin');
              return { success: true };
            }
          } catch (createErr: any) {
            if (createErr?.code === 'auth/weak-password') {
              errorMsg = 'Password should be at least 6 characters.';
            } else if (createErr?.code === 'auth/email-already-in-use') {
              errorMsg = 'Incorrect password. Please re-enter your password.';
            } else {
              errorMsg = createErr?.message || 'Authentication error.';
            }
          }
        }
      } else if (err?.code === 'auth/wrong-password') {
        errorMsg = 'Incorrect password. Please try again.';
      } else if (err?.code === 'auth/too-many-requests') {
        errorMsg = 'Too many failed login attempts. Please wait a moment before trying again.';
      } else if (err?.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      }

      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
    setCurrentUser(null);
    setCurrentUserRole(null);
    setAuthError(null);
  };

  // Change password for currently authenticated user via Firebase Auth
  const changeAdminPassword = async (oldPassword?: string, newPassword?: string): Promise<boolean> => {
    if (!newPassword || !auth.currentUser) return false;
    try {
      await fbUpdatePassword(auth.currentUser, newPassword);
      return true;
    } catch (err: any) {
      console.error('Password update error:', err);
      return false;
    }
  };

  const updateAdminPassword = async (newPassword: string): Promise<boolean> => {
    return await changeAdminPassword(undefined, newPassword);
  };

  // Role Management
  const addUserRole = async (
    emailOrRole: string | Omit<UserRole, 'id'>,
    optionalRole?: 'Admin' | 'Editor' | 'Viewer'
  ) => {
    let newRole: UserRole;
    if (typeof emailOrRole === 'string') {
      newRole = {
        id: `role-${Date.now()}`,
        name: emailOrRole.split('@')[0],
        email: emailOrRole.trim(),
        role: optionalRole || 'Editor'
      };
    } else {
      newRole = {
        ...emailOrRole,
        id: `role-${Date.now()}`
      };
    }

    const updated: PortfolioData = {
      ...data,
      userRoles: [...data.userRoles, newRole]
    };
    return await syncToFirestore(updated);
  };

  const updateUserRole = async (id: string, updates: Partial<UserRole>) => {
    const updated: PortfolioData = {
      ...data,
      userRoles: data.userRoles.map((r) => (r.id === id ? { ...r, ...updates } : r))
    };
    return await syncToFirestore(updated);
  };

  const deleteUserRole = async (id: string) => {
    const updated: PortfolioData = {
      ...data,
      userRoles: data.userRoles.filter((r) => r.id !== id)
    };
    return await syncToFirestore(updated);
  };

  const removeUserRole = async (idOrEmail: string) => {
    const updated: PortfolioData = {
      ...data,
      userRoles: data.userRoles.filter((r) => r.id !== idOrEmail && r.email !== idOrEmail)
    };
    return await syncToFirestore(updated);
  };

  // Media Library
  const addMediaItem = async (
    name: string,
    url: string,
    type: 'image' | 'pdf' | 'icon',
    size: string = '500 KB',
    usedInSection?: string,
    altText?: string,
    description?: string
  ) => {
    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      name,
      url,
      type,
      size,
      uploadedAt: new Date().toISOString().substring(0, 10),
      usedInSection: usedInSection || 'General Studio Assets',
      altText: altText || name,
      description: description || ''
    };
    const updated: PortfolioData = {
      ...data,
      mediaLibrary: [newMedia, ...data.mediaLibrary]
    };
    return await syncToFirestore(updated);
  };

  const uploadFileToStorage = async (file: File, sectionName?: string): Promise<MediaItem> => {
    let finalUrl = '';
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
    const mediaType: 'image' | 'pdf' | 'icon' = isPdf ? 'pdf' : isSvg ? 'icon' : 'image';
    const readableSize = `${(file.size / 1024).toFixed(0)} KB`;

    try {
      const storageRef = ref(storage, `portfolio_assets/${Date.now()}_${file.name.replace(/\s+/g, '_')}`);
      const uploadResult = await uploadBytes(storageRef, file);
      finalUrl = await getDownloadURL(uploadResult.ref);
    } catch (err) {
      console.warn('Firebase Storage upload warning (falling back to object URL):', err);
      finalUrl = URL.createObjectURL(file);
    }

    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      name: file.name,
      url: finalUrl,
      type: mediaType,
      size: readableSize,
      uploadedAt: new Date().toISOString().substring(0, 10),
      usedInSection: sectionName || 'General Studio Assets',
      altText: file.name.replace(/\.[^/.]+$/, ''),
      description: `Uploaded ${file.name} to portfolio media library.`
    };

    const updated: PortfolioData = {
      ...data,
      mediaLibrary: [newMedia, ...data.mediaLibrary]
    };
    await syncToFirestore(updated);
    return newMedia;
  };

  const updateMediaItem = async (id: string, updates: Partial<MediaItem>) => {
    const updated: PortfolioData = {
      ...data,
      mediaLibrary: data.mediaLibrary.map((m) => (m.id === id ? { ...m, ...updates } : m))
    };
    return await syncToFirestore(updated);
  };

  const deleteMediaItem = async (id: string) => {
    const target = data.mediaLibrary.find(m => m.id === id);
    if (target && target.url.includes('firebasestorage.googleapis.com')) {
      try {
        const fileRef = ref(storage, target.url);
        await deleteObject(fileRef);
      } catch (err) {
        console.warn('Could not delete storage file object:', err);
      }
    }
    const updated: PortfolioData = {
      ...data,
      mediaLibrary: data.mediaLibrary.filter((m) => m.id !== id)
    };
    return await syncToFirestore(updated);
  };

  // SEO
  const updateSeoSettings = async (seoUpdates: Partial<SeoSettings>) => {
    const updated: PortfolioData = {
      ...data,
      seoSettings: { ...data.seoSettings, ...seoUpdates },
      seo: { ...data.seoSettings, ...seoUpdates }
    };
    return await syncToFirestore(updated);
  };

  const updateSeo = updateSeoSettings;

  const resetData = async () => {
    setData(initialPortfolioData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    await syncToFirestore(initialPortfolioData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        currentUser,
        isAdminLoggedIn,
        isAuthenticated,
        currentUserRole,
        authError,
        isAuthLoading,
        selectedProjectModal,
        setSelectedProjectModal,
        isResumeModalOpen,
        setIsResumeModalOpen,
        syncStatus,
        lastSyncedAt,
        updateHero,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        deleteEducation,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        reorderProjects,
        addExperience,
        updateExperience,
        deleteExperience,
        duplicateExperience,
        reorderExperience,
        updateSkills,
        addCertification,
        updateCertification,
        deleteCertification,
        duplicateCertification,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        duplicateAchievement,
        submitMessage,
        markMessageAsRead,
        markMessageAsUnread,
        deleteMessage,
        exportMessagesCSV,
        login,
        logout,
        changeAdminPassword,
        updateAdminPassword,
        addUserRole,
        updateUserRole,
        deleteUserRole,
        removeUserRole,
        addMediaItem,
        uploadFileToStorage,
        updateMediaItem,
        deleteMediaItem,
        updateSeoSettings,
        updateSeo,
        saveToCloud,
        resetData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
