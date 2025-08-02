import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface TaskBlock {
  id: string;
  title: string;
  type: 'single' | 'grouped';
  completed: boolean;
  locked?: boolean;
  isRewardTrigger?: boolean;
  rewardNote?: string;
  subtasks?: Subtask[];
  order: number;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  isRewardTrigger?: boolean;
  rewardNote?: string;
  locked?: boolean;
  order: number;
}

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
  taskBlocks: TaskBlock[];
  createdAt: string;
  updatedAt: string;
}

const GoalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    if (id) {
      const goals = JSON.parse(localStorage.getItem('goals') || '[]');
      const foundGoal = goals.find((g: Goal) => g.id === id);
      if (foundGoal) {
        setGoal(foundGoal);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const calculateProgress = (taskBlocks: TaskBlock[]): number => {
    if (taskBlocks.length === 0) return 0;
    const completedTasks = taskBlocks.filter(task => task.completed).length;
    return Math.round((completedTasks / taskBlocks.length) * 100);
  };

  const updateGoal = (updatedGoal: Goal) => {
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    const updatedGoals = goals.map((g: Goal) => 
      g.id === updatedGoal.id ? updatedGoal : g
    );
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
    setGoal(updatedGoal);
  };

  const addTask = () => {
    if (!newTaskTitle.trim() || !goal) return;

    const newTask: TaskBlock = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      type: 'single',
      completed: false,
      locked: goal.stepByStep && goal.taskBlocks.length > 0 ? true : false,
      order: goal.taskBlocks.length,
    };

    const updatedGoal = {
      ...goal,
      taskBlocks: [...goal.taskBlocks, newTask],
      progress: calculateProgress([...goal.taskBlocks, newTask]),
      updatedAt: new Date().toISOString(),
    };

    updateGoal(updatedGoal);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const toggleTask = (taskId: string) => {
    if (!goal) return;

    const updatedTaskBlocks = goal.taskBlocks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        
        // If step-by-step mode is enabled, unlock next task
        if (goal.stepByStep && updatedTask.completed) {
          const currentIndex = goal.taskBlocks.findIndex(t => t.id === taskId);
          const nextTask = goal.taskBlocks[currentIndex + 1];
          if (nextTask && nextTask.locked) {
            nextTask.locked = false;
          }
        }
        
        return updatedTask;
      }
      return task;
    });

    const updatedGoal = {
      ...goal,
      taskBlocks: updatedTaskBlocks,
      progress: calculateProgress(updatedTaskBlocks),
      completed: updatedTaskBlocks.every(task => task.completed),
      updatedAt: new Date().toISOString(),
    };

    updateGoal(updatedGoal);
  };

  const deleteTask = (taskId: string) => {
    if (!goal) return;

    const updatedTaskBlocks = goal.taskBlocks
      .filter(task => task.id !== taskId)
      .map((task, index) => ({ ...task, order: index }));

    const updatedGoal = {
      ...goal,
      taskBlocks: updatedTaskBlocks,
      progress: calculateProgress(updatedTaskBlocks),
      updatedAt: new Date().toISOString(),
    };

    updateGoal(updatedGoal);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  if (!goal) {
    return (
      <div className="goal-detail-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="goal-detail-page">
      <div className="container">
        <div className="goal-header">
          <button 
            className="btn btn--secondary back-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Goals
          </button>
          
          <div className="goal-info">
            <div className="goal-title-section">
              <h1>{goal.title}</h1>
              <span className={`priority-indicator ${getPriorityColor(goal.priority)}`}>
                {goal.priority}
              </span>
            </div>
            
            {goal.description && (
              <p className="goal-description">{goal.description}</p>
            )}
            
            <div className="goal-meta">
              {goal.deadline && (
                <div className="meta-item">
                  <span className="meta-label">Deadline:</span>
                  <span className="meta-value">{formatDate(goal.deadline)}</span>
                </div>
              )}
              
              {goal.reward && (
                <div className="meta-item">
                  <span className="meta-label">Reward:</span>
                  <span className="meta-value">{goal.reward}</span>
                </div>
              )}
              
              <div className="meta-item">
                <span className="meta-label">Step-by-Step:</span>
                <span className="meta-value">{goal.stepByStep ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <h2>Progress</h2>
            <span className="progress-percentage">{goal.progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Tasks ({goal.taskBlocks.length})</h2>
            <button 
              className="btn btn--primary"
              onClick={() => setShowAddTask(!showAddTask)}
            >
              {showAddTask ? 'Cancel' : '+ Add Task'}
            </button>
          </div>

          {showAddTask && (
            <div className="add-task-form">
              <div className="form-group">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button 
                  className="btn btn--primary"
                  onClick={addTask}
                  disabled={!newTaskTitle.trim()}
                >
                  Add Task
                </button>
              </div>
            </div>
          )}

          <div className="tasks-list">
            {goal.taskBlocks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks yet. Add your first task to get started!</p>
              </div>
            ) : (
              goal.taskBlocks.map((task, index) => (
                <div 
                  key={task.id} 
                  className={`task-item ${task.completed ? 'completed' : ''} ${task.locked ? 'locked' : ''}`}
                >
                  <div className="task-content">
                    <label className="task-checkbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        disabled={task.locked}
                      />
                      <span className="checkmark"></span>
                    </label>
                    
                    <div className="task-details">
                      <span className="task-title">{task.title}</span>
                      {task.locked && (
                        <span className="locked-indicator">🔒 Locked</span>
                      )}
                    </div>
                    
                    <button 
                      className="delete-task-btn"
                      onClick={() => deleteTask(task.id)}
                      title="Delete task"
                    >
                      ×
                    </button>
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

export default GoalDetailPage; 