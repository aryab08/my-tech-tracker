import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Laptop,
  Brain,
  Bot,
  Smartphone,
  Flame,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  FolderGit2,
  TrendingUp,
  PieChart as PieChartIcon
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
  Pie
} from 'recharts';

export default function DashboardView() {
  const {
    roadmaps,
    getRoadmapStats,
    getOverallLearningStats,
    getProjectStats,
    setActiveRoadmapId,
    setActiveTab,
    projects
  } = useApp();

  const overallStats = getOverallLearningStats();
  const projectStats = getProjectStats();

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-5 h-5 text-cyan-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-emerald-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
      default: return <BookOpen className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getBadgeColor = (percentage) => {
    if (percentage === 100) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (percentage > 50) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    if (percentage > 0) return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    return 'bg-slate-800/80 text-slate-400 border-slate-700/50';
  };

  // Overall bar chart data dynamically calculated
  const barChartData = roadmaps.map(rm => {
    const stats = getRoadmapStats(rm.id);
    return {
      name: rm.title.split(' — ')[0],
      percentage: stats.percentage,
      completed: stats.completed,
      total: stats.total
    };
  });

  const BAR_COLORS = ['#06b6d4', '#10b981', '#a855f7', '#f59e0b', '#f43f5e', '#6366f1'];

  // Overall completion pie chart data
  const pieData = [
    { name: 'Completed Items', value: overallStats.completed, color: '#06b6d4' },
    { name: 'Remaining Items', value: overallStats.remaining, color: '#334155' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. MAIN DASHBOARD TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Personal Engineering Dashboard
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            My Tech Tracker
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Real-time command center for tracking software roadmaps, Data Structures & Algorithms, AI/ML development, and project engineering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('projects')}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects ({projectStats.total})</span>
          </button>
        </div>
      </div>

      {/* 2. OVERALL STATISTICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Total Learning Items</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">{overallStats.total}</span>
            <Layers className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Completed</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">{overallStats.completed}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Remaining</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-300 font-mono">{overallStats.remaining}</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-cyan-500/20 bg-cyan-500/5 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs text-cyan-300 font-medium">Overall Progress</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-cyan-400 font-mono">{overallStats.percentage}%</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Total Projects</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">{projectStats.total}</span>
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Projects Completed</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-indigo-400 font-mono">{projectStats.completed}</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
        </div>
      </div>

      {/* 3. OVERALL LEARNING PROGRESS ROADMAP CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            OVERALL LEARNING PROGRESS
          </h2>
          <span className="text-xs text-slate-400">Click button to open roadmap syllabus</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmaps.map(rm => {
            const stats = getRoadmapStats(rm.id);
            return (
              <div
                key={rm.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                        {getIconComponent(rm.icon)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                          {rm.title}
                        </h3>
                        <span className="text-xs text-slate-400 line-clamp-1">{rm.description}</span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${getBadgeColor(stats.percentage)}`}>
                      {stats.percentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden mb-4 p-0.5 border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>

                  {/* Stats Breakdown */}
                  <div className="grid grid-cols-3 gap-2 text-center bg-slate-950/60 rounded-xl p-2.5 mb-4 border border-slate-800/80">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Completed</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">{stats.completed}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Remaining</div>
                      <div className="text-sm font-bold text-slate-300 font-mono">{stats.remaining}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Total</div>
                      <div className="text-sm font-bold text-white font-mono">{stats.total}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveRoadmapId(rm.id);
                    setActiveTab('roadmap');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/40 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all"
                >
                  <span>Open Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. VISUALIZATION SECTION: BAR CHART & PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OVERALL GRAPH BAR CHART */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Roadmap Progress Comparison
                </h3>
                <p className="text-xs text-slate-400">Dynamically calculated completion percentages per roadmap</p>
              </div>
              <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">
                Dynamic Sync
              </span>
            </div>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    formatter={(value) => [`${value}%`, 'Completion']}
                  />
                  <Bar dataKey="percentage" radius={[8, 8, 0, 0]} barSize={36}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-4 justify-between text-xs text-slate-400">
            {barChartData.map((b, i) => (
              <div key={b.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }} />
                <span>{b.name}:</span>
                <span className="font-bold text-white font-mono">{b.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* OVERALL COMPLETION GRAPH (DONUT) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <PieChartIcon className="w-5 h-5 text-indigo-400" />
              All Learning Ratio
            </h3>
            <p className="text-xs text-slate-400 mb-4">Completed items vs Remaining items across all roadmaps</p>

            <div className="h-48 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white font-mono">{overallStats.percentage}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Done</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-slate-300">Completed Items</span>
              </div>
              <span className="font-bold text-emerald-400 font-mono">{overallStats.completed}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="text-slate-300">Remaining Items</span>
              </div>
              <span className="font-bold text-slate-400 font-mono">{overallStats.remaining}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. QUICK PROJECTS PREVIEW */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-400" />
              Project Engineering Snapshot
            </h3>
            <p className="text-xs text-slate-400">Tracked separately from syllabus roadmaps</p>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View All Projects ({projects.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.slice(0, 3).map(p => (
            <div key={p.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {p.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{p.status}</span>
                </div>
                <h4 className="font-bold text-white text-sm line-clamp-1">{p.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.description}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">{p.techStack.slice(0, 2).join(', ')}</span>
                <span className="font-mono text-cyan-400 font-semibold">
                  {p.checklist && p.checklist.length > 0
                    ? `${Math.round((p.checklist.filter(c => c.completed).length / p.checklist.length) * 100)}%`
                    : '0%'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
