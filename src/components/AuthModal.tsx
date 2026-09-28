import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User, GraduationCap, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginUser,
    updateStudentProfile,
    studentProfile,
    addToast,
  } = useApp();

  const [email, setEmail] = useState('aarav.sharma@campus.edu');
  const [password, setPassword] = useState('student123');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('Computer Science');
  const [year, setYear] = useState('3rd Year');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Switch to profile setup
    setAuthModalMode('profile-setup');
  };

  const handleProfileSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name: name || 'New Student',
      email: email || 'student@campus.edu',
      college: college || 'University College of Engineering',
      branch: branch,
      year: year,
    });
    loginUser(email || 'student@campus.edu');
    addToast('Profile Configured!', 'Welcome to CampusForge! Your student account is now active.');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(
      'Password Reset Link Sent',
      `Instructions have been dispatched to ${email}. Check your student mailbox.`,
      'info'
    );
    setAuthModalMode('login');
  };

  const handleOneClickDemo = () => {
    loginUser('aarav.sharma@campus.edu');
    addToast('Demo Student Loaded', 'Signed in as Aarav Sharma (3rd Year CS Student)');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                CF
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {authModalMode === 'login' && 'Student Sign In'}
                {authModalMode === 'signup' && 'Create Student Account'}
                {authModalMode === 'forgot' && 'Reset Password'}
                {authModalMode === 'profile-setup' && 'Setup Your Campus Profile'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {authModalMode === 'login' && 'Access your internships, roadmap progress, and resume.'}
              {authModalMode === 'signup' && 'Join 48,000+ university students building their careers.'}
              {authModalMode === 'forgot' && 'Enter your campus email to receive a recovery token.'}
              {authModalMode === 'profile-setup' && 'Tell us about your university and program.'}
            </p>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Login Mode */}
        {authModalMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Campus Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-700 font-semibold">Password</label>
                <button
                  type="button"
                  onClick={() => setAuthModalMode('forgot')}
                  className="text-indigo-600 hover:text-indigo-800 text-[11px]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
            >
              Sign In to CampusForge
            </button>

            {/* Quick Demo Button */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={handleOneClickDemo}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>One-Click Demo Login (Aarav Sharma)</span>
              </button>
            </div>

            <div className="text-center text-slate-500 text-[11px] pt-1">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('signup')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Register Now
              </button>
            </div>
          </form>
        )}

        {/* 2. Signup Mode */}
        {authModalMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Patel"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Campus Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue to Profile Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="text-center text-slate-500 text-[11px] pt-1">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* 3. Profile Setup after registration */}
        {authModalMode === 'profile-setup' && (
          <form onSubmit={handleProfileSetupSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">College / University Name</label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Indian Institute of Technology / State University"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Branch / Major</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Computer Science and Engineering">Computer Science</option>
                  <option value="Information Technology">Information Tech</option>
                  <option value="Electronics & Communication">Electronics</option>
                  <option value="Data Science & AI">Data Science</option>
                  <option value="Mechanical Engineering">Mechanical</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year / Final">4th Year (Final)</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Complete Setup & Enter Platform</span>
            </button>
          </form>
        )}

        {/* 4. Forgot Password */}
        {authModalMode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Your Registered Student Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
            >
              Send Password Reset Instructions
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="text-slate-600 hover:text-slate-900"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
