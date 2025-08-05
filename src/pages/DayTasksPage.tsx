import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/design/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '@/components/design/ErrorMessage/ErrorMessage';
import Modal from '@/components/design/Modal/Modal';
import { useWeeklyTasks, useCreateWeeklyTask, useToggleWeeklyTask, useDeleteWeeklyTask } from '@/hooks/useTasks';
import { WeeklyTask } from '@/types';

interface TaskFormData {
  title: string;
  description?: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  isRewardTrigger?: boolean;
  rewardNote?: string;
  scheduledTime?: string;
}

const DayTasksPage: React.FC = () => {
  const navigate = useNavigate();
  const { day } = useParams<{ day: string }>();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState<TaskFormData>({
    title: '',
    description: '',
    dayOfWeek: (day as any) || 'monday',
    isRewardTrigger: false,
    rewardNote: '',
    scheduledTime: '',
  });

  // React Query hooks
  const { data: weeklyTasks, isLoading, error } = useWeeklyTasks();
  const createWeeklyTaskMutation = useCreateWeeklyTask();
  const toggleWeeklyTaskMutation = useToggleWeeklyTask();
  const deleteWeeklyTaskMutation = useDeleteWeeklyTask();

  const getDayEmoji = (day: string) => {
    const dayEmojis: Record<string, string> = {
      monday: '📅',
      tuesday: '📅',
      wednesday: '📅',
      thursday: '📅',
      friday: '📅',
      saturday: '🎉',
      sunday: '☀️',
    };
    return dayEmojis[day] || '📅';
  };

  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 7) return '🔥';
    if (streak >= 5) return '⚡';
    if (streak >= 3) return '✨';
    if (streak >= 1) return '⭐';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    createWeeklyTaskMutation.mutate(
      {
        title: newTask.title,
        description: newTask.description,
        dayOfWeek: newTask.dayOfWeek,
        completed: false,
        streak: 0,
        isRewardTrigger: newTask.isRewardTrigger,
        rewardNote: newTask.rewardNote,
        scheduledTime: newTask.scheduledTime || undefined,
        order: (weeklyTasks || []).length,
      },
      {
        onSuccess: () => {
          setNewTask({
            title: '',
            description: '',
            dayOfWeek: (day as any) || 'monday',
            isRewardTrigger: false,
            rewardNote: '',
            scheduledTime: '',
          });
          setShowTaskForm(false);
        },
      }
    );
  };

  const handleToggleTask = (taskId: string) => {
    toggleWeeklyTaskMutation.mutate(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteWeeklyTaskMutation.mutate(taskId);
    }
  };

  if (isLoading) {
    return (
      <div className="day-tasks-page">
        <div className="container">
          <div className="loading">
            <LoadingSpinner size="lg" />
            <p>Loading tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="day-tasks-page">
        <div className="container">
          <ErrorMessage 
            message="Error loading tasks."
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  if (!day) {
    return (
      <div className="day-tasks-page">
        <div className="container">
          <ErrorMessage 
            message="Invalid day parameter."
            onRetry={() => navigate('/weekly-tasks')}
          />
        </div>
      </div>
    );
  }

  const dayTasks = (weeklyTasks || []).filter(task => task.dayOfWeek === day);
  const completedTasks = dayTasks.filter(task => task.completed);
  const pendingTasks = dayTasks.filter(task => !task.completed);
  const completionRate = dayTasks.length > 0 ? Math.round((completedTasks.length / dayTasks.length) * 100) : 0;

  return (
    <div className="day-tasks-page">
      <div className="container">
        <div className="page-header">
                           <button
                   className="btn btn--secondary back-btn"
                   onClick={() => navigate('/dashboard')}
                 >
                   ← Back to Dashboard
                 </button>
          
          <div className="header-content">
            <h1>
              {getDayEmoji(day)} {formatDayName(day)}
            </h1>
            <p className="header-subtitle">Complete your {formatDayName(day).toLowerCase()} tasks</p>
          </div>
        </div>

        <div className="day-overview">
          <div className="overview-card">
            <div className="overview-header">
              <h2>{formatDayName(day)} Tasks</h2>
              <div className="overview-stats">
                <span className="stat-item">
                  <span className="stat-number">{dayTasks.length}</span>
                  <span className="stat-label">Total Tasks</span>
                </span>
                <span className="stat-item">
                  <span className="stat-number">{completedTasks.length}</span>
                  <span className="stat-label">Completed</span>
                </span>
                <span className="stat-item">
                  <span className="stat-number">{completionRate}%</span>
                  <span className="stat-label">Progress</span>
                </span>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <span className="progress-text">{completionRate}% Complete</span>
            </div>
          </div>
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Tasks ({dayTasks.length})</h2>
            <div className="header-actions">
              <button 
                className="btn btn--primary"
                onClick={() => setShowTaskForm(true)}
              >
                + Add Task
              </button>
            </div>
          </div>

          <div className="tasks-list">
            {dayTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No tasks for {formatDayName(day)}</h3>
                <p>Start your {formatDayName(day).toLowerCase()} by adding your first task!</p>
                <button 
                  className="btn btn--primary"
                  onClick={() => setShowTaskForm(true)}
                >
                  Add Your First Task
                </button>
              </div>
            ) : (
              dayTasks.map((task) => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <label className="task-checkbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        disabled={toggleWeeklyTaskMutation.isPending}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <div className="task-details">
                      <h4 className="task-title">{task.title}</h4>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                      <div className="task-meta">
                        <span className="streak-counter">
                          {getStreakEmoji(task.streak)} {task.streak} week streak
                        </span>
                        {task.scheduledTime && (
                          <span className="scheduled-time">🕐 {task.scheduledTime}</span>
                        )}
                        {task.isRewardTrigger && task.rewardNote && (
                          <span className="reward-note">🎁 {task.rewardNote}</span>
                        )}
                      </div>
                    </div>

                    <div className="task-actions">
                      <button
                        className="btn btn--danger btn--sm"
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={deleteWeeklyTaskMutation.isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <Modal
          isOpen={showTaskForm}
          onClose={() => setShowTaskForm(false)}
          title={`Add New Task - ${formatDayName(day)}`}
          size="md"
        >
          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="taskTitle">Task Title</label>
                <input
                  type="text"
                  id="taskTitle"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g., Team meeting preparation"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="taskDay">Day of Week</label>
                <select
                  id="taskDay"
                  value={newTask.dayOfWeek}
                  onChange={(e) => setNewTask({ ...newTask, dayOfWeek: e.target.value as any })}
                  required
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="taskDescription">Description (Optional)</label>
              <textarea
                id="taskDescription"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Add more details about this task..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskTime">Scheduled Time (Optional)</label>
              <input
                type="time"
                id="taskTime"
                value={newTask.scheduledTime}
                onChange={(e) => setNewTask({ ...newTask, scheduledTime: e.target.value })}
                placeholder="When do you want to complete this task?"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newTask.isRewardTrigger}
                  onChange={(e) => setNewTask({ ...newTask, isRewardTrigger: e.target.checked })}
                />
                <span className="checkmark"></span>
                This is a reward trigger
              </label>
            </div>

            {newTask.isRewardTrigger && (
              <div className="form-group">
                <label htmlFor="rewardNote">Reward Note</label>
                <input
                  type="text"
                  id="rewardNote"
                  value={newTask.rewardNote}
                  onChange={(e) => setNewTask({ ...newTask, rewardNote: e.target.value })}
                  placeholder="e.g., Treat yourself to a movie!"
                />
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn btn--primary" disabled={createWeeklyTaskMutation.isPending}>
                {createWeeklyTaskMutation.isPending ? 'Adding...' : 'Add Task'}
              </button>
              <button 
                type="button" 
                className="btn btn--secondary"
                onClick={() => {
                  const currentDay = newTask.dayOfWeek;
                  setNewTask({
                    title: '',
                    description: '',
                    dayOfWeek: currentDay,
                    isRewardTrigger: false,
                    rewardNote: '',
                    scheduledTime: '',
                  });
                }}
                disabled={createWeeklyTaskMutation.isPending}
              >
                Add Another for {formatDayName(newTask.dayOfWeek)}
              </button>
              <button 
                type="button" 
                className="btn btn--tertiary"
                onClick={() => setShowTaskForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default DayTasksPage; 