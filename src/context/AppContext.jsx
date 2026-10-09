import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRoadmaps } from '../data/initialRoadmaps';
import { initialProjects } from '../data/initialProjects';
import { initialWeeklySchedule } from '../data/initialSchedule';
import { sendNativeNotification } from '../utils/notificationService';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const LOCAL_STORAGE_KEY_ROADMAPS = 'my_tech_tracker_roadmaps_v2';
const LOCAL_STORAGE_KEY_PROJECTS = 'my_tech_tracker_projects_v2';
const LOCAL_STORAGE_KEY_HISTORY = 'my_tech_tracker_history_v2';
const LOCAL_STORAGE_KEY_SETTINGS = 'my_tech_tracker_settings_v2';
const LOCAL_STORAGE_KEY_TODOS = 'my_tech_tracker_todos_v2';
const LOCAL_STORAGE_KEY_SCHEDULE = 'my_tech_tracker_schedule_v2';

export function AppProvider({ children }) {
  // 1. Roadmaps State
  const [roadmaps, setRoadmaps] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ROADMAPS);
    if (saved) {
      try {
        return JSON.parse(saved);
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
        return JSON.parse(saved);
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
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
    // Default initial history snapshot
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
        return JSON.parse(saved);
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

  // 4c. Todos & Reminders State
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TODOS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse todos:', e);
      }
    }
    return [
      {
        id: 't-1',
        title: 'Study 2 Web Development Topics',
        category: 'Web Dev',
        priority: 'High',
        dueTime: '21:00',
        completed: false,
        notifyPhone: true,
        reminderTriggered: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 't-2',
        title: 'Solve 1 DSA Problem on Arrays',
        category: 'DSA',
        priority: 'High',
        dueTime: '22:00',
        completed: false,
        notifyPhone: true,
        reminderTriggered: false,
        createdAt: new Date().toISOString()
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
  }, [todos]);

  // 4d. Weekly Recurring Schedule State
  const [weeklySchedule, setWeeklySchedule] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SCHEDULE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse schedule:', e);
      }
    }
    return initialWeeklySchedule;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SCHEDULE, JSON.stringify(weeklySchedule));
  }, [weeklySchedule]);

  // Background recurring schedule checker (matches Day + Time + Date)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDayIndex = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const currentHoursMin = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const todayDateStr = now.toISOString().split('T')[0];

      setWeeklySchedule(prevSchedule => {
        let hasChanges = false;
        const updated = prevSchedule.map(slot => {
          if (
            slot.active &&
            slot.notifyPhone &&
            slot.dayIndex === currentDayIndex &&
            slot.startTime === currentHoursMin &&
            slot.lastTriggeredDate !== todayDateStr
          ) {
            hasChanges = true;
            // Trigger Phone Push Alert for Recurring Study Session!
            try {
              sendNativeNotification(
                `⏰ Recurring Study Alarm: ${slot.category} (${slot.day})`,
                `Time for your ${slot.displayTime} ${slot.category} session! Open My Tech Tracker.`
              );
            } catch (err) {
              console.warn('Notification trigger error:', err);
            }
            return { ...slot, lastTriggeredDate: todayDateStr };
          }
          return slot;
        });
        return hasChanges ? updated : prevSchedule;
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // 5. Navigation & Filter State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'roadmap', 'projects', 'analytics', 'settings'
  const [activeRoadmapId, setActiveRoadmapId] = useState('web-dev');
  const [searchQuery, setSearchQuery] = useState('');
  const [roadmapFilter, setRoadmapFilter] = useState('all'); // 'all', 'completed', 'in_progress', 'remaining'
  const [projectFilter, setProjectFilter] = useState('all'); // 'all', 'Idea', 'Planned', 'In Progress', 'Testing', 'Completed', 'Paused'
  const [selectedProject, setSelectedProject] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ROADMAPS, JSON.stringify(roadmaps));
  }, [roadmaps]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(progressHistory));
  }, [progressHistory]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Check today date reset for daily goal counter
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (settings.todayDate !== today) {
      setSettings(prev => ({ ...prev, todayDate: today, completedTodayCount: 0 }));
    }
  }, []);

  // Helper calculation functions
  const calculateItemStats = (itemsList) => {
    const total = itemsList.length;
    const completed = itemsList.filter(i => i.completed).length;
    const remaining = total - completed;
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    return { total, completed, remaining, percentage };
  };

  // Helper to extract all items from a roadmap
  const getAllItemsFromRoadmap = (roadmap) => {
    const items = [];
    if (!roadmap || !roadmap.sections) return items;
    roadmap.sections.forEach(sec => {
      if (sec.subsections) {
        sec.subsections.forEach(sub => {
          if (sub.items) items.push(...sub.items);
        });
      }
      if (sec.items) items.push(...sec.items);
    });
    return items;
  };

  const getRoadmapStats = (roadmapId) => {
    const roadmap = roadmaps.find(r => r.id === roadmapId);
    if (!roadmap) return { total: 0, completed: 0, remaining: 0, percentage: 0 };
    const items = getAllItemsFromRoadmap(roadmap);
    return calculateItemStats(items);
  };

  const getOverallLearningStats = () => {
    let total = 0;
    let completed = 0;
    roadmaps.forEach(r => {
      const items = getAllItemsFromRoadmap(r);
      total += items.length;
      completed += items.filter(i => i.completed).length;
    });
    const remaining = total - completed;
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    return { total, completed, remaining, percentage };
  };

  const getProjectStats = () => {
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'Completed').length;
    const inProgress = projects.filter(p => p.status === 'In Progress').length;
    const planned = projects.filter(p => p.status === 'Planned').length;
    const idea = projects.filter(p => p.status === 'Idea').length;
    const testing = projects.filter(p => p.status === 'Testing').length;
    const paused = projects.filter(p => p.status === 'Paused').length;
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    return { total, completed, inProgress, planned, idea, testing, paused, percentage };
  };

  // Record history snapshot helper
  const addHistorySnapshot = (newRoadmaps) => {
    let total = 0;
    let completed = 0;
    newRoadmaps.forEach(r => {
      const items = getAllItemsFromRoadmap(r);
      total += items.length;
      completed += items.filter(i => i.completed).length;
    });
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    const today = new Date().toISOString().split('T')[0];

    setProgressHistory(prev => {
      const existingTodayIndex = prev.findIndex(h => h.date === today);
      if (existingTodayIndex >= 0) {
        const updated = [...prev];
        updated[existingTodayIndex] = { date: today, percentage, completed, total };
        return updated;
      }
      return [...prev, { date: today, percentage, completed, total }];
    });
  };

  // Toggle item completion
  const toggleItemCompletion = (roadmapId, sectionId, subsectionId, itemId) => {
    let itemWasCompleted = false;

    setRoadmaps(prevRoadmaps => {
      const updated = prevRoadmaps.map(rm => {
        if (rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: rm.sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              subsections: sec.subsections.map(sub => {
                if (sub.id !== subsectionId) return sub;
                return {
                  ...sub,
                  items: sub.items.map(item => {
                    if (item.id !== itemId) return item;
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
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {}

      // Update today counter
      setSettings(prev => ({
        ...prev,
        completedTodayCount: prev.completedTodayCount + 1
      }));
    }
  };

  // Update item notes
  const updateItemNotes = (roadmapId, sectionId, subsectionId, itemId, notes) => {
    setRoadmaps(prev => prev.map(rm => {
      if (rm.id !== roadmapId) return rm;
      return {
        ...rm,
        sections: rm.sections.map(sec => {
          if (sec.id !== sectionId) return sec;
          return {
            ...sec,
            subsections: sec.subsections.map(sub => {
              if (sub.id !== subsectionId) return sub;
              return {
                ...sub,
                items: sub.items.map(item => {
                  if (item.id !== itemId) return item;
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
    if (!title.trim()) return;
    const newItem = {
      id: `custom-item-${Date.now()}`,
      title: title.trim(),
      completed: false,
      status: 'not_started',
      notes: '',
      createdAt: new Date().toISOString()
    };

    setRoadmaps(prev => {
      const updated = prev.map(rm => {
        if (rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: rm.sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              subsections: sec.subsections.map(sub => {
                if (sub.id !== subsectionId) return sub;
                return {
                  ...sub,
                  items: [...sub.items, newItem]
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
    if (!newTitle.trim()) return;
    setRoadmaps(prev => prev.map(rm => {
      if (rm.id !== roadmapId) return rm;
      return {
        ...rm,
        sections: rm.sections.map(sec => {
          if (sec.id !== sectionId) return sec;
          return {
            ...sec,
            subsections: sec.subsections.map(sub => {
              if (sub.id !== subsectionId) return sub;
              return {
                ...sub,
                items: sub.items.map(item => {
                  if (item.id !== itemId) return item;
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
      const updated = prev.map(rm => {
        if (rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: rm.sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              subsections: sec.subsections.map(sub => {
                if (sub.id !== subsectionId) return sub;
                return {
                  ...sub,
                  items: sub.items.filter(item => item.id !== itemId)
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
    if (!sectionTitle.trim()) return;
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

    setRoadmaps(prev => prev.map(rm => {
      if (rm.id !== roadmapId) return rm;
      return {
        ...rm,
        sections: [...rm.sections, newSec]
      };
    }));
  };

  // Delete Section
  const deleteSection = (roadmapId, sectionId) => {
    setRoadmaps(prev => {
      const updated = prev.map(rm => {
        if (rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: rm.sections.filter(sec => sec.id !== sectionId)
        };
      });
      addHistorySnapshot(updated);
      return updated;
    });
  };

  // Add new Roadmap dynamically
  const addRoadmap = (title, icon = 'BookOpen', description = '') => {
    if (!title.trim()) return;
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

    setRoadmaps(prev => [...prev, newRoadmap]);
    setActiveRoadmapId(newRoadmap.id);
    setActiveTab('roadmap');
  };

  // Delete dynamic Roadmap
  const deleteRoadmap = (roadmapId) => {
    setRoadmaps(prev => prev.filter(r => r.id !== roadmapId));
    if (activeRoadmapId === roadmapId) {
      setActiveRoadmapId('web-dev');
      setActiveTab('dashboard');
    }
  };

  // Reset progress for single roadmap
  const resetRoadmapProgress = (roadmapId) => {
    setRoadmaps(prev => {
      const updated = prev.map(rm => {
        if (rm.id !== roadmapId) return rm;
        return {
          ...rm,
          sections: rm.sections.map(sec => ({
            ...sec,
            subsections: sec.subsections.map(sub => ({
              ...sub,
              items: sub.items.map(item => ({
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
    setRoadmaps(prev => {
      const updated = prev.map(rm => ({
        ...rm,
        sections: rm.sections.map(sec => ({
          ...sec,
          subsections: sec.subsections.map(sub => ({
            ...sub,
            items: sub.items.map(item => ({
              ...item,
              completed: false,
              status: 'not_started',
              completedAt: null
            }))
          }))
        }))
      }));
      addHistorySnapshot(updated);
      return updated;
    });
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
      checklist: projectData.checklist || []
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = (projectId, updatedFields) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updatedFields } : p));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const toggleProjectTask = (projectId, taskId) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        checklist: p.checklist.map(task => {
          if (task.id !== taskId) return task;
          return { ...task, completed: !task.completed };
        })
      };
    }));
  };

  const addProjectTask = (projectId, taskTitle) => {
    if (!taskTitle.trim()) return;
    const newTask = {
      id: `ctask-${Date.now()}`,
      title: taskTitle.trim(),
      completed: false
    };
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, checklist: [...p.checklist, newTask] };
    }));
  };

  const deleteProjectTask = (projectId, taskId) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, checklist: p.checklist.filter(t => t.id !== taskId) };
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

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const unlockApp = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('my_tech_tracker_unlocked', 'true');
  };

  const lockApp = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('my_tech_tracker_unlocked');
  };

  const setMasterPasscode = (passcode) => {
    setSettings(prev => ({ ...prev, masterPasscode: passcode }));
  };

  const addTodo = (todoData) => {
    const newTodo = {
      id: `todo-${Date.now()}`,
      title: todoData.title,
      category: todoData.category || 'General',
      priority: todoData.priority || 'Medium',
      dueTime: todoData.dueTime || '20:00',
      completed: false,
      notifyPhone: todoData.notifyPhone !== false,
      reminderTriggered: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const toggleScheduleSlot = (slotId) => {
    setWeeklySchedule(prev => prev.map(s => s.id === slotId ? { ...s, active: !s.active } : s));
  };

  const updateScheduleSlotTime = (slotId, startTime, endTime, displayTime) => {
    setWeeklySchedule(prev => prev.map(s => {
      if (s.id !== slotId) return s;
      return { ...s, startTime, endTime, displayTime: displayTime || `${startTime}–${endTime}` };
    }));
  };

  const addScheduleSlot = (slotData) => {
    const dayMap = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 0 };
    const newSlot = {
      id: `sch-${Date.now()}`,
      day: slotData.day,
      dayIndex: dayMap[slotData.day] ?? 1,
      category: slotData.category || 'Development',
      startTime: slotData.startTime || '09:00',
      endTime: slotData.endTime || '11:00',
      displayTime: slotData.displayTime || `${slotData.startTime}–${slotData.endTime}`,
      active: true,
      notifyPhone: true,
      lastTriggeredDate: ''
    };
    setWeeklySchedule(prev => [...prev, newSlot]);
  };

  const deleteScheduleSlot = (slotId) => {
    setWeeklySchedule(prev => prev.filter(s => s.id !== slotId));
  };

  const resetScheduleToPreset = () => {
    setWeeklySchedule(initialWeeklySchedule);
  };

  return (
    <AppContext.Provider
      value={{
        roadmaps,
        projects,
        progressHistory,
        settings,
        todos,
        weeklySchedule,
        addTodo,
        toggleTodo,
        deleteTodo,
        toggleScheduleSlot,
        updateScheduleSlotTime,
        addScheduleSlot,
        deleteScheduleSlot,
        resetScheduleToPreset,
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
