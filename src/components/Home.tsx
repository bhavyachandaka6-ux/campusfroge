import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ArrowRight,
  Briefcase,
  BookOpen,
  Calendar,
  Users,
  Building2,
  Sparkles,
  MapPin,
  Clock,
  Bookmark,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const Home: React.FC = () => {
  const {
    setActiveTab,
    setSearchQuery,
    internships,
    courses,
    events,
    savedInternshipIds,
    toggleSaveInternship,
    applyToInternship,
    setSelectedSkillForLearning,
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSearch.trim()) {
      setActiveTab('internships');
      return;
    }
    setSearchQuery(localSearch.trim());
    setActiveTab('internships');
  };

  const featuredInternships = internships.filter((i) => i.featured).slice(0, 3);
  const popularCourses = courses.slice(0, 4);
  const upcomingEvents = events.filter((e) => e.featured || e.isOnline).slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-12 pb-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100/80 text-indigo-700 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The All-In-One University Career Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Build Your Skills. <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Find Your Opportunity.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Learn new skills, discover internships, join tech events, and build your career from one seamless student platform.
              </p>

              {/* Functional Search Bar */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl">
                <div className="relative flex items-center shadow-md rounded-xl overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 bg-white">
                  <div className="pl-4 text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="Search internships, skills, or opportunities..."
                    className="w-full py-3.5 pl-3 pr-28 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('internships')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Explore Internships</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Improve Your Skills</span>
                </button>

                <button
                  onClick={() => setActiveTab('skill-gap')}
                  className="px-4 py-2.5 text-indigo-700 hover:text-indigo-800 text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Analyze Skill Gap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group">
                <img
                  src="/src/assets/images/career_hero_showcase_1790581705121.jpg"
                  alt="Students learning and building together"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Graceful fallback container if asset fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-medium text-indigo-300 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Real-world career outcomes</span>
                  </div>
                  <h3 className="text-lg font-bold">Fast-track your tech career</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Direct access to verified tech internships, live competitions, and real skill readiness benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm text-left">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">48,500+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Active Students</div>
            <div className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <span>+1,200 joined this week</span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm text-left">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">1,250+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Verified Internships</div>
            <div className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <span>Average ₹42k/mo stipend</span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm text-left">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">180+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Interactive Courses</div>
            <div className="text-xs text-indigo-600 mt-2 font-medium flex items-center gap-1">
              <span>Hands-on labs & assessments</span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm text-left">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">420+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Hiring Partners</div>
            <div className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <span>Top product & tech companies</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Internships Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Featured Internships</h2>
            <p className="text-sm text-slate-500 mt-1">
              Hand-picked verified opportunities with competitive stipends and high conversion rates.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('internships')}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Internships</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredInternships.map((internship) => {
            const isSaved = savedInternshipIds.includes(internship.id);
            return (
              <div
                key={internship.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all text-left"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-lg ${internship.companyLogoBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}
                      >
                        {internship.companyInitials}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {internship.company}
                        </h4>
                        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">
                          {internship.title}
                        </h3>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaveInternship(internship.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Saved' : 'Save Internship'}
                    >
                      <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Clean unboxed metadata with subtle dots */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {internship.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-700">{internship.workMode}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {internship.duration}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {internship.description}
                  </p>

                  {/* Required skills */}
                  <div className="space-y-1.5 mb-5">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Required Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {internship.requiredSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 text-xs font-medium text-slate-700 bg-slate-100 rounded"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">Stipend</div>
                    <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                      {internship.stipend}
                    </div>
                  </div>
                  <button
                    onClick={() => applyToInternship(internship.id)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Popular Skills Section */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Popular Technical Skills</h2>
              <p className="text-sm text-slate-500 mt-1">
                Foundational and industry-level courses curated with step-by-step labs and assessments.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('skills')}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore All 11 Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow text-left"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium text-indigo-600">{course.category}</span>
                    <span className="text-slate-400">{course.level}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{course.name}</h3>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="text-xs text-slate-500 space-y-1 mb-4">
                    <div className="flex items-center justify-between">
                      <span>Curriculum:</span>
                      <span className="font-semibold text-slate-700 font-mono">{course.resources.length} Modules</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Duration:</span>
                      <span className="font-medium text-slate-700">{course.duration}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedSkillForLearning(course.id);
                    setActiveTab('skills');
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Start Learning</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Skill Gap Analyzer Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden text-left">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="px-3 py-1 bg-white/10 text-indigo-200 rounded-full text-xs font-semibold tracking-wide uppercase">
              Career Readiness Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Wondering if you are ready for your dream job?
            </h2>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Use our intelligent Skill Gap Analyzer. Select target roles like Web Developer, AI/ML Engineer, or Cloud Architect, see exactly which skills you already have, and bridge the gaps with tailored course modules.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('skill-gap')}
                className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Launch Skill Gap Analyzer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Hackathons and Workshops */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Upcoming Hackathons & Events
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Compete, network, and showcase projects in collegiate hackathons, contests, and technical workshops.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                    {evt.type}
                  </span>
                  <span className="text-xs text-slate-400">
                    Deadline: {evt.registrationDeadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {evt.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {evt.description}
                </p>

                {/* Event meta */}
                <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                {evt.prizePool && (
                  <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-800 font-medium mb-4">
                    🏆 {evt.prizePool}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">By {evt.organizer}</span>
                <button
                  onClick={() => setActiveTab('events')}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
