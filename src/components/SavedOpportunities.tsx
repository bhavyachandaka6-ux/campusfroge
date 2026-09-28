import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bookmark,
  Briefcase,
  BookOpen,
  Calendar,
  Trash2,
  ArrowRight,
  ExternalLink,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
} from 'lucide-react';

export const SavedOpportunities: React.FC = () => {
  const {
    savedInternshipIds,
    toggleSaveInternship,
    savedCourseIds,
    toggleSaveCourse,
    savedEventIds,
    toggleSaveEvent,
    internships,
    courses,
    events,
    setActiveTab,
    applyToInternship,
    applications,
    registerForEvent,
    registeredEventIds,
    setSelectedSkillForLearning,
  } = useApp();

  const [activeTab, setActiveSubTab] = useState<'internships' | 'courses' | 'events'>('internships');

  const savedInternshipsList = internships.filter((i) => savedInternshipIds.includes(i.id));
  const savedCoursesList = courses.filter((c) => savedCourseIds.includes(c.id));
  const savedEventsList = events.filter((e) => savedEventIds.includes(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Bookmarks</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Saved Opportunities
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Quickly revisit saved internships, learning roadmaps, and tech hackathons.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {savedInternshipsList.length + savedCoursesList.length + savedEventsList.length} Total Bookmarked Items
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="mt-6 flex items-center gap-2 border-b border-slate-100 pb-0">
          <button
            onClick={() => setActiveSubTab('internships')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'internships'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Saved Internships ({savedInternshipsList.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('courses')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Saved Courses ({savedCoursesList.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('events')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'events'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Saved Events ({savedEventsList.length})</span>
          </button>
        </div>
      </div>

      {/* Content for Internships */}
      {activeTab === 'internships' && (
        <div>
          {savedInternshipsList.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No saved internships yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore the internship portal and bookmark roles that match your career goals.
              </p>
              <button
                onClick={() => setActiveTab('internships')}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Browse Internships
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedInternshipsList.map((internship) => {
                const isApplied = applications.some((a) => a.internshipId === internship.id);
                return (
                  <div
                    key={internship.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow text-left"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg ${internship.companyLogoBg} text-white font-bold flex items-center justify-center text-xs shadow-xs`}
                          >
                            {internship.companyInitials}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-500">
                              {internship.company}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                              {internship.title}
                            </h3>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSaveInternship(internship.id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                        <span>{internship.location}</span>
                        <span>·</span>
                        <span className="font-medium text-slate-700">{internship.workMode}</span>
                        <span>·</span>
                        <span className="font-mono text-emerald-700 font-semibold">
                          {internship.stipend}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {internship.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        Deadline: {internship.deadline}
                      </span>
                      {isApplied ? (
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => applyToInternship(internship.id)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Content for Courses */}
      {activeTab === 'courses' && (
        <div>
          {savedCoursesList.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No saved courses</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Save foundational or advanced learning roadmaps to master at your own pace.
              </p>
              <button
                onClick={() => setActiveTab('skills')}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Explore Skills
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCoursesList.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow text-left"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                        {course.category}
                      </span>
                      <button
                        onClick={() => toggleSaveCourse(course.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1">{course.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4">{course.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">{course.duration}</span>
                    <button
                      onClick={() => {
                        setSelectedSkillForLearning(course.id);
                        setActiveTab('skills');
                      }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content for Events */}
      {activeTab === 'events' && (
        <div>
          {savedEventsList.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No saved events</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Bookmark hackathons, coding contests, and workshops to register before deadlines.
              </p>
              <button
                onClick={() => setActiveTab('events')}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Explore Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEventsList.map((event) => {
                const isRegistered = registeredEventIds.includes(event.id);
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow text-left"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {event.type}
                        </span>
                        <button
                          onClick={() => toggleSaveEvent(event.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-1">{event.name}</h3>
                      <div className="text-xs text-slate-500 mb-3">By {event.organizer}</div>

                      <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        Reg: {event.registrationDeadline}
                      </span>
                      {isRegistered ? (
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Registered
                        </span>
                      ) : (
                        <button
                          onClick={() => registerForEvent(event.id)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
