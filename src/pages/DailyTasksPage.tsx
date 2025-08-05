import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/design/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '@/components/design/ErrorMessage/ErrorMessage';
import { useDailyTasks, useCreateDailyTask, useToggleDailyTask, useDeleteDailyTask, useTaskStatistics } from '@/hooks/useTasks';
import { DailyTask } from '@/types';

interface TaskFormData {
  title: string;
  description?: string;
  isRewardTrigger?: boolean;
  rewardNote?: string;
  scheduledTime?: string;
}

const DailyTasksPage: React.FC = () => {
  const navigate = useNavigate();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState<TaskFormData>({
    title: '',
    description: '',
    isRewardTrigger: false,
    rewardNote: '',
    scheduledTime: '',
  });

  // React Query hooks
  const { data: dailyTasks, isLoading, error } = useDailyTasks();
  const { data: statistics } = useTaskStatistics();
  const createDailyTaskMutation = useCreateDailyTask();
  const toggleDailyTaskMutation = useToggleDailyTask();
  const deleteDailyTaskMutation = useDeleteDailyTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    createDailyTaskMutation.mutate(
      {
        title: newTask.title,
        description: newTask.description,
        completed: false,
        streak: 0,
        isRewardTrigger: newTask.isRewardTrigger,
        rewardNote: newTask.rewardNote,
        scheduledTime: newTask.scheduledTime || undefined,
        order: dailyTasks?.length || 0,
      },
      {
        onSuccess: () => {
          setNewTask({
            title: '',
            description: '',
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
    toggleDailyTaskMutation.mutate(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteDailyTaskMutation.mutate(taskId);
    }
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 7) return '🔥';
    if (streak >= 5) return '⚡';
    if (streak >= 3) return '✨';
    if (streak >= 1) return '⭐';
    return '';
  };

  if (isLoading) {
    return (
      <div className="daily-tasks-page">
        <div className="container">
          <div className="loading">
            <LoadingSpinner size="lg" />
            <p>Loading daily tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="daily-tasks-page">
        <div className="container">
          <ErrorMessage 
            message="Error loading daily tasks."
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="daily-tasks-page">
      <div className="container">
        <div className="page-header">
          <button 
            className="btn btn--secondary back-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Goals
          </button>
          
          <div className="header-content">
            <h1>Daily Tasks</h1>
            <p className="header-subtitle">Build habits that stick with daily routines</p>
          </div>
        </div>

        <div className="statistics-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{statistics?.dailyCompleted || 0}</div>
              <div className="stat-label">Completed Today</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{statistics?.dailyTotal || 0}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {statistics?.dailyTotal ? Math.round((statistics.dailyCompleted / statistics.dailyTotal) * 100) : 0}%
              </div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Today's Tasks</h2>
            <button 
              className="btn btn--primary"
              onClick={() => setShowTaskForm(!showTaskForm)}
            >
              {showTaskForm ? 'Cancel' : '+ Add Task'}
            </button>
          </div>

          {showTaskForm && (
            <div className="task-form-container">
              <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                  <label htmlFor="taskTitle">Task Title</label>
                  <input
                    type="text"
                    id="taskTitle"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g., Drink 8 glasses of water"
                    required
                  />
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
                      placeholder="e.g., Treat yourself to a coffee!"
                    />
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn btn--primary" disabled={createDailyTaskMutation.isPending}>
                    {createDailyTaskMutation.isPending ? 'Adding...' : 'Add Task'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn--secondary"
                    onClick={() => setShowTaskForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="tasks-list">
            {dailyTasks?.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No daily tasks yet</h3>
                <p>Start building your daily routine by adding your first task!</p>
                <button 
                  className="btn btn--primary"
                  onClick={() => setShowTaskForm(true)}
                >
                  Add Your First Task
                </button>
              </div>
            ) : (
              dailyTasks?.map((task) => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <label className="task-checkbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        disabled={toggleDailyTaskMutation.isPending}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <div className="task-details">
                      <h3 className="task-title">{task.title}</h3>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                      <div className="task-meta">
                        <span className="streak-counter">
                          {getStreakEmoji(task.streak)} {task.streak} day streak
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
                        disabled={deleteDailyTaskMutation.isPending}
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
      </div>
    </div>
  );
};

export default DailyTasksPage; 