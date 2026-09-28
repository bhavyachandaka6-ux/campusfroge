import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Internship, WorkMode } from '../types';
import {
  Search,
  Filter,
  Bookmark,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  X,
  Send,
  Building2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const InternshipPortal: React.FC = () => {
  const {
    internships,
    searchQuery,
    setSearchQuery,
    savedInternshipIds,
    toggleSaveInternship,
    applyToInternship,
    applications,
    studentProfile,
  } = useApp();

  // Filters state
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [minStipend, setMinStipend] = useState<number>(0);

  // Application Modal state
  const [applyModalInternship, setApplyModalInternship] = useState<Internship | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [useProfileResume, setUseProfileResume] = useState(true);

  // Detailed View Modal state
  const [detailInternship, setDetailInternship] = useState<Internship | null>(null);

  // Domains & Locations derived from data
  const domains = useMemo(() => {
    return ['All', ...Array.from(new Set(internships.map((i) => i.domain)))];
  }, [internships]);

  const locations = useMemo(() => {
    return ['All', ...Array.from(new Set(internships.map((i) => i.location)))];
  }, [internships]);

  const skillsList = useMemo(() => {
    const set = new Set<string>();
    internships.forEach((i) => i.requiredSkills.forEach((s) => set.add(s)));
    return ['All', ...Array.from(set)];
  }, [internships]);

  // Filtered internships
  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      // Query search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = internship.title.toLowerCase().includes(q);
        const matchesCompany = internship.company.toLowerCase().includes(q);
        const matchesSkills = internship.requiredSkills.some((s) => s.toLowerCase().includes(q));
        const matchesDomain = internship.domain.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDomain) {
          return false;
        }
      }

      // Domain filter
      if (selectedDomain !== 'All' && internship.domain !== selectedDomain) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'All' && internship.location !== selectedLocation) {
        return false;
      }

      // Work mode
      if (selectedWorkMode !== 'All' && internship.workMode !== selectedWorkMode) {
        return false;
      }

      // Duration
      if (selectedDuration !== 'All' && internship.duration !== selectedDuration) {
        return false;
      }

      // Skill
      if (selectedSkill !== 'All' && !internship.requiredSkills.includes(selectedSkill)) {
        return false;
      }

      // Stipend parse
      if (minStipend > 0) {
        // e.g. "₹45,000 / month"
        const stipendNumeric = parseInt(internship.stipend.replace(/[^0-9]/g, ''), 10) || 0;
        if (stipendNumeric < minStipend) {
          return false;
        }
      }

      return true;
    });
  }, [
    internships,
    searchQuery,
    selectedDomain,
    selectedLocation,
    selectedWorkMode,
    selectedDuration,
    selectedSkill,
    minStipend,
  ]);

  const resetFilters = () => {
    setSelectedDomain('All');
    setSelectedLocation('All');
    setSelectedWorkMode('All');
    setSelectedDuration('All');
    setSelectedSkill('All');
    setMinStipend(0);
    setSearchQuery('');
  };

  const handleOpenApply = (internship: Internship) => {
    setApplyModalInternship(internship);
    setCoverNote(
      `Hello ${internship.company} Recruitment Team,\n\nI am a 3rd-year ${studentProfile.branch} student at ${studentProfile.college}. I have strong experience in ${internship.requiredSkills.slice(0, 3).join(', ')} and would love the opportunity to contribute to your engineering team.`
    );
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalInternship) return;
    applyToInternship(applyModalInternship.id, coverNote);
    setApplyModalInternship(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Page Title & Search Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Internship Portal
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Find verified, high-growth tech internships with transparent stipends and direct employer review.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Showing <span className="font-semibold text-slate-900">{filteredInternships.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{internships.length}</span> opportunities
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role title, company name, skill, or keyword (e.g. React, Razorpay, Python)..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Filter className="w-4 h-4 text-indigo-600" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Reset All
              </button>
            </div>

            {/* Domain Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full text-xs py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {domains.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Work Mode
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
                {['All', 'Remote', 'Hybrid', 'On-site'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedWorkMode(mode)}
                    className={`py-1 rounded text-center transition-colors ${
                      selectedWorkMode === mode
                        ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full text-xs py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="All">Any Duration</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
              </select>
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Skills Required
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full text-xs py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {skillsList.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Stipend Filter */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                <span>Min Stipend</span>
                <span className="font-mono text-indigo-600 font-bold">
                  {minStipend === 0 ? 'Any' : `₹${minStipend.toLocaleString()}+`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60000"
                step="5000"
                value={minStipend}
                onChange={(e) => setMinStipend(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>₹0</span>
                <span>₹30k</span>
                <span>₹60k+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="lg:col-span-9 space-y-4">
          {filteredInternships.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No internships match your filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your filters, lowering the stipend threshold, or searching for broader keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredInternships.map((internship) => {
              const isSaved = savedInternshipIds.includes(internship.id);
              const isApplied = applications.some((a) => a.internshipId === internship.id);

              return (
                <div
                  key={internship.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Row: Company logo + Title + Save */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-12 h-12 rounded-xl ${internship.companyLogoBg} text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0`}
                        >
                          {internship.companyInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-500">
                              {internship.company}
                            </span>
                            {internship.featured && (
                              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.2 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <h2
                            onClick={() => setDetailInternship(internship)}
                            className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
                          >
                            {internship.title}
                          </h2>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => toggleSaveInternship(internship.id)}
                          className={`p-2 rounded-lg border transition-colors ${
                            isSaved
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                              : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                          }`}
                          title={isSaved ? 'Remove from Saved' : 'Save Internship'}
                        >
                          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>

                    {/* Metadata line */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {internship.location}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-700">{internship.workMode}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {internship.duration}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-700">
                        <DollarSign className="w-3.5 h-3.5" />
                        {internship.stipend}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {internship.description}
                    </p>

                    {/* Required Skills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 mr-1">Skills:</span>
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

                  {/* Bottom Actions Row */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span>Posted {internship.postedDate}</span>
                      <span>·</span>
                      <span>Deadline: {internship.deadline}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailInternship(internship)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        View Details
                      </button>

                      {isApplied ? (
                        <span className="px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenApply(internship)}
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                        >
                          <span>Apply Now</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {applyModalInternship && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Apply for {applyModalInternship.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {applyModalInternship.company} · {applyModalInternship.location} ({applyModalInternship.workMode})
                </p>
              </div>
              <button
                onClick={() => setApplyModalInternship(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="mt-4 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-semibold text-slate-800">Applicant Details:</div>
                <div className="text-slate-600 flex justify-between">
                  <span>Name: {studentProfile.name}</span>
                  <span>CGPA: {studentProfile.education.cgpa}</span>
                </div>
                <div className="text-slate-600">
                  {studentProfile.college} ({studentProfile.branch})
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Attached Resume
                </label>
                <div className="flex items-center justify-between p-2.5 bg-indigo-50/50 border border-indigo-200 rounded-lg text-xs">
                  <span className="font-medium text-indigo-900 truncate">
                    📄 {studentProfile.resumeFileName}
                  </span>
                  <span className="text-[11px] text-indigo-700 font-semibold">Ready</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cover Note / Why you are a great fit
                </label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Tell the hiring manager about your interest and relevant projects..."
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApplyModalInternship(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {detailInternship && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl ${detailInternship.companyLogoBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}
                >
                  {detailInternship.companyInitials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{detailInternship.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{detailInternship.company}</p>
                </div>
              </div>
              <button
                onClick={() => setDetailInternship(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-5 text-xs text-slate-600">
              {/* Key details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px]">Stipend</span>
                  <span className="font-bold text-slate-900 font-mono">{detailInternship.stipend}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Work Mode</span>
                  <span className="font-bold text-slate-900">{detailInternship.workMode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Duration</span>
                  <span className="font-bold text-slate-900">{detailInternship.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Deadline</span>
                  <span className="font-bold text-slate-900">{detailInternship.deadline}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-sm">Role Overview</h4>
                <p className="leading-relaxed">{detailInternship.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-sm">Key Responsibilities</h4>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  {detailInternship.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm">Required Technical Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {detailInternship.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-md"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => toggleSaveInternship(detailInternship.id)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {savedInternshipIds.includes(detailInternship.id) ? 'Saved' : 'Save for Later'}
                </span>
              </button>

              <button
                onClick={() => {
                  const target = detailInternship;
                  setDetailInternship(null);
                  handleOpenApply(target);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Proceed to Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
