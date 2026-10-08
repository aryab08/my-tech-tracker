import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Laptop,
  Brain,
  Bot,
  Smartphone,
  Flame,
  FolderGit2,
  BarChart3,
  Settings,
  PlusCircle,
  Moon,
  Sun,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import AddRoadmapModal from './AddRoadmapModal';

export default function Sidebar() {
  const {
    roadmaps,
    activeTab,
    setActiveTab,
    activeRoadmapId,
    setActiveRoadmapId,
    getRoadmapStats,
    settings,
    toggleTheme
  } = useApp();

  const [showAddRoadmapModal, setShowAddRoadmapModal] = useState(false);

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Brain': return <Brain className="w-4 h-4" />;
      case 'Bot': return <Bot className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <>
      <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-screen sticky top-0 select-none z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
              T
            </div>
            <div>
              <h1 className="font-extrabold text-white text-base tracking-tight leading-none">
                My Tech Tracker
              </h1>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-cyan-400">
                Command Center
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          {/* Main Dashboard */}
          <div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-cyan-400" />
                <span>Dashboard</span>
              </div>
            </button>
          </div>

          {/* LEARNING ROADMAPS */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                LEARNING
              </span>
              <button
                onClick={() => setShowAddRoadmapModal(true)}
                title="Add New Custom Roadmap"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-1 hover:bg-slate-800 rounded"
              >
                <PlusCircle className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              {roadmaps.map(rm => {
                const stats = getRoadmapStats(rm.id);
                const isActive = activeTab === 'roadmap' && activeRoadmapId === rm.id;
                return (
                  <button
                    key={rm.id}
                    onClick={() => {
                      setActiveRoadmapId(rm.id);
                      setActiveTab('roadmap');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20'
                        : 'hover:bg-slate-800/60 text-slate-300 hover:text-white font-normal'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                        {getIconComponent(rm.icon)}
                      </span>
                      <span className="truncate">{rm.title}</span>
                    </div>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                        stats.percentage === 100
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : stats.percentage > 0
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {stats.percentage}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BUILD / PROJECTS */}
          <div>
            <div className="px-3 mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                BUILD
              </span>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'projects'
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4 text-indigo-400" />
                <span>Projects</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </div>

          {/* INSIGHTS */}
          <div>
            <div className="px-3 mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                INSIGHTS & ASSISTANT
              </span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('ai-chat')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'ai-chat'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>AI Assistant</span>
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded">
                  AI
                </span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-violet-400" />
                  <span>Analytics</span>
                </div>
              </button>
            </div>
          </div>

          {/* SYSTEM */}
          <div>
            <div className="px-3 mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                SYSTEM
              </span>
            </div>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'settings'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-amber-400" />
                <span>Settings</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Theme Toggle */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tracker v2.0</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>
        </div>
      </aside>

      {showAddRoadmapModal && (
        <AddRoadmapModal onClose={() => setShowAddRoadmapModal(false)} />
      )}
    </>
  );
}
