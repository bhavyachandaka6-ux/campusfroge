import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Target,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  DollarSign,
  Briefcase,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

export const SkillGapAnalyzer: React.FC = () => {
  const {
    careerRoles,
    selectedRoleForGap,
    setSelectedRoleForGap,
    studentProfile,
    updateStudentProfile,
    setActiveTab,
    setSelectedSkillForLearning,
  } = useApp();

  const currentRole = useMemo(() => {
    return careerRoles.find((r) => r.id === selectedRoleForGap) || careerRoles[0];
  }, [careerRoles, selectedRoleForGap]);

  // Normalize student skills for loose comparison
  const studentSkillsNormalized = useMemo(() => {
    return studentProfile.technicalSkills.map((s) => s.trim().toLowerCase());
  }, [studentProfile.technicalSkills]);

  // Determine learned vs missing required skills
  const analysis = useMemo(() => {
    const required = currentRole.requiredSkills;
    const learnedSkills: string[] = [];
    const missingSkills: string[] = [];

    required.forEach((reqSkill) => {
      const lower = reqSkill.toLowerCase();
      // Check if exact or partial match (e.g., "HTML & CSS" matches "html" or "css")
      const hasSkill = studentSkillsNormalized.some((s) => {
        if (s === lower) return true;
        if (lower.includes(s) || s.includes(lower)) return true;
        if (lower === 'html & css' && (s.includes('html') || s.includes('css'))) return true;
        return false;
      });

      if (hasSkill) {
        learnedSkills.push(reqSkill);
      } else {
        missingSkills.push(reqSkill);
      }
    });

    const readinessPercent = required.length > 0
      ? Math.round((learnedSkills.length / required.length) * 100)
      : 0;

    return {
      learnedSkills,
      missingSkills,
      readinessPercent,
    };
  }, [currentRole, studentSkillsNormalized]);

  const handleStartLearningMissing = (skillName: string) => {
    setSelectedSkillForLearning(skillName);
    setActiveTab('skills');
  };

  const handleQuickAddSkill = (skill: string) => {
    if (!studentProfile.technicalSkills.includes(skill)) {
      updateStudentProfile({
        technicalSkills: [...studentProfile.technicalSkills, skill],
      });
    }
  };

  const handleQuickRemoveSkill = (skill: string) => {
    updateStudentProfile({
      technicalSkills: studentProfile.technicalSkills.filter(
        (s) => s.toLowerCase() !== skill.toLowerCase()
      ),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Title */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Career Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Skill Gap Analyzer
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Select your dream career role to see which skills you have mastered, what is missing, and your job-market readiness score.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Student: <span className="font-bold text-slate-800">{studentProfile.name}</span>
          </div>
        </div>
      </div>

      {/* Target Role Selector Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Select Target Career Role
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {careerRoles.map((role) => {
            const isSelected = role.id === selectedRoleForGap;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleForGap(role.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 leading-snug">{role.title}</div>
                <div className="text-[11px] font-mono text-slate-500 mt-2">{role.openPositions}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Role Highlights & Overall Readiness Score */}
        <div className="lg:col-span-4 space-y-6">
          {/* Readiness Meter Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Career Readiness Score
            </h3>

            {/* Circular Gauge */}
            <div className="relative w-36 h-36 mx-auto my-4 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#E2E8F0"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={
                    analysis.readinessPercent >= 75
                      ? '#10B981'
                      : analysis.readinessPercent >= 40
                      ? '#6366F1'
                      : '#F59E0B'
                  }
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * analysis.readinessPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {analysis.readinessPercent}%
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Readiness</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {analysis.readinessPercent >= 80 ? (
                <span className="text-emerald-700 font-semibold">
                  Excellent! You meet almost all core prerequisites for {currentRole.title}.
                </span>
              ) : analysis.readinessPercent >= 50 ? (
                <span className="text-indigo-700 font-semibold">
                  Good progress! Mastering {analysis.missingSkills.length} more skills will make your profile interview-ready.
                </span>
              ) : (
                <span className="text-amber-700 font-semibold">
                  Developing! Focus on the {analysis.missingSkills.length} missing foundational skills below.
                </span>
              )}
            </p>

            {analysis.missingSkills.length > 0 && (
              <div className="mt-5">
                <button
                  onClick={() => handleStartLearningMissing(analysis.missingSkills[0])}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Start Learning Missing Skills</span>
                </button>
              </div>
            )}
          </div>

          {/* Role Industry Snapshot */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {currentRole.title} Market Snapshot
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">{currentRole.description}</p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[11px]">Salary Expectation</span>
                <span className="font-bold text-slate-900 font-mono">{currentRole.averageSalary}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[11px]">Growth Trend</span>
                <span className="font-bold text-emerald-600 font-mono">{currentRole.growthRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Breakdown of Skills (Learned vs Missing) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Required Skills Comparison */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Core Skill Requirements for {currentRole.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparison evaluated against your profile's listed technical proficiencies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Skills Already Learned */}
              <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Skills Already Learned ({analysis.learnedSkills.length})
                    </h4>
                  </div>
                </div>

                {analysis.learnedSkills.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 italic">
                    None of the required skills have been added to your profile yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {analysis.learnedSkills.map((sk) => (
                      <div
                        key={sk}
                        className="bg-white border border-emerald-200 rounded-lg p-2.5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <span className="text-emerald-600">✅</span>
                          <span>{sk}</span>
                        </div>
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Mastered
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Missing Skills */}
              <div className="border border-rose-200 bg-rose-50/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200/60">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                      Missing Skills ({analysis.missingSkills.length})
                    </h4>
                  </div>
                </div>

                {analysis.missingSkills.length === 0 ? (
                  <div className="p-4 bg-emerald-100/60 rounded-lg text-emerald-800 text-xs font-medium">
                    🎉 You possess all required technical skills for this role!
                  </div>
                ) : (
                  <div className="space-y-2">
                    {analysis.missingSkills.map((sk) => (
                      <div
                        key={sk}
                        className="bg-white border border-rose-200 rounded-lg p-2.5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <span className="text-rose-500">❌</span>
                          <span>{sk}</span>
                        </div>
                        <button
                          onClick={() => handleStartLearningMissing(sk)}
                          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
                        >
                          <span>Learn</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recommended Nice-To-Have Skills */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Recommended Secondary Skills for {currentRole.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Stand out from competing applicants by adding these complementary competencies:
              </p>
              <div className="flex flex-wrap gap-2">
                {currentRole.recommendedSkills.map((sk) => {
                  const hasIt = studentSkillsNormalized.includes(sk.toLowerCase());
                  return (
                    <span
                      key={sk}
                      className={`px-3 py-1 text-xs rounded-lg font-medium border flex items-center gap-1.5 ${
                        hasIt
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{hasIt ? '⭐' : '•'}</span>
                      <span>{sk}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Skill Quick-Tuning for Student */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Test Your Skills (Live Simulation)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any required skill below to quickly add or remove it from your profile and watch your readiness update in real-time.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {currentRole.requiredSkills.map((sk) => {
                const hasSkill = analysis.learnedSkills.includes(sk);
                return (
                  <button
                    key={sk}
                    onClick={() => {
                      if (hasSkill) {
                        handleQuickRemoveSkill(sk);
                      } else {
                        handleQuickAddSkill(sk);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      hasSkill
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
                    }`}
                  >
                    <span>{hasSkill ? '✓' : '+'}</span>
                    <span>{sk}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
