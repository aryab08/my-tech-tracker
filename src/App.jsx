import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import RoadmapView from './components/RoadmapView';
import ProjectsView from './components/ProjectsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import LockScreen from './components/LockScreen';

function AppContent() {
  const { activeTab, isUnlocked, unlockApp, settings, setMasterPasscode } = useApp();

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
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderActiveTab()}
        </main>
      </div>
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
