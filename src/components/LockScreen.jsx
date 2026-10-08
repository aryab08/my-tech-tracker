import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export default function LockScreen({ onUnlock, savedPasscode, onSetPasscode }) {
  const [inputPasscode, setInputPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');

  const isFirstTime = !savedPasscode;

  const handleUnlock = (e) => {
    e.preventDefault();
    if (inputPasscode === savedPasscode) {
      onUnlock();
    } else {
      setErrorMsg('Incorrect master passcode. Access denied.');
      setInputPasscode('');
    }
  };

  const handleCreatePasscode = (e) => {
    e.preventDefault();
    if (newPasscode.length < 4) {
      setErrorMsg('Passcode must be at least 4 characters.');
      return;
    }
    if (newPasscode !== confirmPasscode) {
      setErrorMsg('Passcodes do not match.');
      return;
    }
    onSetPasscode(newPasscode);
    onUnlock();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10 text-slate-100">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-cyan-500/20">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white">
            My Tech Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Private Personal Engineering Dashboard
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-semibold mt-3">
            <ShieldAlert className="w-3.5 h-3.5" /> Private Access Restricted
          </div>
        </div>

        {isFirstTime ? (
          /* First Time Setup Form */
          <form onSubmit={handleCreatePasscode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Create Master Security Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Set secret PIN or password..."
                value={newPasscode}
                onChange={(e) => { setNewPasscode(e.target.value); setErrorMsg(''); }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Confirm Master Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Confirm secret passcode..."
                value={confirmPasscode}
                onChange={(e) => { setConfirmPasscode(e.target.value); setErrorMsg(''); }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/20 text-center font-medium">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>Set Secret Passcode & Unlock</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Login Passcode Verification */
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Enter Master Security Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  autoFocus
                  required
                  placeholder="Enter passcode..."
                  value={inputPasscode}
                  onChange={(e) => { setInputPasscode(e.target.value); setErrorMsg(''); }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/20 text-center font-medium">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>Unlock Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
          Only authorized owner can access stored user data & metrics.
        </div>
      </div>
    </div>
  );
}
