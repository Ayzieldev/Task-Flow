import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGoals } from '@/hooks/useGoals';
import { Goal } from '@/types';
import LoadingSpinner from '@/components/design/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '@/components/design/ErrorMessage/ErrorMessage';
import DailyTasksPage from './DailyTasksPage';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'goals' | 'daily' | 'weekly'>('goals');
  const { data: goals = [], isLoading, error } = useGoals();

  const getTotalProgress = () => {
    if (goals.length === 0) return 0;
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / goals.length);
  };

  const getCompletedGoals = () => {
    return goals.filter(goal => goal.completed).length;
  };

  const getTotalTasks = () => {
    return goals.reduce((sum, goal) => sum + goal.taskBlocks.length, 0);
  };

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="loading">
            <LoadingSpinner size="lg" />
            <p>Loading your goals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <ErrorMessage 
            message="Error loading goals. Please try again."
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome to Your Goal Dashboard</h1>
            <p>Track your progress and manage your goals effectively</p>
          </div>
          
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-number">{goals.length}</span>
                <span className="stat-label">Total Goals</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <span className="stat-number">{getCompletedGoals()}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <span className="stat-number">{getTotalTasks()}</span>
                <span className="stat-label">Total Tasks</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <span className="stat-number">{getTotalProgress()}%</span>
                <span className="stat-label">Avg Progress</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'goals' ? 'active' : ''}`}
              onClick={() => setActiveTab('goals')}
            >
              <span className="tab-icon">🎯</span>
              Your Goals
              <span className="tab-count">{goals.length}</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={() => setActiveTab('daily')}
            >
              <span className="tab-icon">📅</span>
              Daily Tasks
            </button>
            <button 
              className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
              onClick={() => setActiveTab('weekly')}
            >
              <span className="tab-icon">📊</span>
              Weekly Tasks
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'goals' && (
            <div className="goals-section">
              <div className="goals-header">
                <div className="goals-title">
                  <h2>Your Goals</h2>
                  <span className="goals-count">{goals.length} goal{goals.length !== 1 ? 's' : ''}</span>
                </div>
                <Link to="/create" className="btn btn--primary">
                  + Create New Goal
                </Link>
              </div>
            
            {goals.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>No Goals Yet</h3>
                <p>Start your journey by creating your first goal. Set clear objectives and track your progress!</p>
                <Link to="/create" className="btn btn--primary">
                  Create Your First Goal
                </Link>
              </div>
            ) : (
              <div className="goals-grid">
                {goals.map((goal) => (
                  <Link to={`/goal/${goal.id}`} key={goal.id} className="goal-card">
                    <div className="goal-card__header">
                      <h3>{goal.title}</h3>
                      <span className={`priority-indicator ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                    </div>
                    
                    {goal.description && (
                      <p className="goal-card__description">{goal.description}</p>
                    )}
                    
                    <div className="goal-card__progress">
                      <div className="progress-info">
                        <span className="progress-text">Progress</span>
                        <span className="progress-percentage">{goal.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="goal-card__meta">
                      <div className="meta-item">
                        <span className="meta-label">Tasks:</span>
                        <span className="meta-value">{goal.taskBlocks.length}</span>
                      </div>
                      {goal.deadline && (
                        <div className="meta-item">
                          <span className="meta-label">Due:</span>
                          <span className="meta-value">{formatDate(goal.deadline)}</span>
                        </div>
                      )}
                      <div className="meta-item">
                        <span className="meta-label">Created:</span>
                        <span className="meta-value">{formatDate(goal.createdAt)}</span>
                      </div>
                    </div>
                    
                    {goal.completed && (
                      <div className="goal-card__completed">
                        <span>🎉 Completed!</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
          )}

          {activeTab === 'daily' && (
            <div className="daily-tasks-section">
              <DailyTasksPage />
            </div>
          )}

          {activeTab === 'weekly' && (
            <div className="weekly-tasks-section">
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <h3>Weekly Tasks Coming Soon</h3>
                <p>Weekly task management will be available in the next update!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 