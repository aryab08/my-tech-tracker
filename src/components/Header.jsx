import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Trophy, CheckCircle2, Sparkles, Lock } from 'lucide-react';

export default function Header() {
  const { searchQuery, setSearchQuery, settings, getOverallLearningStats, lockApp } = useApp();
  const stats = getOverallLearningStats();

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-20 px-6 py-3.5 flex items-center justify-between">
      {/* Search Input */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search roadmaps, topics, DSA, projects..."
          className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Right Stats & Goals */}
      <div className="flex items-center gap-4">
        {/* Today's Goal Progress */}
        <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800/80 rounded-xl px-3.5 py-1.5 hidden md:flex">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-semibold">Today:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white">
              {settings.completedTodayCount} / {settings.dailyGoal}
            </span>
            <span className="text-xs text-slate-400">topics</span>
          </div>
          <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (settings.completedTodayCount / settings.dailyGoal) * 100)}%`
              }}
            />
          </div>
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-2.5 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-300">Overall:</span>
          <span className="font-mono text-sm font-bold text-cyan-400">{stats.percentage}%</span>
        </div>

        {/* Lock Screen Button */}
        <button
          onClick={lockApp}
          className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Lock Private Session"
        >
          <Lock className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
