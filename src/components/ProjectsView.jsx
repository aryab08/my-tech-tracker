import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FolderGit2,
  Plus,
  GitBranch,
  ExternalLink,
  CheckSquare,
  Square,
  Trash2,
  Edit2,
  Sparkles,
  Calendar,
  Layers,
  X
} from 'lucide-react';
import AddProjectModal from './AddProjectModal';

export default function ProjectsView() {
  const {
    projects,
    getProjectStats,
    projectFilter,
    setProjectFilter,
    toggleProjectTask,
    addProjectTask,
    deleteProjectTask,
    updateProject,
    deleteProject
  } = useApp();

  const stats = getProjectStats();
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [newTaskInput, setNewTaskInput] = useState('');

  const statusColors = {
    'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'In Progress': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Testing': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Planned': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'Idea': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Paused': 'bg-slate-800 text-slate-400 border-slate-700'
  };

  const categories = ['All', 'Full Stack', 'AI/ML', 'App Development', 'Data Science', 'AI Full-Stack'];

  // Filter projects
  const filteredProjects = projects.filter(p => {
    if (projectFilter !== 'all' && p.status !== projectFilter) return false;
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  });

  const calculateProjectProgress = (p) => {
    if (!p.checklist || p.checklist.length === 0) return 0;
    const completed = p.checklist.filter(c => c.completed).length;
    return Math.round((completed / p.checklist.length) * 100);
  };

  const handleAddTask = (projectId) => {
    if (newTaskInput.trim()) {
      addProjectTask(projectId, newTaskInput.trim());
      setNewTaskInput('');
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. HEADER & BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              BUILD PORTFOLIO
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Project Portfolio</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Track full-stack applications, AI/ML tools, mobile apps, and data science projects independently from syllabus roadmaps.
          </p>
        </div>

        <button
          onClick={() => setShowAddProjectModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* 2. PROJECT ANALYTICS SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-semibold">Total Projects</span>
          <div className="text-2xl font-black text-white font-mono mt-1">{stats.total}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-semibold">Completed</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{stats.completed}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-semibold">In Progress</span>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{stats.inProgress}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-semibold">Planned</span>
          <div className="text-2xl font-black text-indigo-400 font-mono mt-1">{stats.planned}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-semibold">Ideas</span>
          <div className="text-2xl font-black text-purple-400 font-mono mt-1">{stats.idea}</div>
        </div>
        <div className="bg-slate-900 border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-4">
          <span className="text-xs text-indigo-300 font-semibold">Completion %</span>
          <div className="text-2xl font-black text-indigo-400 font-mono mt-1">{stats.percentage}%</div>
        </div>
      </div>

      {/* 3. FILTERS BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          {['all', 'Idea', 'Planned', 'In Progress', 'Testing', 'Completed', 'Paused'].map(status => (
            <button
              key={status}
              onClick={() => setProjectFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                projectFilter === status
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {status === 'all' ? 'All Statuses' : status}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. PROJECTS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(p => {
          const progressPct = calculateProjectProgress(p);
          const completedCount = p.checklist ? p.checklist.filter(c => c.completed).length : 0;
          const totalCount = p.checklist ? p.checklist.length : 0;

          return (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs font-bold text-indigo-400 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    {p.category}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[p.status] || 'bg-slate-800 text-slate-400'}`}>
                    {p.status}
                  </span>
                </div>

                <h3
                  onClick={() => setActiveProjectModal(p)}
                  className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1 mb-1"
                >
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4">{p.description}</p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.techStack.map(t => (
                    <span key={t} className="text-[10px] font-medium bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Checklist Progress</span>
                    <span className="font-mono font-bold text-indigo-400">{progressPct}% ({completedCount}/{totalCount})</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              </div>

              {/* Card Footer: Links & Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <GitBranch className="w-4 h-4" />
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-xs"
                      title="Live Demo Application"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveProjectModal(p)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-500/20 hover:text-indigo-400 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
                >
                  Manage Checklist
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. PROJECT DETAILS & CHECKLIST MODAL */}
      {activeProjectModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-indigo-400 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                {activeProjectModal.category}
              </span>
              <select
                value={activeProjectModal.status}
                onChange={(e) => {
                  updateProject(activeProjectModal.id, { status: e.target.value });
                  setActiveProjectModal(prev => ({ ...prev, status: e.target.value }));
                }}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border bg-slate-950 focus:outline-none ${statusColors[activeProjectModal.status]}`}
              >
                <option value="Idea">Idea</option>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Testing">Testing</option>
                <option value="Completed">Completed</option>
                <option value="Paused">Paused</option>
              </select>
            </div>

            <h2 className="text-2xl font-black text-white mb-2">{activeProjectModal.title}</h2>
            <p className="text-xs text-slate-400 mb-6">{activeProjectModal.description}</p>

            {/* Checklist Tasks Section */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-indigo-400" />
                  Project Tasks & Milestones Checklist
                </h3>
                <span className="text-xs font-mono font-bold text-indigo-400">
                  {calculateProjectProgress(activeProjectModal)}% Complete
                </span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {activeProjectModal.checklist && activeProjectModal.checklist.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 hover:border-slate-700 transition-colors"
                  >
                    <div
                      onClick={() => {
                        toggleProjectTask(activeProjectModal.id, task.id);
                        setActiveProjectModal(prev => ({
                          ...prev,
                          checklist: prev.checklist.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t)
                        }));
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500" />
                      )}
                      <span className={task.completed ? 'line-through text-slate-500' : 'font-medium'}>
                        {task.title}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        deleteProjectTask(activeProjectModal.id, task.id);
                        setActiveProjectModal(prev => ({
                          ...prev,
                          checklist: prev.checklist.filter(t => t.id !== task.id)
                        }));
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add task input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom task (e.g. Implement Socket.io real-time feed)..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTask(activeProjectModal.id); } }}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleAddTask(activeProjectModal.id)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Task
                </button>
              </div>
            </div>

            {/* Notes & Links */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  if (window.confirm(`Delete project "${activeProjectModal.title}"?`)) {
                    deleteProject(activeProjectModal.id);
                    setActiveProjectModal(null);
                  }
                }}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Project
              </button>

              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddProjectModal && (
        <AddProjectModal onClose={() => setShowAddProjectModal(false)} />
      )}
    </div>
  );
}
