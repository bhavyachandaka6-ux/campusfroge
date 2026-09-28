import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Briefcase,
  BookOpen,
  Calendar,
  Award,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  User,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    studentProfile,
    applications,
    skillProgress,
    courses,
    events,
    registeredEventIds,
    savedInternshipIds,
    internships,
    careerRoles,
    setActiveTab,
    setSelectedRoleForGap,
    setSelectedSkillForLearning,
  } = useApp();

  // Profile completion calculation
  const profileSteps = [
    { label: 'Basic Info & Photo', done: Boolean(studentProfile.name && studentProfile.avatarUrl) },
    { label: 'Academic Credentials', done: Boolean(studentProfile.education.cgpa) },
    { label: 'Technical Skills (>= 5)', done: studentProfile.technicalSkills.length >= 5 },
    { label: 'Featured Projects (>= 2)', done: studentProfile.projects.length >= 2 },
    { label: 'Verified Certifications', done: studentProfile.certifications.length > 0 },
    { label: 'Portfolio / GitHub', done: Boolean(studentProfile.githubUrl || studentProfile.portfolioUrl) },
  ];

  const completedStepsCount = profileSteps.filter((s) => s.done).length;
  const profileCompletionPercent = Math.round((completedStepsCount / profileSteps.length) * 100);

  // Active courses with progress > 0
  const activeCourseProgressList = courses
    .filter((c) => (skillProgress[c.id]?.progressPercent || 0) > 0)
    .map((c) => ({
      course: c,
      progress: skillProgress[c.id],
    }))
    .slice(0, 4);

  // Registered events details
  const registeredEventsList = events.filter((e) => registeredEventIds.includes(e.id));

  // Saved internships details
  const savedInternshipsList = internships.filter((i) => savedInternshipIds.includes(i.id)).slice(0, 3);

  // Skill readiness computation for each role
  const roleReadinessScores = careerRoles.map((role) => {
    const studentSkillsLower = studentProfile.technicalSkills.map((s) => s.toLowerCase());
    const matched = role.requiredSkills.filter((req) => {
      const lower = req.toLowerCase();
      return studentSkillsLower.some((s) => s === lower || lower.includes(s) || s.includes(lower));
    });
    const percent = Math.round((matched.length / role.requiredSkills.length) * 100);
    return {
      ...role,
      matchedCount: matched.length,
      totalCount: role.requiredSkills.length,
      percent,
    };
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Interview Scheduled':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Under Review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={studentProfile.avatarUrl}
              alt={studentProfile.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Welcome back, {studentProfile.name}
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  Student Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {studentProfile.college} · {studentProfile.branch} ({studentProfile.year})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              Resume Builder
            </button>
          </div>
        </div>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Profile Completion */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-700">Profile Completion</span>
              <span className="font-mono font-bold text-indigo-600">{profileCompletionPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${profileCompletionPercent}%` }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between items-center">
            <span>{completedStepsCount} of {profileSteps.length} milestones complete</span>
            <button
              onClick={() => setActiveTab('profile')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Finish
            </button>
          </div>
        </div>

        {/* Technical Skills Mastered */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-1">Skills Mastered</span>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {studentProfile.technicalSkills.length}
            </div>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between items-center mt-3">
            <span className="text-emerald-600 font-semibold">+2 added this month</span>
            <button
              onClick={() => setActiveTab('skills')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Add more
            </button>
          </div>
        </div>

        {/* Active Applications */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-1">Internship Applications</span>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {applications.length}
            </div>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between items-center mt-3">
            <span className="text-indigo-600 font-semibold">
              {applications.filter((a) => a.status === 'Shortlisted').length} Shortlisted
            </span>
            <button
              onClick={() => setActiveTab('internships')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Explore
            </button>
          </div>
        </div>

        {/* Registered Events */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-1">Upcoming Events</span>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {registeredEventsList.length}
            </div>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between items-center mt-3">
            <span className="text-slate-600">Next: Oct 18</span>
            <button
              onClick={() => setActiveTab('events')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              View
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Applications Tracker & Registered Events */}
        <div className="lg:col-span-8 space-y-8">
          {/* Applications Pipeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Internship Applications Pipeline</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time status updates from university partner recruitment portals.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('internships')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Apply to More
              </button>
            </div>

            {applications.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                You haven't submitted any internship applications yet.
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-500">{app.company}</div>
                      <div className="text-sm font-bold text-slate-900">{app.internshipTitle}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Applied: {app.appliedDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Course Progress */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Learning Roadmaps</h3>
                <p className="text-xs text-slate-500 mt-0.5">Continue where you left off in your technical tracks.</p>
              </div>
              <button
                onClick={() => setActiveTab('skills')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                All Courses
              </button>
            </div>

            {activeCourseProgressList.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No active courses started. Explore the Skill Development page to enroll!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCourseProgressList.map(({ course, progress }) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-semibold text-indigo-600 uppercase">
                          {course.category}
                        </span>
                        <span className="font-mono font-bold text-xs text-slate-900">
                          {progress.progressPercent}%
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2">{course.name}</h4>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-3">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${progress.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSkillForLearning(course.id);
                        setActiveTab('skills');
                      }}
                      className="w-full py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-800 transition-colors"
                    >
                      Resume Learning
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Registered Events */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Your Registered Tech Events</h3>
              <button
                onClick={() => setActiveTab('events')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Browse Calendar
              </button>
            </div>

            {registeredEventsList.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">No events registered yet.</p>
            ) : (
              <div className="space-y-3">
                {registeredEventsList.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {evt.type}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{evt.name}</h4>
                      <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                        {evt.date} · {evt.location}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 rounded-md shrink-0">
                      Confirmed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Skill Readiness Across Career Roles */}
        <div className="lg:col-span-4 space-y-6">
          {/* Role Readiness Scoreboard */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Job Market Readiness</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Target Role Readiness</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against the skills currently in your profile.
              </p>
            </div>

            <div className="space-y-4">
              {roleReadinessScores.map((role) => (
                <div key={role.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <button
                      onClick={() => {
                        setSelectedRoleForGap(role.id);
                        setActiveTab('skill-gap');
                      }}
                      className="font-bold text-slate-800 hover:text-indigo-600 text-left transition-colors"
                    >
                      {role.title}
                    </button>
                    <span className="font-mono font-bold text-slate-900">{role.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        role.percent >= 75
                          ? 'bg-emerald-500'
                          : role.percent >= 50
                          ? 'bg-indigo-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${role.percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>
                      {role.matchedCount} of {role.totalCount} skills
                    </span>
                    <button
                      onClick={() => {
                        setSelectedRoleForGap(role.id);
                        setActiveTab('skill-gap');
                      }}
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      Analyze Gap →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('skill-gap')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Full Skill Gap Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Saved Opportunities Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Saved Internships ({savedInternshipsList.length})
              </h3>
              <button
                onClick={() => setActiveTab('saved')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View All
              </button>
            </div>

            {savedInternshipsList.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">No saved internships.</p>
            ) : (
              <div className="space-y-2">
                {savedInternshipsList.map((i) => (
                  <div
                    key={i.id}
                    className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 truncate max-w-[170px]">
                        {i.title}
                      </div>
                      <div className="text-[10px] text-slate-500">{i.company}</div>
                    </div>
                    <button
                      onClick={() => setActiveTab('internships')}
                      className="text-indigo-600 font-semibold text-[11px]"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
