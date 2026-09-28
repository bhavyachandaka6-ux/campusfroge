import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SkillCourse, SkillResource } from '../types';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileCode,
  FlaskConical,
  Award,
  Clock,
  Users,
  ChevronRight,
  X,
  Bookmark,
  Sparkles,
} from 'lucide-react';

export const SkillDevelopment: React.FC = () => {
  const {
    courses,
    skillProgress,
    updateSkillResource,
    savedCourseIds,
    toggleSaveCourse,
    selectedSkillForLearning,
    setSelectedSkillForLearning,
  } = useApp();

  const [levelFilter, setLevelFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [skillSearch, setSkillSearch] = useState('');
  const [activeCourseModal, setActiveCourseModal] = useState<SkillCourse | null>(null);

  // If a skill was selected via Home or Skill Gap Analyzer, open its modal directly
  useEffect(() => {
    if (selectedSkillForLearning) {
      const match = courses.find(
        (c) =>
          c.id.toLowerCase() === selectedSkillForLearning.toLowerCase() ||
          c.name.toLowerCase() === selectedSkillForLearning.toLowerCase()
      );
      if (match) {
        setActiveCourseModal(match);
      }
      setSelectedSkillForLearning(null);
    }
  }, [selectedSkillForLearning, courses, setSelectedSkillForLearning]);

  const filteredCourses = courses.filter((course) => {
    if (levelFilter !== 'All' && course.level !== levelFilter) {
      return false;
    }
    if (skillSearch.trim()) {
      const q = skillSearch.toLowerCase();
      const matchName = course.name.toLowerCase().includes(q);
      const matchCat = course.category.toLowerCase().includes(q);
      const matchTag = course.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchTag) return false;
    }
    return true;
  });

  const getResourceIcon = (type: SkillResource['type']) => {
    switch (type) {
      case 'Video':
        return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case 'Documentation':
        return <FileCode className="w-4 h-4 text-emerald-500" />;
      case 'Hands-on Lab':
        return <FlaskConical className="w-4 h-4 text-purple-500" />;
      case 'Practice Quiz':
        return <Award className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Skill Development Roadmaps
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Curated masterclasses with hands-on labs, guided tutorials, and interactive module tracking.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 font-mono">
              {courses.length} Standard Curriculum Tracks
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search by skill name (e.g. C++, React, AI/ML, Python)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full md:w-auto text-xs font-medium">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`flex-1 md:flex-none px-3 py-1.5 rounded transition-colors ${
                  levelFilter === lvl
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progressInfo = skillProgress[course.id] || {
            progressPercent: 0,
            completedResources: [],
          };
          const isSaved = savedCourseIds.includes(course.id);
          const isStarted = progressInfo.progressPercent > 0;

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all text-left group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                      {course.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {course.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        course.level === 'Beginner'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : course.level === 'Intermediate'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                          : 'bg-purple-50 text-purple-700 border border-purple-200/60'
                      }`}
                    >
                      {course.level}
                    </span>
                    <button
                      onClick={() => toggleSaveCourse(course.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Saved Course' : 'Save Course'}
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-5 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Your Progress</span>
                    <span className="font-mono font-bold text-indigo-600">
                      {progressInfo.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressInfo.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>
                      {progressInfo.completedResources.length} of {course.resources.length} Modules Done
                    </span>
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-mono tabular-nums">{course.enrolledStudents.toLocaleString()}</span> learners
                </div>

                <button
                  onClick={() => setActiveCourseModal(course)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    isStarted
                      ? 'bg-slate-900 hover:bg-slate-800 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isStarted ? 'Continue Learning' : 'Start Learning'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Course Curriculum Drawer / Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                    {activeCourseModal.category}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-medium text-slate-600">{activeCourseModal.level}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{activeCourseModal.name} Roadmap</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-lg">{activeCourseModal.description}</p>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Course Content Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Progress Summary Card */}
              <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-900">Your Current Mastery</div>
                  <div className="text-xs text-indigo-700 mt-0.5">
                    Check off resources as you complete them to track your learning journey.
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-indigo-600 font-mono">
                    {skillProgress[activeCourseModal.id]?.progressPercent || 0}%
                  </span>
                </div>
              </div>

              {/* Module List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Curriculum Modules & Labs
                </h4>

                {activeCourseModal.resources.map((resource, idx) => {
                  const completedList = skillProgress[activeCourseModal.id]?.completedResources || [];
                  const isDone = completedList.includes(resource.id);

                  return (
                    <div
                      key={resource.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        isDone
                          ? 'bg-slate-50/80 border-slate-200'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateSkillResource(activeCourseModal.id, resource.id, !isDone)
                          }
                          className="text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                          title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                              {getResourceIcon(resource.type)}
                              <span>{resource.type}</span>
                            </span>
                            <span className="text-slate-300 text-xs">·</span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {resource.duration}
                            </span>
                          </div>
                          <div
                            className={`text-sm font-semibold mt-0.5 ${
                              isDone ? 'line-through text-slate-400' : 'text-slate-900'
                            }`}
                          >
                            {resource.title}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          updateSkillResource(activeCourseModal.id, resource.id, !isDone)
                        }
                        className={`text-xs px-2.5 py-1 rounded font-medium border transition-colors ${
                          isDone
                            ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {isDone ? 'Completed' : 'Mark Done'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Prerequisites & Outcomes */}
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <div className="text-xs font-semibold text-slate-800">Prerequisites:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeCourseModal.prerequisites.map((req) => (
                    <span
                      key={req}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-2xl">
              <span className="text-xs text-slate-500 font-mono">
                {activeCourseModal.duration} self-paced program
              </span>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Close & Keep Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
