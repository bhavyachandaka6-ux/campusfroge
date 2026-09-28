import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  Internship,
  SkillCourse,
  EventItem,
  CareerRole,
  InternshipApplication,
  UserSkillProgress,
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  MOCK_INTERNSHIPS,
  MOCK_SKILL_COURSES,
  MOCK_EVENTS,
  CAREER_ROLES,
  INITIAL_USER_APPLICATIONS,
  INITIAL_SKILL_PROGRESS,
} from '../data/mockData';

export type NavTab =
  | 'home'
  | 'profile'
  | 'internships'
  | 'skills'
  | 'skill-gap'
  | 'events'
  | 'resume'
  | 'saved'
  | 'dashboard';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRoleForGap: string;
  setSelectedRoleForGap: (roleId: string) => void;
  selectedSkillForLearning: string | null;
  setSelectedSkillForLearning: (skillId: string | null) => void;

  studentProfile: StudentProfile;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;

  internships: Internship[];
  courses: SkillCourse[];
  events: EventItem[];
  careerRoles: CareerRole[];

  savedInternshipIds: string[];
  toggleSaveInternship: (id: string) => void;

  savedCourseIds: string[];
  toggleSaveCourse: (id: string) => void;

  savedEventIds: string[];
  toggleSaveEvent: (id: string) => void;

  registeredEventIds: string[];
  registerForEvent: (id: string) => void;

  applications: InternshipApplication[];
  applyToInternship: (internshipId: string, coverNote?: string) => void;

  skillProgress: Record<string, UserSkillProgress>;
  updateSkillResource: (skillId: string, resourceId: string, completed: boolean) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (val: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot' | 'profile-setup';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot' | 'profile-setup') => void;
  loginUser: (email: string) => void;
  logoutUser: () => void;

  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<NavTab>(() => {
    return (localStorage.getItem('campus_active_tab') as NavTab) || 'home';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleForGap, setSelectedRoleForGap] = useState('web-dev');
  const [selectedSkillForLearning, setSelectedSkillForLearning] = useState<string | null>(null);

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('campus_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_STUDENT_PROFILE;
  });

  const [savedInternshipIds, setSavedInternshipIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('campus_saved_internships');
    return saved ? JSON.parse(saved) : ['int_01', 'int_02'];
  });

  const [savedCourseIds, setSavedCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('campus_saved_courses');
    return saved ? JSON.parse(saved) : ['react', 'data-structures'];
  });

  const [savedEventIds, setSavedEventIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('campus_saved_events');
    return saved ? JSON.parse(saved) : ['ev_01', 'ev_03'];
  });

  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('campus_reg_events');
    return saved ? JSON.parse(saved) : ['ev_01'];
  });

  const [applications, setApplications] = useState<InternshipApplication[]>(() => {
    const saved = localStorage.getItem('campus_applications');
    return saved ? JSON.parse(saved) : INITIAL_USER_APPLICATIONS;
  });

  const [skillProgress, setSkillProgress] = useState<Record<string, UserSkillProgress>>(() => {
    const saved = localStorage.getItem('campus_skill_progress');
    return saved ? JSON.parse(saved) : INITIAL_SKILL_PROGRESS;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('campus_is_logged_in') !== 'false';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot' | 'profile-setup'>('login');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const setActiveTab = (tab: NavTab) => {
    setActiveTabState(tab);
    localStorage.setItem('campus_active_tab', tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('campus_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem('campus_saved_internships', JSON.stringify(savedInternshipIds));
  }, [savedInternshipIds]);

  useEffect(() => {
    localStorage.setItem('campus_saved_courses', JSON.stringify(savedCourseIds));
  }, [savedCourseIds]);

  useEffect(() => {
    localStorage.setItem('campus_saved_events', JSON.stringify(savedEventIds));
  }, [savedEventIds]);

  useEffect(() => {
    localStorage.setItem('campus_reg_events', JSON.stringify(registeredEventIds));
  }, [registeredEventIds]);

  useEffect(() => {
    localStorage.setItem('campus_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('campus_skill_progress', JSON.stringify(skillProgress));
  }, [skillProgress]);

  useEffect(() => {
    localStorage.setItem('campus_is_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateStudentProfile = (partial: Partial<StudentProfile>) => {
    setStudentProfile((prev) => {
      const updated = { ...prev, ...partial };
      return updated;
    });
    addToast('Profile Updated', 'Your student profile details have been saved.');
  };

  const toggleSaveInternship = (id: string) => {
    setSavedInternshipIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Removed from Saved', 'Internship removed from your saved list.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Opportunity Saved', 'Internship bookmarked in your Saved Opportunities.');
        return [...prev, id];
      }
    });
  };

  const toggleSaveCourse = (id: string) => {
    setSavedCourseIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Removed Course', 'Course removed from saved courses.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Course Saved', 'Course saved for future reference.');
        return [...prev, id];
      }
    });
  };

  const toggleSaveEvent = (id: string) => {
    setSavedEventIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Event Removed', 'Event removed from bookmarks.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Event Saved', 'Event added to your Saved Opportunities.');
        return [...prev, id];
      }
    });
  };

  const registerForEvent = (id: string) => {
    if (registeredEventIds.includes(id)) {
      addToast('Already Registered', 'You are already registered for this event.', 'info');
      return;
    }
    setRegisteredEventIds((prev) => [...prev, id]);
    const eventObj = MOCK_EVENTS.find((e) => e.id === id);
    addToast(
      'Registration Confirmed!',
      `You are successfully registered for "${eventObj?.name || 'Event'}". Check your dashboard.`
    );
  };

  const applyToInternship = (internshipId: string, coverNote?: string) => {
    const existing = applications.find((a) => a.internshipId === internshipId);
    const internship = MOCK_INTERNSHIPS.find((i) => i.id === internshipId);
    if (existing) {
      addToast('Application Active', `You already submitted an application to ${existing.company}.`, 'info');
      return;
    }

    const newApp: InternshipApplication = {
      id: 'app_' + Date.now(),
      internshipId,
      internshipTitle: internship?.title || 'Engineering Intern',
      company: internship?.company || 'Tech Partner',
      appliedDate: 'Today',
      status: 'Applied',
      coverNote: coverNote || 'Excited to apply with my updated CampusForge resume.',
    };

    setApplications((prev) => [newApp, ...prev]);
    addToast(
      'Application Submitted!',
      `Your application to ${newApp.company} for ${newApp.internshipTitle} is now pending review.`
    );
  };

  const updateSkillResource = (skillId: string, resourceId: string, completed: boolean) => {
    setSkillProgress((prev) => {
      const current = prev[skillId] || {
        skillId,
        progressPercent: 0,
        completedResources: [],
        lastAccessed: 'Today',
      };

      let newCompleted: string[];
      if (completed) {
        newCompleted = Array.from(new Set([...current.completedResources, resourceId]));
      } else {
        newCompleted = current.completedResources.filter((r) => r !== resourceId);
      }

      const course = MOCK_SKILL_COURSES.find((c) => c.id === skillId);
      const totalResources = course?.resources.length || 4;
      const progressPercent = Math.min(100, Math.round((newCompleted.length / totalResources) * 100));

      return {
        ...prev,
        [skillId]: {
          skillId,
          progressPercent,
          completedResources: newCompleted,
          lastAccessed: 'Just now',
        },
      };
    });

    addToast('Progress Updated', completed ? 'Module marked as completed!' : 'Module marked in-progress.');
  };

  const loginUser = (email: string) => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    addToast('Welcome Back!', `Signed in as ${email}`);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    addToast('Signed Out', 'You have been logged out.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedRoleForGap,
        setSelectedRoleForGap,
        selectedSkillForLearning,
        setSelectedSkillForLearning,
        studentProfile,
        updateStudentProfile,
        internships: MOCK_INTERNSHIPS,
        courses: MOCK_SKILL_COURSES,
        events: MOCK_EVENTS,
        careerRoles: CAREER_ROLES,
        savedInternshipIds,
        toggleSaveInternship,
        savedCourseIds,
        toggleSaveCourse,
        savedEventIds,
        toggleSaveEvent,
        registeredEventIds,
        registerForEvent,
        applications,
        applyToInternship,
        skillProgress,
        updateSkillResource,
        isLoggedIn,
        setIsLoggedIn,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        loginUser,
        logoutUser,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
