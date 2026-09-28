/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { InternshipPortal } from './components/InternshipPortal';
import { SkillDevelopment } from './components/SkillDevelopment';
import { SkillGapAnalyzer } from './components/SkillGapAnalyzer';
import { EventsPortal } from './components/EventsPortal';
import { ResumeBuilder } from './components/ResumeBuilder';
import { StudentProfile } from './components/StudentProfile';
import { SavedOpportunities } from './components/SavedOpportunities';
import { StudentDashboard } from './components/StudentDashboard';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="min-h-[calc(100vh-4rem)] flex-1">
      {activeTab === 'home' && <Home />}
      {activeTab === 'internships' && <InternshipPortal />}
      {activeTab === 'skills' && <SkillDevelopment />}
      {activeTab === 'skill-gap' && <SkillGapAnalyzer />}
      {activeTab === 'events' && <EventsPortal />}
      {activeTab === 'resume' && <ResumeBuilder />}
      {activeTab === 'profile' && <StudentProfile />}
      {activeTab === 'saved' && <SavedOpportunities />}
      {activeTab === 'dashboard' && <StudentDashboard />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
        <Navbar />
        <MainContent />
        <Footer />
        <AuthModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
