import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRoadmaps } from '../data/initialRoadmaps';
import { initialProjects } from '../data/initialProjects';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const LOCAL_STORAGE_KEY_ROADMAPS = 'my_tech_tracker_roadmaps_v2';
const LOCAL_STORAGE_KEY_PROJECTS = 'my_tech_tracker_projects_v2';
const LOCAL_STORAGE_KEY_HISTORY = 'my_tech_tracker_history_v2';
const LOCAL_STORAGE_KEY_SETTINGS = 'my_tech_tracker_settings_v2';

export function AppProvider({ children }) {
  // 1. Roadmaps State
  const [roadmaps, setRoadmaps] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ROADMAPS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse roadmaps from localStorage:', e);
      }
    }
    return initialRoadmaps;
  });

  // 2. Projects State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse projects from localStorage:', e);
      }
    }
    return initialProjects;
  });

  // 3. Progress History State
  const [progressHistory, setProgressHistory] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
    return [
      { date: '2026-10-01', percentage: 0.5, completed: 1, total: 550 },
      { date: '2026-10-05', percentage: 0.5, completed: 1, total: 550 },
      { date: '2026-10-08', percentage: 0.5, completed: 1, total: 550 }
    ];
  });

  // 4. Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SETTINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch (e) {
        console.error('Failed to parse settings:', e);
      }
    }
    return {
      theme: 'dark',
      dailyGoal: 3,
      weeklyGoal: 15,
      completedTodayCount: 0,
      todayDate: new Date().toISOString().split('T')[0],
      masterPasscode: 'missionima'
    };
  });

  // 4b. Security Lock State
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('my_tech_tracker_unlocked') === 'true';
  });

  // 5. Navigation & Filter State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeRoadmapId, setActiveRoadmapId] = useState('web-dev');
  const [searchQuery, setSearchQuery] = useState('');
  const [roadmapFilter, setRoadmapFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ROADMAPS, JSON.stringify(roadmaps));
    } catch (e) {}
  }, [roadmaps]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(progressHistory));
    } catch (e) {}
  }, [progressHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {}
    if (settings?.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Check today date reset for daily goal counter
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (settings?.todayDate !== today) {
      setSettings(prev => ({ ...prev, todayDate: today, completedTodayCount: 0 }));
    }
  }, []);

  // Safe helper calculation functions
  const calculateItemStats = (itemsList = []) => {
    const safeList = Array.isArray(itemsList) ? itemsList : [];
    const total = safeList.length;
    const completed = safeList.filter(i => i && i.completed).length;
    const remaining = total - completed;
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    return { total, completed, remaining, percentage };
  };

  // Safe helper to extract all items from a roadmap
  const getAllItemsFromRoadmap = (roadmap) => {
    const items = [];
    if (!roadmap || !Array.isArray(roadmap.sections)) return items;
    roadmap.sections.forEach(sec => {
      if (sec && Array.isArray(sec.subsections)) {
        sec.subsections.forEach(sub => {
          if (sub && Array.isArray(sub.items)) items.push(...sub.items);
        });
      }
      if (sec && Array.isArray(sec.items)) items.push(...sec.items);
    });
    return items;
  };

  const getRoadmapStats = (roadmapId) => {
    const safeRoadmaps = Array.isArray(roadmaps) ? roadmaps : initialRoadmaps;
    const roadmap = safeRoadmaps.find(r => r && r.id === roadmapId);
    if (!roadmap) return { total: 0, completed: 0, remaining: 0, percentage: 0 };
    const items = getAllItemsFromRoadmap(roadmap);
    return calculateItemStats(items);
  };

  const getOverallLearningStats = () => {
    let total = 0;
    let completed = 0;
    const safeRoadmaps = Array.isArray(roadmaps) ? roadmaps : initialRoadmaps;
    safeRoadmaps.forEach(r => {
      const items = getAllItemsFromRoadmap(r);
      total += items.length;
      completed += items.filter(i => i && i.completed).length;
    });
    const remaining = total - completed;
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    return { total, completed, remaining, percentage };
  };

  const getProjectStats = () => {
    const safeProjects = Array.isArray(projects) ? projects : initialProjects;
    const total = safeProjects.length;
    const completed = safeProjects.filter(p => p && p.status === 'Completed').length;
    const inProgress = safeProjects.filter(p => p && p.status === 'In Progress').length;
    const planned = safeProjects.filter(p => p && p.status === 'Planned').length;
    const idea = safeProjects.filter(p => p && p.status === 'Idea').length;
    const testing = safeProjects.filter(p => p && p.status === 'Testing').length;
    const paused = safeProjects.filter(p => p && p.status === 'Paused').length;
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    return { total, completed, inProgress, planned, idea, testing, paused, percentage };
  };

  // Record history snapshot helper
  const addHistorySnapshot = (newRoadmaps) => {
    let total = 0;
    let completed = 0;
    const safeRoadmaps = Array.isArray(newRoadmaps) ? newRoadmaps : [];
    safeRoadmaps.forEach(r => {
      const items = getAllItemsFromRoadmap(r);
      total += items.length;
      completed += items.filter(i => i && i.completed).length;
    });
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    const today = new Date().toISOString().split('T')[0];

    setProgressHistory(prev => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const existingTodayIndex = safePrev.findIndex(h => h && h.date === today);
      if (existingTodayIndex >= 0) {
        const updated = [...safePrev];
        updated[existingTodayIndex] = { date: today, percentage, completed, total };
        return updated;
      }
      return [...safePrev, { date: today, percentage, completed, total }];
    });
  };

  // Toggle item completion
  const toggleItemCompletion = (roadmapId, sectionId, subsectionId, itemId) => {
    let itemWasCompleted = false;

    setRoadmaps(prevRoadmaps => {
      const safeRoadmaps = Array.isArray(prevRoadmaps) ? prevRoadmaps : [];
      const updated = safeRoadmaps.map(rm => {
        if (!rm || rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: (rm.sections || []).map(sec => {
            if (!sec || sec.id !== sectionId) return sec;
            return {
              ...sec,
              subsections: (sec.subsections || []).map(sub => {
                if (!sub || sub.id !== subsectionId) return sub;
                return {
                  ...sub,
                  items: (sub.items || []).map(item => {
                    if (!item || item.id !== itemId) return item;
                    const nextCompleted = !item.completed;
                    itemWasCompleted = nextCompleted;
                    return {
                      ...item,
                      completed: nextCompleted,
                      status: nextCompleted ? 'completed' : 'not_started',
                      completedAt: nextCompleted ? new Date().toISOString() : null
                    };
                  })
                };
              })
            };
          })
        };
      });

      addHistorySnapshot(updated);
      return updated;
    });

    if (itemWasCompleted) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {}

      setSettings(prev => ({
        ...prev,
        completedTodayCount: (prev?.completedTodayCount || 0) + 1
      }));
    }
  };

  // Update item notes
  const updateItemNotes = (roadmapId, sectionId, subsectionId, itemId, notes) => {
    setRoadmaps(prev => (prev || []).map(rm => {
      if (!rm || rm.id !== roadmapId) return rm;
      return {
        ...rm,
        sections: (rm.sections || []).map(sec => {
          if (!sec || sec.id !== sectionId) return sec;
          return {
            ...sec,
            subsections: (sec.subsections || []).map(sub => {
              if (!sub || sub.id !== subsectionId) return sub;
              return {
                ...sub,
                items: (sub.items || []).map(item => {
                  if (!item || item.id !== itemId) return item;
                  return { ...item, notes };
                })
              };
            })
          };
        })
      };
    }));
  };

  // Add new topic / item to a subsection
  const addItem = (roadmapId, sectionId, subsectionId, title) => {
    if (!title || !title.trim()) return;
    const newItem = {
      id: `custom-item-${Date.now()}`,
      title: title.trim(),
      completed: false,
      status: 'not_started',
      notes: '',
      createdAt: new Date().toISOString()
    };

    setRoadmaps(prev => {
      const updated = (prev || []).map(rm => {
        if (!rm || rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: (rm.sections || []).map(sec => {
            if (!sec || sec.id !== sectionId) return sec;
            return {
              ...sec,
              subsections: (sec.subsections || []).map(sub => {
                if (!sub || sub.id !== subsectionId) return sub;
                return {
                  ...sub,
                  items: [...(sub.items || []), newItem]
                };
              })
            };
          })
        };
      });
      addHistorySnapshot(updated);
      return updated;
    });
  };

  // Edit item title
  const editItem = (roadmapId, sectionId, subsectionId, itemId, newTitle) => {
    if (!newTitle || !newTitle.trim()) return;
    setRoadmaps(prev => (prev || []).map(rm => {
      if (!rm || rm.id !== roadmapId) return rm;
      return {
        ...rm,
        sections: (rm.sections || []).map(sec => {
          if (!sec || sec.id !== sectionId) return sec;
          return {
            ...sec,
            subsections: (sec.subsections || []).map(sub => {
              if (!sub || sub.id !== subsectionId) return sub;
              return {
                ...sub,
                items: (sub.items || []).map(item => {
                  if (!item || item.id !== itemId) return item;
                  return { ...item, title: newTitle.trim() };
                })
              };
            })
          };
        })
      };
    }));
  };

  // Delete item
  const deleteItem = (roadmapId, sectionId, subsectionId, itemId) => {
    setRoadmaps(prev => {
      const updated = (prev || []).map(rm => {
        if (!rm || rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: (rm.sections || []).map(sec => {
            if (!sec || sec.id !== sectionId) return sec;
            return {
              ...sec,
              subsections: (sec.subsections || []).map(sub => {
                if (!sub || sub.id !== subsectionId) return sub;
                return {
                  ...sub,
                  items: (sub.items || []).filter(item => item && item.id !== itemId)
                };
              })
            };
          })
        };
      });
      addHistorySnapshot(updated);
      return updated;
    });
  };

  // Add Section to a roadmap
  const addSection = (roadmapId, sectionTitle) => {
    if (!sectionTitle || !sectionTitle.trim()) return;
    const newSec = {
      id: `custom-sec-${Date.now()}`,
      title: sectionTitle.trim(),
      subsections: [
        {
          id: `custom-sub-${Date.now()}`,
          title: 'General Topics',
          items: []
        }
      ]
    };

    setRoadmaps(prev => (prev || []).map(rm => {
      if (!rm || rm.id !== roadmapId) return rm;
      return {
        ...rm,
        sections: [...(rm.sections || []), newSec]
      };
    }));
  };

  // Delete Section
  const deleteSection = (roadmapId, sectionId) => {
    setRoadmaps(prev => {
      const updated = (prev || []).map(rm => {
        if (!rm || rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: (rm.sections || []).filter(sec => sec && sec.id !== sectionId)
        };
      });
      addHistorySnapshot(updated);
      return updated;
    });
  };

  // Add new Roadmap dynamically
  const addRoadmap = (title, icon = 'BookOpen', description = '') => {
    if (!title || !title.trim()) return;
    const newRoadmap = {
      id: `roadmap-${Date.now()}`,
      title: title.trim(),
      icon,
      description: description.trim() || 'Custom learning roadmap.',
      custom: true,
      createdAt: new Date().toISOString().split('T')[0],
      sections: [
        {
          id: `sec-${Date.now()}`,
          title: 'Module 1',
          subsections: [
            {
              id: `sub-${Date.now()}`,
              title: 'Getting Started',
              items: [
                {
                  id: `item-${Date.now()}`,
                  title: 'Introduction & Basics',
                  completed: false,
                  status: 'not_started',
                  notes: ''
                }
              ]
            }
          ]
        }
      ]
    };

    setRoadmaps(prev => [...(prev || []), newRoadmap]);
    setActiveRoadmapId(newRoadmap.id);
    setActiveTab('roadmap');
  };

  // Delete dynamic Roadmap
  const deleteRoadmap = (roadmapId) => {
    setRoadmaps(prev => (prev || []).filter(r => r && r.id !== roadmapId));
    if (activeRoadmapId === roadmapId) {
      setActiveRoadmapId('web-dev');
      setActiveTab('dashboard');
    }
  };

  // Reset progress for single roadmap
  const resetRoadmapProgress = (roadmapId) => {
    setRoadmaps(prev => {
      const updated = (prev || []).map(rm => {
        if (!rm || rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: (rm.sections || []).map(sec => ({
            ...sec,
            subsections: (sec.subsections || []).map(sub => ({
              ...sub,
              items: (sub.items || []).map(item => ({
                ...item,
                completed: false,
                status: 'not_started',
                completedAt: null
              }))
            }))
          }))
        };
      });
      addHistorySnapshot(updated);
      return updated;
    });
  };

  // Reset all roadmaps progress
  const resetAllRoadmaps = () => {
    setRoadmaps(initialRoadmaps);
  };

  // PROJECT ACTIONS
  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: projectData.title || 'New Project',
      category: projectData.category || 'Full Stack',
      description: projectData.description || '',
      status: projectData.status || 'Planned',
      techStack: Array.isArray(projectData.techStack) ? projectData.techStack : [],
      githubUrl: projectData.githubUrl || '',
      liveUrl: projectData.liveUrl || '',
      startDate: projectData.startDate || new Date().toISOString().split('T')[0],
      completionDate: projectData.completionDate || '',
      notes: projectData.notes || '',
      checklist: Array.isArray(projectData.checklist) ? projectData.checklist : []
    };
    setProjects(prev => [newProj, ...(prev || [])]);
  };

  const updateProject = (projectId, updatedFields) => {
    setProjects(prev => (prev || []).map(p => p && p.id === projectId ? { ...p, ...updatedFields } : p));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => (prev || []).filter(p => p && p.id !== projectId));
  };

  const toggleProjectTask = (projectId, taskId) => {
    setProjects(prev => (prev || []).map(p => {
      if (!p || p.id !== projectId) return p;
      return {
        ...p,
        checklist: (p.checklist || []).map(task => {
          if (!task || task.id !== taskId) return task;
          return { ...task, completed: !task.completed };
        })
      };
    }));
  };

  const addProjectTask = (projectId, taskTitle) => {
    if (!taskTitle || !taskTitle.trim()) return;
    const newTask = {
      id: `ctask-${Date.now()}`,
      title: taskTitle.trim(),
      completed: false
    };
    setProjects(prev => (prev || []).map(p => {
      if (!p || p.id !== projectId) return p;
      return { ...p, checklist: [...(p.checklist || []), newTask] };
    }));
  };

  const deleteProjectTask = (projectId, taskId) => {
    setProjects(prev => (prev || []).map(p => {
      if (!p || p.id !== projectId) return p;
      return { ...p, checklist: (p.checklist || []).filter(t => t && t.id !== taskId) };
    }));
  };

  const resetAllProjects = () => {
    setProjects(initialProjects);
  };

  // EXPORT / IMPORT
  const exportData = () => {
    const data = {
      version: 2,
      exportDate: new Date().toISOString(),
      roadmaps,
      projects,
      progressHistory,
      settings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-tech-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.roadmaps) setRoadmaps(parsed.roadmaps);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.progressHistory) setProgressHistory(parsed.progressHistory);
      if (parsed.settings) setSettings(parsed.settings);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const unlockApp = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem('my_tech_tracker_unlocked', 'true');
    } catch (e) {}
  };

  const lockApp = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('my_tech_tracker_unlocked');
    } catch (e) {}
  };

  const setMasterPasscode = (passcode) => {
    setSettings(prev => ({ ...prev, masterPasscode: passcode }));
  };

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev?.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  return (
    <AppContext.Provider
      value={{
        roadmaps: Array.isArray(roadmaps) ? roadmaps : initialRoadmaps,
        projects: Array.isArray(projects) ? projects : initialProjects,
        progressHistory: Array.isArray(progressHistory) ? progressHistory : [],
        settings: settings || {},
        isUnlocked,
        unlockApp,
        lockApp,
        setMasterPasscode,
        activeTab,
        setActiveTab,
        activeRoadmapId,
        setActiveRoadmapId,
        searchQuery,
        setSearchQuery,
        roadmapFilter,
        setRoadmapFilter,
        projectFilter,
        setProjectFilter,
        selectedProject,
        setSelectedProject,
        getRoadmapStats,
        getOverallLearningStats,
        getProjectStats,
        getAllItemsFromRoadmap,
        toggleItemCompletion,
        updateItemNotes,
        addItem,
        editItem,
        deleteItem,
        addSection,
        deleteSection,
        addRoadmap,
        deleteRoadmap,
        resetRoadmapProgress,
        resetAllRoadmaps,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectTask,
        addProjectTask,
        deleteProjectTask,
        resetAllProjects,
        exportData,
        importData,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
