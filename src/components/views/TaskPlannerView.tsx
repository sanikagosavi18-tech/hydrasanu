import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  ArrowLeft,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { FarmTask } from '../../types';

interface TaskPlannerViewProps {
  tasks: FarmTask[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: FarmTask) => void;
  onDeleteTask: (id: string) => void;
  onBack: () => void;
}

export const TaskPlannerView: React.FC<TaskPlannerViewProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onBack,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCrop, setNewCrop] = useState('Wheat');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newCategory, setNewCategory] = useState<FarmTask['category']>('Irrigation');
  const [newNotes, setNewNotes] = useState('');

  const categories: string[] = ['All', 'Irrigation', 'Fertilizer', 'Pest Control', 'Harvesting', 'Sowing', 'Weeding'];

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory === 'All') return true;
    return t.category === filterCategory;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const highPriorityCount = tasks.filter((t) => t.priority === 'High' && !t.completed).length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const task: FarmTask = {
      id: 'task-' + Date.now(),
      title: newTitle.trim(),
      crop: newCrop,
      dueDate: newDate,
      priority: newPriority,
      category: newCategory,
      completed: false,
      notes: newNotes.trim() || undefined,
    };

    onAddTask(task);
    setNewTitle('');
    setNewNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-emerald-100 dark:border-slate-800">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5c46] dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Farm Task Planner
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Schedule field operations, irrigation rounds, and fertilizer sprays
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Farm Task</span>
        </button>
      </div>

      {/* Summary Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Tasks</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">{tasks.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-2xs">
          <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">Pending</p>
          <p className="text-2xl font-black text-sky-600 dark:text-sky-400 tabular-nums">{pendingCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-2xs">
          <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">High Priority</p>
          <p className="text-2xl font-black text-rose-600 dark:text-rose-400 tabular-nums">{highPriorityCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-2xs">
          <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Completed</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{completedCount}</p>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-sky-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 text-slate-400">
            <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-40 text-sky-500" />
            <p className="text-xs">No tasks found for this category.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                task.completed
                  ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
                  : 'bg-white dark:bg-slate-900 border-sky-100/80 dark:border-slate-800 shadow-xs hover:border-sky-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 hover:scale-110 transition-transform" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className={`text-sm font-bold ${
                        task.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Crop: {task.crop}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.dueDate}</span>
                    </span>
                    <span>·</span>
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] font-medium">
                      {task.category}
                    </span>
                  </div>

                  {task.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                      Note: {task.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    task.priority === 'High'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                      : task.priority === 'Medium'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {task.priority} Priority
                </span>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Schedule Farm Activity
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Spray neem oil in Sector 3"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Crop
                  </label>
                  <select
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Wheat">Wheat</option>
                    <option value="Rice (Paddy)">Rice (Paddy)</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Maize">Maize</option>
                    <option value="Potato">Potato</option>
                    <option value="Sugarcane">Sugarcane</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as FarmTask['category'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Irrigation">Irrigation</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Pest Control">Pest Control</option>
                    <option value="Harvesting">Harvesting</option>
                    <option value="Sowing">Sowing</option>
                    <option value="Weeding">Weeding</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Field Notes / Dosage (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Check soil moisture before starting motor"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-xs"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
