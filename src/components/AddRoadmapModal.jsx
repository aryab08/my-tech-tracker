import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, BookOpen, Laptop, Brain, Bot, Smartphone, Flame } from 'lucide-react';

export default function AddRoadmapModal({ onClose }) {
  const { addRoadmap } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('BookOpen');

  const icons = [
    { name: 'BookOpen', label: 'General / Study', IconComp: BookOpen },
    { name: 'Laptop', label: 'Web / Tech', IconComp: Laptop },
    { name: 'Brain', label: 'DSA / Logic', IconComp: Brain },
    { name: 'Bot', label: 'AI / ML', IconComp: Bot },
    { name: 'Smartphone', label: 'Mobile App', IconComp: Smartphone },
    { name: 'Flame', label: 'Advanced', IconComp: Flame }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addRoadmap(title, icon, description);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          Create New Roadmap
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          Add any customized learning path (e.g. System Design, German, Cybersecurity).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Roadmap Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. System Design & Cloud Architecture"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Short description of what this roadmap covers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Icon
            </label>
            <div className="grid grid-cols-3 gap-2">
              {icons.map(({ name, label, IconComp }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setIcon(name)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs transition-all ${
                    icon === name
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                  <span className="text-[10px]">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all"
            >
              Create Roadmap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
