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

  if (!isUnlocked) {
    return (
      <LockScreen
        onUnlock={unlockApp}
        savedPasscode={settings.masterPasscode || 'missionima'}
        onSetPasscode={setMasterPasscode}
      />
    );
  }

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
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto relative">
          {renderActiveTab()}
        </main>
      </div>

      {/* Floating AI Chatbot Button & Widget */}
      {activeTab !== 'ai-chat' && (
        <div className="fixed bottom-6 right-6 z-40">
          {showFloatingBot ? (
            <AIChatBot isFloating={true} onCloseFloating={() => setShowFloatingBot(false)} />
          ) : (
            <button
              onClick={() => setShowFloatingBot(true)}
              className="px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-2xl shadow-cyan-500/30 flex items-center gap-2 hover:scale-105 transition-all group border border-cyan-400/30"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold">Ask AI Assistant</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 group-hover:rotate-12 transition-transform" />
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
