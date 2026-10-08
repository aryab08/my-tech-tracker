import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  requestNotificationPermission,
  checkNotificationPermission,
  sendNativeNotification
} from '../utils/notificationService';
import {
  BellRing,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Clock,
  AlertCircle,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Volume2,
  Calendar,
  RotateCcw,
  Edit2,
  Power
} from 'lucide-react';

export default function TodoRemindersView() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    weeklySchedule,
    toggleScheduleSlot,
    updateScheduleSlotTime,
    addScheduleSlot,
    deleteScheduleSlot,
    resetScheduleToPreset
  } = useApp();

  const [permissionState, setPermissionState] = useState(() => checkNotificationPermission());
  const [activeTabSection, setActiveTabSection] = useState('schedule'); // 'schedule' or 'daily'
  
  // Todo Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA');
  const [priority, setPriority] = useState('High');
  const [dueTime, setDueTime] = useState('21:00');
  const [notifyPhone, setNotifyPhone] = useState(true);
  const [filter, setFilter] = useState('all');

  // Edit Slot Inline State
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [editStartTime, setEditStartTime] = useState('09:00');
  const [editEndTime, setEditEndTime] = useState('11:00');

  // Add Slot Modal/Inline
  const [newSlotDay, setNewSlotDay] = useState('Monday');
  const [newSlotCategory, setNewSlotCategory] = useState('Development');
  const [newSlotStart, setNewSlotStart] = useState('09:00');
  const [newSlotEnd, setNewSlotEnd] = useState('11:00');
  const [showAddSlotForm, setShowAddSlotForm] = useState(false);

  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setPermissionState(res);
    if (res === 'granted') {
      sendNativeNotification(
        '🔔 Phone Notifications Activated!',
        'You will now receive automatic push reminders for your recurring weekly study schedule!'
      );
    }
  };

  const handleTestNotification = () => {
    sendNativeNotification(
      '⏰ Study Alarm Test',
      'This is how your phone push alarm will alert you at your scheduled study time!'
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({
      title: title.trim(),
      category,
      priority,
      dueTime,
      notifyPhone
    });
    setTitle('');
  };

  const handleSaveSlotEdit = (slotId) => {
    updateScheduleSlotTime(slotId, editStartTime, editEndTime);
    setEditingSlotId(null);
  };

  const handleAddSlotSubmit = (e) => {
    e.preventDefault();
    addScheduleSlot({
      day: newSlotDay,
      category: newSlotCategory,
      startTime: newSlotStart,
      endTime: newSlotEnd
    });
    setShowAddSlotForm(false);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    if (filter === 'reminders') return t.notifyPhone && !t.completed;
    return true;
  });

  const priorityColors = {
    High: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Low: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              AUTOMATED STUDY ALARMS
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Weekly Schedule & Phone Reminders
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Recurring weekly study timetable. Push notifications automatically repeat every week at your specified times until stopped or edited.
          </p>
        </div>

        {/* Permission Action Button */}
        <div className="flex items-center gap-3">
          {permissionState === 'granted' ? (
            <button
              onClick={handleTestNotification}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 hover:bg-emerald-500/20 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Notifications Active</span>
              <Volume2 className="w-3.5 h-3.5 ml-1 opacity-75" />
            </button>
          ) : (
            <button
              onClick={handleRequestPermission}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Enable Phone Notifications</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. TAB SWITCHER: WEEKLY TIMETABLE VS DAILY TODOS */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTabSection('schedule')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTabSection === 'schedule'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Weekly Recurring Timetable (7 Days)</span>
        </button>

        <button
          onClick={() => setActiveTabSection('daily')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTabSection === 'daily'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Daily One-Off Todos</span>
        </button>
      </div>

      {/* SECTION A: WEEKLY RECURRING TIMETABLE */}
      {activeTabSection === 'schedule' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Recurring Weekly Study Alarms
              </h2>
              <p className="text-xs text-slate-400">Repeats every week automatically until paused or edited</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddSectionForm(!showAddSlotForm)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/20 flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Slot
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Reset schedule to default pre-loaded timetable?')) {
                    resetScheduleToPreset();
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700"
                title="Reset Schedule to Default Preset"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Schedule
              </button>
            </div>
          </div>

          {/* Add Custom Slot Form */}
          {showAddSlotForm && (
            <form onSubmit={handleAddSlotSubmit} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Day</label>
                <select
                  value={newSlotDay}
                  onChange={(e) => setNewSlotDay(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                >
                  {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Subject</label>
                <select
                  value={newSlotCategory}
                  onChange={(e) => setNewSlotCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                >
                  <option value="Development">Development</option>
                  <option value="DSA">DSA</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="React Native">React Native</option>
                  <option value="System Design">System Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Start Time</label>
                <input
                  type="time"
                  required
                  value={newSlotStart}
                  onChange={(e) => setNewSlotStart(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">End Time</label>
                <input
                  type="time"
                  required
                  value={newSlotEnd}
                  onChange={(e) => setNewSlotEnd(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                />
              </div>

              <div className="flex items-end gap-2">
                <button type="submit" className="flex-1 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs">
                  Save Slot
                </button>
                <button type="button" onClick={() => setShowAddSlotForm(false)} className="px-2 py-1.5 text-xs text-slate-400">
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* 7 Days Timetable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {daysOfWeek.map((dayName) => {
              const daySlots = weeklySchedule.filter(s => s.day === dayName);

              return (
                <div key={dayName} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-lg">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                      <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">{dayName}</h3>
                      <span className="text-[10px] font-mono text-slate-500">{daySlots.length} slots</span>
                    </div>

                    <div className="space-y-2.5">
                      {daySlots.map((slot) => (
                        <div
                          key={slot.id}
                          className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 transition-all ${
                            slot.active
                              ? 'bg-slate-950 border-slate-800 text-slate-200'
                              : 'bg-slate-950/40 border-slate-800/60 opacity-50 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className={`font-bold text-[11px] px-2 py-0.5 rounded border ${
                              slot.category === 'DSA'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                            }`}>
                              {slot.category}
                            </span>

                            {/* Active Toggle */}
                            <button
                              onClick={() => toggleScheduleSlot(slot.id)}
                              className={`p-1 rounded text-[10px] font-bold flex items-center gap-1 ${
                                slot.active
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-slate-800 text-slate-500'
                              }`}
                              title={slot.active ? 'Alarm Active (Click to Pause)' : 'Alarm Paused (Click to Enable)'}
                            >
                              <Power className="w-3 h-3" />
                              <span>{slot.active ? 'ON' : 'OFF'}</span>
                            </button>
                          </div>

                          {editingSlotId === slot.id ? (
                            <div className="space-y-2 mt-1">
                              <div className="flex gap-1">
                                <input
                                  type="time"
                                  value={editStartTime}
                                  onChange={(e) => setEditStartTime(e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] text-white"
                                />
                                <input
                                  type="time"
                                  value={editEndTime}
                                  onChange={(e) => setEditEndTime(e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] text-white"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => setEditingSlotId(null)} className="text-[10px] text-slate-400 px-1">
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSaveSlotEdit(slot.id)}
                                  className="text-[10px] bg-indigo-600 text-white font-semibold px-2 py-0.5 rounded"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-slate-300 font-mono text-[11px] mt-1">
                              <div className="flex items-center gap-1 text-slate-200">
                                <Clock className="w-3 h-3 text-amber-400" />
                                <span>{slot.displayTime || `${slot.startTime}–${slot.endTime}`}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingSlotId(slot.id);
                                    setEditStartTime(slot.startTime);
                                    setEditEndTime(slot.endTime);
                                  }}
                                  className="p-1 text-slate-400 hover:text-white"
                                  title="Edit Time"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => deleteScheduleSlot(slot.id)}
                                  className="p-1 text-slate-500 hover:text-rose-400"
                                  title="Delete Slot"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION B: DAILY ONE-OFF TODOS */}
      {activeTabSection === 'daily' && (
        <div className="space-y-6">
          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              Add Daily Task & One-Off Alarm
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solve 2 Array DSA problems & study Next.js middleware"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="DSA">DSA</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="React Native">React Native</option>
                    <option value="Extras">Extras</option>
                    <option value="Project">Project</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Reminder Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 w-full">
                    <input
                      type="checkbox"
                      checked={notifyPhone}
                      onChange={(e) => setNotifyPhone(e.target.checked)}
                      className="rounded text-indigo-500 focus:ring-0"
                    />
                    <span className="truncate">Send Phone Alert 🔔</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:brightness-110 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Task & Alarm
                </button>
              </div>
            </form>
          </div>

          {/* List & Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {['all', 'active', 'reminders', 'completed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      filter === f
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {f === 'reminders' ? 'Scheduled Reminders 🔔' : f}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-400">
                Total: <span className="font-bold text-white">{todos.length}</span>
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    todo.completed
                      ? 'bg-slate-950/60 border-slate-800/60 text-slate-500'
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="p-1 text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {todo.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                          {todo.category}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityColors[todo.priority]}`}>
                          {todo.priority} Priority
                        </span>
                        {todo.notifyPhone && (
                          <span className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {todo.dueTime}
                          </span>
                        )}
                      </div>

                      <span className={`text-sm font-medium block truncate ${todo.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                        {todo.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {todo.reminderTriggered && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                        Alarm Sent 🔔
                      </span>
                    )}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredTodos.length === 0 && (
                <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400 text-xs">
                  No tasks found in this view. Add a new task above!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
