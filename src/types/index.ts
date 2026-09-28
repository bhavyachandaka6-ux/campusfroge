export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogoBg: string;
  companyInitials: string;
  location: string;
  workMode: WorkMode;
  duration: string;
  stipend: string;
  domain: string;
  requiredSkills: string[];
  deadline: string;
  postedDate: string;
  openings: number;
  description: string;
  responsibilities: string[];
  featured?: boolean;
}

export interface SkillResource {
  id: string;
  title: string;
  type: 'Video' | 'Documentation' | 'Hands-on Lab' | 'Practice Quiz';
  duration: string;
  url?: string;
  completed?: boolean;
}

export interface SkillCourse {
  id: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  enrolledStudents: number;
  rating: number;
  description: string;
  prerequisites: string[];
  resources: SkillResource[];
  tags: string[];
}

export interface EventItem {
  id: string;
  name: string;
  type: 'Hackathon' | 'Coding Contest' | 'Workshop' | 'Webinar' | 'Tech Event';
  organizer: string;
  date: string;
  location: string;
  isOnline: boolean;
  registrationDeadline: string;
  prizePool?: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface CareerRole {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  openPositions: string;
  requiredSkills: string[];
  recommendedSkills: string[];
  growthRate: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  college: string;
  branch: string;
  year: string;
  cgpa: string;
  gradYear: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  college: string;
  branch: string;
  year: string;
  bio: string;
  phone: string;
  location: string;
  technicalSkills: string[];
  softSkills: string[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  achievements: string[];
  education: EducationItem;
  resumeFileName: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

export interface InternshipApplication {
  id: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offered';
  coverNote?: string;
}

export interface UserSkillProgress {
  skillId: string;
  progressPercent: number; // 0 - 100
  completedResources: string[]; // resource ids
  lastAccessed: string;
}
