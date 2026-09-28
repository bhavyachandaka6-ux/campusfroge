import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Download,
  Printer,
  Sparkles,
  Plus,
  Trash2,
  RefreshCw,
  Check,
  Eye,
  Edit3,
  FileText,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
} from 'lucide-react';
import { ProjectItem, CertificationItem, ExperienceItem } from '../types';

export const ResumeBuilder: React.FC = () => {
  const { studentProfile, updateStudentProfile, addToast } = useApp();

  // Local editable resume state initialized from student profile
  const [personal, setPersonal] = useState({
    name: studentProfile.name,
    email: studentProfile.email,
    phone: studentProfile.phone,
    location: studentProfile.location,
    bio: studentProfile.bio,
    github: studentProfile.githubUrl,
    linkedin: studentProfile.linkedinUrl,
    portfolio: studentProfile.portfolioUrl,
  });

  const [education, setEducation] = useState({
    degree: studentProfile.education.degree,
    college: studentProfile.education.college,
    branch: studentProfile.education.branch,
    year: studentProfile.education.year,
    cgpa: studentProfile.education.cgpa,
    gradYear: studentProfile.education.gradYear,
  });

  const [techSkills, setTechSkills] = useState<string>(
    studentProfile.technicalSkills.join(', ')
  );
  const [softSkills, setSoftSkills] = useState<string>(
    studentProfile.softSkills.join(', ')
  );

  const [projects, setProjects] = useState<ProjectItem[]>(studentProfile.projects);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(
    studentProfile.experiences
  );
  const [certifications, setCertifications] = useState<CertificationItem[]>(
    studentProfile.certifications
  );
  const [achievements, setAchievements] = useState<string[]>(
    studentProfile.achievements
  );

  const [viewMode, setViewMode] = useState<'split' | 'edit-only' | 'preview-only'>('split');

  const handlePrint = () => {
    window.print();
  };

  const handleSyncToProfile = () => {
    updateStudentProfile({
      name: personal.name,
      email: personal.email,
      phone: personal.phone,
      location: personal.location,
      bio: personal.bio,
      githubUrl: personal.github,
      linkedinUrl: personal.linkedin,
      portfolioUrl: personal.portfolio,
      education,
      technicalSkills: techSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      softSkills: softSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      projects,
      experiences,
      certifications,
      achievements,
    });
    addToast('Synced to Profile', 'Resume data synchronized with your student profile.');
  };

  const addProject = () => {
    const newProj: ProjectItem = {
      id: 'proj_' + Date.now(),
      title: 'New Innovation Project',
      description: 'Built a full-stack solution utilizing modern component frameworks and automated tests.',
      technologies: ['React', 'TypeScript', 'Node.js'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.app',
    };
    setProjects([...projects, newProj]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: 'exp_' + Date.now(),
      company: 'Tech Solutions Inc.',
      role: 'Software Engineering Intern',
      duration: 'Summer 2025 (3 mos)',
      location: 'Remote',
      description: 'Assisted in building responsive features and writing unit test coverage.',
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const addCertification = () => {
    const newCert: CertificationItem = {
      id: 'cert_' + Date.now(),
      title: 'Industry Specialist Certification',
      issuer: 'Cloud Provider / Academy',
      date: '2026',
    };
    setCertifications([...certifications, newCert]);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  const addAchievement = () => {
    setAchievements([...achievements, 'New academic or competitive honor']);
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, idx) => idx !== index));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Top Action Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Professional Resume Builder
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              ATS-standard formatting, auto-populated with your university achievements and projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View mode buttons */}
            <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === 'split' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode('edit-only')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === 'edit-only' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Editor Only
              </button>
              <button
                onClick={() => setViewMode('preview-only')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === 'preview-only' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Preview Only
              </button>
            </div>

            <button
              onClick={handleSyncToProfile}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync to Profile</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF / Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form */}
        {(viewMode === 'split' || viewMode === 'edit-only') && (
          <div
            className={`space-y-6 no-print ${
              viewMode === 'split' ? 'lg:col-span-5' : 'lg:col-span-12'
            }`}
          >
            {/* Personal Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                1. Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={personal.name}
                    onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={personal.location}
                    onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="text-xs">
                <label className="block text-slate-600 font-semibold mb-1">Professional Summary</label>
                <textarea
                  rows={2}
                  value={personal.bio}
                  onChange={(e) => setPersonal({ ...personal, bio: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={personal.github}
                    onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={personal.linkedin}
                    onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Portfolio</label>
                  <input
                    type="text"
                    value={personal.portfolio}
                    onChange={(e) => setPersonal({ ...personal, portfolio: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                2. Education
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Degree</label>
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">College/University</label>
                  <input
                    type="text"
                    value={education.college}
                    onChange={(e) => setEducation({ ...education, college: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Branch / Major</label>
                  <input
                    type="text"
                    value={education.branch}
                    onChange={(e) => setEducation({ ...education, branch: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">CGPA / Percentage</label>
                  <input
                    type="text"
                    value={education.cgpa}
                    onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={education.gradYear}
                    onChange={(e) => setEducation({ ...education, gradYear: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                3. Skills (Comma Separated)
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Technical Skills
                  </label>
                  <input
                    type="text"
                    value={techSkills}
                    onChange={(e) => setTechSkills(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Soft Skills</label>
                  <input
                    type="text"
                    value={softSkills}
                    onChange={(e) => setSoftSkills(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  4. Projects ({projects.length})
                </h3>
                <button
                  type="button"
                  onClick={addProject}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {projects.map((proj, idx) => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-lg space-y-2 text-xs relative">
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="absolute right-2 top-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-0.5">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx].title = e.target.value;
                        setProjects(updated);
                      }}
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx].description = e.target.value;
                        setProjects(updated);
                      }}
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Internships / Experience */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  5. Internships & Experience
                </h3>
                <button
                  type="button"
                  onClick={addExperience}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              {experiences.map((exp, idx) => (
                <div key={exp.id} className="p-3 bg-slate-50 rounded-lg space-y-2 text-xs relative">
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="absolute right-2 top-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-0.5">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].company = e.target.value;
                          setExperiences(updated);
                        }}
                        className="w-full p-1.5 bg-white border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-0.5">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].role = e.target.value;
                          setExperiences(updated);
                        }}
                        className="w-full p-1.5 bg-white border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-0.5">Key Contributions</label>
                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].description = e.target.value;
                        setExperiences(updated);
                      }}
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications & Achievements */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  6. Certifications & Achievements
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={addCertification}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    + Cert
                  </button>
                  <button
                    type="button"
                    onClick={addAchievement}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    + Honor
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {certifications.map((cert, idx) => (
                  <div key={cert.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cert.title}
                      onChange={(e) => {
                        const updated = [...certifications];
                        updated[idx].title = e.target.value;
                        setCertifications(updated);
                      }}
                      className="flex-1 p-1.5 border border-slate-300 rounded"
                      placeholder="Certification title"
                    />
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => {
                        const updated = [...certifications];
                        updated[idx].issuer = e.target.value;
                        setCertifications(updated);
                      }}
                      className="w-32 p-1.5 border border-slate-300 rounded"
                      placeholder="Issuer"
                    />
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={ach}
                      onChange={(e) => {
                        const updated = [...achievements];
                        updated[idx] = e.target.value;
                        setAchievements(updated);
                      }}
                      className="flex-1 p-1.5 border border-slate-300 rounded"
                      placeholder="Achievement summary"
                    />
                    <button
                      type="button"
                      onClick={() => removeAchievement(idx)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live ATS Resume Preview */}
        {(viewMode === 'split' || viewMode === 'preview-only') && (
          <div
            className={`sticky top-20 ${
              viewMode === 'split' ? 'lg:col-span-7' : 'lg:col-span-12'
            }`}
          >
            <div className="flex items-center justify-between mb-2 text-xs text-slate-500 no-print">
              <span className="font-semibold uppercase tracking-wider text-slate-700">
                Live ATS Resume Preview (A4 Printable)
              </span>
              <span className="font-mono">Clean White Standard</span>
            </div>

            {/* Printable Paper Canvas */}
            <div
              id="resume-printable-area"
              className="bg-white border border-slate-300 shadow-xl rounded-lg p-8 sm:p-10 min-h-[840px] text-slate-900 leading-relaxed font-sans"
            >
              {/* Header */}
              <div className="text-center border-b-2 border-slate-800 pb-4 mb-4">
                <h1 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900">
                  {personal.name || 'Student Name'}
                </h1>
                <div className="text-[11px] text-slate-600 mt-1 flex flex-wrap justify-center items-center gap-2 font-medium">
                  {personal.phone && <span>{personal.phone}</span>}
                  {personal.phone && personal.email && <span>|</span>}
                  {personal.email && <span>{personal.email}</span>}
                  {personal.location && <span>|</span>}
                  {personal.location && <span>{personal.location}</span>}
                  {personal.linkedin && <span>|</span>}
                  {personal.linkedin && (
                    <span className="text-indigo-700">{personal.linkedin}</span>
                  )}
                  {personal.github && <span>|</span>}
                  {personal.github && (
                    <span className="text-indigo-700">{personal.github}</span>
                  )}
                </div>
                {personal.bio && (
                  <p className="text-xs text-slate-700 mt-2 text-left max-w-3xl mx-auto italic">
                    {personal.bio}
                  </p>
                )}
              </div>

              {/* Education */}
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                  Education
                </h2>
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{education.college}</div>
                    <div className="text-slate-700">
                      {education.degree} in {education.branch}
                    </div>
                  </div>
                  <div className="text-right text-slate-600 font-mono text-[11px]">
                    <div>Expected {education.gradYear}</div>
                    <div className="font-semibold text-slate-900">CGPA: {education.cgpa}</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                  Technical & Professional Skills
                </h2>
                <div className="text-xs space-y-1">
                  <div>
                    <span className="font-semibold text-slate-900">Technical Skills: </span>
                    <span className="text-slate-700">{techSkills}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Soft Skills: </span>
                    <span className="text-slate-700">{softSkills}</span>
                  </div>
                </div>
              </div>

              {/* Internships & Experience */}
              {experiences.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                    Experience & Internships
                  </h2>
                  <div className="space-y-3">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>
                            {exp.role} · <span className="font-medium text-slate-700">{exp.company}</span>
                          </span>
                          <span className="font-mono text-[11px] text-slate-500 font-normal">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-slate-700 text-[11.5px] mt-0.5 leading-relaxed">
                          • {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                    Projects
                  </h2>
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>
                            {proj.title}
                            {proj.technologies && (
                              <span className="font-normal text-slate-500 text-[11px] ml-2 font-mono">
                                ({proj.technologies.join(', ')})
                              </span>
                            )}
                          </span>
                          {proj.liveUrl && (
                            <span className="text-indigo-700 text-[10px] font-mono">
                              {proj.liveUrl.replace('https://', '')}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-700 text-[11.5px] mt-0.5 leading-relaxed">
                          • {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications & Achievements */}
              {(certifications.length > 0 || achievements.length > 0) && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                    Certifications & Key Honors
                  </h2>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 text-[11.5px]">
                    {certifications.map((c) => (
                      <li key={c.id}>
                        <span className="font-semibold text-slate-900">{c.title}</span> – {c.issuer}{' '}
                        <span className="font-mono text-slate-400">({c.date})</span>
                      </li>
                    ))}
                    {achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
