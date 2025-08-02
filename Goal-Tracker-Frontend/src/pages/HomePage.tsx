import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Goal {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  priority: 'low' | 'medium' | 'high';
  reward?: string;
  stepByStep: boolean;
  completed: boolean;
  progress: number;
  taskBlocks: any[];
  createdAt: string;
  updatedAt: string;
}

const HomePage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
    setGoals(savedGoals);
  }, []);

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

  return (
    <div className="home-page">
      <div className="container">
        <section className="hero">
          <div className="hero__badge">
            <span>✨ Trusted by 10,000+ users</span>
          </div>
          
          <h1>Flexible Goal Tracker</h1>
          <p className="hero__subtitle">Track your goals with flexible task management and rewarding progress</p>
          
          <div className="hero__stats">
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Goals Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Offline Support</span>
            </div>
          </div>
          
          <div className="hero__actions">
            <Link to="/create" className="btn btn--primary">
              Create Your First Goal
            </Link>
            <Link to="/demo" className="btn btn--secondary">
              Watch Demo
            </Link>
          </div>
          
          <div className="hero__testimonial">
            <div className="testimonial-content">
              <p>"This app completely changed how I approach my goals. The flexible task system is exactly what I needed!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">👤</div>
                <div className="author-info">
                  <span className="author-name">Sarah Johnson</span>
                  <span className="author-title">Product Manager</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {goals.length > 0 && (
          <section className="goals-section">
            <div className="goals-header">
              <h2>Your Goals</h2>
              <Link to="/create" className="btn btn--primary">
                + New Goal
              </Link>
            </div>
            
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
          </section>
        )}
        
        <section className="features">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Flexible Tasks</h3>
              <p>Create single tasks or grouped tasks with subtasks</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Step-by-Step Mode</h3>
              <p>Lock tasks in sequence for structured progress</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>Rewards System</h3>
              <p>Set rewards for task completion and goal achievement</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Offline Support</h3>
              <p>Work offline and sync when you're back online</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage; 