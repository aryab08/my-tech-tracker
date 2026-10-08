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
  Volume2
} from 'lucide-react';

export default function TodoRemindersView() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useApp();

  const [permissionState, setPermissionState] = useState(() => checkNotificationPermission());
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA');
  const [priority, setPriority] = useState('High');
  const [dueTime, setDueTime] = useState('21:00');
  const [notifyPhone, setNotifyPhone] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed', 'reminders'

  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setPermissionState(res);
    if (res === 'granted') {
      sendNativeNotification(
        '🔔 Phone Notifications Activated!',
        'You will now receive automatic push reminders for your scheduled study tasks!'
      );
    }
  };

  const handleTestNotification = () => {
    sendNativeNotification(
      '🚀 Test Study Reminder',
      'This is how your phone notification will alert you at your chosen study time!'
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
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              DAILY AGENDA & ALARMS
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Daily Todos & Phone Reminders
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Set daily study tasks and scheduled alarm times to receive direct push notifications on your phone or desktop.
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

      {/* 2. ADD TODO & REMINDER FORM */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-400" />
          Add Daily Task & Set Target Time
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

      {/* 3. LIST & FILTERS */}
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

        {/* Todos Cards */}
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
  );
}
