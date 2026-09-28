import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem } from '../types';
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Search,
  Filter,
  CheckCircle,
  Bookmark,
  X,
  Sparkles,
  ExternalLink,
  Clock,
} from 'lucide-react';

export const EventsPortal: React.FC = () => {
  const {
    events,
    registeredEventIds,
    registerForEvent,
    savedEventIds,
    toggleSaveEvent,
    studentProfile,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [eventSearch, setEventSearch] = useState('');
  const [registerModalEvent, setRegisterModalEvent] = useState<EventItem | null>(null);
  const [teamMode, setTeamMode] = useState<'Solo' | 'Team'>('Solo');
  const [teamName, setTeamName] = useState('');

  const categories = ['All', 'Hackathon', 'Coding Contest', 'Workshop', 'Webinar', 'Tech Event'];

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      if (activeCategory !== 'All' && evt.type !== activeCategory) {
        return false;
      }
      if (onlineOnly && !evt.isOnline) {
        return false;
      }
      if (eventSearch.trim()) {
        const q = eventSearch.toLowerCase();
        const matchName = evt.name.toLowerCase().includes(q);
        const matchOrg = evt.organizer.toLowerCase().includes(q);
        const matchTag = evt.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchOrg && !matchTag) return false;
      }
      return true;
    });
  }, [events, activeCategory, onlineOnly, eventSearch]);

  const handleConfirmRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerModalEvent) return;
    registerForEvent(registerModalEvent.id);
    setRegisterModalEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Tech Hackathons & Events
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Participate in premier student hackathons, coding contests, hands-on workshops, and industry webinars.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 font-mono">
              {registeredEventIds.length} Registered Events
            </span>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={eventSearch}
              onChange={(e) => setEventSearch(e.target.value)}
              placeholder="Search events by title, organizer, or topic (e.g. AI, Cloud, HackForge)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOnlineOnly(!onlineOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                onlineOnly
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Online Only
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const isRegistered = registeredEventIds.includes(event.id);
          const isSaved = savedEventIds.includes(event.id);

          return (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all text-left"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {event.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2 leading-snug">
                      {event.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleSaveEvent(event.id)}
                    className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                      isSaved
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                        : 'border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                    title={isSaved ? 'Saved Event' : 'Save Event'}
                  >
                    <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-medium mb-3">
                  Organized by <span className="text-slate-800 font-semibold">{event.organizer}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Highlights */}
                <div className="space-y-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Register by {event.registrationDeadline}</span>
                  </div>
                </div>

                {event.prizePool && (
                  <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-800 font-medium mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="line-clamp-1">{event.prizePool}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-semibold">Free Entry</span>

                {isRegistered ? (
                  <span className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Registered</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setRegisterModalEvent(event)}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {registerModalEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Register for {registerModalEvent.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Organized by {registerModalEvent.organizer}
                </p>
              </div>
              <button
                onClick={() => setRegisterModalEvent(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmRegistration} className="mt-4 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="font-semibold text-slate-800">Primary Participant:</div>
                <div className="text-slate-600">{studentProfile.name} ({studentProfile.email})</div>
                <div className="text-slate-600">{studentProfile.college}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Participation Mode
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTeamMode('Solo')}
                    className={`py-2 rounded-lg border text-center font-semibold transition-colors ${
                      teamMode === 'Solo'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Solo Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeamMode('Team')}
                    className={`py-2 rounded-lg border text-center font-semibold transition-colors ${
                      teamMode === 'Team'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Team (2-4 Members)
                  </button>
                </div>
              </div>

              {teamMode === 'Team' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. ByteBuilders or CodeCrafters"
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              )}

              <div className="text-[11px] text-slate-500 leading-relaxed">
                By registering, you confirm attendance for the scheduled date ({registerModalEvent.date}). Event links and calendar invites will be sent to {studentProfile.email}.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRegisterModalEvent(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
