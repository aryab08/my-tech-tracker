import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Trophy
} from 'lucide-react';

export default function SettingsView() {
  const {
    settings,
    toggleTheme,
    exportData,
    importData,
    resetAllRoadmaps,
    resetAllProjects
  } = useApp();

  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState(null);
  const [confirmResetRoadmaps, setConfirmResetRoadmaps] = useState(false);
  const [confirmResetProjects, setConfirmResetProjects] = useState(false);

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const res = importData(importJsonText);
    if (res.success) {
      setImportStatus({ type: 'success', message: 'Data imported successfully!' });
      setImportJsonText('');
    } else {
      setImportStatus({ type: 'error', message: `Import failed: ${res.error}` });
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const res = importData(text);
        if (res.success) {
          setImportStatus({ type: 'success', message: 'Backup file restored successfully!' });
        } else {
          setImportStatus({ type: 'error', message: `File import failed: ${res.error}` });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            CONFIGURATION & DATA
          </span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">System Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage application theme, daily goals, data export/import backups, and progress resets.
        </p>
      </div>

      {/* SECTION 1: APPEARANCE & GOALS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-400" />
          Appearance & Daily Study Goals
        </h2>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <div className="font-semibold text-white text-sm">Color Theme</div>
            <div className="text-xs text-slate-400">Switch between dark SaaS theme and light mode</div>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700"
          >
            {settings.theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" /> Dark Mode Active
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" /> Light Mode Active
              </>
            )}
          </button>
        </div>
      </div>

      {/* SECTION 2: EXPORT & IMPORT DATA */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Download className="w-5 h-5 text-cyan-400" />
          Data Backup & Export / Import
        </h2>
        <p className="text-xs text-slate-400">
          All your roadmap checkboxes, notes, and project data are user-owned. You can export a full JSON snapshot anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" /> Export Backup
            </h3>
            <p className="text-xs text-slate-400">Download complete JSON backup file of all roadmaps, projects & notes.</p>
            <button
              onClick={exportData}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              Export My Data (.json)
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-400" /> Import Backup File
            </h3>
            <p className="text-xs text-slate-400">Restore previously exported JSON backup file.</p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        {importStatus && (
          <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            importStatus.type === 'success' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' : 'bg-rose-950/40 text-rose-300 border-rose-500/30'
          }`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>{importStatus.message}</span>
          </div>
        )}
      </div>

      {/* SECTION 3: RESET ACTIONS */}
      <div className="bg-slate-900 border border-rose-500/20 rounded-3xl p-6 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          Danger Zone — Reset Actions
        </h2>
        <p className="text-xs text-slate-400">
          Resetting will set user completion checkboxes back to initial state. Requires explicit confirmation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-semibold text-white text-sm">Reset All Roadmap Progress</div>
            <p className="text-xs text-slate-400">Unchecks all learning topics across all roadmaps.</p>

            {confirmResetRoadmaps ? (
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-400 block">Are you 100% sure?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      resetAllRoadmaps();
                      setConfirmResetRoadmaps(false);
                    }}
                    className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setConfirmResetRoadmaps(false)}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmResetRoadmaps(true)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
              >
                Reset Roadmaps
              </button>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-semibold text-white text-sm">Reset All Projects Data</div>
            <p className="text-xs text-slate-400">Restores starter project portfolio checklist states.</p>

            {confirmResetProjects ? (
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-400 block">Are you 100% sure?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      resetAllProjects();
                      setConfirmResetProjects(false);
                    }}
                    className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setConfirmResetProjects(false)}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmResetProjects(true)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
              >
                Reset Projects
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
