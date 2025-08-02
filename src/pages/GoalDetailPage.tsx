import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskBlock from '../components/design/TaskBlock/TaskBlock';
import TaskForm from '../components/design/TaskForm/TaskForm';

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  isRewardTrigger?: boolean;
  rewardNote?: string;
  locked?: boolean;
  order: number;
}

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

interface TaskFormData {
  title: string;
  type: 'single' | 'grouped';
  isRewardTrigger?: boolean;
  rewardNote?: string;
  subtasks: { id: string; title: string; isRewardTrigger?: boolean; rewardNote?: string }[];
}

const GoalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

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
    
    let totalTasks = 0;
    let completedTasks = 0;
    
    taskBlocks.forEach(task => {
      if (task.type === 'single') {
        totalTasks++;
        if (task.completed) completedTasks++;
      } else if (task.type === 'grouped') {
        const subtasks = task.subtasks || [];
        if (subtasks.length > 0) {
          totalTasks += subtasks.length;
          completedTasks += subtasks.filter(subtask => subtask.completed).length;
        }
      }
    });
    
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const updateGoal = (updatedGoal: Goal) => {
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    const updatedGoals = goals.map((g: Goal) => 
      g.id === updatedGoal.id ? updatedGoal : g
    );
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
    setGoal(updatedGoal);
  };

  const addTask = (taskData: TaskFormData) => {
    if (!goal) return;

    const newTask: TaskBlock = {
      id: Date.now().toString(),
      title: taskData.title,
      type: taskData.type,
      completed: false,
      locked: goal.stepByStep && goal.taskBlocks.length > 0 ? true : false,
      isRewardTrigger: taskData.isRewardTrigger,
      rewardNote: taskData.rewardNote,
      order: goal.taskBlocks.length,
      subtasks: taskData.type === 'grouped' ? taskData.subtasks.map((subtask, index) => ({
        id: `${Date.now()}-${index}`,
        title: subtask.title,
        completed: false,
        locked: goal.stepByStep && index > 0 ? true : false,
        isRewardTrigger: subtask.isRewardTrigger,
        rewardNote: subtask.rewardNote,
        order: index,
      })) : undefined,
    };

    const updatedGoal = {
      ...goal,
      taskBlocks: [...goal.taskBlocks, newTask],
      progress: calculateProgress([...goal.taskBlocks, newTask]),
      updatedAt: new Date().toISOString(),
    };

    updateGoal(updatedGoal);
    setShowTaskForm(false);
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

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    if (!goal) return;

    const updatedTaskBlocks = goal.taskBlocks.map(task => {
      if (task.id === taskId && task.subtasks) {
        const updatedSubtasks = task.subtasks.map(subtask => {
          if (subtask.id === subtaskId) {
            const updatedSubtask = { ...subtask, completed: !subtask.completed };
            
            // If step-by-step mode is enabled, unlock next subtask
            if (goal.stepByStep && updatedSubtask.completed && task.subtasks) {
              const currentIndex = task.subtasks.findIndex(s => s.id === subtaskId);
              const nextSubtask = task.subtasks[currentIndex + 1];
              if (nextSubtask && nextSubtask.locked) {
                nextSubtask.locked = false;
              }
            }
            
            return updatedSubtask;
          }
          return subtask;
        });

        // Check if all subtasks are completed
        const allSubtasksCompleted = updatedSubtasks.every(subtask => subtask.completed);
        
        return {
          ...task,
          subtasks: updatedSubtasks,
          completed: allSubtasksCompleted,
        };
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

  const editTask = (taskId: string, newTitle: string) => {
    if (!goal) return;

    const updatedTaskBlocks = goal.taskBlocks.map(task =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );

    const updatedGoal = {
      ...goal,
      taskBlocks: updatedTaskBlocks,
      updatedAt: new Date().toISOString(),
    };

    updateGoal(updatedGoal);
  };

  const editSubtask = (taskId: string, subtaskId: string, newTitle: string) => {
    if (!goal) return;

    const updatedTaskBlocks = goal.taskBlocks.map(task => {
      if (task.id === taskId && task.subtasks) {
        const updatedSubtasks = task.subtasks.map(subtask =>
          subtask.id === subtaskId ? { ...subtask, title: newTitle } : subtask
        );
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });

    const updatedGoal = {
      ...goal,
      taskBlocks: updatedTaskBlocks,
      updatedAt: new Date().toISOString(),
    };

    updateGoal(updatedGoal);
  };

  const deleteSubtask = (taskId: string, subtaskId: string) => {
    if (!goal) return;

    const updatedTaskBlocks = goal.taskBlocks.map(task => {
      if (task.id === taskId && task.subtasks) {
        const updatedSubtasks = task.subtasks
          .filter(subtask => subtask.id !== subtaskId)
          .map((subtask, index) => ({ ...subtask, order: index }));
        
        // Check if all remaining subtasks are completed
        const allSubtasksCompleted = updatedSubtasks.every(subtask => subtask.completed);
        
        return {
          ...task,
          subtasks: updatedSubtasks,
          completed: allSubtasksCompleted,
        };
      }
      return task;
    });

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
              onClick={() => setShowTaskForm(!showTaskForm)}
            >
              {showTaskForm ? 'Cancel' : '+ Add Task'}
            </button>
          </div>

          {showTaskForm && (
            <div className="task-form-container">
              <TaskForm
                onSubmit={addTask}
                onCancel={() => setShowTaskForm(false)}
                stepByStepMode={goal.stepByStep}
              />
            </div>
          )}

          <div className="tasks-list">
            {goal.taskBlocks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks yet. Add your first task to get started!</p>
              </div>
            ) : (
              goal.taskBlocks.map((task) => (
                <TaskBlock
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  type={task.type}
                  completed={task.completed}
                  locked={task.locked}
                  isRewardTrigger={task.isRewardTrigger}
                  rewardNote={task.rewardNote}
                  subtasks={task.subtasks}
                  order={task.order}
                  stepByStepMode={goal.stepByStep}
                  onToggle={toggleTask}
                  onSubtaskToggle={toggleSubtask}
                  onDelete={deleteTask}
                  onEdit={editTask}
                  onSubtaskEdit={editSubtask}
                  onSubtaskDelete={deleteSubtask}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailPage; 