import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Laptop,
  Brain,
  Bot,
  Smartphone,
  Flame,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreVertical,
  CheckCircle,
  Circle,
  FileText,
  Trash2,
  Edit2,
  PieChart as PieChartIcon,
  TrendingUp,
  RotateCcw,
  Search,
  Filter
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

export default function RoadmapView() {
  const {
    roadmaps,
    activeRoadmapId,
    getRoadmapStats,
    toggleItemCompletion,
    updateItemNotes,
    addItem,
    editItem,
    deleteItem,
    addSection,
    deleteSection,
    deleteRoadmap,
    resetRoadmapProgress,
    roadmapFilter,
    setRoadmapFilter,
    progressHistory
  } = useApp();

  const currentRoadmap = roadmaps.find(r => r.id === activeRoadmapId) || roadmaps[0];
  const stats = getRoadmapStats(currentRoadmap.id);

  // Accordion open/collapsed state for sections
  const [collapsedSections, setCollapsedSections] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [activeNoteItemId, setActiveNoteItemId] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [newTopicInputs, setNewTopicInputs] = useState({});
  const [newSectionInput, setNewSectionInput] = useState('');
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [activeOptionsMenu, setActiveOptionsMenu] = useState(null);

  const toggleSectionCollapse = (secId) => {
    setCollapsedSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-6 h-6 text-cyan-400" />;
      case 'Brain': return <Brain className="w-6 h-6 text-emerald-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-purple-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-amber-400" />;
      case 'Flame': return <Flame className="w-6 h-6 text-rose-400" />;
      default: return <BookOpen className="w-6 h-6 text-indigo-400" />;
    }
  };

  // Section level progress bar chart data
  const sectionBarData = currentRoadmap.sections.map(sec => {
    let total = 0;
    let completed = 0;
    if (sec.subsections) {
      sec.subsections.forEach(sub => {
        if (sub.items) {
          total += sub.items.length;
          completed += sub.items.filter(i => i.completed).length;
        }
      });
    }
    if (sec.items) {
      total += sec.items.length;
      completed += sec.items.filter(i => i.completed).length;
    }
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    // Shorten section title for chart label
    const shortName = sec.title.replace(/^Phase \d+ — /, '').replace(/^\d+\. /, '').substring(0, 14);
    return { name: shortName, fullName: sec.title, percentage, completed, total };
  });

  const pieData = [
    { name: 'Completed', value: stats.completed, color: '#06b6d4' },
    { name: 'Remaining', value: stats.remaining, color: '#1e293b' }
  ];

  const handleAddTopicSubmit = (secId, subId) => {
    const key = `${secId}-${subId}`;
    const text = newTopicInputs[key];
    if (text && text.trim()) {
      addItem(currentRoadmap.id, secId, subId, text);
      setNewTopicInputs(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleAddSectionSubmit = (e) => {
    e.preventDefault();
    if (newSectionInput.trim()) {
      addSection(currentRoadmap.id, newSectionInput);
      setNewSectionInput('');
      setShowAddSectionForm(false);
    }
  };

  const handleSaveNotes = (secId, subId, itemId) => {
    updateItemNotes(currentRoadmap.id, secId, subId, itemId, noteInput);
    setActiveNoteItemId(null);
  };

  const handleSaveEditItem = (secId, subId, itemId) => {
    if (editTitleInput.trim()) {
      editItem(currentRoadmap.id, secId, subId, itemId, editTitleInput);
    }
    setEditingItemId(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. ROADMAP HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 shadow-lg">
            {getIconComponent(currentRoadmap.icon)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Individual Roadmap
              </span>
              {currentRoadmap.custom && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20">
                  Custom
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">{currentRoadmap.title}</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">{currentRoadmap.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowAddSectionForm(!showAddSectionForm)}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Section
          </button>

          <button
            onClick={() => {
              if (window.confirm(`Reset progress for ${currentRoadmap.title}?`)) {
                resetRoadmapProgress(currentRoadmap.id);
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
            title="Reset Roadmap Checkboxes"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Progress
          </button>

          {currentRoadmap.custom && (
            <button
              onClick={() => {
                if (window.confirm(`Delete custom roadmap "${currentRoadmap.title}"?`)) {
                  deleteRoadmap(currentRoadmap.id);
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-1.5 border border-rose-500/20 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          )}
        </div>
      </div>

      {/* Add Section Form Inline */}
      {showAddSectionForm && (
        <form onSubmit={handleAddSectionSubmit} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <input
            type="text"
            required
            placeholder="New Section Name (e.g. Phase 14 — Architecture)"
            value={newSectionInput}
            onChange={(e) => setNewSectionInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-semibold text-xs">
            Save Section
          </button>
          <button type="button" onClick={() => setShowAddSectionForm(false)} className="px-3 py-2 text-xs text-slate-400">
            Cancel
          </button>
        </form>
      )}

      {/* 2. DEDICATED ROADMAP STATS & GRAPH SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Donut */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-cyan-400" />
                Completed vs Remaining
              </h3>
              <span className="text-xs font-mono font-bold text-cyan-400">{stats.percentage}%</span>
            </div>

            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={4} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-white font-mono">{stats.completed}/{stats.total}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Topics</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Done</div>
              <div className="font-bold text-emerald-400 font-mono">{stats.completed}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Remaining</div>
              <div className="font-bold text-slate-300 font-mono">{stats.remaining}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Total</div>
              <div className="font-bold text-white font-mono">{stats.total}</div>
            </div>
          </div>
        </div>

        {/* Section Progress Bar Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Section Breakdown Progress
              </h3>
              <p className="text-xs text-slate-400">Completion percentage by section/phase</p>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} unit="%" tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(value, name, item) => [`${value}% (${item.payload.completed}/${item.payload.total})`, item.payload.fullName]}
                />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]} fill="#06b6d4" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. SYLLABUS FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Filter Syllabus:</span>
          <div className="flex items-center gap-1.5 ml-2">
            {['all', 'completed', 'in_progress', 'remaining'].map(f => (
              <button
                key={f}
                onClick={() => setRoadmapFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  roadmapFilter === f
                    ? 'bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="font-bold text-white">{currentRoadmap.sections.length}</span> sections
        </div>
      </div>

      {/* 4. COLLAPSIBLE SYLLABUS HIERARCHY */}
      <div className="space-y-4">
        {currentRoadmap.sections.map((sec) => {
          const isCollapsed = collapsedSections[sec.id];
          const secStats = sectionBarData.find(s => s.fullName === sec.title) || { percentage: 0, completed: 0, total: 0 };

          return (
            <div key={sec.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              {/* Section Header Accordion */}
              <div
                onClick={() => toggleSectionCollapse(sec.id)}
                className="p-4 bg-slate-900 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between select-none transition-colors border-b border-slate-800/60"
              >
                <div className="flex items-center gap-3">
                  <div className="text-slate-400">
                    {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{sec.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span>{secStats.completed} / {secStats.total} completed</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-28 bg-slate-950 h-2 rounded-full overflow-hidden hidden sm:block border border-slate-800">
                    <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${secStats.percentage}%` }} />
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${secStats.percentage === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                    {secStats.percentage}%
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete section "${sec.title}"?`)) {
                        deleteSection(currentRoadmap.id, sec.id);
                      }
                    }}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800"
                    title="Delete Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subsection & Items List */}
              {!isCollapsed && (
                <div className="p-4 bg-slate-950/40 space-y-6">
                  {sec.subsections && sec.subsections.map((sub) => {
                    const filteredItems = (sub.items || []).filter(item => {
                      if (roadmapFilter === 'completed') return item.completed;
                      if (roadmapFilter === 'remaining') return !item.completed;
                      if (roadmapFilter === 'in_progress') return item.status === 'in_progress';
                      return true;
                    });

                    const key = `${sec.id}-${sub.id}`;

                    return (
                      <div key={sub.id} className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                          <h4 className="font-semibold text-slate-200 text-sm">{sub.title}</h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {sub.items.filter(i => i.completed).length}/{sub.items.length} done
                          </span>
                        </div>

                        {/* Individual Items / Topics */}
                        <div className="space-y-2">
                          {filteredItems.map((item) => (
                            <div
                              key={item.id}
                              className={`p-3 rounded-xl border transition-all flex flex-col gap-2 ${
                                item.completed
                                  ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-300/90'
                                  : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                {/* Persistent Checkbox */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <button
                                    onClick={() => toggleItemCompletion(currentRoadmap.id, sec.id, sub.id, item.id)}
                                    className="p-0.5 text-slate-400 hover:text-cyan-400 transition-colors"
                                  >
                                    {item.completed ? (
                                      <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                                    )}
                                  </button>

                                  {editingItemId === item.id ? (
                                    <div className="flex items-center gap-2 flex-1">
                                      <input
                                        type="text"
                                        value={editTitleInput}
                                        onChange={(e) => setEditTitleInput(e.target.value)}
                                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                                      />
                                      <button
                                        onClick={() => handleSaveEditItem(sec.id, sub.id, item.id)}
                                        className="text-xs bg-cyan-500 text-white px-2 py-1 rounded"
                                      >
                                        Save
                                      </button>
                                      <button onClick={() => setEditingItemId(null)} className="text-xs text-slate-400">
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <span
                                      onClick={() => toggleItemCompletion(currentRoadmap.id, sec.id, sub.id, item.id)}
                                      className={`text-sm cursor-pointer select-none truncate ${
                                        item.completed ? 'line-through text-slate-400' : 'font-medium'
                                      }`}
                                    >
                                      {item.title}
                                    </span>
                                  )}
                                </div>

                                {/* Options & Notes Trigger */}
                                <div className="flex items-center gap-2">
                                  {item.notes && (
                                    <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-500/20">
                                      <FileText className="w-3 h-3" /> Note
                                    </span>
                                  )}

                                  <div className="relative">
                                    <button
                                      onClick={() => setActiveOptionsMenu(activeOptionsMenu === item.id ? null : item.id)}
                                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                                    >
                                      <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {activeOptionsMenu === item.id && (
                                      <div className="absolute right-0 top-6 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-20 py-1 text-xs space-y-1">
                                        <button
                                          onClick={() => {
                                            setEditingItemId(item.id);
                                            setEditTitleInput(item.title);
                                            setActiveOptionsMenu(null);
                                          }}
                                          className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                                        >
                                          <Edit2 className="w-3.5 h-3.5" /> Edit Topic
                                        </button>
                                        <button
                                          onClick={() => {
                                            setActiveNoteItemId(item.id);
                                            setNoteInput(item.notes || '');
                                            setActiveOptionsMenu(null);
                                          }}
                                          className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                                        >
                                          <FileText className="w-3.5 h-3.5" /> Add Note
                                        </button>
                                        <button
                                          onClick={() => {
                                            deleteItem(currentRoadmap.id, sec.id, sub.id, item.id);
                                            setActiveOptionsMenu(null);
                                          }}
                                          className="w-full text-left px-3 py-1.5 text-rose-400 hover:bg-slate-800 flex items-center gap-2"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" /> Delete
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Inline Notes Drawer */}
                              {activeNoteItemId === item.id && (
                                <div className="mt-2 pt-2 border-t border-slate-800 space-y-2">
                                  <textarea
                                    rows={2}
                                    placeholder="Write persistent notes for this topic (e.g. key formula, intuition)..."
                                    value={noteInput}
                                    onChange={(e) => setNoteInput(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                                  />
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => setActiveNoteItemId(null)}
                                      className="text-xs text-slate-400 px-2 py-1"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleSaveNotes(sec.id, sub.id, item.id)}
                                      className="text-xs bg-cyan-500 text-white font-semibold px-3 py-1 rounded-lg"
                                    >
                                      Save Note
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Existing Notes Display */}
                              {item.notes && activeNoteItemId !== item.id && (
                                <p className="text-xs italic text-amber-300/80 bg-slate-900/60 p-2 rounded-lg border border-amber-500/10">
                                  "{item.notes}"
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* + Add Topic Input */}
                        <div className="mt-3 flex gap-2">
                          <input
                            type="text"
                            placeholder="+ Add new topic to this module..."
                            value={newTopicInputs[key] || ''}
                            onChange={(e) => setNewTopicInputs({ ...newTopicInputs, [key]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTopicSubmit(sec.id, sub.id);
                              }
                            }}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                          />
                          <button
                            onClick={() => handleAddTopicSubmit(sec.id, sub.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Topic
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
