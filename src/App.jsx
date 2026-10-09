import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import RoadmapView from './components/RoadmapView';
import ProjectsView from './components/ProjectsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import LockScreen from './components/LockScreen';
import AIChatBot from './components/AIChatBot';
import { Bot, Sparkles } from 'lucide-react';

function AppContent() {
  const { activeTab, isUnlocked, unlockApp, settings, setMasterPasscode } = useApp();
  const [showFloatingBot, setShowFloatingBot] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'projects':
        return <ProjectsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'ai-chat':
        return <AIChatBot isFloating={false} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      {!isUnlocked ? (
        <div className="flex-1">
          <LockScreen
            onUnlock={unlockApp}
            savedPasscode={settings.masterPasscode || 'missionima'}
            onSetPasscode={setMasterPasscode}
          />
        </div>
      ) : (
        <>
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 overflow-y-auto relative">
              {renderActiveTab()}
            </main>
          </div>
        </>
      )}

      {/* ALWAYS VISIBLE FLOATING AI CHATBOT AT BOTTOM-RIGHT CORNER */}
      {activeTab !== 'ai-chat' && (
        <div className="fixed bottom-6 right-6 z-[99999]">
          {showFloatingBot ? (
            <div className="relative">
              <AIChatBot isFloating={true} onCloseFloating={() => setShowFloatingBot(false)} />
            </div>
          ) : (
            <button
              onClick={() => setShowFloatingBot(true)}
              className="group relative px-5 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-extrabold shadow-2xl shadow-cyan-500/40 flex items-center gap-3 hover:scale-105 transition-all duration-300 border-2 border-cyan-400/40 cursor-pointer"
            >
              {/* Pulse Ring Indicator */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border border-white"></span>
              </span>

              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-white animate-pulse" />
              </div>

              <div className="text-left">
                <div className="text-[10px] text-cyan-200 font-semibold uppercase tracking-wider">Online AI Tutor</div>
                <div className="text-xs font-black tracking-tight flex items-center gap-1">
                  <span>AI Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
