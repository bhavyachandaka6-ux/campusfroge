import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                CF
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">CampusForge</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Empowering university engineers and students to master in-demand skills, analyze job readiness, crack competitive internships, and engineer standout resumes.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Opportunities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('internships')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Tech Internships
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('events')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Hackathons & Competitions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('events')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Live Technical Workshops
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('saved')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Saved Roles & Bookmarks
                </button>
              </li>
            </ul>
          </div>

          {/* Skills & Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Career Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('skill-gap')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Skill Gap Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('skills')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Curated Skill Roadmaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('resume')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  ATS Resume Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Student Progress Cockpit
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Student Hub</h4>
            <p className="text-xs text-slate-500 mb-3">
              Curated directly with university placement cells, alumni networks, and top tech partners.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>GDSC Partnered</span>
              <span>·</span>
              <span>100% Free for Students</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 CampusForge Platform. Built for university student success.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Guidelines</span>
            <span>·</span>
            <span className="hover:text-slate-600 cursor-pointer">Campus Terms</span>
            <span>·</span>
            <span className="hover:text-slate-600 cursor-pointer">Recruiter Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
