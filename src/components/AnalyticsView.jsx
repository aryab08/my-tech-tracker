import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieChartIcon,
  BookOpen,
  FolderGit2,
  Calendar,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from 'recharts';

export default function AnalyticsView() {
  const {
    roadmaps,
    getRoadmapStats,
    getOverallLearningStats,
    getProjectStats,
    projects,
    progressHistory
  } = useApp();

  const learningStats = getOverallLearningStats();
  const projectStats = getProjectStats();

  const barChartData = roadmaps.map(rm => {
    const s = getRoadmapStats(rm.id);
    return { name: rm.title.split(' — ')[0], percentage: s.percentage, completed: s.completed, total: s.total };
  });

  const categoryCounts = projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const categoryPieData = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    value: categoryCounts[cat]
  }));

  const COLORS = ['#06b6d4', '#6366f1', '#a855f7', '#f59e0b', '#10b981', '#f43f5e'];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-violet-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
            ADVANCED METRICS
          </span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Global Analytics</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Detailed quantitative breakdowns across syllabus learning roadmaps and engineering project portfolio.
        </p>
      </div>

      {/* SECTION 1: LEARNING ANALYTICS */}
      <div className="space-y-6">
        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          Learning Analytics
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Over Time Line Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Progress Over Time History
            </h3>
            <p className="text-xs text-slate-400 mb-4">Tracking completion history snapshots</p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="percentage" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Roadmap Comparison Bar Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Roadmap Completion Comparison
            </h3>
            <p className="text-xs text-slate-400 mb-4">Percentage completed per roadmap</p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  <Bar dataKey="percentage" radius={[6, 6, 0, 0]} fill="#10b981" barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROJECT ANALYTICS */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-indigo-400" />
          Project Analytics
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Distribution Pie Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-indigo-400" />
              Projects by Category Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">Breakdown of software projects by domain</p>

            <div className="h-60 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Project Status Summary Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4">Engineering Status Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-300 font-semibold">Completed Projects</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{projectStats.completed}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-300 font-semibold">In Progress / Testing</span>
                  <span className="font-bold text-cyan-400 font-mono text-sm">{projectStats.inProgress + projectStats.testing}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-300 font-semibold">Planned Projects</span>
                  <span className="font-bold text-indigo-400 font-mono text-sm">{projectStats.planned}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-300 font-semibold">Project Ideas</span>
                  <span className="font-bold text-purple-400 font-mono text-sm">{projectStats.idea}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between text-xs text-slate-400">
              <span>Total Tracked Projects</span>
              <span className="font-bold text-white font-mono">{projectStats.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
