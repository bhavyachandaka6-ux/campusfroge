import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  FileText,
  Edit3,
  Award,
  Code,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  X,
  Save,
  CheckCircle,
} from 'lucide-react';
import { CertificationItem, ProjectItem } from '../types';

export const StudentProfile: React.FC = () => {
  const { studentProfile, updateStudentProfile, setActiveTab } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    name: studentProfile.name,
    email: studentProfile.email,
    phone: studentProfile.phone,
    location: studentProfile.location,
    college: studentProfile.college,
    branch: studentProfile.branch,
    year: studentProfile.year,
    bio: studentProfile.bio,
    githubUrl: studentProfile.githubUrl,
    linkedinUrl: studentProfile.linkedinUrl,
    portfolioUrl: studentProfile.portfolioUrl,
    techSkillsString: studentProfile.technicalSkills.join(', '),
    softSkillsString: studentProfile.softSkills.join(', '),
    cgpa: studentProfile.education.cgpa,
    gradYear: studentProfile.education.gradYear,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      college: formData.college,
      branch: formData.branch,
      year: formData.year,
      bio: formData.bio,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
      portfolioUrl: formData.portfolioUrl,
      technicalSkills: formData.techSkillsString
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      softSkills: formData.softSkillsString
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      education: {
        ...studentProfile.education,
        college: formData.college,
        branch: formData.branch,
        cgpa: formData.cgpa,
        gradYear: formData.gradYear,
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Banner & Profile Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cover Strip */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-xs flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-4 gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={studentProfile.avatarUrl}
                  alt={studentProfile.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {studentProfile.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {studentProfile.branch} · {studentProfile.year}
                </p>
                <p className="text-xs text-indigo-600 font-semibold">{studentProfile.college}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              {studentProfile.githubUrl && (
                <a
                  href={studentProfile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {studentProfile.linkedinUrl && (
                <a
                  href={studentProfile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {studentProfile.portfolioUrl && (
                <a
                  href={studentProfile.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  title="Portfolio"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setActiveTab('resume')}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-2">
            {studentProfile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {studentProfile.email}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {studentProfile.phone}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {studentProfile.location}
            </span>
            <span>·</span>
            <span className="font-mono text-slate-700 font-semibold">
              CGPA: {studentProfile.education.cgpa}
            </span>
          </div>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Skills & Education & Resume */}
        <div className="lg:col-span-4 space-y-6">
          {/* Technical Skills */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Technical Skills</span>
              </h3>
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {studentProfile.technicalSkills.map((sk) => (
                <span
                  key={sk}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-800 rounded-md"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Soft Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {studentProfile.softSkills.map((sk) => (
                <span
                  key={sk}
                  className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Education Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Academic Education</span>
            </h3>
            <div className="text-xs space-y-2 text-slate-600">
              <div className="font-bold text-slate-900 text-sm">
                {studentProfile.education.degree}
              </div>
              <div>{studentProfile.education.college}</div>
              <div>Major: {studentProfile.education.branch}</div>
              <div className="flex justify-between text-slate-500 font-mono text-[11px] pt-1 border-t border-slate-100">
                <span>Graduation: {studentProfile.education.gradYear}</span>
                <span className="font-bold text-slate-800">
                  CGPA: {studentProfile.education.cgpa}
                </span>
              </div>
            </div>
          </div>

          {/* Attached Resume */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Primary Active Resume
            </h3>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-xs truncate max-w-[170px]">
                  <div className="font-semibold text-slate-900 truncate">
                    {studentProfile.resumeFileName}
                  </div>
                  <div className="text-[10px] text-slate-400">PDF · Verified for ATS</div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('resume')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Open
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Projects, Certifications, Experience, Achievements */}
        <div className="lg:col-span-8 space-y-6">
          {/* Projects */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Featured Projects</h3>
              <button
                onClick={() => setActiveTab('resume')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Manage in Resume Builder
              </button>
            </div>

            <div className="space-y-4">
              {studentProfile.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                    <div className="flex items-center gap-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-slate-800"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-indigo-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Certifications & Credentials</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studentProfile.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{cert.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{cert.issuer}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Issued {cert.date}</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Honors & Achievements</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 list-disc pl-5">
              {studentProfile.achievements.map((ach, idx) => (
                <li key={idx} className="leading-relaxed">
                  {ach}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Student Profile</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your contact details, academic credentials, and skill sets.
                </p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Bio / Headline</label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">College/University</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Branch / Degree</label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Current Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">CGPA</label>
                  <input
                    type="text"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Technical Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techSkillsString}
                  onChange={(e) => setFormData({ ...formData, techSkillsString: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Soft Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.softSkillsString}
                  onChange={(e) => setFormData({ ...formData, softSkillsString: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 -mx-6 -mb-6 flex justify-end gap-2 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
